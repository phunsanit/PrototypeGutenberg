"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InsertionPoint;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _dom = require("@wordpress/dom");

var _inserter = _interopRequireDefault(require("../inserter"));

var _writingFlow = require("../writing-flow");

var _dom2 = require("../../utils/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Indicator(_ref) {
  var clientId = _ref.clientId;
  var showInsertionPoint = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockIndex = _select.getBlockIndex,
        getBlockInsertionPoint = _select.getBlockInsertionPoint,
        isBlockInsertionPointVisible = _select.isBlockInsertionPointVisible,
        getBlockRootClientId = _select.getBlockRootClientId;

    var rootClientId = getBlockRootClientId(clientId);
    var blockIndex = getBlockIndex(clientId, rootClientId);
    var insertionPoint = getBlockInsertionPoint();
    return isBlockInsertionPointVisible() && insertionPoint.index === blockIndex && insertionPoint.rootClientId === rootClientId;
  }, [clientId]);

  if (!showInsertionPoint) {
    return null;
  }

  return (0, _element.createElement)("div", {
    className: "block-editor-block-list__insertion-point-indicator"
  });
}

function InsertionPoint(_ref2) {
  var isMultiSelecting = _ref2.isMultiSelecting,
      hasMultiSelection = _ref2.hasMultiSelection,
      selectedBlockClientId = _ref2.selectedBlockClientId,
      children = _ref2.children,
      containerRef = _ref2.containerRef;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isInserterShown = _useState2[0],
      setIsInserterShown = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isInserterForced = _useState4[0],
      setIsInserterForced = _useState4[1];

  var _useState5 = (0, _element.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      inserterElement = _useState6[0],
      setInserterElement = _useState6[1];

  var _useState7 = (0, _element.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      inserterClientId = _useState8[0],
      setInserterClientId = _useState8[1];

  var ref = (0, _element.useRef)();

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select2 = select('core/block-editor'),
        getMultiSelectedBlockClientIds = _select2.getMultiSelectedBlockClientIds;

    return {
      multiSelectedBlockClientIds: getMultiSelectedBlockClientIds()
    };
  }),
      multiSelectedBlockClientIds = _useSelect.multiSelectedBlockClientIds;

  function onMouseMove(event) {
    if (!event.target.classList.contains('block-editor-block-list__layout')) {
      if (isInserterShown) {
        setIsInserterShown(false);
      }

      return;
    }

    var rect = event.target.getBoundingClientRect();
    var offset = event.clientY - rect.top;
    var element = Array.from(event.target.children).find(function (blockEl) {
      return blockEl.offsetTop > offset;
    });

    if (!element) {
      return;
    }

    var clientId = element.id.slice('block-'.length);

    if (!clientId) {
      return;
    }

    var elementRect = element.getBoundingClientRect();

    if (event.clientX > elementRect.right || event.clientX < elementRect.left) {
      if (isInserterShown) {
        setIsInserterShown(false);
      }

      return;
    }

    setIsInserterShown(true);
    setInserterElement(element);
    setInserterClientId(clientId);
  }

  function focusClosestTabbable(event) {
    var clientX = event.clientX,
        clientY = event.clientY,
        target = event.target; // Only handle click on the wrapper specifically, and not an event
    // bubbled from the inserter itself.

    if (target !== ref.current) {
      return;
    }

    var targetRect = target.getBoundingClientRect();
    var isReverse = clientY < targetRect.top + targetRect.height / 2;
    var blockNode = (0, _dom2.getBlockDOMNode)(inserterClientId);
    var container = isReverse ? containerRef.current : blockNode;
    var closest = (0, _writingFlow.getClosestTabbable)(blockNode, true, container) || blockNode;
    var rect = new window.DOMRect(clientX, clientY, 0, 16);
    (0, _dom.placeCaretAtVerticalEdge)(closest, isReverse, rect, false);
  } // Hide the inserter above the selected block and during multi-selection.


  var isInserterHidden = hasMultiSelection ? multiSelectedBlockClientIds.includes(inserterClientId) : inserterClientId === selectedBlockClientId;
  return (0, _element.createElement)(_element.Fragment, null, !isMultiSelecting && (isInserterShown || isInserterForced) && (0, _element.createElement)(_components.Popover, {
    noArrow: true,
    animate: false,
    anchorRef: inserterElement,
    position: "top right left",
    focusOnMount: false,
    className: "block-editor-block-list__insertion-point-popover",
    __unstableSlotName: "block-toolbar",
    __unstableFixedPosition: false
  }, (0, _element.createElement)("div", {
    className: "block-editor-block-list__insertion-point",
    style: {
      width: inserterElement.offsetWidth
    }
  }, (0, _element.createElement)(Indicator, {
    clientId: inserterClientId
  }), (0, _element.createElement)("div", {
    ref: ref,
    onFocus: function onFocus() {
      return setIsInserterForced(true);
    },
    onBlur: function onBlur() {
      return setIsInserterForced(false);
    },
    onClick: focusClosestTabbable // While ideally it would be enough to capture the
    // bubbling focus event from the Inserter, due to the
    // characteristics of click focusing of `button`s in
    // Firefox and Safari, it is not reliable.
    //
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
    ,
    tabIndex: -1,
    className: (0, _classnames.default)('block-editor-block-list__insertion-point-inserter', {
      'is-inserter-hidden': isInserterHidden
    })
  }, (0, _element.createElement)(_inserter.default, {
    position: "bottom center",
    clientId: inserterClientId
  })))), (0, _element.createElement)("div", {
    onMouseMove: !isInserterForced && !isMultiSelecting ? onMouseMove : undefined
  }, children));
}
//# sourceMappingURL=insertion-point.js.map