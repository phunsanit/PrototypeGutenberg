import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import React from 'react';
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BottomSheet from '../bottom-sheet';
import styles from './styles.scss';

function Separator() {
  var separatorStyle = usePreferredColorSchemeStyle(styles.separator, styles.separatorDark);
  return createElement(View, {
    style: separatorStyle
  });
}

var Picker = /*#__PURE__*/function (_Component) {
  _inherits(Picker, _Component);

  var _super = _createSuper(Picker);

  function Picker() {
    var _this;

    _classCallCheck(this, Picker);

    _this = _super.apply(this, arguments);
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.onCellPress = _this.onCellPress.bind(_assertThisInitialized(_this));
    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(Picker, [{
    key: "presentPicker",
    value: function presentPicker() {
      this.setState({
        isVisible: true
      });
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.setState({
        isVisible: false
      });
    }
  }, {
    key: "onCellPress",
    value: function onCellPress(value) {
      var onChange = this.props.onChange;
      onChange(value);
      this.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          options = _this$props.options,
          leftAlign = _this$props.leftAlign,
          hideCancelButton = _this$props.hideCancelButton;
      var isVisible = this.state.isVisible;
      return createElement(BottomSheet, {
        isVisible: isVisible,
        onClose: this.onClose,
        style: {
          paddingBottom: 20
        },
        hideHeader: true
      }, createElement(View, null, options.map(function (option, index) {
        return createElement(Fragment, null, options.length > 1 && option.separated && createElement(Separator, null), createElement(BottomSheet.Cell, {
          icon: option.icon,
          key: index,
          leftAlign: leftAlign,
          label: option.label,
          separatorType: 'none',
          onPress: function onPress() {
            return _this2.onCellPress(option.value);
          },
          disabled: option.disabled,
          style: option.disabled && styles.disabled
        }));
      }), !hideCancelButton && createElement(BottomSheet.Cell, {
        label: __('Cancel'),
        onPress: this.onClose,
        separatorType: 'none'
      })));
    }
  }]);

  return Picker;
}(Component);

export { Picker as default };
//# sourceMappingURL=index.android.js.map