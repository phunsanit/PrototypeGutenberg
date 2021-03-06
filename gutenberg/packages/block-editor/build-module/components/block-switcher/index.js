import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { castArray, filter, first, mapKeys, orderBy, uniq, map } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _n, sprintf } from '@wordpress/i18n';
import { Dropdown, ToolbarButton, ToolbarGroup, MenuGroup } from '@wordpress/components';
import { getBlockType, getPossibleBlockTransformations, switchToBlockType, cloneBlock, getBlockFromExample } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { DOWN } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { layout } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import BlockIcon from '../block-icon';
import BlockStyles from '../block-styles';
import BlockPreview from '../block-preview';
import BlockTypesList from '../block-types-list';
var POPOVER_PROPS = {
  position: 'bottom right',
  isAlternate: true
};
export var BlockSwitcher = /*#__PURE__*/function (_Component) {
  _inherits(BlockSwitcher, _Component);

  var _super = _createSuper(BlockSwitcher);

  function BlockSwitcher() {
    var _this;

    _classCallCheck(this, BlockSwitcher);

    _this = _super.apply(this, arguments);
    _this.state = {
      hoveredClassName: null
    };
    _this.onHoverClassName = _this.onHoverClassName.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BlockSwitcher, [{
    key: "onHoverClassName",
    value: function onHoverClassName(className) {
      this.setState({
        hoveredClassName: className
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          blocks = _this$props.blocks,
          onTransform = _this$props.onTransform,
          inserterItems = _this$props.inserterItems,
          hasBlockStyles = _this$props.hasBlockStyles;
      var hoveredClassName = this.state.hoveredClassName;

      if (!blocks || !blocks.length) {
        return null;
      }

      var hoveredBlock = blocks[0];
      var hoveredBlockType = getBlockType(hoveredBlock.name);
      var itemsByName = mapKeys(inserterItems, function (_ref) {
        var name = _ref.name;
        return name;
      });
      var possibleBlockTransformations = orderBy(filter(getPossibleBlockTransformations(blocks), function (block) {
        return block && !!itemsByName[block.name];
      }), function (block) {
        return itemsByName[block.name].frecency;
      }, 'desc'); // When selection consists of blocks of multiple types, display an
      // appropriate icon to communicate the non-uniformity.

      var isSelectionOfSameType = uniq(map(blocks, 'name')).length === 1;
      var icon;

      if (isSelectionOfSameType) {
        var sourceBlockName = blocks[0].name;
        var blockType = getBlockType(sourceBlockName);
        icon = blockType.icon;
      } else {
        icon = layout;
      }

      if (!hasBlockStyles && !possibleBlockTransformations.length) {
        return createElement(ToolbarGroup, null, createElement(ToolbarButton, {
          disabled: true,
          className: "block-editor-block-switcher__no-switcher-icon",
          title: __('Block icon'),
          icon: createElement(BlockIcon, {
            icon: icon,
            showColors: true
          })
        }));
      }

      return createElement(Dropdown, {
        popoverProps: POPOVER_PROPS,
        className: "block-editor-block-switcher",
        contentClassName: "block-editor-block-switcher__popover",
        renderToggle: function renderToggle(_ref2) {
          var onToggle = _ref2.onToggle,
              isOpen = _ref2.isOpen;

          var openOnArrowDown = function openOnArrowDown(event) {
            if (!isOpen && event.keyCode === DOWN) {
              event.preventDefault();
              event.stopPropagation();
              onToggle();
            }
          };

          var label = 1 === blocks.length ? __('Change block type or style') : sprintf(
          /* translators: %s: number of blocks. */
          _n('Change type of %d block', 'Change type of %d blocks', blocks.length), blocks.length);
          return createElement(ToolbarGroup, null, createElement(ToolbarButton, {
            className: "block-editor-block-switcher__toggle",
            onClick: onToggle,
            "aria-haspopup": "true",
            "aria-expanded": isOpen,
            title: label,
            onKeyDown: openOnArrowDown,
            showTooltip: true,
            icon: createElement(BlockIcon, {
              icon: icon,
              showColors: true
            })
          }));
        },
        renderContent: function renderContent(_ref3) {
          var onClose = _ref3.onClose;
          return createElement(Fragment, null, (hasBlockStyles || possibleBlockTransformations.length !== 0) && createElement("div", {
            className: "block-editor-block-switcher__container"
          }, hasBlockStyles && createElement(MenuGroup, null, createElement("div", {
            className: "block-editor-block-switcher__label"
          }, __('Styles')), createElement(BlockStyles, {
            clientId: blocks[0].clientId,
            onSwitch: onClose,
            onHoverClassName: _this2.onHoverClassName
          })), possibleBlockTransformations.length !== 0 && createElement(MenuGroup, null, createElement("div", {
            className: "block-editor-block-switcher__label"
          }, __('Transform to')), createElement(BlockTypesList, {
            items: possibleBlockTransformations.map(function (destinationBlockType) {
              return {
                id: destinationBlockType.name,
                icon: destinationBlockType.icon,
                title: destinationBlockType.title
              };
            }),
            onSelect: function onSelect(item) {
              onTransform(blocks, item.id);
              onClose();
            }
          }))), hoveredClassName !== null && createElement("div", {
            className: "block-editor-block-switcher__preview"
          }, createElement("div", {
            className: "block-editor-block-switcher__preview-title"
          }, __('Preview')), createElement(BlockPreview, {
            viewportWidth: 500,
            blocks: hoveredBlockType.example ? getBlockFromExample(hoveredBlock.name, {
              attributes: _objectSpread({}, hoveredBlockType.example.attributes, {
                className: hoveredClassName
              }),
              innerBlocks: hoveredBlockType.example.innerBlocks
            }) : cloneBlock(hoveredBlock, {
              className: hoveredClassName
            })
          })));
        }
      });
    }
  }]);

  return BlockSwitcher;
}(Component);
export default compose(withSelect(function (select, _ref4) {
  var clientIds = _ref4.clientIds;

  var _select = select('core/block-editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      getBlockRootClientId = _select.getBlockRootClientId,
      getInserterItems = _select.getInserterItems;

  var _select2 = select('core/blocks'),
      getBlockStyles = _select2.getBlockStyles;

  var rootClientId = getBlockRootClientId(first(castArray(clientIds)));
  var blocks = getBlocksByClientId(clientIds);
  var firstBlock = blocks && blocks.length === 1 ? blocks[0] : null;
  var styles = firstBlock && getBlockStyles(firstBlock.name);
  return {
    blocks: blocks,
    inserterItems: getInserterItems(rootClientId),
    hasBlockStyles: styles && styles.length > 0
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    onTransform: function onTransform(blocks, name) {
      dispatch('core/block-editor').replaceBlocks(ownProps.clientIds, switchToBlockType(blocks, name));
    }
  };
}))(BlockSwitcher);
//# sourceMappingURL=index.js.map