"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebouncedShowMovers = useDebouncedShowMovers;
exports.useShowMoversGestures = useShowMoversGestures;
exports.useToggleBlockHighlight = useToggleBlockHighlight;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _element = require("@wordpress/element");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    clearTimeout = _window.clearTimeout,
    requestAnimationFrame = _window.requestAnimationFrame,
    cancelAnimationFrame = _window.cancelAnimationFrame,
    setTimeout = _window.setTimeout;
var DEBOUNCE_TIMEOUT = 250;
/**
 * Hook that creates a showMover state, as well as debounced show/hide callbacks
 */

function useDebouncedShowMovers(_ref) {
  var ref = _ref.ref,
      isFocused = _ref.isFocused,
      _ref$debounceTimeout = _ref.debounceTimeout,
      debounceTimeout = _ref$debounceTimeout === void 0 ? DEBOUNCE_TIMEOUT : _ref$debounceTimeout,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _lodash.noop : _ref$onChange;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showMovers = _useState2[0],
      setShowMovers = _useState2[1];

  var timeoutRef = (0, _element.useRef)();

  var handleOnChange = function handleOnChange(nextIsFocused) {
    setShowMovers(nextIsFocused);
    onChange(nextIsFocused);
  };

  var getIsHovered = function getIsHovered() {
    return (ref === null || ref === void 0 ? void 0 : ref.current) && ref.current.matches(':hover');
  };

  var shouldHideMovers = function shouldHideMovers() {
    var isHovered = getIsHovered();
    return !isFocused && !isHovered;
  };

  var clearTimeoutRef = function clearTimeoutRef() {
    var timeout = timeoutRef.current;

    if (timeout && clearTimeout) {
      clearTimeout(timeout);
    }
  };

  var debouncedShowMovers = function debouncedShowMovers(event) {
    if (event) {
      event.stopPropagation();
    }

    clearTimeoutRef();

    if (!showMovers) {
      handleOnChange(true);
    }
  };

  var debouncedHideMovers = function debouncedHideMovers(event) {
    if (event) {
      event.stopPropagation();
    }

    clearTimeoutRef();
    timeoutRef.current = setTimeout(function () {
      if (shouldHideMovers()) {
        handleOnChange(false);
      }
    }, debounceTimeout);
  };

  (0, _element.useEffect)(function () {
    return function () {
      return clearTimeoutRef();
    };
  }, []);
  return {
    showMovers: showMovers,
    debouncedShowMovers: debouncedShowMovers,
    debouncedHideMovers: debouncedHideMovers
  };
}
/**
 * Hook that provides a showMovers state and gesture events for DOM elements
 * that interact with the showMovers state.
 */


function useShowMoversGestures(_ref2) {
  var ref = _ref2.ref,
      _ref2$debounceTimeout = _ref2.debounceTimeout,
      debounceTimeout = _ref2$debounceTimeout === void 0 ? DEBOUNCE_TIMEOUT : _ref2$debounceTimeout,
      _ref2$onChange = _ref2.onChange,
      onChange = _ref2$onChange === void 0 ? _lodash.noop : _ref2$onChange;

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var _useDebouncedShowMove = useDebouncedShowMovers({
    ref: ref,
    debounceTimeout: debounceTimeout,
    isFocused: isFocused,
    onChange: onChange
  }),
      showMovers = _useDebouncedShowMove.showMovers,
      debouncedShowMovers = _useDebouncedShowMove.debouncedShowMovers,
      debouncedHideMovers = _useDebouncedShowMove.debouncedHideMovers;

  var registerRef = (0, _element.useRef)(false);

  var isFocusedWithin = function isFocusedWithin() {
    return (ref === null || ref === void 0 ? void 0 : ref.current) && ref.current.contains(document.activeElement);
  };

  (0, _element.useEffect)(function () {
    var node = ref.current;

    var handleOnFocus = function handleOnFocus() {
      if (isFocusedWithin()) {
        setIsFocused(true);
        debouncedShowMovers();
      }
    };

    var handleOnBlur = function handleOnBlur() {
      if (!isFocusedWithin()) {
        setIsFocused(false);
        debouncedHideMovers();
      }
    };
    /**
     * Events are added via DOM events (vs. React synthetic events),
     * as the child React components swallow mouse events.
     */


    if (node && !registerRef.current) {
      node.addEventListener('focus', handleOnFocus, true);
      node.addEventListener('blur', handleOnBlur, true);
      registerRef.current = true;
    }

    return function () {
      if (node) {
        node.removeEventListener('focus', handleOnFocus);
        node.removeEventListener('blur', handleOnBlur);
      }
    };
  }, [ref, registerRef, setIsFocused, debouncedShowMovers, debouncedHideMovers]);
  return {
    showMovers: showMovers,
    gestures: {
      onMouseMove: debouncedShowMovers,
      onMouseLeave: debouncedHideMovers
    }
  };
}

var requestAnimationFrameId;
/**
 * Hook that toggles the highlight (outline) state of a block
 *
 * @param {string} clientId The block's clientId
 *
 * @return {Function} Callback function to toggle highlight state.
 */

function useToggleBlockHighlight(clientId) {
  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      toggleBlockHighlight = _useDispatch.toggleBlockHighlight;

  var updateBlockHighlight = (0, _element.useCallback)(function (isFocused) {
    toggleBlockHighlight(clientId, isFocused);
  }, [clientId]);
  (0, _element.useEffect)(function () {
    // On mount, we make sure to cancel any pending animation frame request
    // that hasn't been completed yet. Components like NavigableToolbar may
    // mount and unmount quickly.
    if (requestAnimationFrameId) {
      cancelAnimationFrame(requestAnimationFrameId);
    }

    return function () {
      // Sequences state change to enable editor updates (e.g. cursor
      // position) to render correctly.
      requestAnimationFrameId = requestAnimationFrame(function () {
        updateBlockHighlight(false);
      });
    };
  }, []);
  return updateBlockHighlight;
}
//# sourceMappingURL=utils.js.map