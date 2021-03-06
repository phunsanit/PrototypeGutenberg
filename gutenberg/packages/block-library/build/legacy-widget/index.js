"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _icons = require("@wordpress/icons");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/legacy-widget",
  category: "widgets",
  attributes: {
    widgetClass: {
      type: "string"
    },
    id: {
      type: "string"
    },
    idBase: {
      type: "string"
    },
    number: {
      type: "number"
    },
    instance: {
      type: "object"
    }
  },
  supports: {
    html: false,
    customClassName: false
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Legacy Widget (Experimental)'),
  description: (0, _i18n.__)('Display a legacy widget.'),
  icon: _icons.widget,
  edit: _edit.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map