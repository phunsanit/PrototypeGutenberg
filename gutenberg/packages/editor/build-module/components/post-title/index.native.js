import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { View } from 'react-native';
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { __experimentalRichText as RichText, create, insert } from '@wordpress/rich-text';
import { decodeEntities } from '@wordpress/html-entities';
import { withDispatch, withSelect } from '@wordpress/data';
import { withFocusOutside } from '@wordpress/components';
import { withInstanceId, compose } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { pasteHandler } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import styles from './style.scss';

var PostTitle = /*#__PURE__*/function (_Component) {
  _inherits(PostTitle, _Component);

  var _super = _createSuper(PostTitle);

  function PostTitle() {
    _classCallCheck(this, PostTitle);

    return _super.apply(this, arguments);
  }

  _createClass(PostTitle, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Unselect if any other block is selected
      if (this.props.isSelected && !prevProps.isAnyBlockSelected && this.props.isAnyBlockSelected) {
        this.props.onUnselect();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.innerRef) {
        this.props.innerRef(this);
      }
    }
  }, {
    key: "handleFocusOutside",
    value: function handleFocusOutside() {
      this.props.onUnselect();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.props.onSelect();
    }
  }, {
    key: "onPaste",
    value: function onPaste(_ref) {
      var value = _ref.value,
          onChange = _ref.onChange,
          plainText = _ref.plainText;
      var content = pasteHandler({
        plainText: plainText,
        mode: 'INLINE',
        tagName: 'p'
      });

      if (typeof content === 'string') {
        var valueToInsert = create({
          html: content
        });
        onChange(insert(value, valueToInsert));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          style = _this$props.style,
          title = _this$props.title,
          focusedBorderColor = _this$props.focusedBorderColor,
          borderStyle = _this$props.borderStyle,
          isDimmed = _this$props.isDimmed;
      var decodedPlaceholder = decodeEntities(placeholder);
      var borderColor = this.props.isSelected ? focusedBorderColor : 'transparent';
      return createElement(View, {
        style: [styles.titleContainer, borderStyle, {
          borderColor: borderColor
        }, isDimmed && styles.dimmed],
        accessible: !this.props.isSelected,
        accessibilityLabel: isEmpty(title) ?
        /* translators: accessibility text. empty post title. */
        __('Post title. Empty') : sprintf(
        /* translators: accessibility text. %s: text content of the post title. */
        __('Post title. %s'), title)
      }, createElement(RichText, {
        tagName: 'p',
        tagsToEliminate: ['strong'],
        unstableOnFocus: this.props.onSelect,
        onBlur: this.props.onBlur // always assign onBlur as a props
        ,
        multiline: false,
        style: style,
        styles: styles,
        fontSize: 24,
        fontWeight: 'bold',
        deleteEnter: true,
        onChange: function onChange(value) {
          _this.props.onUpdate(value);
        },
        onPaste: this.onPaste,
        placeholder: decodedPlaceholder,
        value: title,
        onSelectionChange: function onSelectionChange() {},
        onEnter: this.props.onEnterPress,
        disableEditingMenu: true,
        __unstableIsSelected: this.props.isSelected,
        __unstableOnCreateUndoLevel: function __unstableOnCreateUndoLevel() {}
      }));
    }
  }]);

  return PostTitle;
}(Component);

export default compose(withSelect(function (select) {
  var _select = select('core/editor'),
      isPostTitleSelected = _select.isPostTitleSelected;

  var _select2 = select('core/block-editor'),
      getSelectedBlockClientId = _select2.getSelectedBlockClientId,
      getBlockRootClientId = _select2.getBlockRootClientId;

  var selectedId = getSelectedBlockClientId();
  var selectionIsNested = !!getBlockRootClientId(selectedId);
  return {
    isAnyBlockSelected: !!selectedId,
    isSelected: isPostTitleSelected(),
    isDimmed: selectionIsNested
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      undo = _dispatch.undo,
      redo = _dispatch.redo,
      togglePostTitleSelection = _dispatch.togglePostTitleSelection;

  var _dispatch2 = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock,
      insertDefaultBlock = _dispatch2.insertDefaultBlock;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onUndo: undo,
    onRedo: redo,
    onSelect: function onSelect() {
      togglePostTitleSelection(true);
      clearSelectedBlock();
    },
    onUnselect: function onUnselect() {
      togglePostTitleSelection(false);
    }
  };
}), withInstanceId, withFocusOutside)(PostTitle);
//# sourceMappingURL=index.native.js.map