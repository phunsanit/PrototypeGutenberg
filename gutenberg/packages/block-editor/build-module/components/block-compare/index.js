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
import classnames from 'classnames';
import { castArray } from 'lodash'; // diff doesn't tree-shake correctly, so we import from the individual
// module here, to avoid including too much of the library

import { diffChars } from 'diff/lib/diff/character';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { getSaveContent, getSaveElement } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import BlockView from './block-view';

var BlockCompare = /*#__PURE__*/function (_Component) {
  _inherits(BlockCompare, _Component);

  var _super = _createSuper(BlockCompare);

  function BlockCompare() {
    _classCallCheck(this, BlockCompare);

    return _super.apply(this, arguments);
  }

  _createClass(BlockCompare, [{
    key: "getDifference",
    value: function getDifference(originalContent, newContent) {
      var difference = diffChars(originalContent, newContent);
      return difference.map(function (item, pos) {
        var classes = classnames({
          'block-editor-block-compare__added': item.added,
          'block-editor-block-compare__removed': item.removed
        });
        return createElement("span", {
          key: pos,
          className: classes
        }, item.value);
      });
    }
  }, {
    key: "getOriginalContent",
    value: function getOriginalContent(block) {
      return {
        rawContent: block.originalContent,
        renderedContent: getSaveElement(block.name, block.attributes)
      };
    }
  }, {
    key: "getConvertedContent",
    value: function getConvertedContent(block) {
      // The convertor may return an array of items or a single item
      var newBlocks = castArray(block); // Get converted block details

      var newContent = newBlocks.map(function (item) {
        return getSaveContent(item.name, item.attributes, item.innerBlocks);
      });
      var renderedContent = newBlocks.map(function (item) {
        return getSaveElement(item.name, item.attributes, item.innerBlocks);
      });
      return {
        rawContent: newContent.join(''),
        renderedContent: renderedContent
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          block = _this$props.block,
          onKeep = _this$props.onKeep,
          onConvert = _this$props.onConvert,
          convertor = _this$props.convertor,
          convertButtonText = _this$props.convertButtonText;
      var original = this.getOriginalContent(block);
      var converted = this.getConvertedContent(convertor(block));
      var difference = this.getDifference(original.rawContent, converted.rawContent);
      return createElement("div", {
        className: "block-editor-block-compare__wrapper"
      }, createElement(BlockView, {
        title: __('Current'),
        className: "block-editor-block-compare__current",
        action: onKeep,
        actionText: __('Convert to HTML'),
        rawContent: original.rawContent,
        renderedContent: original.renderedContent
      }), createElement(BlockView, {
        title: __('After Conversion'),
        className: "block-editor-block-compare__converted",
        action: onConvert,
        actionText: convertButtonText,
        rawContent: difference,
        renderedContent: converted.renderedContent
      }));
    }
  }]);

  return BlockCompare;
}(Component);

export default BlockCompare;
//# sourceMappingURL=index.js.map