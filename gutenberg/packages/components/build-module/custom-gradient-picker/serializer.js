import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * External dependencies
 */
import { compact, get } from 'lodash';
export function serializeGradientColor(_ref) {
  var type = _ref.type,
      value = _ref.value;

  if (type === 'literal') {
    return value;
  }

  return "".concat(type, "(").concat(value.join(','), ")");
}
export function serializeGradientPosition(_ref2) {
  var type = _ref2.type,
      value = _ref2.value;
  return "".concat(value).concat(type);
}
export function serializeGradientColorStop(_ref3) {
  var type = _ref3.type,
      value = _ref3.value,
      length = _ref3.length;
  return "".concat(serializeGradientColor({
    type: type,
    value: value
  }), " ").concat(serializeGradientPosition(length));
}
export function serializeGradientOrientation(orientation) {
  if (!orientation || orientation.type !== 'angular') {
    return;
  }

  return "".concat(orientation.value, "deg");
}
export function serializeGradient(_ref4) {
  var type = _ref4.type,
      orientation = _ref4.orientation,
      colorStops = _ref4.colorStops;
  var serializedOrientation = serializeGradientOrientation(orientation);
  var serializedColorStops = colorStops.sort(function (colorStop1, colorStop2) {
    return get(colorStop1, ['length', 'value'], 0) - get(colorStop2, ['length', 'value'], 0);
  }).map(serializeGradientColorStop);
  return "".concat(type, "(").concat(compact([serializedOrientation].concat(_toConsumableArray(serializedColorStops))).join(','), ")");
}
//# sourceMappingURL=serializer.js.map