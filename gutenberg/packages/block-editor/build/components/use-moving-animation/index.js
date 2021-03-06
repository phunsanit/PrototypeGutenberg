"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _web = require("react-spring/web.cjs");

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _dom = require("@wordpress/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Simple reducer used to increment a counter.
 *
 * @param {number} state  Previous counter value.
 * @return {number} New state value.
 */
var counterReducer = function counterReducer(state) {
  return state + 1;
};

var getAbsolutePosition = function getAbsolutePosition(element) {
  return {
    top: element.offsetTop,
    left: element.offsetLeft
  };
};
/**
 * Hook used to compute the styles required to move a div into a new position.
 *
 * The way this animation works is the following:
 *  - It first renders the element as if there was no animation.
 *  - It takes a snapshot of the position of the block to use it
 *    as a destination point for the animation.
 *  - It restores the element to the previous position using a CSS transform
 *  - It uses the "resetAnimation" flag to reset the animation
 *    from the beginning in order to animate to the new destination point.
 *
 * @param {Object}  ref                      Reference to the element to animate.
 * @param {boolean} isSelected               Whether it's the current block or not.
 * @param {boolean} adjustScrolling          Adjust the scroll position to the current block.
 * @param {boolean} enableAnimation          Enable/Disable animation.
 * @param {*}       triggerAnimationOnChange Variable used to trigger the animation if it changes.
 *
 * @return {Object} Style object.
 */


function useMovingAnimation(ref, isSelected, adjustScrolling, enableAnimation, triggerAnimationOnChange) {
  var prefersReducedMotion = (0, _compose.useReducedMotion)() || !enableAnimation;

  var _useReducer = (0, _element.useReducer)(counterReducer, 0),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      triggeredAnimation = _useReducer2[0],
      triggerAnimation = _useReducer2[1];

  var _useReducer3 = (0, _element.useReducer)(counterReducer, 0),
      _useReducer4 = (0, _slicedToArray2.default)(_useReducer3, 2),
      finishedAnimation = _useReducer4[0],
      endAnimation = _useReducer4[1];

  var _useState = (0, _element.useState)({
    x: 0,
    y: 0,
    scrollTop: 0
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      transform = _useState2[0],
      setTransform = _useState2[1];

  var previous = ref.current ? getAbsolutePosition(ref.current) : null;
  var scrollContainer = (0, _element.useRef)();
  (0, _element.useLayoutEffect)(function () {
    if (triggeredAnimation) {
      endAnimation();
    }
  }, [triggeredAnimation]);
  (0, _element.useLayoutEffect)(function () {
    if (!previous) {
      return;
    }

    scrollContainer.current = (0, _dom.getScrollContainer)(ref.current);

    if (prefersReducedMotion) {
      if (adjustScrolling && scrollContainer.current) {
        // if the animation is disabled and the scroll needs to be adjusted,
        // just move directly to the final scroll position
        ref.current.style.transform = 'none';

        var _destination = getAbsolutePosition(ref.current);

        scrollContainer.current.scrollTop = scrollContainer.current.scrollTop - previous.top + _destination.top;
      }

      return;
    }

    ref.current.style.transform = 'none';
    var destination = getAbsolutePosition(ref.current);
    var newTransform = {
      x: previous.left - destination.left,
      y: previous.top - destination.top,
      scrollTop: scrollContainer.current ? scrollContainer.current.scrollTop - previous.top + destination.top : 0
    };
    ref.current.style.transform = newTransform.x === 0 && newTransform.y === 0 ? undefined : "translate3d(".concat(newTransform.x, "px,").concat(newTransform.y, "px,0)");
    triggerAnimation();
    setTransform(newTransform);
  }, [triggerAnimationOnChange]);
  var animationProps = (0, _web.useSpring)({
    from: {
      x: transform.x,
      y: transform.y
    },
    to: {
      x: 0,
      y: 0
    },
    reset: triggeredAnimation !== finishedAnimation,
    config: {
      mass: 5,
      tension: 2000,
      friction: 200
    },
    immediate: prefersReducedMotion,
    onFrame: function onFrame(props) {
      if (adjustScrolling && scrollContainer.current && !prefersReducedMotion && props.y) {
        scrollContainer.current.scrollTop = transform.scrollTop + props.y;
      }
    }
  }); // Dismiss animations if disabled.

  return prefersReducedMotion ? {} : {
    transformOrigin: 'center',
    transform: (0, _web.interpolate)([animationProps.x, animationProps.y], function (x, y) {
      return x === 0 && y === 0 ? undefined : "translate3d(".concat(x, "px,").concat(y, "px,0)");
    }),
    zIndex: (0, _web.interpolate)([animationProps.x, animationProps.y], function (x, y) {
      return !isSelected || x === 0 && y === 0 ? undefined : "1";
    })
  };
}

var _default = useMovingAnimation;
exports.default = _default;
//# sourceMappingURL=index.js.map