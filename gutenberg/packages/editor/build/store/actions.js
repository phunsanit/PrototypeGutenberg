"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupEditor = setupEditor;
exports.__experimentalTearDownEditor = __experimentalTearDownEditor;
exports.resetPost = resetPost;
exports.resetAutosave = resetAutosave;
exports.__experimentalRequestPostUpdateStart = __experimentalRequestPostUpdateStart;
exports.__experimentalRequestPostUpdateFinish = __experimentalRequestPostUpdateFinish;
exports.updatePost = updatePost;
exports.setupEditorState = setupEditorState;
exports.editPost = editPost;
exports.__experimentalOptimisticUpdatePost = __experimentalOptimisticUpdatePost;
exports.savePost = savePost;
exports.refreshPost = refreshPost;
exports.trashPost = trashPost;
exports.autosave = autosave;
exports.__experimentalLocalAutosave = __experimentalLocalAutosave;
exports.redo = redo;
exports.undo = undo;
exports.createUndoLevel = createUndoLevel;
exports.updatePostLock = updatePostLock;
exports.__experimentalFetchReusableBlocks = __experimentalFetchReusableBlocks;
exports.__experimentalReceiveReusableBlocks = __experimentalReceiveReusableBlocks;
exports.__experimentalSaveReusableBlock = __experimentalSaveReusableBlock;
exports.__experimentalDeleteReusableBlock = __experimentalDeleteReusableBlock;
exports.__experimentalUpdateReusableBlock = __experimentalUpdateReusableBlock;
exports.__experimentalConvertBlockToStatic = __experimentalConvertBlockToStatic;
exports.__experimentalConvertBlockToReusable = __experimentalConvertBlockToReusable;
exports.enablePublishSidebar = enablePublishSidebar;
exports.disablePublishSidebar = disablePublishSidebar;
exports.lockPostSaving = lockPostSaving;
exports.unlockPostSaving = unlockPostSaving;
exports.lockPostAutosaving = lockPostAutosaving;
exports.unlockPostAutosaving = unlockPostAutosaving;
exports.resetEditorBlocks = resetEditorBlocks;
exports.updateEditorSettings = updateEditorSettings;
exports.updateBlockListSettings = exports.insertDefaultBlock = exports.exitFormattedText = exports.enterFormattedText = exports.stopTyping = exports.startTyping = exports.toggleBlockMode = exports.removeBlock = exports.removeBlocks = exports.mergeBlocks = exports.synchronizeTemplate = exports.setTemplateValidity = exports.hideInsertionPoint = exports.showInsertionPoint = exports.insertBlocks = exports.insertBlock = exports.moveBlockToPosition = exports.moveBlocksUp = exports.moveBlocksDown = exports.replaceBlock = exports.replaceBlocks = exports.toggleSelection = exports.clearSelectedBlock = exports.multiSelect = exports.stopMultiSelect = exports.startMultiSelect = exports.selectBlock = exports.updateBlockAttributes = exports.updateBlock = exports.receiveBlocks = exports.resetBlocks = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = require("lodash");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _dataControls = require("@wordpress/data-controls");

var _blocks = require("@wordpress/blocks");

var _constants = require("./constants");

var _noticeBuilder = require("./utils/notice-builder");

var _serializeBlocks = _interopRequireDefault(require("./utils/serialize-blocks"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator.default.mark(setupEditor),
    _marked2 = /*#__PURE__*/_regenerator.default.mark(resetAutosave),
    _marked3 = /*#__PURE__*/_regenerator.default.mark(editPost),
    _marked4 = /*#__PURE__*/_regenerator.default.mark(savePost),
    _marked5 = /*#__PURE__*/_regenerator.default.mark(refreshPost),
    _marked6 = /*#__PURE__*/_regenerator.default.mark(trashPost),
    _marked7 = /*#__PURE__*/_regenerator.default.mark(autosave),
    _marked8 = /*#__PURE__*/_regenerator.default.mark(__experimentalLocalAutosave),
    _marked9 = /*#__PURE__*/_regenerator.default.mark(redo),
    _marked10 = /*#__PURE__*/_regenerator.default.mark(undo),
    _marked11 = /*#__PURE__*/_regenerator.default.mark(resetEditorBlocks);

/**
 * Returns an action generator used in signalling that editor has initialized with
 * the specified post object and editor settings.
 *
 * @param {Object} post      Post object.
 * @param {Object} edits     Initial edited attributes object.
 * @param {Array?} template  Block Template.
 */
function setupEditor(post, edits, template) {
  var content, blocks, isNewPost;
  return _regenerator.default.wrap(function setupEditor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // In order to ensure maximum of a single parse during setup, edits are
          // included as part of editor setup action. Assume edited content as
          // canonical if provided, falling back to post.
          if ((0, _lodash.has)(edits, ['content'])) {
            content = edits.content;
          } else {
            content = post.content.raw;
          }

          blocks = (0, _blocks.parse)(content); // Apply a template for new posts only, if exists.

          isNewPost = post.status === 'auto-draft';

          if (isNewPost && template) {
            blocks = (0, _blocks.synchronizeBlocksWithTemplate)(blocks, template);
          }

          _context.next = 6;
          return resetPost(post);

        case 6:
          _context.next = 8;
          return {
            type: 'SETUP_EDITOR',
            post: post,
            edits: edits,
            template: template
          };

        case 8:
          _context.next = 10;
          return resetEditorBlocks(blocks, {
            __unstableShouldCreateUndoLevel: false
          });

        case 10:
          _context.next = 12;
          return setupEditorState(post);

        case 12:
          if (!(edits && Object.keys(edits).some(function (key) {
            return edits[key] !== ((0, _lodash.has)(post, [key, 'raw']) ? post[key].raw : post[key]);
          }))) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return editPost(edits);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Returns an action object signalling that the editor is being destroyed and
 * that any necessary state or side-effect cleanup should occur.
 *
 * @return {Object} Action object.
 */


function __experimentalTearDownEditor() {
  return {
    type: 'TEAR_DOWN_EDITOR'
  };
}
/**
 * Returns an action object used in signalling that the latest version of the
 * post has been received, either by initialization or save.
 *
 * @param {Object} post Post object.
 *
 * @return {Object} Action object.
 */


function resetPost(post) {
  return {
    type: 'RESET_POST',
    post: post
  };
}
/**
 * Returns an action object used in signalling that the latest autosave of the
 * post has been received, by initialization or autosave.
 *
 * @deprecated since 5.6. Callers should use the `receiveAutosaves( postId, autosave )`
 * 			   selector from the '@wordpress/core-data' package.
 *
 * @param {Object} newAutosave Autosave post object.
 *
 * @return {Object} Action object.
 */


function resetAutosave(newAutosave) {
  var postId;
  return _regenerator.default.wrap(function resetAutosave$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _deprecated.default)('resetAutosave action (`core/editor` store)', {
            alternative: 'receiveAutosaves action (`core` store)',
            plugin: 'Gutenberg'
          });
          _context2.next = 3;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPostId');

        case 3:
          postId = _context2.sent;
          _context2.next = 6;
          return (0, _dataControls.dispatch)('core', 'receiveAutosaves', postId, newAutosave);

        case 6:
          return _context2.abrupt("return", {
            type: '__INERT__'
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Action for dispatching that a post update request has started.
 *
 * @param {Object} options
 *
 * @return {Object} An action object
 */


function __experimentalRequestPostUpdateStart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'REQUEST_POST_UPDATE_START',
    options: options
  };
}
/**
 * Action for dispatching that a post update request has finished.
 *
 * @param {Object} options
 *
 * @return {Object} An action object
 */


function __experimentalRequestPostUpdateFinish() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'REQUEST_POST_UPDATE_FINISH',
    options: options
  };
}
/**
 * Returns an action object used in signalling that a patch of updates for the
 * latest version of the post have been received.
 *
 * @param {Object} edits Updated post fields.
 *
 * @return {Object} Action object.
 */


function updatePost(edits) {
  return {
    type: 'UPDATE_POST',
    edits: edits
  };
}
/**
 * Returns an action object used to setup the editor state when first opening
 * an editor.
 *
 * @param {Object} post   Post object.
 *
 * @return {Object} Action object.
 */


function setupEditorState(post) {
  return {
    type: 'SETUP_EDITOR_STATE',
    post: post
  };
}
/**
 * Returns an action object used in signalling that attributes of the post have
 * been edited.
 *
 * @param {Object} edits   Post attributes to edit.
 * @param {Object} options Options for the edit.
 *
 * @yield {Object} Action object or control.
 */


function editPost(edits, options) {
  var _yield$select, id, type;

  return _regenerator.default.wrap(function editPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 2:
          _yield$select = _context3.sent;
          id = _yield$select.id;
          type = _yield$select.type;
          _context3.next = 7;
          return (0, _dataControls.dispatch)('core', 'editEntityRecord', 'postType', type, id, edits, options);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Returns action object produced by the updatePost creator augmented by
 * an optimist option that signals optimistically applying updates.
 *
 * @param {Object} edits  Updated post fields.
 *
 * @return {Object} Action object.
 */


function __experimentalOptimisticUpdatePost(edits) {
  return _objectSpread({}, updatePost(edits), {
    optimist: {
      id: _constants.POST_UPDATE_TRANSACTION_ID
    }
  });
}
/**
 * Action generator for saving the current post in the editor.
 *
 * @param {Object} options
 */


function savePost() {
  var options,
      edits,
      previousRecord,
      error,
      args,
      updatedRecord,
      _args4,
      _args5 = arguments;

  return _regenerator.default.wrap(function savePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          _context4.next = 3;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'isEditedPostSaveable');

        case 3:
          if (_context4.sent) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return");

        case 5:
          _context4.next = 7;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getEditedPostContent');

        case 7:
          _context4.t0 = _context4.sent;
          edits = {
            content: _context4.t0
          };

          if (options.isAutosave) {
            _context4.next = 12;
            break;
          }

          _context4.next = 12;
          return (0, _dataControls.dispatch)(_constants.STORE_KEY, 'editPost', edits, {
            undoIgnore: true
          });

        case 12:
          _context4.next = 14;
          return __experimentalRequestPostUpdateStart(options);

        case 14:
          _context4.next = 16;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 16:
          previousRecord = _context4.sent;
          _context4.t1 = _objectSpread;
          _context4.t2 = {
            id: previousRecord.id
          };
          _context4.next = 21;
          return (0, _dataControls.select)('core', 'getEntityRecordNonTransientEdits', 'postType', previousRecord.type, previousRecord.id);

        case 21:
          _context4.t3 = _context4.sent;
          _context4.t4 = {};
          _context4.t5 = edits;
          edits = (0, _context4.t1)(_context4.t2, _context4.t3, _context4.t4, _context4.t5);
          _context4.next = 27;
          return (0, _dataControls.dispatch)('core', 'saveEntityRecord', 'postType', previousRecord.type, edits, options);

        case 27:
          _context4.next = 29;
          return __experimentalRequestPostUpdateFinish(options);

        case 29:
          _context4.next = 31;
          return (0, _dataControls.select)('core', 'getLastEntitySaveError', 'postType', previousRecord.type, previousRecord.id);

        case 31:
          error = _context4.sent;

          if (!error) {
            _context4.next = 39;
            break;
          }

          args = (0, _noticeBuilder.getNotificationArgumentsForSaveFail)({
            post: previousRecord,
            edits: edits,
            error: error
          });

          if (!args.length) {
            _context4.next = 37;
            break;
          }

          _context4.next = 37;
          return _dataControls.dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat((0, _toConsumableArray2.default)(args)));

        case 37:
          _context4.next = 57;
          break;

        case 39:
          _context4.next = 41;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 41:
          updatedRecord = _context4.sent;
          _context4.t6 = _noticeBuilder.getNotificationArgumentsForSaveSuccess;
          _context4.t7 = previousRecord;
          _context4.t8 = updatedRecord;
          _context4.next = 47;
          return (0, _dataControls.select)('core', 'getPostType', updatedRecord.type);

        case 47:
          _context4.t9 = _context4.sent;
          _context4.t10 = options;
          _context4.t11 = {
            previousPost: _context4.t7,
            post: _context4.t8,
            postType: _context4.t9,
            options: _context4.t10
          };
          _args4 = (0, _context4.t6)(_context4.t11);

          if (!_args4.length) {
            _context4.next = 54;
            break;
          }

          _context4.next = 54;
          return _dataControls.dispatch.apply(void 0, ['core/notices', 'createSuccessNotice'].concat((0, _toConsumableArray2.default)(_args4)));

        case 54:
          if (options.isAutosave) {
            _context4.next = 57;
            break;
          }

          _context4.next = 57;
          return (0, _dataControls.dispatch)('core/block-editor', '__unstableMarkLastChangeAsPersistent');

        case 57:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/**
 * Action generator for handling refreshing the current post.
 */


function refreshPost() {
  var post, postTypeSlug, postType, newPost;
  return _regenerator.default.wrap(function refreshPost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 2:
          post = _context5.sent;
          _context5.next = 5;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPostType');

        case 5:
          postTypeSlug = _context5.sent;
          _context5.next = 8;
          return (0, _dataControls.select)('core', 'getPostType', postTypeSlug);

        case 8:
          postType = _context5.sent;
          _context5.next = 11;
          return (0, _dataControls.apiFetch)({
            // Timestamp arg allows caller to bypass browser caching, which is
            // expected for this specific function.
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id) + "?context=edit&_timestamp=".concat(Date.now())
          });

        case 11:
          newPost = _context5.sent;
          _context5.next = 14;
          return (0, _dataControls.dispatch)(_constants.STORE_KEY, 'resetPost', newPost);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * Action generator for trashing the current post in the editor.
 */


function trashPost() {
  var postTypeSlug, postType, post;
  return _regenerator.default.wrap(function trashPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPostType');

        case 2:
          postTypeSlug = _context6.sent;
          _context6.next = 5;
          return (0, _dataControls.select)('core', 'getPostType', postTypeSlug);

        case 5:
          postType = _context6.sent;
          _context6.next = 8;
          return (0, _dataControls.dispatch)('core/notices', 'removeNotice', _constants.TRASH_POST_NOTICE_ID);

        case 8:
          _context6.prev = 8;
          _context6.next = 11;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 11:
          post = _context6.sent;
          _context6.next = 14;
          return (0, _dataControls.apiFetch)({
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id),
            method: 'DELETE'
          });

        case 14:
          _context6.next = 16;
          return (0, _dataControls.dispatch)(_constants.STORE_KEY, 'savePost');

        case 16:
          _context6.next = 22;
          break;

        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](8);
          _context6.next = 22;
          return _dataControls.dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat((0, _toConsumableArray2.default)((0, _noticeBuilder.getNotificationArgumentsForTrashFail)({
            error: _context6.t0
          }))));

        case 22:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[8, 18]]);
}
/**
 * Action generator used in signalling that the post should autosave.
 *
 * @param {Object?} options Extra flags to identify the autosave.
 */


function autosave(options) {
  return _regenerator.default.wrap(function autosave$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _dataControls.dispatch)(_constants.STORE_KEY, 'savePost', _objectSpread({
            isAutosave: true
          }, options));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

function __experimentalLocalAutosave() {
  var post, title, content, excerpt;
  return _regenerator.default.wrap(function __experimentalLocalAutosave$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 2:
          post = _context8.sent;
          _context8.next = 5;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getEditedPostAttribute', 'title');

        case 5:
          title = _context8.sent;
          _context8.next = 8;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getEditedPostAttribute', 'content');

        case 8:
          content = _context8.sent;
          _context8.next = 11;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getEditedPostAttribute', 'excerpt');

        case 11:
          excerpt = _context8.sent;
          _context8.next = 14;
          return {
            type: 'LOCAL_AUTOSAVE_SET',
            postId: post.id,
            title: title,
            content: content,
            excerpt: excerpt
          };

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/**
 * Returns an action object used in signalling that undo history should
 * restore last popped state.
 *
 * @yield {Object} Action object.
 */


function redo() {
  return _regenerator.default.wrap(function redo$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _dataControls.dispatch)('core', 'redo');

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
/**
 * Returns an action object used in signalling that undo history should pop.
 *
 * @yield {Object} Action object.
 */


function undo() {
  return _regenerator.default.wrap(function undo$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _dataControls.dispatch)('core', 'undo');

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}
/**
 * Returns an action object used in signalling that undo history record should
 * be created.
 *
 * @return {Object} Action object.
 */


function createUndoLevel() {
  return {
    type: 'CREATE_UNDO_LEVEL'
  };
}
/**
 * Returns an action object used to lock the editor.
 *
 * @param {Object}  lock Details about the post lock status, user, and nonce.
 *
 * @return {Object} Action object.
 */


function updatePostLock(lock) {
  return {
    type: 'UPDATE_POST_LOCK',
    lock: lock
  };
}
/**
 * Returns an action object used to fetch a single reusable block or all
 * reusable blocks from the REST API into the store.
 *
 * @param {?string} id If given, only a single reusable block with this ID will
 *                     be fetched.
 *
 * @return {Object} Action object.
 */


function __experimentalFetchReusableBlocks(id) {
  return {
    type: 'FETCH_REUSABLE_BLOCKS',
    id: id
  };
}
/**
 * Returns an action object used in signalling that reusable blocks have been
 * received. `results` is an array of objects containing:
 *  - `reusableBlock` - Details about how the reusable block is persisted.
 *  - `parsedBlock` - The original block.
 *
 * @param {Object[]} results Reusable blocks received.
 *
 * @return {Object} Action object.
 */


function __experimentalReceiveReusableBlocks(results) {
  return {
    type: 'RECEIVE_REUSABLE_BLOCKS',
    results: results
  };
}
/**
 * Returns an action object used to save a reusable block that's in the store to
 * the REST API.
 *
 * @param {Object} id The ID of the reusable block to save.
 *
 * @return {Object} Action object.
 */


function __experimentalSaveReusableBlock(id) {
  return {
    type: 'SAVE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used to delete a reusable block via the REST API.
 *
 * @param {number} id The ID of the reusable block to delete.
 *
 * @return {Object} Action object.
 */


function __experimentalDeleteReusableBlock(id) {
  return {
    type: 'DELETE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used in signalling that a reusable block is
 * to be updated.
 *
 * @param {number} id      The ID of the reusable block to update.
 * @param {Object} changes The changes to apply.
 *
 * @return {Object} Action object.
 */


function __experimentalUpdateReusableBlock(id, changes) {
  return {
    type: 'UPDATE_REUSABLE_BLOCK',
    id: id,
    changes: changes
  };
}
/**
 * Returns an action object used to convert a reusable block into a static
 * block.
 *
 * @param {string} clientId The client ID of the block to attach.
 *
 * @return {Object} Action object.
 */


function __experimentalConvertBlockToStatic(clientId) {
  return {
    type: 'CONVERT_BLOCK_TO_STATIC',
    clientId: clientId
  };
}
/**
 * Returns an action object used to convert a static block into a reusable
 * block.
 *
 * @param {string} clientIds The client IDs of the block to detach.
 *
 * @return {Object} Action object.
 */


function __experimentalConvertBlockToReusable(clientIds) {
  return {
    type: 'CONVERT_BLOCK_TO_REUSABLE',
    clientIds: (0, _lodash.castArray)(clientIds)
  };
}
/**
 * Returns an action object used in signalling that the user has enabled the
 * publish sidebar.
 *
 * @return {Object} Action object
 */


function enablePublishSidebar() {
  return {
    type: 'ENABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used in signalling that the user has disabled the
 * publish sidebar.
 *
 * @return {Object} Action object
 */


function disablePublishSidebar() {
  return {
    type: 'DISABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used to signal that post saving is locked.
 *
 * @param  {string} lockName The lock name.
 *
 * @example
 * ```
 * const { subscribe } = wp.data;
 *
 * const initialPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );
 *
 * // Only allow publishing posts that are set to a future date.
 * if ( 'publish' !== initialPostStatus ) {
 *
 * 	// Track locking.
 * 	let locked = false;
 *
 * 	// Watch for the publish event.
 * 	let unssubscribe = subscribe( () => {
 * 		const currentPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );
 * 		if ( 'publish' !== currentPostStatus ) {
 *
 * 			// Compare the post date to the current date, lock the post if the date isn't in the future.
 * 			const postDate = new Date( wp.data.select( 'core/editor' ).getEditedPostAttribute( 'date' ) );
 * 			const currentDate = new Date();
 * 			if ( postDate.getTime() <= currentDate.getTime() ) {
 * 				if ( ! locked ) {
 * 					locked = true;
 * 					wp.data.dispatch( 'core/editor' ).lockPostSaving( 'futurelock' );
 * 				}
 * 			} else {
 * 				if ( locked ) {
 * 					locked = false;
 * 					wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'futurelock' );
 * 				}
 * 			}
 * 		}
 * 	} );
 * }
 * ```
 *
 * @return {Object} Action object
 */


function lockPostSaving(lockName) {
  return {
    type: 'LOCK_POST_SAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that post saving is unlocked.
 *
 * @param  {string} lockName The lock name.
 *
 * @example
 * ```
 * // Unlock post saving with the lock key `mylock`:
 * wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'mylock' );
 * ```
 *
 * @return {Object} Action object
 */


function unlockPostSaving(lockName) {
  return {
    type: 'UNLOCK_POST_SAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that post autosaving is locked.
 *
 * @param  {string} lockName The lock name.
 *
 * @example
 * ```
 * // Lock post autosaving with the lock key `mylock`:
 * wp.data.dispatch( 'core/editor' ).lockPostAutosaving( 'mylock' );
 * ```
 *
 * @return {Object} Action object
 */


function lockPostAutosaving(lockName) {
  return {
    type: 'LOCK_POST_AUTOSAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that post autosaving is unlocked.
 *
 * @param  {string} lockName The lock name.
 *
 * @example
 * ```
 * // Unlock post saving with the lock key `mylock`:
 * wp.data.dispatch( 'core/editor' ).unlockPostAutosaving( 'mylock' );
 * ```
 *
 * @return {Object} Action object
 */


function unlockPostAutosaving(lockName) {
  return {
    type: 'UNLOCK_POST_AUTOSAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that the blocks have been updated.
 *
 * @param {Array}   blocks  Block Array.
 * @param {?Object} options Optional options.
 *
 * @yield {Object} Action object
 */


function resetEditorBlocks(blocks) {
  var options,
      __unstableShouldCreateUndoLevel,
      selectionStart,
      selectionEnd,
      edits,
      _yield$select2,
      id,
      type,
      noChange,
      _args12 = arguments;

  return _regenerator.default.wrap(function resetEditorBlocks$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
          __unstableShouldCreateUndoLevel = options.__unstableShouldCreateUndoLevel, selectionStart = options.selectionStart, selectionEnd = options.selectionEnd;
          edits = {
            blocks: blocks,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
          };

          if (!(__unstableShouldCreateUndoLevel !== false)) {
            _context11.next = 19;
            break;
          }

          _context11.next = 6;
          return (0, _dataControls.select)(_constants.STORE_KEY, 'getCurrentPost');

        case 6:
          _yield$select2 = _context11.sent;
          id = _yield$select2.id;
          type = _yield$select2.type;
          _context11.next = 11;
          return (0, _dataControls.__unstableSyncSelect)('core', 'getEditedEntityRecord', 'postType', type, id);

        case 11:
          _context11.t0 = _context11.sent.blocks;
          _context11.t1 = edits.blocks;
          noChange = _context11.t0 === _context11.t1;

          if (!noChange) {
            _context11.next = 18;
            break;
          }

          _context11.next = 17;
          return (0, _dataControls.dispatch)('core', '__unstableCreateUndoLevel', 'postType', type, id);

        case 17:
          return _context11.abrupt("return", _context11.sent);

        case 18:
          // We create a new function here on every persistent edit
          // to make sure the edit makes the post dirty and creates
          // a new undo level.
          edits.content = function (_ref) {
            var _ref$blocks = _ref.blocks,
                blocksForSerialization = _ref$blocks === void 0 ? [] : _ref$blocks;
            return (0, _serializeBlocks.default)(blocksForSerialization);
          };

        case 19:
          return _context11.delegateYield(editPost(edits), "t2", 20);

        case 20:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
/*
 * Returns an action object used in signalling that the post editor settings have been updated.
 *
 * @param {Object} settings Updated settings
 *
 * @return {Object} Action object
 */


function updateEditorSettings(settings) {
  return {
    type: 'UPDATE_EDITOR_SETTINGS',
    settings: settings
  };
}
/**
 * Backward compatibility
 */


var getBlockEditorAction = function getBlockEditorAction(name) {
  return /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var _len,
        args,
        _key,
        _args13 = arguments;

    return _regenerator.default.wrap(function _callee$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            (0, _deprecated.default)("`wp.data.dispatch( 'core/editor' )." + name + '`', {
              alternative: "`wp.data.dispatch( 'core/block-editor' )." + name + '`'
            });

            for (_len = _args13.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args13[_key];
            }

            _context12.next = 4;
            return _dataControls.dispatch.apply(void 0, ['core/block-editor', name].concat(args));

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee);
  });
};
/**
 * @see resetBlocks in core/block-editor store.
 */


var resetBlocks = getBlockEditorAction('resetBlocks');
/**
 * @see receiveBlocks in core/block-editor store.
 */

exports.resetBlocks = resetBlocks;
var receiveBlocks = getBlockEditorAction('receiveBlocks');
/**
 * @see updateBlock in core/block-editor store.
 */

exports.receiveBlocks = receiveBlocks;
var updateBlock = getBlockEditorAction('updateBlock');
/**
 * @see updateBlockAttributes in core/block-editor store.
 */

exports.updateBlock = updateBlock;
var updateBlockAttributes = getBlockEditorAction('updateBlockAttributes');
/**
 * @see selectBlock in core/block-editor store.
 */

exports.updateBlockAttributes = updateBlockAttributes;
var selectBlock = getBlockEditorAction('selectBlock');
/**
 * @see startMultiSelect in core/block-editor store.
 */

exports.selectBlock = selectBlock;
var startMultiSelect = getBlockEditorAction('startMultiSelect');
/**
 * @see stopMultiSelect in core/block-editor store.
 */

exports.startMultiSelect = startMultiSelect;
var stopMultiSelect = getBlockEditorAction('stopMultiSelect');
/**
 * @see multiSelect in core/block-editor store.
 */

exports.stopMultiSelect = stopMultiSelect;
var multiSelect = getBlockEditorAction('multiSelect');
/**
 * @see clearSelectedBlock in core/block-editor store.
 */

exports.multiSelect = multiSelect;
var clearSelectedBlock = getBlockEditorAction('clearSelectedBlock');
/**
 * @see toggleSelection in core/block-editor store.
 */

exports.clearSelectedBlock = clearSelectedBlock;
var toggleSelection = getBlockEditorAction('toggleSelection');
/**
 * @see replaceBlocks in core/block-editor store.
 */

exports.toggleSelection = toggleSelection;
var replaceBlocks = getBlockEditorAction('replaceBlocks');
/**
 * @see replaceBlock in core/block-editor store.
 */

exports.replaceBlocks = replaceBlocks;
var replaceBlock = getBlockEditorAction('replaceBlock');
/**
 * @see moveBlocksDown in core/block-editor store.
 */

exports.replaceBlock = replaceBlock;
var moveBlocksDown = getBlockEditorAction('moveBlocksDown');
/**
 * @see moveBlocksUp in core/block-editor store.
 */

exports.moveBlocksDown = moveBlocksDown;
var moveBlocksUp = getBlockEditorAction('moveBlocksUp');
/**
 * @see moveBlockToPosition in core/block-editor store.
 */

exports.moveBlocksUp = moveBlocksUp;
var moveBlockToPosition = getBlockEditorAction('moveBlockToPosition');
/**
 * @see insertBlock in core/block-editor store.
 */

exports.moveBlockToPosition = moveBlockToPosition;
var insertBlock = getBlockEditorAction('insertBlock');
/**
 * @see insertBlocks in core/block-editor store.
 */

exports.insertBlock = insertBlock;
var insertBlocks = getBlockEditorAction('insertBlocks');
/**
 * @see showInsertionPoint in core/block-editor store.
 */

exports.insertBlocks = insertBlocks;
var showInsertionPoint = getBlockEditorAction('showInsertionPoint');
/**
 * @see hideInsertionPoint in core/block-editor store.
 */

exports.showInsertionPoint = showInsertionPoint;
var hideInsertionPoint = getBlockEditorAction('hideInsertionPoint');
/**
 * @see setTemplateValidity in core/block-editor store.
 */

exports.hideInsertionPoint = hideInsertionPoint;
var setTemplateValidity = getBlockEditorAction('setTemplateValidity');
/**
 * @see synchronizeTemplate in core/block-editor store.
 */

exports.setTemplateValidity = setTemplateValidity;
var synchronizeTemplate = getBlockEditorAction('synchronizeTemplate');
/**
 * @see mergeBlocks in core/block-editor store.
 */

exports.synchronizeTemplate = synchronizeTemplate;
var mergeBlocks = getBlockEditorAction('mergeBlocks');
/**
 * @see removeBlocks in core/block-editor store.
 */

exports.mergeBlocks = mergeBlocks;
var removeBlocks = getBlockEditorAction('removeBlocks');
/**
 * @see removeBlock in core/block-editor store.
 */

exports.removeBlocks = removeBlocks;
var removeBlock = getBlockEditorAction('removeBlock');
/**
 * @see toggleBlockMode in core/block-editor store.
 */

exports.removeBlock = removeBlock;
var toggleBlockMode = getBlockEditorAction('toggleBlockMode');
/**
 * @see startTyping in core/block-editor store.
 */

exports.toggleBlockMode = toggleBlockMode;
var startTyping = getBlockEditorAction('startTyping');
/**
 * @see stopTyping in core/block-editor store.
 */

exports.startTyping = startTyping;
var stopTyping = getBlockEditorAction('stopTyping');
/**
 * @see enterFormattedText in core/block-editor store.
 */

exports.stopTyping = stopTyping;
var enterFormattedText = getBlockEditorAction('enterFormattedText');
/**
 * @see exitFormattedText in core/block-editor store.
 */

exports.enterFormattedText = enterFormattedText;
var exitFormattedText = getBlockEditorAction('exitFormattedText');
/**
 * @see insertDefaultBlock in core/block-editor store.
 */

exports.exitFormattedText = exitFormattedText;
var insertDefaultBlock = getBlockEditorAction('insertDefaultBlock');
/**
 * @see updateBlockListSettings in core/block-editor store.
 */

exports.insertDefaultBlock = insertDefaultBlock;
var updateBlockListSettings = getBlockEditorAction('updateBlockListSettings');
exports.updateBlockListSettings = updateBlockListSettings;
//# sourceMappingURL=actions.js.map