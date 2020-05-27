"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _reactNative = require("react-native");

var _blockTitle = _interopRequireDefault(require("../block-title"));

var _subdirectoryIcon = _interopRequireDefault(require("./subdirectory-icon"));

var _breadcrumb = _interopRequireDefault(require("./breadcrumb.scss"));

/**
 * WordPress dependencies
 */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
var BlockBreadcrumb = function BlockBreadcrumb(_ref) {
  var clientId = _ref.clientId,
      blockIcon = _ref.blockIcon,
      rootClientId = _ref.rootClientId,
      rootBlockIcon = _ref.rootBlockIcon,
      isRTL = _ref.isRTL;
  return (0, _element.createElement)(_reactNative.View, {
    style: [_breadcrumb.default.breadcrumbContainer, rootClientId && _breadcrumb.default.densedPaddingLeft]
  }, (0, _element.createElement)(_reactNative.TouchableOpacity, {
    style: _breadcrumb.default.button,
    onPress: function onPress() {
      /* Open BottomSheet with markup */
    },
    disabled: true
    /* Disable temporarily since onPress function is empty */

  }, rootClientId && rootBlockIcon && [(0, _element.createElement)(_components.Icon, {
    key: "parent-icon",
    size: 20,
    icon: rootBlockIcon.src,
    fill: _breadcrumb.default.icon.color
  }), (0, _element.createElement)(_reactNative.View, {
    key: "subdirectory-icon",
    style: _breadcrumb.default.arrow
  }, (0, _element.createElement)(_subdirectoryIcon.default, {
    fill: _breadcrumb.default.arrow.color,
    isRTL: isRTL
  }))], (0, _element.createElement)(_components.Icon, {
    size: 24,
    icon: blockIcon.src,
    fill: _breadcrumb.default.icon.color
  }), (0, _element.createElement)(_reactNative.Text, {
    maxFontSizeMultiplier: 1.25,
    ellipsizeMode: "tail",
    numberOfLines: 1,
    style: _breadcrumb.default.breadcrumbTitle
  }, (0, _element.createElement)(_blockTitle.default, {
    clientId: clientId
  }))));
};

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockName = _select.getBlockName,
      getSettings = _select.getSettings;

  var blockName = getBlockName(clientId);
  var blockType = (0, _blocks.getBlockType)(blockName);
  var blockIcon = blockType ? blockType.icon : {};
  var rootClientId = getBlockRootClientId(clientId);

  if (!rootClientId) {
    return {
      clientId: clientId,
      blockIcon: blockIcon
    };
  }

  var rootBlockName = getBlockName(rootClientId);
  var rootBlockType = (0, _blocks.getBlockType)(rootBlockName);
  var rootBlockIcon = rootBlockType ? rootBlockType.icon : {};
  return {
    clientId: clientId,
    blockIcon: blockIcon,
    rootClientId: rootClientId,
    rootBlockIcon: rootBlockIcon,
    isRTL: getSettings().isRTL
  };
})])(BlockBreadcrumb);

exports.default = _default;
//# sourceMappingURL=breadcrumb.native.js.map