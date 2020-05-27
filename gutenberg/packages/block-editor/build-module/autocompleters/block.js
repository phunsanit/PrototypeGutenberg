import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { once } from 'lodash';
/**
 * WordPress dependencies
 */

import { select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockIcon from '../components/block-icon';
/** @typedef {import('@wordpress/block-editor').WPEditorInserterItem} WPEditorInserterItem */

/** @typedef {import('@wordpress/components').WPCompleter} WPCompleter */

/**
 * Returns the client ID of the parent where a newly inserted block would be
 * placed.
 *
 * @return {string} Client ID of the parent where a newly inserted block would
 *                  be placed.
 */

function defaultGetBlockInsertionParentClientId() {
  return select('core/block-editor').getBlockInsertionPoint().rootClientId;
}
/**
 * Returns the inserter items for the specified parent block.
 *
 * @param {string} rootClientId Client ID of the block for which to retrieve
 *                              inserter items.
 *
 * @return {Array<WPEditorInserterItem>} The inserter items for the specified
 *                                      parent.
 */


function defaultGetInserterItems(rootClientId) {
  return select('core/block-editor').getInserterItems(rootClientId);
}
/**
 * Returns the name of the currently selected block.
 *
 * @return {string?} The name of the currently selected block or `null` if no
 *                   block is selected.
 */


function defaultGetSelectedBlockName() {
  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getBlockName = _select.getBlockName;

  var selectedBlockClientId = getSelectedBlockClientId();
  return selectedBlockClientId ? getBlockName(selectedBlockClientId) : null;
}
/**
 * Triggers a fetch of reusable blocks, once.
 *
 * TODO: Reusable blocks fetching should be reimplemented as a core-data entity
 * resolver, not relying on `core/editor` (see #7119). The implementation here
 * is imperfect in that the options result will not await the completion of the
 * fetch request and thus will not include any reusable blocks. This has always
 * been true, but relied upon the fact the user would be delayed in typing an
 * autocompleter search query. Once implemented using resolvers, the status of
 * this request could be subscribed to as part of a promised return value using
 * the result of `hasFinishedResolution`. There is currently reliable way to
 * determine that a reusable blocks fetch request has completed.
 *
 * @return {Promise} Promise resolving once reusable blocks fetched.
 */


var fetchReusableBlocks = once(function () {
  var _select$getSettings = select('core/block-editor').getSettings(),
      __experimentalFetchReusableBlocks = _select$getSettings.__experimentalFetchReusableBlocks;

  if (__experimentalFetchReusableBlocks) {
    __experimentalFetchReusableBlocks();
  }
});
/**
 * Creates a blocks repeater for replacing the current block with a selected block type.
 *
 * @return {WPCompleter} A blocks completer.
 */

export function createBlockCompleter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$getBlockInsertio = _ref.getBlockInsertionParentClientId,
      getBlockInsertionParentClientId = _ref$getBlockInsertio === void 0 ? defaultGetBlockInsertionParentClientId : _ref$getBlockInsertio,
      _ref$getInserterItems = _ref.getInserterItems,
      getInserterItems = _ref$getInserterItems === void 0 ? defaultGetInserterItems : _ref$getInserterItems,
      _ref$getSelectedBlock = _ref.getSelectedBlockName,
      getSelectedBlockName = _ref$getSelectedBlock === void 0 ? defaultGetSelectedBlockName : _ref$getSelectedBlock;

  return {
    name: 'blocks',
    className: 'block-editor-autocompleters__block',
    triggerPrefix: '/',
    options: function options() {
      fetchReusableBlocks();
      var selectedBlockName = getSelectedBlockName();
      return getInserterItems(getBlockInsertionParentClientId()).filter( // Avoid offering to replace the current block with a block of the same type.
      function (inserterItem) {
        return selectedBlockName !== inserterItem.name;
      });
    },
    getOptionKeywords: function getOptionKeywords(inserterItem) {
      var title = inserterItem.title,
          _inserterItem$keyword = inserterItem.keywords,
          keywords = _inserterItem$keyword === void 0 ? [] : _inserterItem$keyword,
          category = inserterItem.category;
      return [category].concat(_toConsumableArray(keywords), [title]);
    },
    getOptionLabel: function getOptionLabel(inserterItem) {
      var icon = inserterItem.icon,
          title = inserterItem.title;
      return [createElement(BlockIcon, {
        key: "icon",
        icon: icon,
        showColors: true
      }), title];
    },
    allowContext: function allowContext(before, after) {
      return !(/\S/.test(before) || /\S/.test(after));
    },
    getOptionCompletion: function getOptionCompletion(inserterItem) {
      var name = inserterItem.name,
          initialAttributes = inserterItem.initialAttributes;
      return {
        action: 'replace',
        value: createBlock(name, initialAttributes)
      };
    },
    isOptionDisabled: function isOptionDisabled(inserterItem) {
      return inserterItem.isDisabled;
    }
  };
}
/**
 * Creates a blocks repeater for replacing the current block with a selected block type.
 *
 * @return {WPCompleter} A blocks completer.
 */

export default createBlockCompleter();
//# sourceMappingURL=block.js.map