import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useRef, useState, useEffect } from '@wordpress/element';
import { focus, getRectangleFromRange } from '@wordpress/dom';
import { ESCAPE } from '@wordpress/keycodes';
import deprecated from '@wordpress/deprecated';
import { useViewportMatch } from '@wordpress/compose';
import { close } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { computePopoverPosition } from './utils';
import withFocusReturn from '../higher-order/with-focus-return';
import withConstrainedTabbing from '../higher-order/with-constrained-tabbing';
import PopoverDetectOutside from './detect-outside';
import Button from '../button';
import ScrollLock from '../scroll-lock';
import IsolatedEventContainer from '../isolated-event-container';
import { Slot, Fill, useSlot } from '../slot-fill';
import Animate from '../animate';
var FocusManaged = withConstrainedTabbing(withFocusReturn(function (_ref) {
  var children = _ref.children;
  return children;
}));
/**
 * Name of slot in which popover should fill.
 *
 * @type {string}
 */

var SLOT_NAME = 'Popover';

function computeAnchorRect(anchorRefFallback, anchorRect, getAnchorRect) {
  var anchorRef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var shouldAnchorIncludePadding = arguments.length > 4 ? arguments[4] : undefined;

  if (anchorRect) {
    return anchorRect;
  }

  if (getAnchorRect) {
    if (!anchorRefFallback.current) {
      return;
    }

    return getAnchorRect(anchorRefFallback.current);
  }

  if (anchorRef !== false) {
    if (!anchorRef) {
      return;
    }

    if (anchorRef instanceof window.Range) {
      return getRectangleFromRange(anchorRef);
    }

    if (anchorRef instanceof window.Element) {
      var _rect2 = anchorRef.getBoundingClientRect();

      if (shouldAnchorIncludePadding) {
        return _rect2;
      }

      return withoutPadding(_rect2, anchorRef);
    }

    var top = anchorRef.top,
        bottom = anchorRef.bottom;
    var topRect = top.getBoundingClientRect();
    var bottomRect = bottom.getBoundingClientRect();

    var _rect = new window.DOMRect(topRect.left, topRect.top, topRect.width, bottomRect.bottom - topRect.top);

    if (shouldAnchorIncludePadding) {
      return _rect;
    }

    return withoutPadding(_rect, anchorRef);
  }

  if (!anchorRefFallback.current) {
    return;
  }

  var parentNode = anchorRefFallback.current.parentNode;
  var rect = parentNode.getBoundingClientRect();

  if (shouldAnchorIncludePadding) {
    return rect;
  }

  return withoutPadding(rect, parentNode);
}

function withoutPadding(rect, element) {
  var _window$getComputedSt = window.getComputedStyle(element),
      paddingTop = _window$getComputedSt.paddingTop,
      paddingBottom = _window$getComputedSt.paddingBottom,
      paddingLeft = _window$getComputedSt.paddingLeft,
      paddingRight = _window$getComputedSt.paddingRight;

  var top = paddingTop ? parseInt(paddingTop, 10) : 0;
  var bottom = paddingBottom ? parseInt(paddingBottom, 10) : 0;
  var left = paddingLeft ? parseInt(paddingLeft, 10) : 0;
  var right = paddingRight ? parseInt(paddingRight, 10) : 0;
  return {
    x: rect.left + left,
    y: rect.top + top,
    width: rect.width - left - right,
    height: rect.height - top - bottom,
    left: rect.left + left,
    right: rect.right - right,
    top: rect.top + top,
    bottom: rect.bottom - bottom
  };
}
/**
 * Hook used to focus the first tabbable element on mount.
 *
 * @param {boolean|string} focusOnMount Focus on mount mode.
 * @param {Object}         contentRef   Reference to the popover content element.
 */


function useFocusContentOnMount(focusOnMount, contentRef) {
  // Focus handling
  useEffect(function () {
    /*
     * Without the setTimeout, the dom node is not being focused. Related:
     * https://stackoverflow.com/questions/35522220/react-ref-with-focus-doesnt-work-without-settimeout-my-example
     *
     * TODO: Treat the cause, not the symptom.
     */
    var focusTimeout = setTimeout(function () {
      if (!focusOnMount || !contentRef.current) {
        return;
      }

      if (focusOnMount === 'firstElement') {
        // Find first tabbable node within content and shift focus, falling
        // back to the popover panel itself.
        var firstTabbable = focus.tabbable.find(contentRef.current)[0];

        if (firstTabbable) {
          firstTabbable.focus();
        } else {
          contentRef.current.focus();
        }

        return;
      }

      if (focusOnMount === 'container') {
        // Focus the popover panel itself so items in the popover are easily
        // accessed via keyboard navigation.
        contentRef.current.focus();
      }
    }, 0);
    return function () {
      return clearTimeout(focusTimeout);
    };
  }, []);
}
/**
 * Sets or removes an element attribute.
 *
 * @param {Element} element The element to modify.
 * @param {string}  name    The attribute name to set or remove.
 * @param {?string} value   The value to set. A falsy value will remove the
 *                          attribute.
 */


function setAttribute(element, name, value) {
  if (!value) {
    if (element.hasAttribute(name)) {
      element.removeAttribute(name);
    }
  } else if (element.getAttribute(name) !== value) {
    element.setAttribute(name, value);
  }
}
/**
 * Sets or removes an element style property.
 *
 * @param {Element} element  The element to modify.
 * @param {string}  property The property to set or remove.
 * @param {?string} value    The value to set. A falsy value will remove the
 *                           property.
 */


function setStyle(element, property) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (element.style[property] !== value) {
    element.style[property] = value;
  }
}
/**
 * Sets or removes an element class.
 *
 * @param {Element} element The element to modify.
 * @param {string}  name    The class to set or remove.
 * @param {boolean} toggle  True to set the class, false to remove.
 */


function setClass(element, name, toggle) {
  if (toggle) {
    if (!element.classList.contains(name)) {
      element.classList.add(name);
    }
  } else if (element.classList.contains(name)) {
    element.classList.remove(name);
  }
}

var Popover = function Popover(_ref2) {
  var headerTitle = _ref2.headerTitle,
      onClose = _ref2.onClose,
      onKeyDown = _ref2.onKeyDown,
      children = _ref2.children,
      className = _ref2.className,
      _ref2$noArrow = _ref2.noArrow,
      noArrow = _ref2$noArrow === void 0 ? true : _ref2$noArrow,
      isAlternate = _ref2.isAlternate,
      _ref2$position = _ref2.position,
      position = _ref2$position === void 0 ? 'bottom right' : _ref2$position,
      range = _ref2.range,
      _ref2$focusOnMount = _ref2.focusOnMount,
      focusOnMount = _ref2$focusOnMount === void 0 ? 'firstElement' : _ref2$focusOnMount,
      anchorRef = _ref2.anchorRef,
      shouldAnchorIncludePadding = _ref2.shouldAnchorIncludePadding,
      anchorRect = _ref2.anchorRect,
      getAnchorRect = _ref2.getAnchorRect,
      expandOnMobile = _ref2.expandOnMobile,
      _ref2$animate = _ref2.animate,
      animate = _ref2$animate === void 0 ? true : _ref2$animate,
      onClickOutside = _ref2.onClickOutside,
      onFocusOutside = _ref2.onFocusOutside,
      __unstableSticky = _ref2.__unstableSticky,
      _ref2$__unstableSlotN = _ref2.__unstableSlotName,
      __unstableSlotName = _ref2$__unstableSlotN === void 0 ? SLOT_NAME : _ref2$__unstableSlotN,
      __unstableAllowVerticalSubpixelPosition = _ref2.__unstableAllowVerticalSubpixelPosition,
      __unstableAllowHorizontalSubpixelPosition = _ref2.__unstableAllowHorizontalSubpixelPosition,
      _ref2$__unstableFixed = _ref2.__unstableFixedPosition,
      __unstableFixedPosition = _ref2$__unstableFixed === void 0 ? true : _ref2$__unstableFixed,
      __unstableBoundaryParent = _ref2.__unstableBoundaryParent,
      contentProps = _objectWithoutProperties(_ref2, ["headerTitle", "onClose", "onKeyDown", "children", "className", "noArrow", "isAlternate", "position", "range", "focusOnMount", "anchorRef", "shouldAnchorIncludePadding", "anchorRect", "getAnchorRect", "expandOnMobile", "animate", "onClickOutside", "onFocusOutside", "__unstableSticky", "__unstableSlotName", "__unstableAllowVerticalSubpixelPosition", "__unstableAllowHorizontalSubpixelPosition", "__unstableFixedPosition", "__unstableBoundaryParent"]);

  var anchorRefFallback = useRef(null);
  var contentRef = useRef(null);
  var containerRef = useRef();
  var contentRect = useRef();
  var isMobileViewport = useViewportMatch('medium', '<');

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      animateOrigin = _useState2[0],
      setAnimateOrigin = _useState2[1];

  var slot = useSlot(__unstableSlotName);
  var isExpanded = expandOnMobile && isMobileViewport;
  noArrow = isExpanded || noArrow;
  useEffect(function () {
    if (isExpanded) {
      setClass(containerRef.current, 'is-without-arrow', noArrow);
      setClass(containerRef.current, 'is-alternate', isAlternate);
      setAttribute(containerRef.current, 'data-x-axis');
      setAttribute(containerRef.current, 'data-y-axis');
      setStyle(containerRef.current, 'top');
      setStyle(containerRef.current, 'left');
      setStyle(contentRef.current, 'maxHeight');
      setStyle(contentRef.current, 'maxWidth');
      setStyle(containerRef.current, 'position');
      return;
    }

    var refresh = function refresh() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          subpixels = _ref3.subpixels;

      if (!containerRef.current || !contentRef.current) {
        return;
      }

      var anchor = computeAnchorRect(anchorRefFallback, anchorRect, getAnchorRect, anchorRef, shouldAnchorIncludePadding);

      if (!anchor) {
        return;
      }

      if (!contentRect.current) {
        contentRect.current = contentRef.current.getBoundingClientRect();
      }

      var relativeOffsetTop = 0; // If there is a positioned ancestor element that is not the body,
      // subtract the position from the anchor rect. If the position of
      // the popover is fixed, the offset parent is null or the body
      // element, in which case the position is relative to the viewport.
      // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent

      if (!__unstableFixedPosition) {
        setStyle(containerRef.current, 'position', 'absolute');
        var offsetParent = containerRef.current.offsetParent;
        var offsetParentRect = offsetParent.getBoundingClientRect();
        relativeOffsetTop = offsetParentRect.top;
        anchor = new window.DOMRect(anchor.left - offsetParentRect.left, anchor.top - offsetParentRect.top, anchor.width, anchor.height);
      } else {
        setStyle(containerRef.current, 'position');
      }

      var boundaryElement;

      if (__unstableBoundaryParent) {
        var _containerRef$current;

        boundaryElement = (_containerRef$current = containerRef.current.closest('.popover-slot')) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.parentNode;
      }

      var _computePopoverPositi = computePopoverPosition(anchor, contentRect.current, position, __unstableSticky, containerRef.current, relativeOffsetTop, boundaryElement),
          popoverTop = _computePopoverPositi.popoverTop,
          popoverLeft = _computePopoverPositi.popoverLeft,
          xAxis = _computePopoverPositi.xAxis,
          yAxis = _computePopoverPositi.yAxis,
          contentHeight = _computePopoverPositi.contentHeight,
          contentWidth = _computePopoverPositi.contentWidth;

      if (typeof popoverTop === 'number' && typeof popoverLeft === 'number') {
        if (subpixels && __unstableAllowVerticalSubpixelPosition) {
          setStyle(containerRef.current, 'left', popoverLeft + 'px');
          setStyle(containerRef.current, 'top');
          setStyle(containerRef.current, 'transform', "translateY(".concat(popoverTop, "px)"));
        } else if (subpixels && __unstableAllowHorizontalSubpixelPosition) {
          setStyle(containerRef.current, 'top', popoverTop + 'px');
          setStyle(containerRef.current, 'left');
          setStyle(containerRef.current, 'transform', "translate(".concat(popoverLeft, "px)"));
        } else {
          setStyle(containerRef.current, 'top', popoverTop + 'px');
          setStyle(containerRef.current, 'left', popoverLeft + 'px');
          setStyle(containerRef.current, 'transform');
        }
      }

      setClass(containerRef.current, 'is-without-arrow', noArrow || xAxis === 'center' && yAxis === 'middle');
      setClass(containerRef.current, 'is-alternate', isAlternate);
      setAttribute(containerRef.current, 'data-x-axis', xAxis);
      setAttribute(containerRef.current, 'data-y-axis', yAxis);
      setStyle(contentRef.current, 'maxHeight', typeof contentHeight === 'number' ? contentHeight + 'px' : '');
      setStyle(contentRef.current, 'maxWidth', typeof contentWidth === 'number' ? contentWidth + 'px' : ''); // Compute the animation position

      var yAxisMapping = {
        top: 'bottom',
        bottom: 'top'
      };
      var xAxisMapping = {
        left: 'right',
        right: 'left'
      };
      var animateYAxis = yAxisMapping[yAxis] || 'middle';
      var animateXAxis = xAxisMapping[xAxis] || 'center';
      setAnimateOrigin(animateXAxis + ' ' + animateYAxis);
    }; // Height may still adjust between now and the next tick.


    var timeoutId = window.setTimeout(refresh);
    /*
     * There are sometimes we need to reposition or resize the popover that
     * are not handled by the resize/scroll window events (i.e. CSS changes
     * in the layout that changes the position of the anchor).
     *
     * For these situations, we refresh the popover every 0.5s
     */

    var intervalHandle = window.setInterval(refresh, 500);
    var rafId;

    var refreshOnAnimationFrame = function refreshOnAnimationFrame() {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(refresh);
    }; // Sometimes a click trigger a layout change that affects the popover
    // position. This is an opportunity to immediately refresh rather than
    // at the interval.


    window.addEventListener('click', refreshOnAnimationFrame);
    window.addEventListener('resize', refresh);
    window.addEventListener('scroll', refresh, true);
    var observer;
    var observeElement = __unstableAllowVerticalSubpixelPosition || __unstableAllowHorizontalSubpixelPosition;

    if (observeElement) {
      observer = new window.MutationObserver(function () {
        return refresh({
          subpixels: true
        });
      });
      observer.observe(observeElement, {
        attributes: true
      });
    }

    return function () {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalHandle);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('scroll', refresh, true);
      window.removeEventListener('click', refreshOnAnimationFrame);
      window.cancelAnimationFrame(rafId);

      if (observer) {
        observer.disconnect();
      }
    };
  }, [isExpanded, anchorRect, getAnchorRect, anchorRef, shouldAnchorIncludePadding, position, __unstableSticky, __unstableAllowVerticalSubpixelPosition, __unstableAllowHorizontalSubpixelPosition, __unstableBoundaryParent]);
  useFocusContentOnMount(focusOnMount, contentRef); // Event handlers

  var maybeClose = function maybeClose(event) {
    // Close on escape
    if (event.keyCode === ESCAPE && onClose) {
      event.stopPropagation();
      onClose();
    } // Preserve original content prop behavior


    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  /**
   * Shims an onFocusOutside callback to be compatible with a deprecated
   * onClickOutside prop function, if provided.
   *
   * @param {FocusEvent} event Focus event from onFocusOutside.
   */


  function handleOnFocusOutside(event) {
    // Defer to given `onFocusOutside` if specified. Call `onClose` only if
    // both `onFocusOutside` and `onClickOutside` are unspecified. Doing so
    // assures backwards-compatibility for prior `onClickOutside` default.
    if (onFocusOutside) {
      onFocusOutside(event);
      return;
    } else if (!onClickOutside) {
      if (onClose) {
        onClose();
      }

      return;
    } // Simulate MouseEvent using FocusEvent#relatedTarget as emulated click
    // target. MouseEvent constructor is unsupported in Internet Explorer.


    var clickEvent;

    try {
      clickEvent = new window.MouseEvent('click');
    } catch (error) {
      clickEvent = document.createEvent('MouseEvent');
      clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }

    Object.defineProperty(clickEvent, 'target', {
      get: function get() {
        return event.relatedTarget;
      }
    });
    deprecated('Popover onClickOutside prop', {
      alternative: 'onFocusOutside'
    });
    onClickOutside(clickEvent);
  } // Disable reason: We care to capture the _bubbled_ events from inputs
  // within popover as inferring close intent.


  var content = createElement(PopoverDetectOutside, {
    onFocusOutside: handleOnFocusOutside
  }, createElement(Animate, {
    type: animate && animateOrigin ? 'appear' : null,
    options: {
      origin: animateOrigin
    }
  }, function (_ref4) {
    var animateClassName = _ref4.className;
    return createElement(IsolatedEventContainer, _extends({
      className: classnames('components-popover', className, animateClassName, {
        'is-expanded': isExpanded,
        'is-without-arrow': noArrow,
        'is-alternate': isAlternate
      })
    }, contentProps, {
      onKeyDown: maybeClose,
      ref: containerRef
    }), isExpanded && createElement(ScrollLock, null), isExpanded && createElement("div", {
      className: "components-popover__header"
    }, createElement("span", {
      className: "components-popover__header-title"
    }, headerTitle), createElement(Button, {
      className: "components-popover__close",
      icon: close,
      onClick: onClose
    })), createElement("div", {
      ref: contentRef,
      className: "components-popover__content",
      tabIndex: "-1"
    }, children));
  })); // Apply focus to element as long as focusOnMount is truthy; false is
  // the only "disabled" value.

  if (focusOnMount) {
    content = createElement(FocusManaged, null, content);
  }

  if (slot.ref) {
    content = createElement(Fill, {
      name: __unstableSlotName
    }, content);
  }

  if (anchorRef || anchorRect) {
    return content;
  }

  return createElement("span", {
    ref: anchorRefFallback
  }, content);
};

var PopoverContainer = Popover;

PopoverContainer.Slot = function (_ref5) {
  var _ref5$name = _ref5.name,
      name = _ref5$name === void 0 ? SLOT_NAME : _ref5$name;
  return createElement(Slot, {
    bubblesVirtually: true,
    name: name,
    className: "popover-slot"
  });
};

export default PopoverContainer;
//# sourceMappingURL=index.js.map