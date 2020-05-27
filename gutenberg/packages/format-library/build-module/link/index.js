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
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSpokenMessages } from '@wordpress/components';
import { getTextContent, applyFormat, removeFormat, slice, isCollapsed } from '@wordpress/rich-text';
import { isURL, isEmail } from '@wordpress/url';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { link as linkIcon, linkOff } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import InlineLinkUI from './inline';
var name = 'core/link';

var title = __('Link');

export var link = {
  name: name,
  title: title,
  tagName: 'a',
  className: null,
  attributes: {
    url: 'href',
    type: 'data-type',
    id: 'data-id',
    target: 'target'
  },
  __unstablePasteRule: function __unstablePasteRule(value, _ref) {
    var html = _ref.html,
        plainText = _ref.plainText;

    if (isCollapsed(value)) {
      return value;
    }

    var pastedText = (html || plainText).replace(/<[^>]+>/g, '').trim(); // A URL was pasted, turn the selection into a link

    if (!isURL(pastedText)) {
      return value;
    } // Allows us to ask for this information when we get a report.


    window.console.log('Created link:\n\n', pastedText);
    return applyFormat(value, {
      type: name,
      attributes: {
        url: decodeEntities(pastedText)
      }
    });
  },
  edit: withSpokenMessages( /*#__PURE__*/function (_Component) {
    _inherits(LinkEdit, _Component);

    var _super = _createSuper(LinkEdit);

    function LinkEdit() {
      var _this;

      _classCallCheck(this, LinkEdit);

      _this = _super.apply(this, arguments);
      _this.addLink = _this.addLink.bind(_assertThisInitialized(_this));
      _this.stopAddingLink = _this.stopAddingLink.bind(_assertThisInitialized(_this));
      _this.onRemoveFormat = _this.onRemoveFormat.bind(_assertThisInitialized(_this));
      _this.state = {
        addingLink: false
      };
      return _this;
    }

    _createClass(LinkEdit, [{
      key: "addLink",
      value: function addLink() {
        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;
        var text = getTextContent(slice(value));

        if (text && isURL(text)) {
          onChange(applyFormat(value, {
            type: name,
            attributes: {
              url: text
            }
          }));
        } else if (text && isEmail(text)) {
          onChange(applyFormat(value, {
            type: name,
            attributes: {
              url: "mailto:".concat(text)
            }
          }));
        } else {
          this.setState({
            addingLink: true
          });
        }
      }
    }, {
      key: "stopAddingLink",
      value: function stopAddingLink() {
        this.setState({
          addingLink: false
        });
        this.props.onFocus();
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            onChange = _this$props2.onChange,
            speak = _this$props2.speak;
        onChange(removeFormat(value, name));
        speak(__('Link removed.'), 'assertive');
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            isActive = _this$props3.isActive,
            activeAttributes = _this$props3.activeAttributes,
            value = _this$props3.value,
            onChange = _this$props3.onChange;
        return createElement(Fragment, null, createElement(RichTextShortcut, {
          type: "primary",
          character: "k",
          onUse: this.addLink
        }), createElement(RichTextShortcut, {
          type: "primaryShift",
          character: "k",
          onUse: this.onRemoveFormat
        }), isActive && createElement(RichTextToolbarButton, {
          name: "link",
          icon: linkOff,
          title: __('Unlink'),
          onClick: this.onRemoveFormat,
          isActive: isActive,
          shortcutType: "primaryShift",
          shortcutCharacter: "k"
        }), !isActive && createElement(RichTextToolbarButton, {
          name: "link",
          icon: linkIcon,
          title: title,
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }), (this.state.addingLink || isActive) && createElement(InlineLinkUI, {
          addingLink: this.state.addingLink,
          stopAddingLink: this.stopAddingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          value: value,
          onChange: onChange
        }));
      }
    }]);

    return LinkEdit;
  }(Component))
};
//# sourceMappingURL=index.js.map