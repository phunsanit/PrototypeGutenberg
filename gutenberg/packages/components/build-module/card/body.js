import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */

import { BodyUI } from './styles/card-styles';
import { useCardContext } from './context';
export var defaultProps = {
  isShady: false,
  size: 'medium'
};
export function CardBody(props) {
  var className = props.className,
      isShady = props.isShady,
      additionalProps = _objectWithoutProperties(props, ["className", "isShady"]);

  var mergedProps = _objectSpread({}, defaultProps, {}, useCardContext(), {}, props);

  var size = mergedProps.size;
  var classes = classnames('components-card__body', isShady && 'is-shady', size && "is-size-".concat(size), className);
  return createElement(BodyUI, _extends({}, additionalProps, {
    className: classes
  }));
}
export default CardBody;
//# sourceMappingURL=body.js.map