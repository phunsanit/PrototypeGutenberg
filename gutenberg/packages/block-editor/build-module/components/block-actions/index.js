/**
 * External dependencies
 */
import { castArray, first, last, every } from 'lodash';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { hasBlockSupport, switchToBlockType } from '@wordpress/blocks';

function BlockActions(_ref) {
  var canDuplicate = _ref.canDuplicate,
      canInsertDefaultBlock = _ref.canInsertDefaultBlock,
      children = _ref.children,
      isLocked = _ref.isLocked,
      onDuplicate = _ref.onDuplicate,
      onGroup = _ref.onGroup,
      onInsertAfter = _ref.onInsertAfter,
      onInsertBefore = _ref.onInsertBefore,
      onRemove = _ref.onRemove,
      onUngroup = _ref.onUngroup,
      blocks = _ref.blocks;
  return children({
    canDuplicate: canDuplicate,
    canInsertDefaultBlock: canInsertDefaultBlock,
    isLocked: isLocked,
    onDuplicate: onDuplicate,
    onGroup: onGroup,
    onInsertAfter: onInsertAfter,
    onInsertBefore: onInsertBefore,
    onRemove: onRemove,
    onUngroup: onUngroup,
    blocks: blocks
  });
}

export default compose([withSelect(function (select, props) {
  var _select = select('core/block-editor'),
      canInsertBlockType = _select.canInsertBlockType,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlocksByClientId = _select.getBlocksByClientId,
      getTemplateLock = _select.getTemplateLock;

  var _select2 = select('core/blocks'),
      getDefaultBlockName = _select2.getDefaultBlockName;

  var blocks = getBlocksByClientId(props.clientIds);
  var rootClientId = getBlockRootClientId(props.clientIds[0]);
  var canDuplicate = every(blocks, function (block) {
    return !!block && hasBlockSupport(block.name, 'multiple', true) && canInsertBlockType(block.name, rootClientId);
  });
  var canInsertDefaultBlock = canInsertBlockType(getDefaultBlockName(), rootClientId);
  return {
    blocks: blocks,
    canDuplicate: canDuplicate,
    canInsertDefaultBlock: canInsertDefaultBlock,
    extraProps: props,
    isLocked: !!getTemplateLock(rootClientId),
    rootClientId: rootClientId
  };
}), withDispatch(function (dispatch, props, _ref2) {
  var select = _ref2.select;
  var clientIds = props.clientIds,
      blocks = props.blocks;

  var _dispatch = dispatch('core/block-editor'),
      removeBlocks = _dispatch.removeBlocks,
      replaceBlocks = _dispatch.replaceBlocks,
      duplicateBlocks = _dispatch.duplicateBlocks,
      insertAfterBlock = _dispatch.insertAfterBlock,
      insertBeforeBlock = _dispatch.insertBeforeBlock;

  return {
    onDuplicate: function onDuplicate() {
      return duplicateBlocks(clientIds);
    },
    onRemove: function onRemove() {
      removeBlocks(clientIds);
    },
    onInsertBefore: function onInsertBefore() {
      insertBeforeBlock(first(castArray(clientIds)));
    },
    onInsertAfter: function onInsertAfter() {
      insertAfterBlock(last(castArray(clientIds)));
    },
    onGroup: function onGroup() {
      if (!blocks.length) {
        return;
      }

      var _select3 = select('core/blocks'),
          getGroupingBlockName = _select3.getGroupingBlockName;

      var groupingBlockName = getGroupingBlockName(); // Activate the `transform` on `core/group` which does the conversion

      var newBlocks = switchToBlockType(blocks, groupingBlockName);

      if (!newBlocks) {
        return;
      }

      replaceBlocks(clientIds, newBlocks);
    },
    onUngroup: function onUngroup() {
      if (!blocks.length) {
        return;
      }

      var innerBlocks = blocks[0].innerBlocks;

      if (!innerBlocks.length) {
        return;
      }

      replaceBlocks(clientIds, innerBlocks);
    }
  };
})])(BlockActions);
//# sourceMappingURL=index.js.map