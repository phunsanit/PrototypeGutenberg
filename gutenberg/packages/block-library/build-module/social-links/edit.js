import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { InnerBlocks, __experimentalBlock as Block } from '@wordpress/block-editor';
var ALLOWED_BLOCKS = ['core/social-link']; // Template contains the links that show when start.

var TEMPLATE = [['core/social-link', {
  service: 'wordpress',
  url: 'https://wordpress.org'
}], ['core/social-link', {
  service: 'facebook'
}], ['core/social-link', {
  service: 'twitter'
}], ['core/social-link', {
  service: 'instagram'
}], ['core/social-link', {
  service: 'linkedin'
}], ['core/social-link', {
  service: 'youtube'
}]];
export var SocialLinksEdit = function SocialLinksEdit() {
  return createElement(InnerBlocks, {
    allowedBlocks: ALLOWED_BLOCKS,
    templateLock: false,
    template: TEMPLATE,
    __experimentalMoverDirection: 'horizontal',
    __experimentalTagName: Block.ul,
    __experimentalAppenderTagName: "li"
  });
};
export default SocialLinksEdit;
//# sourceMappingURL=edit.js.map