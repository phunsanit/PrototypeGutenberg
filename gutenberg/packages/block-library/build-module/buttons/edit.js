import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __experimentalAlignmentHookSettingsProvider as AlignmentHookSettingsProvider, InnerBlocks, __experimentalBlock as Block } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import { name as buttonBlockName } from '../button/';
var ALLOWED_BLOCKS = [buttonBlockName];
var BUTTONS_TEMPLATE = [['core/button']]; // Inside buttons block alignment options are not supported.

var alignmentHooksSetting = {
  isEmbedButton: true
};

function ButtonsEdit() {
  return createElement(Block.div, null, createElement(AlignmentHookSettingsProvider, {
    value: alignmentHooksSetting
  }, createElement(InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: BUTTONS_TEMPLATE,
    __experimentalMoverDirection: "horizontal"
  })));
}

export default ButtonsEdit;
//# sourceMappingURL=edit.js.map