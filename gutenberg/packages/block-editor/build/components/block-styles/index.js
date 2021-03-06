"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveStyle = getActiveStyle;
exports.replaceActiveStyle = replaceActiveStyle;
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _tokenList = _interopRequireDefault(require("@wordpress/token-list"));

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockPreview = _interopRequireDefault(require("../block-preview"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle(styles, className) {
  var _iterator = _createForOfIteratorHelper(new _tokenList.default(className).values()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var style = _step.value;

      if (style.indexOf('is-style-') === -1) {
        continue;
      }

      var potentialStyleName = style.substring(9);
      var activeStyle = (0, _lodash.find)(styles, {
        name: potentialStyleName
      });

      if (activeStyle) {
        return activeStyle;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return (0, _lodash.find)(styles, 'isDefault');
}
/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */


function replaceActiveStyle(className, activeStyle, newStyle) {
  var list = new _tokenList.default(className);

  if (activeStyle) {
    list.remove('is-style-' + activeStyle.name);
  }

  if (!newStyle.isDefault) {
    list.add('is-style-' + newStyle.name);
  }

  return list.value;
}

var useGenericPreviewBlock = function useGenericPreviewBlock(block, type) {
  return (0, _element.useMemo)(function () {
    return type.example ? (0, _blocks.getBlockFromExample)(block.name, {
      attributes: type.example.attributes,
      innerBlocks: type.example.innerBlocks
    }) : (0, _blocks.cloneBlock)(block);
  }, [type.example ? block.name : block, type]);
};

function BlockStyles(_ref) {
  var clientId = _ref.clientId,
      _ref$onSwitch = _ref.onSwitch,
      onSwitch = _ref$onSwitch === void 0 ? _lodash.noop : _ref$onSwitch,
      _ref$onHoverClassName = _ref.onHoverClassName,
      onHoverClassName = _ref$onHoverClassName === void 0 ? _lodash.noop : _ref$onHoverClassName;

  var selector = function selector(select) {
    var _select = select('core/block-editor'),
        getBlock = _select.getBlock;

    var _select2 = select('core/blocks'),
        getBlockStyles = _select2.getBlockStyles;

    var block = getBlock(clientId);
    var blockType = (0, _blocks.getBlockType)(block.name);
    return {
      block: block,
      type: blockType,
      styles: getBlockStyles(block.name),
      className: block.attributes.className || ''
    };
  };

  var _useSelect = (0, _data.useSelect)(selector, [clientId]),
      styles = _useSelect.styles,
      block = _useSelect.block,
      type = _useSelect.type,
      className = _useSelect.className;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      updateBlockAttributes = _useDispatch.updateBlockAttributes;

  var genericPreviewBlock = useGenericPreviewBlock(block, type);

  if (!styles || styles.length === 0) {
    return null;
  }

  if (!type.styles && !(0, _lodash.find)(styles, 'isDefault')) {
    styles.unshift({
      name: 'default',
      label: (0, _i18n._x)('Default', 'block style'),
      isDefault: true
    });
  }

  var activeStyle = getActiveStyle(styles, className);
  return (0, _element.createElement)("div", {
    className: "block-editor-block-styles"
  }, styles.map(function (style) {
    var styleClassName = replaceActiveStyle(className, activeStyle, style);
    return (0, _element.createElement)(BlockStyleItem, {
      genericPreviewBlock: genericPreviewBlock,
      className: className,
      isActive: activeStyle === style,
      key: style.name,
      onSelect: function onSelect() {
        updateBlockAttributes(clientId, {
          className: styleClassName
        });
        onHoverClassName(null);
        onSwitch();
      },
      onBlur: function onBlur() {
        return onHoverClassName(null);
      },
      onHover: function onHover() {
        return onHoverClassName(styleClassName);
      },
      style: style,
      styleClassName: styleClassName
    });
  }));
}

function BlockStyleItem(_ref2) {
  var genericPreviewBlock = _ref2.genericPreviewBlock,
      style = _ref2.style,
      isActive = _ref2.isActive,
      onBlur = _ref2.onBlur,
      onHover = _ref2.onHover,
      onSelect = _ref2.onSelect,
      styleClassName = _ref2.styleClassName;
  var previewBlocks = (0, _element.useMemo)(function () {
    return _objectSpread({}, genericPreviewBlock, {
      attributes: _objectSpread({}, genericPreviewBlock.attributes, {
        className: styleClassName
      })
    });
  }, [genericPreviewBlock, styleClassName]);
  return (0, _element.createElement)("div", {
    key: style.name,
    className: (0, _classnames.default)('block-editor-block-styles__item', {
      'is-active': isActive
    }),
    onClick: function onClick() {
      return onSelect();
    },
    onKeyDown: function onKeyDown(event) {
      if (_keycodes.ENTER === event.keyCode || _keycodes.SPACE === event.keyCode) {
        event.preventDefault();
        onSelect();
      }
    },
    onMouseEnter: onHover,
    onMouseLeave: onBlur,
    role: "button",
    tabIndex: "0",
    "aria-label": style.label || style.name
  }, (0, _element.createElement)("div", {
    className: "block-editor-block-styles__item-preview"
  }, (0, _element.createElement)(_blockPreview.default, {
    viewportWidth: 500,
    blocks: previewBlocks
  })), (0, _element.createElement)("div", {
    className: "block-editor-block-styles__item-label"
  }, style.label || style.name));
}

var _default = BlockStyles;
exports.default = _default;
//# sourceMappingURL=index.js.map