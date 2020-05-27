import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import NavigableToolbar from '../navigable-toolbar';
import { BlockToolbar } from '../';

function BlockContextualToolbar(_ref) {
  var focusOnMount = _ref.focusOnMount,
      props = _objectWithoutProperties(_ref, ["focusOnMount"]);

  return createElement("div", {
    className: "block-editor-block-contextual-toolbar-wrapper"
  }, createElement(NavigableToolbar, _extends({
    focusOnMount: focusOnMount,
    className: "block-editor-block-contextual-toolbar"
    /* translators: accessibility text for the block toolbar */
    ,
    "aria-label": __('Block tools')
  }, props), createElement(BlockToolbar, null)));
}

export default BlockContextualToolbar;
//# sourceMappingURL=block-contextual-toolbar.js.map