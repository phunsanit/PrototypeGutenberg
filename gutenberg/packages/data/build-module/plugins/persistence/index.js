import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { merge, isPlainObject, get, has } from 'lodash';
/**
 * Internal dependencies
 */

import defaultStorage from './storage/default';
import { combineReducers } from '../../';
/** @typedef {import('../../registry').WPDataRegistry} WPDataRegistry */

/** @typedef {import('../../registry').WPDataPlugin} WPDataPlugin */

/**
 * @typedef {Object} WPDataPersistencePluginOptions Persistence plugin options.
 *
 * @property {Storage} storage    Persistent storage implementation. This must
 *                                at least implement `getItem` and `setItem` of
 *                                the Web Storage API.
 * @property {string}  storageKey Key on which to set in persistent storage.
 *
 */

/**
 * Default plugin storage.
 *
 * @type {Storage}
 */

var DEFAULT_STORAGE = defaultStorage;
/**
 * Default plugin storage key.
 *
 * @type {string}
 */

var DEFAULT_STORAGE_KEY = 'WP_DATA';
/**
 * Higher-order reducer which invokes the original reducer only if state is
 * inequal from that of the action's `nextState` property, otherwise returning
 * the original state reference.
 *
 * @param {Function} reducer Original reducer.
 *
 * @return {Function} Enhanced reducer.
 */

export var withLazySameState = function withLazySameState(reducer) {
  return function (state, action) {
    if (action.nextState === state) {
      return state;
    }

    return reducer(state, action);
  };
};
/**
 * Creates a persistence interface, exposing getter and setter methods (`get`
 * and `set` respectively).
 *
 * @param {WPDataPersistencePluginOptions} options Plugin options.
 *
 * @return {Object} Persistence interface.
 */

export function createPersistenceInterface(options) {
  var _options$storage = options.storage,
      storage = _options$storage === void 0 ? DEFAULT_STORAGE : _options$storage,
      _options$storageKey = options.storageKey,
      storageKey = _options$storageKey === void 0 ? DEFAULT_STORAGE_KEY : _options$storageKey;
  var data;
  /**
   * Returns the persisted data as an object, defaulting to an empty object.
   *
   * @return {Object} Persisted data.
   */

  function getData() {
    if (data === undefined) {
      // If unset, getItem is expected to return null. Fall back to
      // empty object.
      var persisted = storage.getItem(storageKey);

      if (persisted === null) {
        data = {};
      } else {
        try {
          data = JSON.parse(persisted);
        } catch (error) {
          // Similarly, should any error be thrown during parse of
          // the string (malformed JSON), fall back to empty object.
          data = {};
        }
      }
    }

    return data;
  }
  /**
   * Merges an updated reducer state into the persisted data.
   *
   * @param {string} key   Key to update.
   * @param {*}      value Updated value.
   */


  function setData(key, value) {
    data = _objectSpread({}, data, _defineProperty({}, key, value));
    storage.setItem(storageKey, JSON.stringify(data));
  }

  return {
    get: getData,
    set: setData
  };
}
/**
 * Data plugin to persist store state into a single storage key.
 *
 * @param {WPDataRegistry}                  registry      Data registry.
 * @param {?WPDataPersistencePluginOptions} pluginOptions Plugin options.
 *
 * @return {WPDataPlugin} Data plugin.
 */

var persistencePlugin = function persistencePlugin(registry, pluginOptions) {
  var persistence = createPersistenceInterface(pluginOptions);
  /**
   * Creates an enhanced store dispatch function, triggering the state of the
   * given reducer key to be persisted when changed.
   *
   * @param {Function}       getState   Function which returns current state.
   * @param {string}         reducerKey Reducer key.
   * @param {?Array<string>} keys       Optional subset of keys to save.
   *
   * @return {Function} Enhanced dispatch function.
   */

  function createPersistOnChange(getState, reducerKey, keys) {
    var getPersistedState;

    if (Array.isArray(keys)) {
      // Given keys, the persisted state should by produced as an object
      // of the subset of keys. This implementation uses combineReducers
      // to leverage its behavior of returning the same object when none
      // of the property values changes. This allows a strict reference
      // equality to bypass a persistence set on an unchanging state.
      var reducers = keys.reduce(function (accumulator, key) {
        return Object.assign(accumulator, _defineProperty({}, key, function (state, action) {
          return action.nextState[key];
        }));
      }, {});
      getPersistedState = withLazySameState(combineReducers(reducers));
    } else {
      getPersistedState = function getPersistedState(state, action) {
        return action.nextState;
      };
    }

    var lastState = getPersistedState(undefined, {
      nextState: getState()
    });
    return function () {
      var state = getPersistedState(lastState, {
        nextState: getState()
      });

      if (state !== lastState) {
        persistence.set(reducerKey, state);
        lastState = state;
      }
    };
  }

  return {
    registerStore: function registerStore(reducerKey, options) {
      if (!options.persist) {
        return registry.registerStore(reducerKey, options);
      } // Load from persistence to use as initial state.


      var persistedState = persistence.get()[reducerKey];

      if (persistedState !== undefined) {
        var initialState = options.reducer(undefined, {
          type: '@@WP/PERSISTENCE_RESTORE'
        });

        if (isPlainObject(initialState) && isPlainObject(persistedState)) {
          // If state is an object, ensure that:
          // - Other keys are left intact when persisting only a
          //   subset of keys.
          // - New keys in what would otherwise be used as initial
          //   state are deeply merged as base for persisted value.
          initialState = merge({}, initialState, persistedState);
        } else {
          // If there is a mismatch in object-likeness of default
          // initial or persisted state, defer to persisted value.
          initialState = persistedState;
        }

        options = _objectSpread({}, options, {
          initialState: initialState
        });
      }

      var store = registry.registerStore(reducerKey, options);
      store.subscribe(createPersistOnChange(store.getState, reducerKey, options.persist));
      return store;
    }
  };
};
/**
 * Deprecated: Remove this function and the code in WordPress Core that calls
 * it once WordPress 5.4 is released.
 */


persistencePlugin.__unstableMigrate = function (pluginOptions) {
  var persistence = createPersistenceInterface(pluginOptions);
  var state = persistence.get(); // Migrate 'insertUsage' from 'core/editor' to 'core/block-editor'

  var insertUsage = get(state, ['core/editor', 'preferences', 'insertUsage']);

  if (insertUsage) {
    persistence.set('core/block-editor', {
      preferences: {
        insertUsage: insertUsage
      }
    });
  }

  var editPostState = state['core/edit-post']; // Default `fullscreenMode` to `false` if any persisted state had existed
  // and the user hadn't made an explicit choice about fullscreen mode. This
  // is needed since `fullscreenMode` previously did not have a default value
  // and was implicitly false by its absence. It is now `true` by default, but
  // this change is not intended to affect upgrades from earlier versions.

  var hadPersistedState = Object.keys(state).length > 0;
  var hadFullscreenModePreference = has(state, ['core/edit-post', 'preferences', 'features', 'fullscreenMode']);

  if (hadPersistedState && !hadFullscreenModePreference) {
    editPostState = merge({}, editPostState, {
      preferences: {
        features: {
          fullscreenMode: false
        }
      }
    });
  } // Migrate 'areTipsEnabled' from 'core/nux' to 'showWelcomeGuide' in 'core/edit-post'


  var areTipsEnabled = get(state, ['core/nux', 'preferences', 'areTipsEnabled']);
  var hasWelcomeGuide = has(state, ['core/edit-post', 'preferences', 'features', 'welcomeGuide']);

  if (areTipsEnabled !== undefined && !hasWelcomeGuide) {
    editPostState = merge({}, editPostState, {
      preferences: {
        features: {
          welcomeGuide: areTipsEnabled
        }
      }
    });
  }

  if (editPostState !== state['core/edit-post']) {
    persistence.set('core/edit-post', editPostState);
  }
};

export default persistencePlugin;
//# sourceMappingURL=index.js.map