import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
export default function save() {
  return createElement("div", null, createElement(InnerBlocks.Content, null));
}
//# sourceMappingURL=save.js.map