import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback, Text, Platform, LayoutAnimation, Animated, Easing } from 'react-native';
import { take, values, map, reduce } from 'lodash';
/**
 * WordPress dependencies
 */

import { useState, useEffect } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './style.scss';
var ANIMATION_DURATION = 200;
var isIOS = Platform.OS === 'ios';

var Segment = function Segment(_ref) {
  var isSelected = _ref.isSelected,
      title = _ref.title,
      onPress = _ref.onPress,
      onLayout = _ref.onLayout;
  var isSelectedIOS = isIOS && isSelected;
  var segmentStyle = [styles.segment, isIOS && styles.segmentIOS];
  var textStyle = usePreferredColorSchemeStyle(styles.buttonTextDefault, styles.buttonTextDefaultDark);
  var selectedTextStyle = usePreferredColorSchemeStyle(styles.buttonTextSelected, styles.buttonTextSelectedDark);
  var shadowStyle = usePreferredColorSchemeStyle(styles.shadowIOS, {});
  return createElement(View, {
    style: isSelectedIOS && shadowStyle
  }, createElement(TouchableWithoutFeedback, {
    onPress: onPress
  }, createElement(View, {
    style: segmentStyle,
    onLayout: onLayout
  }, createElement(Text, {
    style: [textStyle, isSelected && selectedTextStyle],
    maxFontSizeMultiplier: 2
  }, title))));
};

var SegmentedControls = function SegmentedControls(_ref2) {
  var segments = _ref2.segments,
      segmentHandler = _ref2.segmentHandler,
      selectedIndex = _ref2.selectedIndex,
      addonLeft = _ref2.addonLeft,
      addonRight = _ref2.addonRight;
  var selectedSegmentIndex = selectedIndex || 0;

  var _useState = useState(selectedSegmentIndex),
      _useState2 = _slicedToArray(_useState, 2),
      activeSegmentIndex = _useState2[0],
      setActiveSegmentIndex = _useState2[1];

  var _useState3 = useState(_defineProperty({}, activeSegmentIndex, {
    width: 0,
    height: 0
  })),
      _useState4 = _slicedToArray(_useState3, 2),
      segmentsDimensions = _useState4[0],
      setSegmentsDimensions = _useState4[1];

  var _useState6 = useState(new Animated.Value(0)),
      _useState7 = _slicedToArray(_useState6, 1),
      positionAnimationValue = _useState7[0];

  useEffect(function () {
    setActiveSegmentIndex(selectedSegmentIndex);
    segmentHandler(segments[selectedSegmentIndex]);
  }, []);
  useEffect(function () {
    positionAnimationValue.setValue(calculateEndValue(activeSegmentIndex));
  }, [segmentsDimensions]);
  var containerStyle = usePreferredColorSchemeStyle(styles.container, styles.containerDark);

  function performAnimation(index) {
    Animated.timing(positionAnimationValue, {
      toValue: calculateEndValue(index),
      duration: ANIMATION_DURATION,
      easing: Easing.ease
    }).start();
  }

  function calculateEndValue(index) {
    var _ref3 = isIOS ? styles.containerIOS : styles.container,
        offset = _ref3.paddingLeft;

    var widths = map(values(segmentsDimensions), 'width');
    var widthsDistance = take(widths, index);
    var widthsDistanceSum = reduce(widthsDistance, function (sum, n) {
      return sum + n;
    });
    var endValue = index === 0 ? 0 : widthsDistanceSum;
    return endValue + offset;
  }

  function onHandlePress(segment, index) {
    LayoutAnimation.configureNext(LayoutAnimation.create(ANIMATION_DURATION, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity));
    setActiveSegmentIndex(index);
    segmentHandler(segment);
    performAnimation(index, segment);
  }

  function segmentOnLayout(event, index) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
        width = _event$nativeEvent$la.width,
        height = _event$nativeEvent$la.height;
    setSegmentsDimensions(_objectSpread({}, segmentsDimensions, _defineProperty({}, index, {
      width: width,
      height: height
    })));
  }

  var selectedStyle = usePreferredColorSchemeStyle(styles.selected, styles.selectedDark);
  var width = segmentsDimensions[activeSegmentIndex].width;
  var height = segmentsDimensions[activeSegmentIndex].height;
  var outlineStyle = [styles.outline, isIOS && styles.outlineIOS];
  return createElement(View, {
    style: styles.row
  }, createElement(View, {
    style: styles.flex
  }, addonLeft), createElement(View, {
    style: [containerStyle, isIOS && styles.containerIOS]
  }, segments.map(function (segment, index) {
    return createElement(Segment, {
      title: segment,
      onPress: function onPress() {
        return onHandlePress(segment, index);
      },
      isSelected: activeSegmentIndex === index,
      key: index,
      onLayout: function onLayout(event) {
        return segmentOnLayout(event, index);
      }
    });
  }), createElement(Animated.View, {
    style: [{
      width: width,
      left: positionAnimationValue,
      height: height
    }, selectedStyle, outlineStyle]
  })), createElement(View, {
    style: styles.flex
  }, addonRight));
};

export default SegmentedControls;
//# sourceMappingURL=index.native.js.map