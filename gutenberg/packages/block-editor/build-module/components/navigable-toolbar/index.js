import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { NavigableMenu, Toolbar } from '@wordpress/components';
import { useState, useRef, useLayoutEffect, useEffect, useCallback } from '@wordpress/element';
import { focus } from '@wordpress/dom';
import { useShortcut } from '@wordpress/keyboard-shortcuts';

function useUpdateLayoutEffect(effect, deps) {
  var mounted = useRef(false);
  useLayoutEffect(function () {
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
  var _focus$tabbable$find = focus.tabbable.find(container),
      _focus$tabbable$find2 = _slicedToArray(_focus$tabbable$find, 1),
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
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAccessibleToolbar = _useState2[0],
      setIsAccessibleToolbar = _useState2[1];

  var determineIsAccessibleToolbar = useCallback(function () {
    var tabbables = focus.tabbable.find(ref.current);
    setIsAccessibleToolbar(hasOnlyToolbarItem(tabbables));
  }, []);
  useLayoutEffect(determineIsAccessibleToolbar, []);
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
  var _useState3 = useState(focusOnMount),
      _useState4 = _slicedToArray(_useState3, 1),
      initialFocusOnMount = _useState4[0];

  var focusToolbar = useCallback(function () {
    focusFirstTabbableIn(ref.current);
  }, []);
  useShortcut('core/block-editor/focus-toolbar', focusToolbar, {
    bindGlobal: true,
    eventName: 'keydown'
  });
  useEffect(function () {
    if (initialFocusOnMount) {
      focusToolbar();
    }
  }, [isAccessibleToolbar, initialFocusOnMount, focusToolbar]);
}

function NavigableToolbar(_ref) {
  var children = _ref.children,
      focusOnMount = _ref.focusOnMount,
      props = _objectWithoutProperties(_ref, ["children", "focusOnMount"]);

  var wrapper = useRef();
  var isAccessibleToolbar = useIsAccessibleToolbar(wrapper);
  useToolbarFocus(wrapper, focusOnMount, isAccessibleToolbar);

  if (isAccessibleToolbar) {
    return createElement(Toolbar, _extends({
      __experimentalAccessibilityLabel: props['aria-label'],
      ref: wrapper
    }, props), children);
  }

  return createElement(NavigableMenu, _extends({
    orientation: "horizontal",
    role: "toolbar",
    ref: wrapper
  }, props), children);
}

export default NavigableToolbar;
//# sourceMappingURL=index.js.map