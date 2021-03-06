import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { useContext } from '@wordpress/element';
import { __experimentalToolbarContext as ToolbarContext, createSlotFill, ToolbarGroup } from '@wordpress/components';
/**
 * Internal dependencies
 */

import { ifBlockEditSelected } from '../block-edit/context';

var _createSlotFill = createSlotFill('BlockControls'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

function BlockControlsSlot(props) {
  var accessibleToolbarState = useContext(ToolbarContext);
  return createElement(Slot, _extends({}, props, {
    fillProps: accessibleToolbarState
  }));
}

function BlockControlsFill(_ref) {
  var controls = _ref.controls,
      children = _ref.children;
  return createElement(Fill, null, function (fillProps) {
    // Children passed to BlockControlsFill will not have access to any
    // React Context whose Provider is part of the BlockControlsSlot tree.
    // So we re-create the Provider in this subtree.
    var value = !isEmpty(fillProps) ? fillProps : null;
    return createElement(ToolbarContext.Provider, {
      value: value
    }, createElement(ToolbarGroup, {
      controls: controls
    }), children);
  });
}

var BlockControls = ifBlockEditSelected(BlockControlsFill);
BlockControls.Slot = BlockControlsSlot;
export default BlockControls;
//# sourceMappingURL=index.js.map