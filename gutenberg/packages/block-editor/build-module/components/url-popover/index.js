import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';
import { chevronDown } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import LinkViewer from './link-viewer';
import LinkEditor from './link-editor';

var URLPopover = /*#__PURE__*/function (_Component) {
  _inherits(URLPopover, _Component);

  var _super = _createSuper(URLPopover);

  function URLPopover() {
    var _this;

    _classCallCheck(this, URLPopover);

    _this = _super.apply(this, arguments);
    _this.toggleSettingsVisibility = _this.toggleSettingsVisibility.bind(_assertThisInitialized(_this));
    _this.state = {
      isSettingsExpanded: false
    };
    return _this;
  }

  _createClass(URLPopover, [{
    key: "toggleSettingsVisibility",
    value: function toggleSettingsVisibility() {
      this.setState({
        isSettingsExpanded: !this.state.isSettingsExpanded
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          additionalControls = _this$props.additionalControls,
          children = _this$props.children,
          renderSettings = _this$props.renderSettings,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'bottom center' : _this$props$position,
          _this$props$focusOnMo = _this$props.focusOnMount,
          focusOnMount = _this$props$focusOnMo === void 0 ? 'firstElement' : _this$props$focusOnMo,
          popoverProps = _objectWithoutProperties(_this$props, ["additionalControls", "children", "renderSettings", "position", "focusOnMount"]);

      var isSettingsExpanded = this.state.isSettingsExpanded;
      var showSettings = !!renderSettings && isSettingsExpanded;
      return createElement(Popover, _extends({
        className: "block-editor-url-popover",
        focusOnMount: focusOnMount,
        position: position
      }, popoverProps), createElement("div", {
        className: "block-editor-url-popover__input-container"
      }, createElement("div", {
        className: "block-editor-url-popover__row"
      }, children, !!renderSettings && createElement(Button, {
        className: "block-editor-url-popover__settings-toggle",
        icon: chevronDown,
        label: __('Link settings'),
        onClick: this.toggleSettingsVisibility,
        "aria-expanded": isSettingsExpanded
      })), showSettings && createElement("div", {
        className: "block-editor-url-popover__row block-editor-url-popover__settings"
      }, renderSettings())), additionalControls && !showSettings && createElement("div", {
        className: "block-editor-url-popover__additional-controls"
      }, additionalControls));
    }
  }]);

  return URLPopover;
}(Component);

URLPopover.LinkEditor = LinkEditor;
URLPopover.LinkViewer = LinkViewer;
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/url-popover/README.md
 */

export default URLPopover;
//# sourceMappingURL=index.js.map