import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { Text, View, Platform, PanResponder, Dimensions, ScrollView, Keyboard, StatusBar, TouchableHighlight, LayoutAnimation } from 'react-native';
import Modal from 'react-native-modal';
import SafeArea from 'react-native-safe-area';
import { subscribeAndroidModalClosed } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withPreferredColorScheme } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './styles.scss';
import Button from './button';
import Cell from './cell';
import CyclePickerCell from './cycle-picker-cell';
import PickerCell from './picker-cell';
import SwitchCell from './switch-cell';
import RangeCell from './range-cell';
import ColorCell from './color-cell';
import KeyboardAvoidingView from './keyboard-avoiding-view';
import { BottomSheetProvider } from './bottom-sheet-context';
var ANIMATION_DURATION = 300;

var BottomSheet = /*#__PURE__*/function (_Component) {
  _inherits(BottomSheet, _Component);

  var _super = _createSuper(BottomSheet);

  function BottomSheet() {
    var _this;

    _classCallCheck(this, BottomSheet);

    _this = _super.apply(this, arguments);
    _this.onSafeAreaInsetsUpdate = _this.onSafeAreaInsetsUpdate.bind(_assertThisInitialized(_this));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.isScrolling = _this.isScrolling.bind(_assertThisInitialized(_this));
    _this.onShouldEnableScroll = _this.onShouldEnableScroll.bind(_assertThisInitialized(_this));
    _this.onShouldSetBottomSheetMaxHeight = _this.onShouldSetBottomSheetMaxHeight.bind(_assertThisInitialized(_this));
    _this.onDimensionsChange = _this.onDimensionsChange.bind(_assertThisInitialized(_this));
    _this.onCloseBottomSheet = _this.onCloseBottomSheet.bind(_assertThisInitialized(_this));
    _this.onHandleClosingBottomSheet = _this.onHandleClosingBottomSheet.bind(_assertThisInitialized(_this));
    _this.onHardwareButtonPress = _this.onHardwareButtonPress.bind(_assertThisInitialized(_this));
    _this.onHandleHardwareButtonPress = _this.onHandleHardwareButtonPress.bind(_assertThisInitialized(_this));
    _this.onReplaceSubsheet = _this.onReplaceSubsheet.bind(_assertThisInitialized(_this));
    _this.keyboardWillShow = _this.keyboardWillShow.bind(_assertThisInitialized(_this));
    _this.keyboardDidHide = _this.keyboardDidHide.bind(_assertThisInitialized(_this));
    _this.state = {
      safeAreaBottomInset: 0,
      bounces: false,
      maxHeight: 0,
      keyboardHeight: 0,
      scrollEnabled: true,
      isScrolling: false,
      onCloseBottomSheet: null,
      onHardwareButtonPress: null,
      isMaxHeightSet: true,
      currentScreen: '',
      extraProps: {}
    };
    SafeArea.getSafeAreaInsetsForRootView().then(_this.onSafeAreaInsetsUpdate);
    Dimensions.addEventListener('change', _this.onDimensionsChange);
    return _this;
  }

  _createClass(BottomSheet, [{
    key: "keyboardWillShow",
    value: function keyboardWillShow(e) {
      var _this2 = this;

      var height = e.endCoordinates.height;
      this.setState({
        keyboardHeight: height
      }, function () {
        return _this2.onSetMaxHeight();
      });
    }
  }, {
    key: "keyboardDidHide",
    value: function keyboardDidHide() {
      var _this3 = this;

      this.setState({
        keyboardHeight: 0
      }, function () {
        return _this3.onSetMaxHeight();
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      if (Platform.OS === 'android') {
        this.androidModalClosedSubscription = subscribeAndroidModalClosed(function () {
          _this4.props.onClose();
        });
      }

      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      this.safeAreaEventSubscription = SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
      this.onSetMaxHeight();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.androidModalClosedSubscription) {
        this.androidModalClosedSubscription.remove();
      }

      if (this.safeAreaEventSubscription === null) {
        return;
      }

      this.safeAreaEventSubscription.remove();
      this.safeAreaEventSubscription = null;
      SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
      this.keyboardWillShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isVisible = this.props.isVisible;

      if (!prevProps.isVisible && isVisible) {
        this.setState({
          currentScreen: ''
        });
      }
    }
  }, {
    key: "onSafeAreaInsetsUpdate",
    value: function onSafeAreaInsetsUpdate(result) {
      var safeAreaBottomInset = this.state.safeAreaBottomInset;

      if (this.safeAreaEventSubscription === null) {
        return;
      }

      var safeAreaInsets = result.safeAreaInsets;

      if (safeAreaBottomInset !== safeAreaInsets.bottom) {
        this.setState({
          safeAreaBottomInset: safeAreaInsets.bottom
        });
      }
    }
  }, {
    key: "onSetMaxHeight",
    value: function onSetMaxHeight() {
      var _Dimensions$get = Dimensions.get('window'),
          height = _Dimensions$get.height,
          width = _Dimensions$get.width;

      var _this$state = this.state,
          safeAreaBottomInset = _this$state.safeAreaBottomInset,
          keyboardHeight = _this$state.keyboardHeight;
      var statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0; // `maxHeight` when modal is opened along with a keyboard

      var maxHeightWithOpenKeyboard = 0.95 * (Dimensions.get('window').height - keyboardHeight - statusBarHeight); // On horizontal mode `maxHeight` has to be set on 90% of width

      if (width > height) {
        this.setState({
          maxHeight: Math.min(0.9 * height, maxHeightWithOpenKeyboard)
        }); //	On vertical mode `maxHeight` has to be set on 50% of width
      } else {
        this.setState({
          maxHeight: Math.min(height / 2 - safeAreaBottomInset, maxHeightWithOpenKeyboard)
        });
      }
    }
  }, {
    key: "onDimensionsChange",
    value: function onDimensionsChange() {
      this.onSetMaxHeight();
      this.setState({
        bounces: false
      });
    }
  }, {
    key: "isCloseToBottom",
    value: function isCloseToBottom(_ref) {
      var layoutMeasurement = _ref.layoutMeasurement,
          contentOffset = _ref.contentOffset,
          contentSize = _ref.contentSize;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - contentOffset.y;
    }
  }, {
    key: "isCloseToTop",
    value: function isCloseToTop(_ref2) {
      var contentOffset = _ref2.contentOffset;
      return contentOffset.y < 10;
    }
  }, {
    key: "onScroll",
    value: function onScroll(_ref3) {
      var nativeEvent = _ref3.nativeEvent;

      if (this.isCloseToTop(nativeEvent)) {
        this.setState({
          bounces: false
        });
      } else if (this.isCloseToBottom(nativeEvent)) {
        this.setState({
          bounces: true
        });
      }
    }
  }, {
    key: "onShouldEnableScroll",
    value: function onShouldEnableScroll(value) {
      this.setState({
        scrollEnabled: value
      });
    }
  }, {
    key: "onShouldSetBottomSheetMaxHeight",
    value: function onShouldSetBottomSheetMaxHeight(value) {
      this.setState({
        isMaxHeightSet: value
      });
    }
  }, {
    key: "isScrolling",
    value: function isScrolling(value) {
      this.setState({
        isScrolling: value
      });
    }
  }, {
    key: "onHandleClosingBottomSheet",
    value: function onHandleClosingBottomSheet(action) {
      this.setState({
        onCloseBottomSheet: action
      });
    }
  }, {
    key: "onHandleHardwareButtonPress",
    value: function onHandleHardwareButtonPress(action) {
      this.setState({
        onHardwareButtonPress: action
      });
    }
  }, {
    key: "onCloseBottomSheet",
    value: function onCloseBottomSheet() {
      var onClose = this.props.onClose;
      var onCloseBottomSheet = this.state.onCloseBottomSheet;

      if (onCloseBottomSheet) {
        onCloseBottomSheet();
      }

      onClose();
    }
  }, {
    key: "onHardwareButtonPress",
    value: function onHardwareButtonPress() {
      var onClose = this.props.onClose;
      var onHardwareButtonPress = this.state.onHardwareButtonPress;

      if (onHardwareButtonPress) {
        return onHardwareButtonPress();
      }

      return onClose();
    }
  }, {
    key: "onReplaceSubsheet",
    value: function onReplaceSubsheet(destination, extraProps, callback) {
      LayoutAnimation.configureNext(LayoutAnimation.create(ANIMATION_DURATION, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity));
      this.setState({
        currentScreen: destination,
        extraProps: extraProps || {}
      }, callback);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? '' : _this$props$title,
          isVisible = _this$props.isVisible,
          leftButton = _this$props.leftButton,
          rightButton = _this$props.rightButton,
          hideHeader = _this$props.hideHeader,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$contentSt = _this$props.contentStyle,
          contentStyle = _this$props$contentSt === void 0 ? {} : _this$props$contentSt,
          getStylesFromColorScheme = _this$props.getStylesFromColorScheme,
          onDismiss = _this$props.onDismiss,
          children = _this$props.children,
          rest = _objectWithoutProperties(_this$props, ["title", "isVisible", "leftButton", "rightButton", "hideHeader", "style", "contentStyle", "getStylesFromColorScheme", "onDismiss", "children"]);

      var _this$state2 = this.state,
          maxHeight = _this$state2.maxHeight,
          bounces = _this$state2.bounces,
          safeAreaBottomInset = _this$state2.safeAreaBottomInset,
          isScrolling = _this$state2.isScrolling,
          scrollEnabled = _this$state2.scrollEnabled,
          isMaxHeightSet = _this$state2.isMaxHeightSet,
          extraProps = _this$state2.extraProps,
          currentScreen = _this$state2.currentScreen;
      var panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(evt, gestureState) {
          // 'swiping-to-close' option is temporarily and partially disabled
          //	on Android ( swipe / drag is still available in the top most area - near drag indicator)
          if (Platform.OS === 'ios') {
            // Activates swipe down over child Touchables if the swipe is long enough.
            // With this we can adjust sensibility on the swipe vs tap gestures.
            if (gestureState.dy > 3 && !bounces) {
              gestureState.dy = 0;
              return true;
            }
          }

          return false;
        }
      });

      var getHeader = function getHeader() {
        return createElement(View, null, createElement(View, {
          style: styles.head
        }, createElement(View, {
          style: {
            flex: 1
          }
        }, leftButton), createElement(View, {
          style: styles.titleContainer
        }, createElement(Text, {
          style: styles.title
        }, title)), createElement(View, {
          style: {
            flex: 1
          }
        }, rightButton)), createElement(View, {
          style: styles.separator
        }));
      };

      var backgroundStyle = getStylesFromColorScheme(styles.background, styles.backgroundDark);
      return createElement(Modal, _extends({
        isVisible: isVisible,
        style: styles.bottomModal,
        animationInTiming: 600,
        animationOutTiming: 300,
        backdropTransitionInTiming: 50,
        backdropTransitionOutTiming: 50,
        backdropOpacity: 0.2,
        onBackdropPress: this.onCloseBottomSheet,
        onBackButtonPress: this.onHardwareButtonPress,
        onSwipe: this.onCloseBottomSheet,
        onDismiss: Platform.OS === 'ios' ? onDismiss : undefined,
        onModalHide: Platform.OS === 'android' ? onDismiss : undefined,
        swipeDirection: "down",
        onMoveShouldSetResponder: scrollEnabled && panResponder.panHandlers.onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture: scrollEnabled && panResponder.panHandlers.onMoveShouldSetResponderCapture,
        onAccessibilityEscape: this.onCloseBottomSheet
      }, rest), createElement(KeyboardAvoidingView, {
        behavior: Platform.OS === 'ios' && 'padding',
        style: _objectSpread({}, backgroundStyle, {
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }, style),
        keyboardVerticalOffset: -safeAreaBottomInset
      }, createElement(View, {
        style: styles.dragIndicator
      }), !hideHeader && getHeader(), createElement(ScrollView, {
        disableScrollViewPanResponder: true,
        bounces: bounces,
        onScroll: this.onScroll,
        onScrollBeginDrag: function onScrollBeginDrag() {
          return _this5.isScrolling(true);
        },
        onScrollEndDrag: function onScrollEndDrag() {
          return _this5.isScrolling(false);
        },
        scrollEventThrottle: 16,
        style: isMaxHeightSet ? {
          maxHeight: maxHeight
        } : {},
        contentContainerStyle: [styles.content, hideHeader && styles.emptyHeader, contentStyle],
        scrollEnabled: scrollEnabled,
        automaticallyAdjustContentInsets: false
      }, createElement(BottomSheetProvider, {
        value: {
          shouldEnableBottomSheetScroll: this.onShouldEnableScroll,
          shouldDisableBottomSheetMaxHeight: this.onShouldSetBottomSheetMaxHeight,
          isBottomSheetContentScrolling: isScrolling,
          onCloseBottomSheet: this.onHandleClosingBottomSheet,
          onHardwareButtonPress: this.onHandleHardwareButtonPress,
          onReplaceSubsheet: this.onReplaceSubsheet,
          extraProps: extraProps,
          currentScreen: currentScreen
        }
      }, createElement(TouchableHighlight, {
        accessible: false
      }, createElement(Fragment, null, children))), createElement(View, {
        style: {
          height: safeAreaBottomInset
        }
      }))));
    }
  }]);

  return BottomSheet;
}(Component);

function getWidth() {
  return Math.min(Dimensions.get('window').width, styles.background.maxWidth);
}

var ThemedBottomSheet = withPreferredColorScheme(BottomSheet);
ThemedBottomSheet.getWidth = getWidth;
ThemedBottomSheet.Button = Button;
ThemedBottomSheet.Cell = Cell;
ThemedBottomSheet.CyclePickerCell = CyclePickerCell;
ThemedBottomSheet.PickerCell = PickerCell;
ThemedBottomSheet.SwitchCell = SwitchCell;
ThemedBottomSheet.RangeCell = RangeCell;
ThemedBottomSheet.ColorCell = ColorCell;
export default ThemedBottomSheet;
//# sourceMappingURL=index.native.js.map