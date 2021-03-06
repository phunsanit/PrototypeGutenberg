import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { keyBy, map, groupBy, flowRight, isEqual, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';
import isShallowEqual from '@wordpress/is-shallow-equal';
/**
 * Internal dependencies
 */

import { ifMatchingAction, replaceAction } from './utils';
import { reducer as queriedDataReducer } from './queried-data';
import { defaultEntities, DEFAULT_ENTITY_KEY } from './entities';
/**
 * Reducer managing terms state. Keyed by taxonomy slug, the value is either
 * undefined (if no request has been made for given taxonomy), null (if a
 * request is in-flight for given taxonomy), or the array of terms for the
 * taxonomy.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function terms() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_TERMS':
      return _objectSpread({}, state, _defineProperty({}, action.taxonomy, action.terms));
  }

  return state;
}
/**
 * Reducer managing authors state. Keyed by id.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    byId: {},
    queries: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_USER_QUERY':
      return {
        byId: _objectSpread({}, state.byId, {}, keyBy(action.users, 'id')),
        queries: _objectSpread({}, state.queries, _defineProperty({}, action.queryID, map(action.users, function (user) {
          return user.id;
        })))
      };
  }

  return state;
}
/**
 * Reducer managing current user state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function currentUser() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_CURRENT_USER':
      return action.currentUser;
  }

  return state;
}
/**
 * Reducer managing taxonomies.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function taxonomies() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_TAXONOMIES':
      return action.taxonomies;
  }

  return state;
}
/**
 * Reducer managing the current theme.
 *
 * @param {string} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {string} Updated state.
 */

export function currentTheme() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_CURRENT_THEME':
      return action.currentTheme.stylesheet;
  }

  return state;
}
/**
 * Reducer managing installed themes.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function themes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_CURRENT_THEME':
      return _objectSpread({}, state, _defineProperty({}, action.currentTheme.stylesheet, action.currentTheme));
  }

  return state;
}
/**
 * Reducer managing theme supports data.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function themeSupports() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_THEME_SUPPORTS':
      return _objectSpread({}, state, {}, action.themeSupports);
  }

  return state;
}
/**
 * Higher Order Reducer for a given entity config. It supports:
 *
 *  - Fetching
 *  - Editing
 *  - Saving
 *
 * @param {Object} entityConfig  Entity config.
 *
 * @return {Function} Reducer.
 */

function entity(entityConfig) {
  return flowRight([// Limit to matching action type so we don't attempt to replace action on
  // an unhandled action.
  ifMatchingAction(function (action) {
    return action.name && action.kind && action.name === entityConfig.name && action.kind === entityConfig.kind;
  }), // Inject the entity config into the action.
  replaceAction(function (action) {
    return _objectSpread({}, action, {
      key: entityConfig.key || DEFAULT_ENTITY_KEY
    });
  })])(combineReducers({
    queriedData: queriedDataReducer,
    edits: function edits() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case 'RECEIVE_ITEMS':
          var nextState = _objectSpread({}, state);

          var _iterator = _createForOfIteratorHelper(action.items),
              _step;

          try {
            var _loop = function _loop() {
              var record = _step.value;
              var recordId = record[action.key];
              var edits = nextState[recordId];

              if (!edits) {
                return "continue";
              }

              var nextEdits = Object.keys(edits).reduce(function (acc, key) {
                // If the edited value is still different to the persisted value,
                // keep the edited value in edits.
                if ( // Edits are the "raw" attribute values, but records may have
                // objects with more properties, so we use `get` here for the
                // comparison.
                !isEqual(edits[key], get(record[key], 'raw', record[key]))) {
                  acc[key] = edits[key];
                }

                return acc;
              }, {});

              if (Object.keys(nextEdits).length) {
                nextState[recordId] = nextEdits;
              } else {
                delete nextState[recordId];
              }
            };

            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _ret = _loop();

              if (_ret === "continue") continue;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return nextState;

        case 'EDIT_ENTITY_RECORD':
          var nextEdits = _objectSpread({}, state[action.recordId], {}, action.edits);

          Object.keys(nextEdits).forEach(function (key) {
            // Delete cleared edits so that the properties
            // are not considered dirty.
            if (nextEdits[key] === undefined) {
              delete nextEdits[key];
            }
          });
          return _objectSpread({}, state, _defineProperty({}, action.recordId, nextEdits));
      }

      return state;
    },
    saving: function saving() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case 'SAVE_ENTITY_RECORD_START':
        case 'SAVE_ENTITY_RECORD_FINISH':
          return _objectSpread({}, state, _defineProperty({}, action.recordId, {
            pending: action.type === 'SAVE_ENTITY_RECORD_START',
            error: action.error,
            isAutosave: action.isAutosave
          }));
      }

      return state;
    }
  }));
}
/**
 * Reducer keeping track of the registered entities.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


export function entitiesConfig() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultEntities;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_ENTITIES':
      return [].concat(_toConsumableArray(state), _toConsumableArray(action.entities));
  }

  return state;
}
/**
 * Reducer keeping track of the registered entities config and data.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newConfig = entitiesConfig(state.config, action); // Generates a dynamic reducer for the entities

  var entitiesDataReducer = state.reducer;

  if (!entitiesDataReducer || newConfig !== state.config) {
    var entitiesByKind = groupBy(newConfig, 'kind');
    entitiesDataReducer = combineReducers(Object.entries(entitiesByKind).reduce(function (memo, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          kind = _ref2[0],
          subEntities = _ref2[1];

      var kindReducer = combineReducers(subEntities.reduce(function (kindMemo, entityConfig) {
        return _objectSpread({}, kindMemo, _defineProperty({}, entityConfig.name, entity(entityConfig)));
      }, {}));
      memo[kind] = kindReducer;
      return memo;
    }, {}));
  }

  var newData = entitiesDataReducer(state.data, action);

  if (newData === state.data && newConfig === state.config && entitiesDataReducer === state.reducer) {
    return state;
  }

  return {
    reducer: entitiesDataReducer,
    data: newData,
    config: newConfig
  };
};
/**
 * Reducer keeping track of entity edit undo history.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

var UNDO_INITIAL_STATE = [];
UNDO_INITIAL_STATE.offset = 0;
var lastEditAction;
export function undo() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : UNDO_INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'EDIT_ENTITY_RECORD':
    case 'CREATE_UNDO_LEVEL':
      var isCreateUndoLevel = action.type === 'CREATE_UNDO_LEVEL';
      var isUndoOrRedo = !isCreateUndoLevel && (action.meta.isUndo || action.meta.isRedo);

      if (isCreateUndoLevel) {
        action = lastEditAction;
      } else if (!isUndoOrRedo) {
        // Don't lose the last edit cache if the new one only has transient edits.
        // Transient edits don't create new levels so updating the cache would make
        // us skip an edit later when creating levels explicitly.
        if (Object.keys(action.edits).some(function (key) {
          return !action.transientEdits[key];
        })) {
          lastEditAction = action;
        } else {
          lastEditAction = _objectSpread({}, action, {
            edits: _objectSpread({}, lastEditAction && lastEditAction.edits, {}, action.edits)
          });
        }
      }

      var nextState;

      if (isUndoOrRedo) {
        nextState = _toConsumableArray(state);
        nextState.offset = state.offset + (action.meta.isUndo ? -1 : 1);

        if (state.flattenedUndo) {
          // The first undo in a sequence of undos might happen while we have
          // flattened undos in state. If this is the case, we want execution
          // to continue as if we were creating an explicit undo level. This
          // will result in an extra undo level being appended with the flattened
          // undo values.
          isCreateUndoLevel = true;
          action = lastEditAction;
        } else {
          return nextState;
        }
      }

      if (!action.meta.undo) {
        return state;
      } // Transient edits don't create an undo level, but are
      // reachable in the next meaningful edit to which they
      // are merged. They are defined in the entity's config.


      if (!isCreateUndoLevel && !Object.keys(action.edits).some(function (key) {
        return !action.transientEdits[key];
      })) {
        nextState = _toConsumableArray(state);
        nextState.flattenedUndo = _objectSpread({}, state.flattenedUndo, {}, action.edits);
        nextState.offset = state.offset;
        return nextState;
      } // Clear potential redos, because this only supports linear history.


      nextState = nextState || state.slice(0, state.offset || undefined);
      nextState.offset = nextState.offset || 0;
      nextState.pop();

      if (!isCreateUndoLevel) {
        nextState.push({
          kind: action.meta.undo.kind,
          name: action.meta.undo.name,
          recordId: action.meta.undo.recordId,
          edits: _objectSpread({}, state.flattenedUndo, {}, action.meta.undo.edits)
        });
      } // When an edit is a function it's an optimization to avoid running some expensive operation.
      // We can't rely on the function references being the same so we opt out of comparing them here.


      var comparisonUndoEdits = Object.values(action.meta.undo.edits).filter(function (edit) {
        return typeof edit !== 'function';
      });
      var comparisonEdits = Object.values(action.edits).filter(function (edit) {
        return typeof edit !== 'function';
      });

      if (!isShallowEqual(comparisonUndoEdits, comparisonEdits)) {
        nextState.push({
          kind: action.kind,
          name: action.name,
          recordId: action.recordId,
          edits: isCreateUndoLevel ? _objectSpread({}, state.flattenedUndo, {}, action.edits) : action.edits
        });
      }

      return nextState;
  }

  return state;
}
/**
 * Reducer managing embed preview data.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function embedPreviews() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_EMBED_PREVIEW':
      var url = action.url,
          preview = action.preview;
      return _objectSpread({}, state, _defineProperty({}, url, preview));
  }

  return state;
}
/**
 * State which tracks whether the user can perform an action on a REST
 * resource.
 *
 * @param  {Object} state  Current state.
 * @param  {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function userPermissions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_USER_PERMISSION':
      return _objectSpread({}, state, _defineProperty({}, action.key, action.isAllowed));
  }

  return state;
}
/**
 * Reducer returning autosaves keyed by their parent's post id.
 *
 * @param  {Object} state  Current state.
 * @param  {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function autosaves() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_AUTOSAVES':
      var postId = action.postId,
          autosavesData = action.autosaves;
      return _objectSpread({}, state, _defineProperty({}, postId, autosavesData));
  }

  return state;
}
export default combineReducers({
  terms: terms,
  users: users,
  currentTheme: currentTheme,
  currentUser: currentUser,
  taxonomies: taxonomies,
  themes: themes,
  themeSupports: themeSupports,
  entities: entities,
  undo: undo,
  embedPreviews: embedPreviews,
  userPermissions: userPermissions,
  autosaves: autosaves
});
//# sourceMappingURL=reducer.js.map