"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

var _blockTitle = _interopRequireDefault(require("../block-title"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Block breadcrumb component, displaying the label of the block. If the block
 * descends from a root block, a button is displayed enabling the user to select
 * the root block.
 *
 * @param {string} props          Component props.
 * @param {string} props.clientId Client ID of block.
 *
 * @return {WPComponent} The component to be rendered.
 */
function BlockBreadcrumb(_ref) {
  var clientId = _ref.clientId,
      rootClientId = _ref.rootClientId,
      moverDirection = _ref.moverDirection,
      props = (0, _objectWithoutProperties2.default)(_ref, ["clientId", "rootClientId", "moverDirection"]);
  var selected = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        __unstableGetBlockWithoutInnerBlocks = _select.__unstableGetBlockWithoutInnerBlocks,
        getBlockIndex = _select.getBlockIndex;

    var index = getBlockIndex(clientId, rootClientId);

    var _unstableGetBlockWit = __unstableGetBlockWithoutInnerBlocks(clientId),
        name = _unstableGetBlockWit.name,
        attributes = _unstableGetBlockWit.attributes;

    return {
      index: index,
      name: name,
      attributes: attributes
    };
  }, [clientId, rootClientId]);
  var index = selected.index,
      name = selected.name,
      attributes = selected.attributes;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      setNavigationMode = _useDispatch.setNavigationMode,
      removeBlock = _useDispatch.removeBlock;

  var ref = (0, _element.useRef)(); // Focus the breadcrumb in navigation mode.

  (0, _element.useEffect)(function () {
    ref.current.focus();
  });

  function onKeyDown(event) {
    var keyCode = event.keyCode;

    if (keyCode === _keycodes.BACKSPACE || keyCode === _keycodes.DELETE) {
      removeBlock(clientId);
      event.preventDefault();
    }
  }

  var blockType = (0, _blocks.getBlockType)(name);
  var label = (0, _blocks.__experimentalGetAccessibleBlockLabel)(blockType, attributes, index + 1, moverDirection);
  return (0, _element.createElement)("div", (0, _extends2.default)({
    className: "block-editor-block-list__breadcrumb"
  }, props), (0, _element.createElement)(_components.Button, {
    ref: ref,
    onClick: function onClick() {
      return setNavigationMode(false);
    },
    onKeyDown: onKeyDown,
    label: label
  }, (0, _element.createElement)(_blockTitle.default, {
    clientId: clientId
  })));
}

var _default = BlockBreadcrumb;
exports.default = _default;
//# sourceMappingURL=breadcrumb.js.map