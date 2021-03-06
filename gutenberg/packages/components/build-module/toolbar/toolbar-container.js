import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { useToolbarState, Toolbar } from 'reakit/Toolbar';
/**
 * WordPress dependencies
 */

import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import ToolbarContext from '../toolbar-context';

function ToolbarContainer(_ref, ref) {
  var accessibilityLabel = _ref.accessibilityLabel,
      props = _objectWithoutProperties(_ref, ["accessibilityLabel"]);

  // https://reakit.io/docs/basic-concepts/#state-hooks
  // Passing baseId for server side rendering (which includes snapshots)
  // If an id prop is passed to Toolbar, toolbar items will use it as a base for their ids
  var toolbarState = useToolbarState({
    loop: true,
    baseId: props.id
  });
  return (// This will provide state for `ToolbarButton`'s
    createElement(ToolbarContext.Provider, {
      value: toolbarState
    }, createElement(Toolbar, _extends({
      ref: ref,
      "aria-label": accessibilityLabel
    }, toolbarState, props)))
  );
}

export default forwardRef(ToolbarContainer);
//# sourceMappingURL=toolbar-container.js.map