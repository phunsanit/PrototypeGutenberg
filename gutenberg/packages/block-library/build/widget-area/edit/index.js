"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WidgetAreaEdit;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _coreData = require("@wordpress/core-data");

var _components = require("@wordpress/components");

var _innerBlocks = _interopRequireDefault(require("./inner-blocks"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function WidgetAreaEdit(_ref) {
  var clientId = _ref.clientId,
      className = _ref.className,
      _ref$attributes = _ref.attributes,
      id = _ref$attributes.id,
      name = _ref$attributes.name;
  var index = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').getBlockIndex(clientId);
  }, [clientId]);
  return (0, _element.createElement)(_components.Panel, {
    className: className
  }, (0, _element.createElement)(_components.PanelBody, {
    title: name,
    initialOpen: index === 0
  }, (0, _element.createElement)(_coreData.EntityProvider, {
    kind: "root",
    type: "widgetArea",
    id: id
  }, (0, _element.createElement)(_innerBlocks.default, null))));
}
//# sourceMappingURL=index.js.map