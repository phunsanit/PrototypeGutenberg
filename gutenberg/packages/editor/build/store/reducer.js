"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPostRawValue = getPostRawValue;
exports.hasSameKeys = hasSameKeys;
exports.isUpdatingSamePostProperty = isUpdatingSamePostProperty;
exports.shouldOverwriteState = shouldOverwriteState;
exports.postId = postId;
exports.postType = postType;
exports.template = template;
exports.preferences = preferences;
exports.saving = saving;
exports.postLock = postLock;
exports.postSavingLock = postSavingLock;
exports.postAutosavingLock = postAutosavingLock;
exports.isReady = isReady;
exports.editorSettings = editorSettings;
exports.default = exports.reusableBlocks = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _reduxOptimist = _interopRequireDefault(require("redux-optimist"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _defaults = require("./defaults");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Returns a post attribute value, flattening nested rendered content using its
 * raw value in place of its original object form.
 *
 * @param {*} value Original value.
 *
 * @return {*} Raw value.
 */
function getPostRawValue(value) {
  if (value && 'object' === (0, _typeof2.default)(value) && 'raw' in value) {
    return value.raw;
  }

  return value;
}
/**
 * Returns true if the two object arguments have the same keys, or false
 * otherwise.
 *
 * @param {Object} a First object.
 * @param {Object} b Second object.
 *
 * @return {boolean} Whether the two objects have the same keys.
 */


function hasSameKeys(a, b) {
  return (0, _lodash.isEqual)((0, _lodash.keys)(a), (0, _lodash.keys)(b));
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are editing the same post property, or
 * false otherwise.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether actions are updating the same post property.
 */


function isUpdatingSamePostProperty(action, previousAction) {
  return action.type === 'EDIT_POST' && hasSameKeys(action.edits, previousAction.edits);
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are modifying the same property such that
 * undo history should be batched.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether to overwrite present state.
 */


function shouldOverwriteState(action, previousAction) {
  if (action.type === 'RESET_EDITOR_BLOCKS') {
    return !action.shouldCreateUndoLevel;
  }

  if (!previousAction || action.type !== previousAction.type) {
    return false;
  }

  return isUpdatingSamePostProperty(action, previousAction);
}

function postId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
    case 'RESET_POST':
    case 'UPDATE_POST':
      return action.post.id;
  }

  return state;
}

function postType() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
    case 'RESET_POST':
    case 'UPDATE_POST':
      return action.post.type;
  }

  return state;
}
/**
 * Reducer returning whether the post blocks match the defined template or not.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {boolean} Updated state.
 */


function template() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isValid: true
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TEMPLATE_VALIDITY':
      return _objectSpread({}, state, {
        isValid: action.isValid
      });
  }

  return state;
}
/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state                 Current state.
 * @param {Object}  action                Dispatched action.
 *
 * @return {string} Updated state.
 */


function preferences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.PREFERENCES_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ENABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: true
      });

    case 'DISABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: false
      });
  }

  return state;
}
/**
 * Reducer returning current network request state (whether a request to
 * the WP REST API is in progress, successful, or failed).
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function saving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'REQUEST_POST_UPDATE_START':
    case 'REQUEST_POST_UPDATE_FINISH':
      return {
        pending: action.type === 'REQUEST_POST_UPDATE_START',
        options: action.options || {}
      };
  }

  return state;
}
/**
 * Post Lock State.
 *
 * @typedef {Object} PostLockState
 *
 * @property {boolean} isLocked       Whether the post is locked.
 * @property {?boolean} isTakeover     Whether the post editing has been taken over.
 * @property {?boolean} activePostLock Active post lock value.
 * @property {?Object}  user           User that took over the post.
 */

/**
 * Reducer returning the post lock status.
 *
 * @param {PostLockState} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */


function postLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isLocked: false
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_POST_LOCK':
      return action.lock;
  }

  return state;
}
/**
 * Post saving lock.
 *
 * When post saving is locked, the post cannot be published or updated.
 *
 * @param {PostLockState} state  Current state.
 * @param {Object}        action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */


function postSavingLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOCK_POST_SAVING':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.lockName, true));

    case 'UNLOCK_POST_SAVING':
      return (0, _lodash.omit)(state, action.lockName);
  }

  return state;
}
/**
 * Post autosaving lock.
 *
 * When post autosaving is locked, the post will not autosave.
 *
 * @param {PostLockState} state  Current state.
 * @param {Object}        action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */


function postAutosavingLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOCK_POST_AUTOSAVING':
      return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.lockName, true));

    case 'UNLOCK_POST_AUTOSAVING':
      return (0, _lodash.omit)(state, action.lockName);
  }

  return state;
}

var reusableBlocks = (0, _data.combineReducers)({
  data: function data() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RECEIVE_REUSABLE_BLOCKS':
        {
          return _objectSpread({}, state, {}, (0, _lodash.keyBy)(action.results, 'id'));
        }

      case 'UPDATE_REUSABLE_BLOCK':
        {
          var id = action.id,
              changes = action.changes;
          return _objectSpread({}, state, (0, _defineProperty2.default)({}, id, _objectSpread({}, state[id], {}, changes)));
        }

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
        {
          var _id = action.id,
              updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

          if (_id === updatedId) {
            return state;
          }

          var value = state[_id];
          return _objectSpread({}, (0, _lodash.omit)(state, _id), (0, _defineProperty2.default)({}, updatedId, _objectSpread({}, value, {
            id: updatedId
          })));
        }

      case 'REMOVE_REUSABLE_BLOCK':
        {
          var _id2 = action.id;
          return (0, _lodash.omit)(state, _id2);
        }
    }

    return state;
  },
  isFetching: function isFetching() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'FETCH_REUSABLE_BLOCKS':
        {
          var id = action.id;

          if (!id) {
            return state;
          }

          return _objectSpread({}, state, (0, _defineProperty2.default)({}, id, true));
        }

      case 'FETCH_REUSABLE_BLOCKS_SUCCESS':
      case 'FETCH_REUSABLE_BLOCKS_FAILURE':
        {
          var _id3 = action.id;
          return (0, _lodash.omit)(state, _id3);
        }
    }

    return state;
  },
  isSaving: function isSaving() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SAVE_REUSABLE_BLOCK':
        return _objectSpread({}, state, (0, _defineProperty2.default)({}, action.id, true));

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
      case 'SAVE_REUSABLE_BLOCK_FAILURE':
        {
          var id = action.id;
          return (0, _lodash.omit)(state, id);
        }
    }

    return state;
  }
});
/**
 * Reducer returning whether the editor is ready to be rendered.
 * The editor is considered ready to be rendered once
 * the post object is loaded properly and the initial blocks parsed.
 *
 * @param {boolean} state
 * @param {Object} action
 *
 * @return {boolean} Updated state.
 */

exports.reusableBlocks = reusableBlocks;

function isReady() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
      return true;

    case 'TEAR_DOWN_EDITOR':
      return false;
  }

  return state;
}
/**
 * Reducer returning the post editor setting.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function editorSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.EDITOR_SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_EDITOR_SETTINGS':
      return _objectSpread({}, state, {}, action.settings);
  }

  return state;
}

var _default = (0, _reduxOptimist.default)((0, _data.combineReducers)({
  postId: postId,
  postType: postType,
  preferences: preferences,
  saving: saving,
  postLock: postLock,
  reusableBlocks: reusableBlocks,
  template: template,
  postSavingLock: postSavingLock,
  isReady: isReady,
  editorSettings: editorSettings,
  postAutosavingLock: postAutosavingLock
}));

exports.default = _default;
//# sourceMappingURL=reducer.js.map