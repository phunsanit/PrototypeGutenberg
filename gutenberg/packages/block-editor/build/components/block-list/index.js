"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _block = _interopRequireDefault(require("./block"));

var _blockListAppender = _interopRequireDefault(require("../block-list-appender"));

var _rootContainer = _interopRequireDefault(require("./root-container"));

var _useBlockDropZone = _interopRequireDefault(require("../use-block-drop-zone"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * If the block count exceeds the threshold, we disable the reordering animation
 * to avoid laginess.
 */
var BLOCK_ANIMATION_THRESHOLD = 200;

function BlockList(_ref, ref) {
  var className = _ref.className,
      rootClientId = _ref.rootClientId,
      renderAppender = _ref.renderAppender,
      _ref$__experimentalTa = _ref.__experimentalTagName,
      __experimentalTagName = _ref$__experimentalTa === void 0 ? 'div' : _ref$__experimentalTa,
      __experimentalAppenderTagName = _ref.__experimentalAppenderTagName,
      _ref$__experimentalPa = _ref.__experimentalPassedProps,
      __experimentalPassedProps = _ref$__experimentalPa === void 0 ? {} : _ref$__experimentalPa;

  function selector(select) {
    var _select = select('core/block-editor'),
        getBlockOrder = _select.getBlockOrder,
        isMultiSelecting = _select.isMultiSelecting,
        getSelectedBlockClientId = _select.getSelectedBlockClientId,
        getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
        hasMultiSelection = _select.hasMultiSelection,
        getGlobalBlockCount = _select.getGlobalBlockCount,
        isTyping = _select.isTyping;

    return {
      blockClientIds: getBlockOrder(rootClientId),
      isMultiSelecting: isMultiSelecting(),
      selectedBlockClientId: getSelectedBlockClientId(),
      multiSelectedBlockClientIds: getMultiSelectedBlockClientIds(),
      hasMultiSelection: hasMultiSelection(),
      enableAnimation: !isTyping() && getGlobalBlockCount() <= BLOCK_ANIMATION_THRESHOLD
    };
  }

  var _useSelect = (0, _data.useSelect)(selector, [rootClientId]),
      blockClientIds = _useSelect.blockClientIds,
      isMultiSelecting = _useSelect.isMultiSelecting,
      selectedBlockClientId = _useSelect.selectedBlockClientId,
      multiSelectedBlockClientIds = _useSelect.multiSelectedBlockClientIds,
      hasMultiSelection = _useSelect.hasMultiSelection,
      enableAnimation = _useSelect.enableAnimation;

  var Container = rootClientId ? __experimentalTagName : _rootContainer.default;
  var targetClientId = (0, _useBlockDropZone.default)({
    element: ref,
    rootClientId: rootClientId
  });
  return (0, _element.createElement)(Container, (0, _extends2.default)({}, __experimentalPassedProps, {
    ref: ref,
    className: (0, _classnames.default)('block-editor-block-list__layout', className, __experimentalPassedProps.className)
  }), blockClientIds.map(function (clientId, index) {
    var isBlockInSelection = hasMultiSelection ? multiSelectedBlockClientIds.includes(clientId) : selectedBlockClientId === clientId;
    return (0, _element.createElement)(_data.AsyncModeProvider, {
      key: clientId,
      value: !isBlockInSelection
    }, (0, _element.createElement)(_block.default, {
      rootClientId: rootClientId,
      clientId: clientId,
      isMultiSelecting: isMultiSelecting // This prop is explicitly computed and passed down
      // to avoid being impacted by the async mode
      // otherwise there might be a small delay to trigger the animation.
      ,
      index: index,
      enableAnimation: enableAnimation,
      className: clientId === targetClientId ? 'is-drop-target' : undefined
    }));
  }), (0, _element.createElement)(_blockListAppender.default, {
    tagName: __experimentalAppenderTagName,
    rootClientId: rootClientId,
    renderAppender: renderAppender,
    className: targetClientId === null ? 'is-drop-target' : undefined
  }));
}

var ForwardedBlockList = (0, _element.forwardRef)(BlockList); // This component needs to always be synchronous
// as it's the one changing the async mode
// depending on the block selection.

var _default = (0, _element.forwardRef)(function (props, ref) {
  var fallbackRef = (0, _element.useRef)();
  return (0, _element.createElement)(_data.AsyncModeProvider, {
    value: false
  }, (0, _element.createElement)(ForwardedBlockList, (0, _extends2.default)({
    ref: ref || fallbackRef
  }, props)));
});

exports.default = _default;
//# sourceMappingURL=index.js.map