import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import classnames from 'classnames';
/**
 * Internal dependencies
 */

import { UnitSelect, UnitLabel } from './styles/unit-control-styles';
import { CSS_UNITS, hasUnits } from './utils';
/**
 * Renders a `select` if there are multiple units.
 * Otherwise, renders a non-selectable label.
 */

export default function UnitSelectControl(_ref) {
  var className = _ref.className,
      _ref$isTabbable = _ref.isTabbable,
      isTabbable = _ref$isTabbable === void 0 ? true : _ref$isTabbable,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? CSS_UNITS : _ref$options,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 'px' : _ref$value,
      props = _objectWithoutProperties(_ref, ["className", "isTabbable", "options", "onChange", "size", "value"]);

  if (!hasUnits(options)) {
    return createElement(UnitLabel, {
      className: "components-unit-control__unit-label",
      size: size
    }, value);
  }

  var handleOnChange = function handleOnChange(event) {
    var unitValue = event.target.value;
    var data = options.find(function (option) {
      return option.value === unitValue;
    });
    onChange(unitValue, {
      event: event,
      data: data
    });
  };

  var classes = classnames('components-unit-control__select', className);
  return createElement(UnitSelect, _extends({
    className: classes,
    onChange: handleOnChange,
    size: size,
    tabIndex: isTabbable ? null : '-1',
    value: value
  }, props), options.map(function (option) {
    return createElement("option", {
      value: option.value,
      key: option.value
    }, option.label);
  }));
}
//# sourceMappingURL=unit-select-control.js.map