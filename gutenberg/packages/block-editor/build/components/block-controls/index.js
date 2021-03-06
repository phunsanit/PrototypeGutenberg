"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _context = require("../block-edit/context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('BlockControls'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

function BlockControlsSlot(props) {
  var accessibleToolbarState = (0, _element.useContext)(_components.__experimentalToolbarContext);
  return (0, _element.createElement)(Slot, (0, _extends2.default)({}, props, {
    fillProps: accessibleToolbarState
  }));
}

function BlockControlsFill(_ref) {
  var controls = _ref.controls,
      children = _ref.children;
  return (0, _element.createElement)(Fill, null, function (fillProps) {
    // Children passed to BlockControlsFill will not have access to any
    // React Context whose Provider is part of the BlockControlsSlot tree.
    // So we re-create the Provider in this subtree.
    var value = !(0, _lodash.isEmpty)(fillProps) ? fillProps : null;
    return (0, _element.createElement)(_components.__experimentalToolbarContext.Provider, {
      value: value
    }, (0, _element.createElement)(_components.ToolbarGroup, {
      controls: controls
    }), children);
  });
}

var BlockControls = (0, _context.ifBlockEditSelected)(BlockControlsFill);
BlockControls.Slot = BlockControlsSlot;
var _default = BlockControls;
exports.default = _default;
//# sourceMappingURL=index.js.map