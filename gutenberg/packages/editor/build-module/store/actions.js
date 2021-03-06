import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(setupEditor),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(resetAutosave),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(editPost),
    _marked4 = /*#__PURE__*/_regeneratorRuntime.mark(savePost),
    _marked5 = /*#__PURE__*/_regeneratorRuntime.mark(refreshPost),
    _marked6 = /*#__PURE__*/_regeneratorRuntime.mark(trashPost),
    _marked7 = /*#__PURE__*/_regeneratorRuntime.mark(autosave),
    _marked8 = /*#__PURE__*/_regeneratorRuntime.mark(__experimentalLocalAutosave),
    _marked9 = /*#__PURE__*/_regeneratorRuntime.mark(redo),
    _marked10 = /*#__PURE__*/_regeneratorRuntime.mark(undo),
    _marked11 = /*#__PURE__*/_regeneratorRuntime.mark(resetEditorBlocks);

/**
 * External dependencies
 */
import { has, castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import deprecated from '@wordpress/deprecated';
import { dispatch, select, __unstableSyncSelect, apiFetch } from '@wordpress/data-controls';
import { parse, synchronizeBlocksWithTemplate } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { STORE_KEY, POST_UPDATE_TRANSACTION_ID, TRASH_POST_NOTICE_ID } from './constants';
import { getNotificationArgumentsForSaveSuccess, getNotificationArgumentsForSaveFail, getNotificationArgumentsForTrashFail } from './utils/notice-builder';
import serializeBlocks from './utils/serialize-blocks';
/**
 * Returns an action generator used in signalling that editor has initialized with
 * the specified post object and editor settings.
 *
 * @param {Object} post      Post object.
 * @param {Object} edits     Initial edited attributes object.
 * @param {Array?} template  Block Template.
 */

export function setupEditor(post, edits, template) {
  var content, blocks, isNewPost;
  return _regeneratorRuntime.wrap(function setupEditor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // In order to ensure maximum of a single parse during setup, edits are
          // included as part of editor setup action. Assume edited content as
          // canonical if provided, falling back to post.
          if (has(edits, ['content'])) {
            content = edits.content;
          } else {
            content = post.content.raw;
          }

          blocks = parse(content); // Apply a template for new posts only, if exists.

          isNewPost = post.status === 'auto-draft';

          if (isNewPost && template) {
            blocks = synchronizeBlocksWithTemplate(blocks, template);
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
            return edits[key] !== (has(post, [key, 'raw']) ? post[key].raw : post[key]);
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

export function __experimentalTearDownEditor() {
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

export function resetPost(post) {
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

export function resetAutosave(newAutosave) {
  var postId;
  return _regeneratorRuntime.wrap(function resetAutosave$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          deprecated('resetAutosave action (`core/editor` store)', {
            alternative: 'receiveAutosaves action (`core` store)',
            plugin: 'Gutenberg'
          });
          _context2.next = 3;
          return select(STORE_KEY, 'getCurrentPostId');

        case 3:
          postId = _context2.sent;
          _context2.next = 6;
          return dispatch('core', 'receiveAutosaves', postId, newAutosave);

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

export function __experimentalRequestPostUpdateStart() {
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

export function __experimentalRequestPostUpdateFinish() {
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

export function updatePost(edits) {
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

export function setupEditorState(post) {
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

export function editPost(edits, options) {
  var _yield$select, id, type;

  return _regeneratorRuntime.wrap(function editPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select(STORE_KEY, 'getCurrentPost');

        case 2:
          _yield$select = _context3.sent;
          id = _yield$select.id;
          type = _yield$select.type;
          _context3.next = 7;
          return dispatch('core', 'editEntityRecord', 'postType', type, id, edits, options);

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

export function __experimentalOptimisticUpdatePost(edits) {
  return _objectSpread({}, updatePost(edits), {
    optimist: {
      id: POST_UPDATE_TRANSACTION_ID
    }
  });
}
/**
 * Action generator for saving the current post in the editor.
 *
 * @param {Object} options
 */

export function savePost() {
  var options,
      edits,
      previousRecord,
      error,
      args,
      updatedRecord,
      _args4,
      _args5 = arguments;

  return _regeneratorRuntime.wrap(function savePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          options = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
          _context4.next = 3;
          return select(STORE_KEY, 'isEditedPostSaveable');

        case 3:
          if (_context4.sent) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return");

        case 5:
          _context4.next = 7;
          return select(STORE_KEY, 'getEditedPostContent');

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
          return dispatch(STORE_KEY, 'editPost', edits, {
            undoIgnore: true
          });

        case 12:
          _context4.next = 14;
          return __experimentalRequestPostUpdateStart(options);

        case 14:
          _context4.next = 16;
          return select(STORE_KEY, 'getCurrentPost');

        case 16:
          previousRecord = _context4.sent;
          _context4.t1 = _objectSpread;
          _context4.t2 = {
            id: previousRecord.id
          };
          _context4.next = 21;
          return select('core', 'getEntityRecordNonTransientEdits', 'postType', previousRecord.type, previousRecord.id);

        case 21:
          _context4.t3 = _context4.sent;
          _context4.t4 = {};
          _context4.t5 = edits;
          edits = (0, _context4.t1)(_context4.t2, _context4.t3, _context4.t4, _context4.t5);
          _context4.next = 27;
          return dispatch('core', 'saveEntityRecord', 'postType', previousRecord.type, edits, options);

        case 27:
          _context4.next = 29;
          return __experimentalRequestPostUpdateFinish(options);

        case 29:
          _context4.next = 31;
          return select('core', 'getLastEntitySaveError', 'postType', previousRecord.type, previousRecord.id);

        case 31:
          error = _context4.sent;

          if (!error) {
            _context4.next = 39;
            break;
          }

          args = getNotificationArgumentsForSaveFail({
            post: previousRecord,
            edits: edits,
            error: error
          });

          if (!args.length) {
            _context4.next = 37;
            break;
          }

          _context4.next = 37;
          return dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat(_toConsumableArray(args)));

        case 37:
          _context4.next = 57;
          break;

        case 39:
          _context4.next = 41;
          return select(STORE_KEY, 'getCurrentPost');

        case 41:
          updatedRecord = _context4.sent;
          _context4.t6 = getNotificationArgumentsForSaveSuccess;
          _context4.t7 = previousRecord;
          _context4.t8 = updatedRecord;
          _context4.next = 47;
          return select('core', 'getPostType', updatedRecord.type);

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
          return dispatch.apply(void 0, ['core/notices', 'createSuccessNotice'].concat(_toConsumableArray(_args4)));

        case 54:
          if (options.isAutosave) {
            _context4.next = 57;
            break;
          }

          _context4.next = 57;
          return dispatch('core/block-editor', '__unstableMarkLastChangeAsPersistent');

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

export function refreshPost() {
  var post, postTypeSlug, postType, newPost;
  return _regeneratorRuntime.wrap(function refreshPost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return select(STORE_KEY, 'getCurrentPost');

        case 2:
          post = _context5.sent;
          _context5.next = 5;
          return select(STORE_KEY, 'getCurrentPostType');

        case 5:
          postTypeSlug = _context5.sent;
          _context5.next = 8;
          return select('core', 'getPostType', postTypeSlug);

        case 8:
          postType = _context5.sent;
          _context5.next = 11;
          return apiFetch({
            // Timestamp arg allows caller to bypass browser caching, which is
            // expected for this specific function.
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id) + "?context=edit&_timestamp=".concat(Date.now())
          });

        case 11:
          newPost = _context5.sent;
          _context5.next = 14;
          return dispatch(STORE_KEY, 'resetPost', newPost);

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

export function trashPost() {
  var postTypeSlug, postType, post;
  return _regeneratorRuntime.wrap(function trashPost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return select(STORE_KEY, 'getCurrentPostType');

        case 2:
          postTypeSlug = _context6.sent;
          _context6.next = 5;
          return select('core', 'getPostType', postTypeSlug);

        case 5:
          postType = _context6.sent;
          _context6.next = 8;
          return dispatch('core/notices', 'removeNotice', TRASH_POST_NOTICE_ID);

        case 8:
          _context6.prev = 8;
          _context6.next = 11;
          return select(STORE_KEY, 'getCurrentPost');

        case 11:
          post = _context6.sent;
          _context6.next = 14;
          return apiFetch({
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id),
            method: 'DELETE'
          });

        case 14:
          _context6.next = 16;
          return dispatch(STORE_KEY, 'savePost');

        case 16:
          _context6.next = 22;
          break;

        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](8);
          _context6.next = 22;
          return dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat(_toConsumableArray(getNotificationArgumentsForTrashFail({
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

export function autosave(options) {
  return _regeneratorRuntime.wrap(function autosave$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return dispatch(STORE_KEY, 'savePost', _objectSpread({
            isAutosave: true
          }, options));

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
export function __experimentalLocalAutosave() {
  var post, title, content, excerpt;
  return _regeneratorRuntime.wrap(function __experimentalLocalAutosave$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return select(STORE_KEY, 'getCurrentPost');

        case 2:
          post = _context8.sent;
          _context8.next = 5;
          return select(STORE_KEY, 'getEditedPostAttribute', 'title');

        case 5:
          title = _context8.sent;
          _context8.next = 8;
          return select(STORE_KEY, 'getEditedPostAttribute', 'content');

        case 8:
          content = _context8.sent;
          _context8.next = 11;
          return select(STORE_KEY, 'getEditedPostAttribute', 'excerpt');

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

export function redo() {
  return _regeneratorRuntime.wrap(function redo$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return dispatch('core', 'redo');

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

export function undo() {
  return _regeneratorRuntime.wrap(function undo$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return dispatch('core', 'undo');

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

export function createUndoLevel() {
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

export function updatePostLock(lock) {
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

export function __experimentalFetchReusableBlocks(id) {
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

export function __experimentalReceiveReusableBlocks(results) {
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

export function __experimentalSaveReusableBlock(id) {
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

export function __experimentalDeleteReusableBlock(id) {
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

export function __experimentalUpdateReusableBlock(id, changes) {
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

export function __experimentalConvertBlockToStatic(clientId) {
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

export function __experimentalConvertBlockToReusable(clientIds) {
  return {
    type: 'CONVERT_BLOCK_TO_REUSABLE',
    clientIds: castArray(clientIds)
  };
}
/**
 * Returns an action object used in signalling that the user has enabled the
 * publish sidebar.
 *
 * @return {Object} Action object
 */

export function enablePublishSidebar() {
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

export function disablePublishSidebar() {
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

export function lockPostSaving(lockName) {
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

export function unlockPostSaving(lockName) {
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

export function lockPostAutosaving(lockName) {
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

export function unlockPostAutosaving(lockName) {
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

export function resetEditorBlocks(blocks) {
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

  return _regeneratorRuntime.wrap(function resetEditorBlocks$(_context11) {
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
          return select(STORE_KEY, 'getCurrentPost');

        case 6:
          _yield$select2 = _context11.sent;
          id = _yield$select2.id;
          type = _yield$select2.type;
          _context11.next = 11;
          return __unstableSyncSelect('core', 'getEditedEntityRecord', 'postType', type, id);

        case 11:
          _context11.t0 = _context11.sent.blocks;
          _context11.t1 = edits.blocks;
          noChange = _context11.t0 === _context11.t1;

          if (!noChange) {
            _context11.next = 18;
            break;
          }

          _context11.next = 17;
          return dispatch('core', '__unstableCreateUndoLevel', 'postType', type, id);

        case 17:
          return _context11.abrupt("return", _context11.sent);

        case 18:
          // We create a new function here on every persistent edit
          // to make sure the edit makes the post dirty and creates
          // a new undo level.
          edits.content = function (_ref) {
            var _ref$blocks = _ref.blocks,
                blocksForSerialization = _ref$blocks === void 0 ? [] : _ref$blocks;
            return serializeBlocks(blocksForSerialization);
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

export function updateEditorSettings(settings) {
  return {
    type: 'UPDATE_EDITOR_SETTINGS',
    settings: settings
  };
}
/**
 * Backward compatibility
 */

var getBlockEditorAction = function getBlockEditorAction(name) {
  return /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _len,
        args,
        _key,
        _args13 = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            deprecated("`wp.data.dispatch( 'core/editor' )." + name + '`', {
              alternative: "`wp.data.dispatch( 'core/block-editor' )." + name + '`'
            });

            for (_len = _args13.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args13[_key];
            }

            _context12.next = 4;
            return dispatch.apply(void 0, ['core/block-editor', name].concat(args));

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


export var resetBlocks = getBlockEditorAction('resetBlocks');
/**
 * @see receiveBlocks in core/block-editor store.
 */

export var receiveBlocks = getBlockEditorAction('receiveBlocks');
/**
 * @see updateBlock in core/block-editor store.
 */

export var updateBlock = getBlockEditorAction('updateBlock');
/**
 * @see updateBlockAttributes in core/block-editor store.
 */

export var updateBlockAttributes = getBlockEditorAction('updateBlockAttributes');
/**
 * @see selectBlock in core/block-editor store.
 */

export var selectBlock = getBlockEditorAction('selectBlock');
/**
 * @see startMultiSelect in core/block-editor store.
 */

export var startMultiSelect = getBlockEditorAction('startMultiSelect');
/**
 * @see stopMultiSelect in core/block-editor store.
 */

export var stopMultiSelect = getBlockEditorAction('stopMultiSelect');
/**
 * @see multiSelect in core/block-editor store.
 */

export var multiSelect = getBlockEditorAction('multiSelect');
/**
 * @see clearSelectedBlock in core/block-editor store.
 */

export var clearSelectedBlock = getBlockEditorAction('clearSelectedBlock');
/**
 * @see toggleSelection in core/block-editor store.
 */

export var toggleSelection = getBlockEditorAction('toggleSelection');
/**
 * @see replaceBlocks in core/block-editor store.
 */

export var replaceBlocks = getBlockEditorAction('replaceBlocks');
/**
 * @see replaceBlock in core/block-editor store.
 */

export var replaceBlock = getBlockEditorAction('replaceBlock');
/**
 * @see moveBlocksDown in core/block-editor store.
 */

export var moveBlocksDown = getBlockEditorAction('moveBlocksDown');
/**
 * @see moveBlocksUp in core/block-editor store.
 */

export var moveBlocksUp = getBlockEditorAction('moveBlocksUp');
/**
 * @see moveBlockToPosition in core/block-editor store.
 */

export var moveBlockToPosition = getBlockEditorAction('moveBlockToPosition');
/**
 * @see insertBlock in core/block-editor store.
 */

export var insertBlock = getBlockEditorAction('insertBlock');
/**
 * @see insertBlocks in core/block-editor store.
 */

export var insertBlocks = getBlockEditorAction('insertBlocks');
/**
 * @see showInsertionPoint in core/block-editor store.
 */

export var showInsertionPoint = getBlockEditorAction('showInsertionPoint');
/**
 * @see hideInsertionPoint in core/block-editor store.
 */

export var hideInsertionPoint = getBlockEditorAction('hideInsertionPoint');
/**
 * @see setTemplateValidity in core/block-editor store.
 */

export var setTemplateValidity = getBlockEditorAction('setTemplateValidity');
/**
 * @see synchronizeTemplate in core/block-editor store.
 */

export var synchronizeTemplate = getBlockEditorAction('synchronizeTemplate');
/**
 * @see mergeBlocks in core/block-editor store.
 */

export var mergeBlocks = getBlockEditorAction('mergeBlocks');
/**
 * @see removeBlocks in core/block-editor store.
 */

export var removeBlocks = getBlockEditorAction('removeBlocks');
/**
 * @see removeBlock in core/block-editor store.
 */

export var removeBlock = getBlockEditorAction('removeBlock');
/**
 * @see toggleBlockMode in core/block-editor store.
 */

export var toggleBlockMode = getBlockEditorAction('toggleBlockMode');
/**
 * @see startTyping in core/block-editor store.
 */

export var startTyping = getBlockEditorAction('startTyping');
/**
 * @see stopTyping in core/block-editor store.
 */

export var stopTyping = getBlockEditorAction('stopTyping');
/**
 * @see enterFormattedText in core/block-editor store.
 */

export var enterFormattedText = getBlockEditorAction('enterFormattedText');
/**
 * @see exitFormattedText in core/block-editor store.
 */

export var exitFormattedText = getBlockEditorAction('exitFormattedText');
/**
 * @see insertDefaultBlock in core/block-editor store.
 */

export var insertDefaultBlock = getBlockEditorAction('insertDefaultBlock');
/**
 * @see updateBlockListSettings in core/block-editor store.
 */

export var updateBlockListSettings = getBlockEditorAction('updateBlockListSettings');
//# sourceMappingURL=actions.js.map