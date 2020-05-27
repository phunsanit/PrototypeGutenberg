import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';
import { getBlockType, __experimentalGetAccessibleBlockLabel as getAccessibleBlockLabel } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockTitle from '../block-title';
/**
 * Block breadcrumb component, displaying the label of the block. If the block
 * descends from a root block, a button is displayed enabling the user to select
 * the root block.
 *
 * @param {string} props          Component props.
 * @param {string} props.clientId Client ID of block.
 *
 * @return {WPComponent} The component to be rendered.
 */

function BlockBreadcrumb(_ref) {
  var clientId = _ref.clientId,
      rootClientId = _ref.rootClientId,
      moverDirection = _ref.moverDirection,
      props = _objectWithoutProperties(_ref, ["clientId", "rootClientId", "moverDirection"]);

  var selected = useSelect(function (select) {
    var _select = select('core/block-editor'),
        __unstableGetBlockWithoutInnerBlocks = _select.__unstableGetBlockWithoutInnerBlocks,
        getBlockIndex = _select.getBlockIndex;

    var index = getBlockIndex(clientId, rootClientId);

    var _unstableGetBlockWit = __unstableGetBlockWithoutInnerBlocks(clientId),
        name = _unstableGetBlockWit.name,
        attributes = _unstableGetBlockWit.attributes;

    return {
      index: index,
      name: name,
      attributes: attributes
    };
  }, [clientId, rootClientId]);
  var index = selected.index,
      name = selected.name,
      attributes = selected.attributes;

  var _useDispatch = useDispatch('core/block-editor'),
      setNavigationMode = _useDispatch.setNavigationMode,
      removeBlock = _useDispatch.removeBlock;

  var ref = useRef(); // Focus the breadcrumb in navigation mode.

  useEffect(function () {
    ref.current.focus();
  });

  function onKeyDown(event) {
    var keyCode = event.keyCode;

    if (keyCode === BACKSPACE || keyCode === DELETE) {
      removeBlock(clientId);
      event.preventDefault();
    }
  }

  var blockType = getBlockType(name);
  var label = getAccessibleBlockLabel(blockType, attributes, index + 1, moverDirection);
  return createElement("div", _extends({
    className: "block-editor-block-list__breadcrumb"
  }, props), createElement(Button, {
    ref: ref,
    onClick: function onClick() {
      return setNavigationMode(false);
    },
    onKeyDown: onKeyDown,
    label: label
  }, createElement(BlockTitle, {
    clientId: clientId
  })));
}

export default BlockBreadcrumb;
//# sourceMappingURL=breadcrumb.js.map