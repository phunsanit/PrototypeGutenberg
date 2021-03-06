import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(ensureDefaultBlock),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(selectPreviousBlock),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(selectNextBlock),
    _marked4 = /*#__PURE__*/_regeneratorRuntime.mark(replaceBlocks),
    _marked5 = /*#__PURE__*/_regeneratorRuntime.mark(moveBlockToPosition),
    _marked6 = /*#__PURE__*/_regeneratorRuntime.mark(insertBlocks),
    _marked7 = /*#__PURE__*/_regeneratorRuntime.mark(removeBlocks),
    _marked8 = /*#__PURE__*/_regeneratorRuntime.mark(setNavigationMode),
    _marked9 = /*#__PURE__*/_regeneratorRuntime.mark(duplicateBlocks),
    _marked10 = /*#__PURE__*/_regeneratorRuntime.mark(insertBeforeBlock),
    _marked11 = /*#__PURE__*/_regeneratorRuntime.mark(insertAfterBlock),
    _marked12 = /*#__PURE__*/_regeneratorRuntime.mark(flashBlock);

/**
 * External dependencies
 */
import { castArray, first, get, includes, last, some } from 'lodash';
/**
 * WordPress dependencies
 */

import { getDefaultBlockName, createBlock, hasBlockSupport, cloneBlock } from '@wordpress/blocks';
import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { select } from './controls';
/**
 * Generator which will yield a default block insert action if there
 * are no other blocks at the root of the editor. This generator should be used
 * in actions which may result in no blocks remaining in the editor (removal,
 * replacement, etc).
 */

function ensureDefaultBlock() {
  var count;
  return _regeneratorRuntime.wrap(function ensureDefaultBlock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select('core/block-editor', 'getBlockCount');

        case 2:
          count = _context.sent;

          if (!(count === 0)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return insertDefaultBlock();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Returns an action object used in signalling that blocks state should be
 * reset to the specified array of blocks, taking precedence over any other
 * content reflected as an edit in state.
 *
 * @param {Array} blocks Array of blocks.
 *
 * @return {Object} Action object.
 */


export function resetBlocks(blocks) {
  return {
    type: 'RESET_BLOCKS',
    blocks: blocks
  };
}
/**
 * A block selection object.
 *
 * @typedef {Object} WPBlockSelection
 *
 * @property {string} clientId     A block client ID.
 * @property {string} attributeKey A block attribute key.
 * @property {number} offset       An attribute value offset, based on the rich
 *                                 text value. See `wp.richText.create`.
 */

/**
 * Returns an action object used in signalling that selection state should be
 * reset to the specified selection.
 *
 * @param {WPBlockSelection} selectionStart The selection start.
 * @param {WPBlockSelection} selectionEnd   The selection end.
 *
 * @return {Object} Action object.
 */

export function resetSelection(selectionStart, selectionEnd) {
  return {
    type: 'RESET_SELECTION',
    selectionStart: selectionStart,
    selectionEnd: selectionEnd
  };
}
/**
 * Returns an action object used in signalling that blocks have been received.
 * Unlike resetBlocks, these should be appended to the existing known set, not
 * replacing.
 *
 * @param {Object[]} blocks Array of block objects.
 *
 * @return {Object} Action object.
 */

export function receiveBlocks(blocks) {
  return {
    type: 'RECEIVE_BLOCKS',
    blocks: blocks
  };
}
/**
 * Returns an action object used in signalling that the block attributes with
 * the specified client ID has been updated.
 *
 * @param {string} clientId   Block client ID.
 * @param {Object} attributes Block attributes to be merged.
 *
 * @return {Object} Action object.
 */

export function updateBlockAttributes(clientId, attributes) {
  return {
    type: 'UPDATE_BLOCK_ATTRIBUTES',
    clientId: clientId,
    attributes: attributes
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been updated.
 *
 * @param {string} clientId Block client ID.
 * @param {Object} updates  Block attributes to be merged.
 *
 * @return {Object} Action object.
 */

export function updateBlock(clientId, updates) {
  return {
    type: 'UPDATE_BLOCK',
    clientId: clientId,
    updates: updates
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been selected, optionally accepting a position
 * value reflecting its selection directionality. An initialPosition of -1
 * reflects a reverse selection.
 *
 * @param {string}  clientId        Block client ID.
 * @param {?number} initialPosition Optional initial position. Pass as -1 to
 *                                  reflect reverse selection.
 *
 * @return {Object} Action object.
 */

export function selectBlock(clientId) {
  var initialPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: 'SELECT_BLOCK',
    initialPosition: initialPosition,
    clientId: clientId
  };
}
/**
 * Yields action objects used in signalling that the block preceding the given
 * clientId should be selected.
 *
 * @param {string} clientId Block client ID.
 */

export function selectPreviousBlock(clientId) {
  var previousBlockClientId;
  return _regeneratorRuntime.wrap(function selectPreviousBlock$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return select('core/block-editor', 'getPreviousBlockClientId', clientId);

        case 2:
          previousBlockClientId = _context2.sent;

          if (!previousBlockClientId) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return selectBlock(previousBlockClientId, -1);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Yields action objects used in signalling that the block following the given
 * clientId should be selected.
 *
 * @param {string} clientId Block client ID.
 */

export function selectNextBlock(clientId) {
  var nextBlockClientId;
  return _regeneratorRuntime.wrap(function selectNextBlock$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select('core/block-editor', 'getNextBlockClientId', clientId);

        case 2:
          nextBlockClientId = _context3.sent;

          if (!nextBlockClientId) {
            _context3.next = 6;
            break;
          }

          _context3.next = 6;
          return selectBlock(nextBlockClientId);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Returns an action object used in signalling that a block multi-selection has started.
 *
 * @return {Object} Action object.
 */

export function startMultiSelect() {
  return {
    type: 'START_MULTI_SELECT'
  };
}
/**
 * Returns an action object used in signalling that block multi-selection stopped.
 *
 * @return {Object} Action object.
 */

export function stopMultiSelect() {
  return {
    type: 'STOP_MULTI_SELECT'
  };
}
/**
 * Returns an action object used in signalling that block multi-selection changed.
 *
 * @param {string} start First block of the multi selection.
 * @param {string} end   Last block of the multiselection.
 *
 * @return {Object} Action object.
 */

export function multiSelect(start, end) {
  return {
    type: 'MULTI_SELECT',
    start: start,
    end: end
  };
}
/**
 * Returns an action object used in signalling that the block selection is cleared.
 *
 * @return {Object} Action object.
 */

export function clearSelectedBlock() {
  return {
    type: 'CLEAR_SELECTED_BLOCK'
  };
}
/**
 * Returns an action object that enables or disables block selection.
 *
 * @param {boolean} [isSelectionEnabled=true] Whether block selection should
 *                                            be enabled.
 *
 * @return {Object} Action object.
 */

export function toggleSelection() {
  var isSelectionEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_SELECTION',
    isSelectionEnabled: isSelectionEnabled
  };
}

function getBlocksWithDefaultStylesApplied(blocks, blockEditorSettings) {
  var preferredStyleVariations = get(blockEditorSettings, ['__experimentalPreferredStyleVariations', 'value'], {});
  return blocks.map(function (block) {
    var blockName = block.name;

    if (!hasBlockSupport(blockName, 'defaultStylePicker', true)) {
      return block;
    }

    if (!preferredStyleVariations[blockName]) {
      return block;
    }

    var className = get(block, ['attributes', 'className']);

    if (includes(className, 'is-style-')) {
      return block;
    }

    var _block$attributes = block.attributes,
        attributes = _block$attributes === void 0 ? {} : _block$attributes;
    var blockStyle = preferredStyleVariations[blockName];
    return _objectSpread({}, block, {
      attributes: _objectSpread({}, attributes, {
        className: "".concat(className || '', " is-style-").concat(blockStyle).trim()
      })
    });
  });
}
/**
 * Returns an action object signalling that a blocks should be replaced with
 * one or more replacement blocks.
 *
 * @param {(string|string[])} clientIds     Block client ID(s) to replace.
 * @param {(Object|Object[])} blocks        Replacement block(s).
 * @param {number}            indexToSelect Index of replacement block to select.
 * @param {number}            initialPosition Index of caret after in the selected block after the operation.
 *
 * @yield {Object} Action object.
 */


export function replaceBlocks(clientIds, blocks, indexToSelect, initialPosition) {
  var rootClientId, index, block, canInsertBlock;
  return _regeneratorRuntime.wrap(function replaceBlocks$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          clientIds = castArray(clientIds);
          _context4.t0 = getBlocksWithDefaultStylesApplied;
          _context4.t1 = castArray(blocks);
          _context4.next = 5;
          return select('core/block-editor', 'getSettings');

        case 5:
          _context4.t2 = _context4.sent;
          blocks = (0, _context4.t0)(_context4.t1, _context4.t2);
          _context4.next = 9;
          return select('core/block-editor', 'getBlockRootClientId', first(clientIds));

        case 9:
          rootClientId = _context4.sent;
          index = 0;

        case 11:
          if (!(index < blocks.length)) {
            _context4.next = 21;
            break;
          }

          block = blocks[index];
          _context4.next = 15;
          return select('core/block-editor', 'canInsertBlockType', block.name, rootClientId);

        case 15:
          canInsertBlock = _context4.sent;

          if (canInsertBlock) {
            _context4.next = 18;
            break;
          }

          return _context4.abrupt("return");

        case 18:
          index++;
          _context4.next = 11;
          break;

        case 21:
          _context4.next = 23;
          return {
            type: 'REPLACE_BLOCKS',
            clientIds: clientIds,
            blocks: blocks,
            time: Date.now(),
            indexToSelect: indexToSelect,
            initialPosition: initialPosition
          };

        case 23:
          return _context4.delegateYield(ensureDefaultBlock(), "t3", 24);

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/**
 * Returns an action object signalling that a single block should be replaced
 * with one or more replacement blocks.
 *
 * @param {(string|string[])} clientId Block client ID to replace.
 * @param {(Object|Object[])} block    Replacement block(s).
 *
 * @return {Object} Action object.
 */

export function replaceBlock(clientId, block) {
  return replaceBlocks(clientId, block);
}
/**
 * Higher-order action creator which, given the action type to dispatch creates
 * an action creator for managing block movement.
 *
 * @param {string} type Action type to dispatch.
 *
 * @return {Function} Action creator.
 */

function createOnMove(type) {
  return function (clientIds, rootClientId) {
    return {
      clientIds: castArray(clientIds),
      type: type,
      rootClientId: rootClientId
    };
  };
}

export var moveBlocksDown = createOnMove('MOVE_BLOCKS_DOWN');
export var moveBlocksUp = createOnMove('MOVE_BLOCKS_UP');
/**
 * Returns an action object signalling that an indexed block should be moved
 * to a new index.
 *
 * @param  {?string} clientId         The client ID of the block.
 * @param  {?string} fromRootClientId Root client ID source.
 * @param  {?string} toRootClientId   Root client ID destination.
 * @param  {number}  index            The index to move the block into.
 *
 * @yield {Object} Action object.
 */

export function moveBlockToPosition(clientId) {
  var fromRootClientId,
      toRootClientId,
      index,
      templateLock,
      action,
      blockName,
      canInsertBlock,
      _args5 = arguments;
  return _regeneratorRuntime.wrap(function moveBlockToPosition$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          fromRootClientId = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '';
          toRootClientId = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : '';
          index = _args5.length > 3 ? _args5[3] : undefined;
          _context5.next = 5;
          return select('core/block-editor', 'getTemplateLock', fromRootClientId);

        case 5:
          templateLock = _context5.sent;

          if (!(templateLock === 'all')) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return");

        case 8:
          action = {
            type: 'MOVE_BLOCK_TO_POSITION',
            fromRootClientId: fromRootClientId,
            toRootClientId: toRootClientId,
            clientId: clientId,
            index: index
          }; // If moving inside the same root block the move is always possible.

          if (!(fromRootClientId === toRootClientId)) {
            _context5.next = 13;
            break;
          }

          _context5.next = 12;
          return action;

        case 12:
          return _context5.abrupt("return");

        case 13:
          if (!(templateLock === 'insert')) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return");

        case 15:
          _context5.next = 17;
          return select('core/block-editor', 'getBlockName', clientId);

        case 17:
          blockName = _context5.sent;
          _context5.next = 20;
          return select('core/block-editor', 'canInsertBlockType', blockName, toRootClientId);

        case 20:
          canInsertBlock = _context5.sent;

          if (!canInsertBlock) {
            _context5.next = 24;
            break;
          }

          _context5.next = 24;
          return action;

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * Returns an action object used in signalling that a single block should be
 * inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object}  block            Block object to insert.
 * @param {?number} index            Index at which block should be inserted.
 * @param {?string} rootClientId     Optional root client ID of block list on which to insert.
 * @param {?boolean} updateSelection If true block selection will be updated. If false, block selection will not change. Defaults to true.
 *
 * @return {Object} Action object.
 */

export function insertBlock(block, index, rootClientId) {
  var updateSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return insertBlocks([block], index, rootClientId, updateSelection);
}
/**
 * Returns an action object used in signalling that an array of blocks should
 * be inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object[]} blocks          Block objects to insert.
 * @param {?number}  index           Index at which block should be inserted.
 * @param {?string}  rootClientId    Optional root client ID of block list on which to insert.
 * @param {?boolean} updateSelection If true block selection will be updated.  If false, block selection will not change. Defaults to true.
 *
 *  @return {Object} Action object.
 */

export function insertBlocks(blocks, index, rootClientId) {
  var updateSelection,
      allowedBlocks,
      _iterator,
      _step,
      block,
      isValid,
      _args6 = arguments;

  return _regeneratorRuntime.wrap(function insertBlocks$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          updateSelection = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : true;
          _context6.t0 = getBlocksWithDefaultStylesApplied;
          _context6.t1 = castArray(blocks);
          _context6.next = 5;
          return select('core/block-editor', 'getSettings');

        case 5:
          _context6.t2 = _context6.sent;
          blocks = (0, _context6.t0)(_context6.t1, _context6.t2);
          allowedBlocks = [];
          _iterator = _createForOfIteratorHelper(blocks);
          _context6.prev = 9;

          _iterator.s();

        case 11:
          if ((_step = _iterator.n()).done) {
            _context6.next = 19;
            break;
          }

          block = _step.value;
          _context6.next = 15;
          return select('core/block-editor', 'canInsertBlockType', block.name, rootClientId);

        case 15:
          isValid = _context6.sent;

          if (isValid) {
            allowedBlocks.push(block);
          }

        case 17:
          _context6.next = 11;
          break;

        case 19:
          _context6.next = 24;
          break;

        case 21:
          _context6.prev = 21;
          _context6.t3 = _context6["catch"](9);

          _iterator.e(_context6.t3);

        case 24:
          _context6.prev = 24;

          _iterator.f();

          return _context6.finish(24);

        case 27:
          if (!allowedBlocks.length) {
            _context6.next = 29;
            break;
          }

          return _context6.abrupt("return", {
            type: 'INSERT_BLOCKS',
            blocks: allowedBlocks,
            index: index,
            rootClientId: rootClientId,
            time: Date.now(),
            updateSelection: updateSelection
          });

        case 29:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[9, 21, 24, 27]]);
}
/**
 * Returns an action object used in signalling that the insertion point should
 * be shown.
 *
 * @param {?string} rootClientId Optional root client ID of block list on
 *                               which to insert.
 * @param {?number} index        Index at which block should be inserted.
 *
 * @return {Object} Action object.
 */

export function showInsertionPoint(rootClientId, index) {
  return {
    type: 'SHOW_INSERTION_POINT',
    rootClientId: rootClientId,
    index: index
  };
}
/**
 * Returns an action object hiding the insertion point.
 *
 * @return {Object} Action object.
 */

export function hideInsertionPoint() {
  return {
    type: 'HIDE_INSERTION_POINT'
  };
}
/**
 * Returns an action object resetting the template validity.
 *
 * @param {boolean}  isValid  template validity flag.
 *
 * @return {Object} Action object.
 */

export function setTemplateValidity(isValid) {
  return {
    type: 'SET_TEMPLATE_VALIDITY',
    isValid: isValid
  };
}
/**
 * Returns an action object synchronize the template with the list of blocks
 *
 * @return {Object} Action object.
 */

export function synchronizeTemplate() {
  return {
    type: 'SYNCHRONIZE_TEMPLATE'
  };
}
/**
 * Returns an action object used in signalling that two blocks should be merged
 *
 * @param {string} firstBlockClientId  Client ID of the first block to merge.
 * @param {string} secondBlockClientId Client ID of the second block to merge.
 *
 * @return {Object} Action object.
 */

export function mergeBlocks(firstBlockClientId, secondBlockClientId) {
  return {
    type: 'MERGE_BLOCKS',
    blocks: [firstBlockClientId, secondBlockClientId]
  };
}
/**
 * Yields action objects used in signalling that the blocks corresponding to
 * the set of specified client IDs are to be removed.
 *
 * @param {string|string[]} clientIds      Client IDs of blocks to remove.
 * @param {boolean}         selectPrevious True if the previous block should be
 *                                         selected when a block is removed.
 */

export function removeBlocks(clientIds) {
  var selectPrevious,
      rootClientId,
      isLocked,
      _args7 = arguments;
  return _regeneratorRuntime.wrap(function removeBlocks$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          selectPrevious = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : true;

          if (!(!clientIds || !clientIds.length)) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return");

        case 3:
          clientIds = castArray(clientIds);
          _context7.next = 6;
          return select('core/block-editor', 'getBlockRootClientId', clientIds[0]);

        case 6:
          rootClientId = _context7.sent;
          _context7.next = 9;
          return select('core/block-editor', 'getTemplateLock', rootClientId);

        case 9:
          isLocked = _context7.sent;

          if (!isLocked) {
            _context7.next = 12;
            break;
          }

          return _context7.abrupt("return");

        case 12:
          if (!selectPrevious) {
            _context7.next = 15;
            break;
          }

          _context7.next = 15;
          return selectPreviousBlock(clientIds[0]);

        case 15:
          _context7.next = 17;
          return {
            type: 'REMOVE_BLOCKS',
            clientIds: clientIds
          };

        case 17:
          return _context7.delegateYield(ensureDefaultBlock(), "t0", 18);

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID is to be removed.
 *
 * @param {string}  clientId       Client ID of block to remove.
 * @param {boolean} selectPrevious True if the previous block should be
 *                                 selected when a block is removed.
 *
 * @return {Object} Action object.
 */

export function removeBlock(clientId, selectPrevious) {
  return removeBlocks([clientId], selectPrevious);
}
/**
 * Returns an action object used in signalling that the inner blocks with the
 * specified client ID should be replaced.
 *
 * @param {string}   rootClientId    Client ID of the block whose InnerBlocks will re replaced.
 * @param {Object[]} blocks          Block objects to insert as new InnerBlocks
 * @param {?boolean} updateSelection If true block selection will be updated. If false, block selection will not change. Defaults to true.
 *
 * @return {Object} Action object.
 */

export function replaceInnerBlocks(rootClientId, blocks) {
  var updateSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return {
    type: 'REPLACE_INNER_BLOCKS',
    rootClientId: rootClientId,
    blocks: blocks,
    updateSelection: updateSelection,
    time: Date.now()
  };
}
/**
 * Returns an action object used to toggle the block editing mode between
 * visual and HTML modes.
 *
 * @param {string} clientId Block client ID.
 *
 * @return {Object} Action object.
 */

export function toggleBlockMode(clientId) {
  return {
    type: 'TOGGLE_BLOCK_MODE',
    clientId: clientId
  };
}
/**
 * Returns an action object used in signalling that the user has begun to type.
 *
 * @return {Object} Action object.
 */

export function startTyping() {
  return {
    type: 'START_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the user has stopped typing.
 *
 * @return {Object} Action object.
 */

export function stopTyping() {
  return {
    type: 'STOP_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the user has begun to drag blocks.
 *
 * @return {Object} Action object.
 */

export function startDraggingBlocks() {
  return {
    type: 'START_DRAGGING_BLOCKS'
  };
}
/**
 * Returns an action object used in signalling that the user has stopped dragging blocks.
 *
 * @return {Object} Action object.
 */

export function stopDraggingBlocks() {
  return {
    type: 'STOP_DRAGGING_BLOCKS'
  };
}
/**
 * Returns an action object used in signalling that the caret has entered formatted text.
 *
 * @return {Object} Action object.
 */

export function enterFormattedText() {
  return {
    type: 'ENTER_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used in signalling that the user caret has exited formatted text.
 *
 * @return {Object} Action object.
 */

export function exitFormattedText() {
  return {
    type: 'EXIT_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used in signalling that the user caret has changed
 * position.
 *
 * @param {string} clientId     The selected block client ID.
 * @param {string} attributeKey The selected block attribute key.
 * @param {number} startOffset  The start offset.
 * @param {number} endOffset    The end offset.
 *
 * @return {Object} Action object.
 */

export function selectionChange(clientId, attributeKey, startOffset, endOffset) {
  return {
    type: 'SELECTION_CHANGE',
    clientId: clientId,
    attributeKey: attributeKey,
    startOffset: startOffset,
    endOffset: endOffset
  };
}
/**
 * Returns an action object used in signalling that a new block of the default
 * type should be added to the block list.
 *
 * @param {?Object} attributes   Optional attributes of the block to assign.
 * @param {?string} rootClientId Optional root client ID of block list on which
 *                               to append.
 * @param {?number} index        Optional index where to insert the default block
 *
 * @return {Object} Action object
 */

export function insertDefaultBlock(attributes, rootClientId, index) {
  // Abort if there is no default block type (if it has been unregistered).
  var defaultBlockName = getDefaultBlockName();

  if (!defaultBlockName) {
    return;
  }

  var block = createBlock(defaultBlockName, attributes);
  return insertBlock(block, index, rootClientId);
}
/**
 * Returns an action object that changes the nested settings of a given block.
 *
 * @param {string} clientId Client ID of the block whose nested setting are
 *                          being received.
 * @param {Object} settings Object with the new settings for the nested block.
 *
 * @return {Object} Action object
 */

export function updateBlockListSettings(clientId, settings) {
  return {
    type: 'UPDATE_BLOCK_LIST_SETTINGS',
    clientId: clientId,
    settings: settings
  };
}
/**
 * Returns an action object used in signalling that the block editor settings have been updated.
 *
 * @param {Object} settings Updated settings
 *
 * @return {Object} Action object
 */

export function updateSettings(settings) {
  return {
    type: 'UPDATE_SETTINGS',
    settings: settings
  };
}
/**
 * Returns an action object used in signalling that a temporary reusable blocks have been saved
 * in order to switch its temporary id with the real id.
 *
 * @param {string} id        Reusable block's id.
 * @param {string} updatedId Updated block's id.
 *
 * @return {Object} Action object.
 */

export function __unstableSaveReusableBlock(id, updatedId) {
  return {
    type: 'SAVE_REUSABLE_BLOCK_SUCCESS',
    id: id,
    updatedId: updatedId
  };
}
/**
 * Returns an action object used in signalling that the last block change should be marked explicitely as persistent.
 *
 * @return {Object} Action object.
 */

export function __unstableMarkLastChangeAsPersistent() {
  return {
    type: 'MARK_LAST_CHANGE_AS_PERSISTENT'
  };
}
/**
 * Returns an action object used in signalling that the next block change should be marked explicitly as not persistent.
 *
 * @return {Object} Action object.
 */

export function __unstableMarkNextChangeAsNotPersistent() {
  return {
    type: 'MARK_NEXT_CHANGE_AS_NOT_PERSISTENT'
  };
}
/**
 * Returns an action object used in signalling that the last block change is
 * an automatic change, meaning it was not performed by the user, and can be
 * undone using the `Escape` and `Backspace` keys. This action must be called
 * after the change was made, and any actions that are a consequence of it, so
 * it is recommended to be called at the next idle period to ensure all
 * selection changes have been recorded.
 *
 * @return {Object} Action object.
 */

export function __unstableMarkAutomaticChange() {
  return {
    type: 'MARK_AUTOMATIC_CHANGE'
  };
}
/**
 * Generators that triggers an action used to enable or disable the navigation mode.
 *
 * @param {string} isNavigationMode Enable/Disable navigation mode.
 */

export function setNavigationMode() {
  var isNavigationMode,
      _args8 = arguments;
  return _regeneratorRuntime.wrap(function setNavigationMode$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          isNavigationMode = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : true;
          _context8.next = 3;
          return {
            type: 'SET_NAVIGATION_MODE',
            isNavigationMode: isNavigationMode
          };

        case 3:
          if (isNavigationMode) {
            speak(__('You are currently in navigation mode. Navigate blocks using the Tab key and Arrow keys. Use Left and Right Arrow keys to move between nesting levels. To exit navigation mode and edit the selected block, press Enter.'));
          } else {
            speak(__('You are currently in edit mode. To return to the navigation mode, press Escape.'));
          }

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/**
 * Generator that triggers an action used to duplicate a list of blocks.
 *
 * @param {string[]} clientIds
 */

export function duplicateBlocks(clientIds) {
  var blocks, rootClientId, blockNames, lastSelectedIndex, clonedBlocks;
  return _regeneratorRuntime.wrap(function duplicateBlocks$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (!(!clientIds && !clientIds.length)) {
            _context9.next = 2;
            break;
          }

          return _context9.abrupt("return");

        case 2:
          _context9.next = 4;
          return select('core/block-editor', 'getBlocksByClientId', clientIds);

        case 4:
          blocks = _context9.sent;
          _context9.next = 7;
          return select('core/block-editor', 'getBlockRootClientId', clientIds[0]);

        case 7:
          rootClientId = _context9.sent;

          if (!some(blocks, function (block) {
            return !block;
          })) {
            _context9.next = 10;
            break;
          }

          return _context9.abrupt("return");

        case 10:
          blockNames = blocks.map(function (block) {
            return block.name;
          }); // Return early if blocks don't support multipe  usage.

          if (!some(blockNames, function (blockName) {
            return !hasBlockSupport(blockName, 'multiple', true);
          })) {
            _context9.next = 13;
            break;
          }

          return _context9.abrupt("return");

        case 13:
          _context9.next = 15;
          return select('core/block-editor', 'getBlockIndex', last(castArray(clientIds)), rootClientId);

        case 15:
          lastSelectedIndex = _context9.sent;
          clonedBlocks = blocks.map(function (block) {
            return cloneBlock(block);
          });
          _context9.next = 19;
          return insertBlocks(clonedBlocks, lastSelectedIndex + 1, rootClientId);

        case 19:
          if (!(clonedBlocks.length > 1)) {
            _context9.next = 22;
            break;
          }

          _context9.next = 22;
          return multiSelect(first(clonedBlocks).clientId, last(clonedBlocks).clientId);

        case 22:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
/**
 * Generator used to insert an empty block after a given block.
 *
 * @param {string} clientId
 */

export function insertBeforeBlock(clientId) {
  var rootClientId, isLocked, firstSelectedIndex;
  return _regeneratorRuntime.wrap(function insertBeforeBlock$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (clientId) {
            _context10.next = 2;
            break;
          }

          return _context10.abrupt("return");

        case 2:
          _context10.next = 4;
          return select('core/block-editor', 'getBlockRootClientId', clientId);

        case 4:
          rootClientId = _context10.sent;
          _context10.next = 7;
          return select('core/block-editor', 'getTemplateLock', rootClientId);

        case 7:
          isLocked = _context10.sent;

          if (!isLocked) {
            _context10.next = 10;
            break;
          }

          return _context10.abrupt("return");

        case 10:
          _context10.next = 12;
          return select('core/block-editor', 'getBlockIndex', clientId, rootClientId);

        case 12:
          firstSelectedIndex = _context10.sent;
          _context10.next = 15;
          return insertDefaultBlock({}, rootClientId, firstSelectedIndex);

        case 15:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}
/**
 * Generator used to insert an empty block before a given block.
 *
 * @param {string} clientId
 */

export function insertAfterBlock(clientId) {
  var rootClientId, isLocked, firstSelectedIndex;
  return _regeneratorRuntime.wrap(function insertAfterBlock$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (clientId) {
            _context11.next = 2;
            break;
          }

          return _context11.abrupt("return");

        case 2:
          _context11.next = 4;
          return select('core/block-editor', 'getBlockRootClientId', clientId);

        case 4:
          rootClientId = _context11.sent;
          _context11.next = 7;
          return select('core/block-editor', 'getTemplateLock', rootClientId);

        case 7:
          isLocked = _context11.sent;

          if (!isLocked) {
            _context11.next = 10;
            break;
          }

          return _context11.abrupt("return");

        case 10:
          _context11.next = 12;
          return select('core/block-editor', 'getBlockIndex', clientId, rootClientId);

        case 12:
          firstSelectedIndex = _context11.sent;
          _context11.next = 15;
          return insertDefaultBlock({}, rootClientId, firstSelectedIndex + 1);

        case 15:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
/**
 * Returns an action object that toggles the highlighted block state.
 *
 * @param {string} clientId The block's clientId.
 * @param {boolean} isHighlighted The highlight state.
 */

export function toggleBlockHighlight(clientId, isHighlighted) {
  return {
    type: 'TOGGLE_BLOCK_HIGHLIGHT',
    clientId: clientId,
    isHighlighted: isHighlighted
  };
}
/**
 * Yields action objects used in signalling that the block corresponding to the
 * given clientId should appear to "flash" by rhythmically highlighting it.
 *
 * @param {string} clientId Target block client ID.
 */

export function flashBlock(clientId) {
  return _regeneratorRuntime.wrap(function flashBlock$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return toggleBlockHighlight(clientId, true);

        case 2:
          _context12.next = 4;
          return {
            type: 'SLEEP',
            duration: 150
          };

        case 4:
          _context12.next = 6;
          return toggleBlockHighlight(clientId, false);

        case 6:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}
/**
 * Returns an action object that sets whether the block has controlled innerblocks.
 *
 * @param {string} clientId The block's clientId.
 * @param {boolean} hasControlledInnerBlocks True if the block's inner blocks are controlled.
 */

export function setHasControlledInnerBlocks(clientId, hasControlledInnerBlocks) {
  return {
    type: 'SET_HAS_CONTROLLED_INNER_BLOCKS',
    hasControlledInnerBlocks: hasControlledInnerBlocks,
    clientId: clientId
  };
}
//# sourceMappingURL=actions.js.map