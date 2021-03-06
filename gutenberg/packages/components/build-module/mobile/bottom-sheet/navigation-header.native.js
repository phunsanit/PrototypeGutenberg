import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback, Text, Platform } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Icon, chevronLeft, arrowLeft } from '@wordpress/icons';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './styles.scss';

function BottomSheetNavigationHeader(_ref) {
  var leftButtonOnPress = _ref.leftButtonOnPress,
      screen = _ref.screen;
  var isIOS = Platform.OS === 'ios';
  var bottomSheetHeaderTitleStyle = usePreferredColorSchemeStyle(styles.bottomSheetHeaderTitle, styles.bottomSheetHeaderTitleDark);
  var bottomSheetButtonTextStyle = usePreferredColorSchemeStyle(styles.bottomSheetButtonText, styles.bottomSheetButtonTextDark);
  var chevronLeftStyle = usePreferredColorSchemeStyle(styles.chevronLeftIcon, styles.chevronLeftIconDark);
  var arrowLeftStyle = usePreferredColorSchemeStyle(styles.arrowLeftIcon, styles.arrowLeftIconDark);
  return createElement(View, {
    style: styles.bottomSheetHeader
  }, createElement(TouchableWithoutFeedback, {
    onPress: leftButtonOnPress
  }, createElement(View, {
    style: styles.bottomSheetBackButton
  }, isIOS ? createElement(Fragment, null, createElement(Icon, {
    icon: chevronLeft,
    size: 40,
    style: chevronLeftStyle
  }), createElement(Text, {
    style: bottomSheetButtonTextStyle,
    maxFontSizeMultiplier: 2
  }, __('Back'))) : createElement(Icon, {
    icon: arrowLeft,
    size: 24,
    style: arrowLeftStyle
  }))), createElement(Text, {
    style: bottomSheetHeaderTitleStyle,
    maxFontSizeMultiplier: 3
  }, screen), createElement(View, {
    style: styles.bottomSheetRightSpace
  }));
}

export default BottomSheetNavigationHeader;
//# sourceMappingURL=navigation-header.native.js.map