"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _components = require("@wordpress/components");

var _dom = require("@wordpress/dom");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

/**
 * WordPress dependencies
 */
function useUpdateLayoutEffect(effect, deps) {
  var mounted = (0, _element.useRef)(false);
  (0, _element.useLayoutEffect)(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
  }, deps);
}

function hasOnlyToolbarItem(elements) {
  var dataProp = 'experimentalToolbarItem';
  return !elements.some(function (element) {
    return !(dataProp in element.dataset);
  });
}

function focusFirstTabbableIn(container) {
  var _focus$tabbable$find = _dom.focus.tabbable.find(container),
      _focus$tabbable$find2 = (0, _slicedToArray2.default)(_focus$tabbable$find, 1),
      firstTabbable = _focus$tabbable$find2[0];

  if (firstTabbable) {
    firstTabbable.focus();
  }
}

function useIsAccessibleToolbar(ref) {
  // By default, it's gonna render NavigableMenu. If all the tabbable elements
  // inside the toolbar are ToolbarItem components (or derived components like
  // ToolbarButton), then we can wrap them with the accessible Toolbar
  // component.
  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isAccessibleToolbar = _useState2[0],
      setIsAccessibleToolbar = _useState2[1];

  var determineIsAccessibleToolbar = (0, _element.useCallback)(function () {
    var tabbables = _dom.focus.tabbable.find(ref.current);

    setIsAccessibleToolbar(hasOnlyToolbarItem(tabbables));
  }, []);
  (0, _element.useLayoutEffect)(determineIsAccessibleToolbar, []);
  useUpdateLayoutEffect(function () {
    // Toolbar buttons may be rendered asynchronously, so we use
    // MutationObserver to check if the toolbar subtree has been modified
    var observer = new window.MutationObserver(determineIsAccessibleToolbar);
    observer.observe(ref.current, {
      childList: true,
      subtree: true
    });
    return function () {
      return observer.disconnect();
    };
  }, [isAccessibleToolbar]);
  return isAccessibleToolbar;
}

function useToolbarFocus(ref, focusOnMount, isAccessibleToolbar) {
  // Make sure we don't use modified versions of this prop
  var _useState3 = (0, _element.useState)(focusOnMount),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
      initialFocusOnMount = _useState4[0];

  var focusToolbar = (0, _element.useCallback)(function () {
    focusFirstTabbableIn(ref.current);
  }, []);
  (0, _keyboardShortcuts.useShortcut)('core/block-editor/focus-toolbar', focusToolbar, {
    bindGlobal: true,
    eventName: 'keydown'
  });
  (0, _element.useEffect)(function () {
    if (initialFocusOnMount) {
      focusToolbar();
    }
  }, [isAccessibleToolbar, initialFocusOnMount, focusToolbar]);
}

function NavigableToolbar(_ref) {
  var children = _ref.children,
      focusOnMount = _ref.focusOnMount,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "focusOnMount"]);
  var wrapper = (0, _element.useRef)();
  var isAccessibleToolbar = useIsAccessibleToolbar(wrapper);
  useToolbarFocus(wrapper, focusOnMount, isAccessibleToolbar);

  if (isAccessibleToolbar) {
    return (0, _element.createElement)(_components.Toolbar, (0, _extends2.default)({
      __experimentalAccessibilityLabel: props['aria-label'],
      ref: wrapper
    }, props), children);
  }

  return (0, _element.createElement)(_components.NavigableMenu, (0, _extends2.default)({
    orientation: "horizontal",
    role: "toolbar",
    ref: wrapper
  }, props), children);
}

var _default = NavigableToolbar;
exports.default = _default;
//# sourceMappingURL=index.js.map