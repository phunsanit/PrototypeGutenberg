"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GradientPanel;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _control = _interopRequireDefault(require("./control"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function GradientPanel(props) {
  var gradients = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').getSettings().gradients;
  }, []);

  if ((0, _lodash.isEmpty)(gradients)) {
    return null;
  }

  return (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Gradient')
  }, (0, _element.createElement)(_control.default, props));
}
//# sourceMappingURL=panel.js.map