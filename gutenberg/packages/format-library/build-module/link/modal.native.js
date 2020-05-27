import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import React from 'react';
import { Platform } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { prependHTTP } from '@wordpress/url';
import { BottomSheet, withSpokenMessages } from '@wordpress/components';
import { create, insert, isCollapsed, applyFormat, getTextContent, slice } from '@wordpress/rich-text';
import { external, link, textColor } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { createLinkFormat, isValidHref } from './utils';
import styles from './modal.scss';

var ModalLinkUI = /*#__PURE__*/function (_Component) {
  _inherits(ModalLinkUI, _Component);

  var _super = _createSuper(ModalLinkUI);

  function ModalLinkUI() {
    var _this;

    _classCallCheck(this, ModalLinkUI);

    _this = _super.apply(this, arguments);
    _this.submitLink = _this.submitLink.bind(_assertThisInitialized(_this));
    _this.onChangeInputValue = _this.onChangeInputValue.bind(_assertThisInitialized(_this));
    _this.onChangeText = _this.onChangeText.bind(_assertThisInitialized(_this));
    _this.onChangeOpensInNewWindow = _this.onChangeOpensInNewWindow.bind(_assertThisInitialized(_this));
    _this.removeLink = _this.removeLink.bind(_assertThisInitialized(_this));
    _this.onDismiss = _this.onDismiss.bind(_assertThisInitialized(_this));
    _this.state = {
      inputValue: '',
      text: '',
      opensInNewWindow: false
    };
    return _this;
  }

  _createClass(ModalLinkUI, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps === this.props) {
        return;
      }

      var _this$props$activeAtt = this.props.activeAttributes,
          url = _this$props$activeAtt.url,
          target = _this$props$activeAtt.target;
      var opensInNewWindow = target === '_blank';
      this.setState({
        inputValue: url || '',
        text: getTextContent(slice(this.props.value)),
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "onChangeText",
    value: function onChangeText(text) {
      this.setState({
        text: text
      });
    }
  }, {
    key: "onChangeOpensInNewWindow",
    value: function onChangeOpensInNewWindow(opensInNewWindow) {
      this.setState({
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "submitLink",
    value: function submitLink() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          onChange = _this$props.onChange,
          speak = _this$props.speak,
          value = _this$props.value;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow,
          text = _this$state.text;
      var url = prependHTTP(inputValue);
      var linkText = text || inputValue;
      var format = createLinkFormat({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: linkText
      });

      if (isCollapsed(value) && !isActive) {
        // insert link
        var toInsert = applyFormat(create({
          text: linkText
        }), format, 0, linkText.length);
        var newAttributes = insert(value, toInsert);
        onChange(_objectSpread({}, newAttributes, {
          needsSelectionUpdate: true
        }));
      } else if (text !== getTextContent(slice(value))) {
        // edit text in selected link
        var _toInsert = applyFormat(create({
          text: text
        }), format, 0, text.length);

        var _newAttributes = insert(value, _toInsert, value.start, value.end);

        onChange(_objectSpread({}, _newAttributes, {
          needsSelectionUpdate: true
        }));
      } else {
        // transform selected text into link
        var _newAttributes2 = applyFormat(value, format);

        onChange(_objectSpread({}, _newAttributes2, {
          needsSelectionUpdate: true
        }));
      }

      if (!isValidHref(url)) {
        speak(__('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
      } else if (isActive) {
        speak(__('Link edited.'), 'assertive');
      } else {
        speak(__('Link inserted'), 'assertive');
      }

      this.props.onClose();
    }
  }, {
    key: "removeLink",
    value: function removeLink() {
      this.props.onRemove();
      this.props.onClose();
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.state.inputValue === '') {
        this.removeLink();
      } else {
        this.submitLink();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.props.isVisible;
      var text = this.state.text;
      return createElement(BottomSheet, {
        isVisible: isVisible,
        onClose: this.onDismiss,
        hideHeader: true
      },
      /* eslint-disable jsx-a11y/no-autofocus */
      createElement(BottomSheet.Cell, {
        icon: link,
        label: __('URL'),
        value: this.state.inputValue,
        placeholder: __('Add URL'),
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url",
        onChangeValue: this.onChangeInputValue,
        onSubmit: this.onDismiss,
        autoFocus: Platform.OS === 'ios'
      })
      /* eslint-enable jsx-a11y/no-autofocus */
      , createElement(BottomSheet.Cell, {
        icon: textColor,
        label: __('Link text'),
        value: text,
        placeholder: __('Add link text'),
        onChangeValue: this.onChangeText,
        onSubmit: this.onDismiss
      }), createElement(BottomSheet.SwitchCell, {
        icon: external,
        label: __('Open in new tab'),
        value: this.state.opensInNewWindow,
        onValueChange: this.onChangeOpensInNewWindow,
        separatorType: 'fullWidth'
      }), createElement(BottomSheet.Cell, {
        label: __('Remove link'),
        labelStyle: styles.clearLinkButton,
        separatorType: 'none',
        onPress: this.removeLink
      }));
    }
  }]);

  return ModalLinkUI;
}(Component);

export default withSpokenMessages(ModalLinkUI);
//# sourceMappingURL=modal.native.js.map