import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useResizeObserver } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import Icon from '../icon';
/**
 * Renders a placeholder. Normally used by blocks to render their empty state.
 *
 * @param  {Object} props The component props.
 * @return {Object}       The rendered placeholder.
 */

function Placeholder(_ref) {
  var icon = _ref.icon,
      children = _ref.children,
      label = _ref.label,
      instructions = _ref.instructions,
      className = _ref.className,
      notices = _ref.notices,
      preview = _ref.preview,
      isColumnLayout = _ref.isColumnLayout,
      additionalProps = _objectWithoutProperties(_ref, ["icon", "children", "label", "instructions", "className", "notices", "preview", "isColumnLayout"]);

  var _useResizeObserver = useResizeObserver(),
      _useResizeObserver2 = _slicedToArray(_useResizeObserver, 2),
      resizeListener = _useResizeObserver2[0],
      width = _useResizeObserver2[1].width; // Since `useResizeObserver` will report a width of `null` until after the
  // first render, avoid applying any modifier classes until width is known.


  var modifierClassNames;

  if (typeof width === 'number') {
    modifierClassNames = {
      'is-large': width >= 320,
      'is-medium': width >= 160 && width < 320,
      'is-small': width < 160
    };
  }

  var classes = classnames('components-placeholder', className, modifierClassNames);
  var fieldsetClasses = classnames('components-placeholder__fieldset', {
    'is-column-layout': isColumnLayout
  });
  return createElement("div", _extends({}, additionalProps, {
    className: classes
  }), resizeListener, notices, preview && createElement("div", {
    className: "components-placeholder__preview"
  }, preview), createElement("div", {
    className: "components-placeholder__label"
  }, createElement(Icon, {
    icon: icon
  }), label), !!instructions && createElement("div", {
    className: "components-placeholder__instructions"
  }, instructions), createElement("div", {
    className: fieldsetClasses
  }, children));
}

export default Placeholder;
//# sourceMappingURL=index.js.map