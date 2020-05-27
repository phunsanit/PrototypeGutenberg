"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockInvalidWarning = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _warning = _interopRequireDefault(require("../warning"));

var _blockCompare = _interopRequireDefault(require("../block-compare"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BlockInvalidWarning = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(BlockInvalidWarning, _Component);

  var _super = _createSuper(BlockInvalidWarning);

  function BlockInvalidWarning(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockInvalidWarning);
    _this = _super.call(this, props);
    _this.state = {
      compare: false
    };
    _this.onCompare = _this.onCompare.bind((0, _assertThisInitialized2.default)(_this));
    _this.onCompareClose = _this.onCompareClose.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(BlockInvalidWarning, [{
    key: "onCompare",
    value: function onCompare() {
      this.setState({
        compare: true
      });
    }
  }, {
    key: "onCompareClose",
    value: function onCompareClose() {
      this.setState({
        compare: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          convertToHTML = _this$props.convertToHTML,
          convertToBlocks = _this$props.convertToBlocks,
          convertToClassic = _this$props.convertToClassic,
          attemptBlockRecovery = _this$props.attemptBlockRecovery,
          block = _this$props.block;
      var hasHTMLBlock = !!(0, _blocks.getBlockType)('core/html');
      var compare = this.state.compare;
      var hiddenActions = [{
        title: (0, _i18n.__)('Convert to Classic Block'),
        onClick: convertToClassic
      }, {
        title: (0, _i18n.__)('Attempt Block Recovery'),
        onClick: attemptBlockRecovery
      }];
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_warning.default, {
        actions: [(0, _element.createElement)(_components.Button, {
          key: "convert",
          onClick: this.onCompare,
          isSecondary: hasHTMLBlock,
          isPrimary: !hasHTMLBlock
        }, // translators: Button to fix block content
        (0, _i18n._x)('Resolve', 'imperative verb')), hasHTMLBlock && (0, _element.createElement)(_components.Button, {
          key: "edit",
          onClick: convertToHTML,
          isPrimary: true
        }, (0, _i18n.__)('Convert to HTML'))],
        secondaryActions: hiddenActions
      }, (0, _i18n.__)('This block contains unexpected or invalid content.')), compare && (0, _element.createElement)(_components.Modal, {
        title: // translators: Dialog title to fix block content
        (0, _i18n.__)('Resolve Block'),
        onRequestClose: this.onCompareClose,
        className: "block-editor-block-compare"
      }, (0, _element.createElement)(_blockCompare.default, {
        block: block,
        onKeep: convertToHTML,
        onConvert: convertToBlocks,
        convertor: blockToBlocks,
        convertButtonText: (0, _i18n.__)('Convert to Blocks')
      })));
    }
  }]);
  return BlockInvalidWarning;
}(_element.Component);

exports.BlockInvalidWarning = BlockInvalidWarning;

var blockToClassic = function blockToClassic(block) {
  return (0, _blocks.createBlock)('core/freeform', {
    content: block.originalContent
  });
};

var blockToHTML = function blockToHTML(block) {
  return (0, _blocks.createBlock)('core/html', {
    content: block.originalContent
  });
};

var blockToBlocks = function blockToBlocks(block) {
  return (0, _blocks.rawHandler)({
    HTML: block.originalContent
  });
};

var recoverBlock = function recoverBlock(_ref) {
  var name = _ref.name,
      attributes = _ref.attributes,
      innerBlocks = _ref.innerBlocks;
  return (0, _blocks.createBlock)(name, attributes, innerBlocks);
};

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;
  return {
    block: select('core/block-editor').getBlock(clientId)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var block = _ref3.block;

  var _dispatch = dispatch('core/block-editor'),
      replaceBlock = _dispatch.replaceBlock;

  return {
    convertToClassic: function convertToClassic() {
      replaceBlock(block.clientId, blockToClassic(block));
    },
    convertToHTML: function convertToHTML() {
      replaceBlock(block.clientId, blockToHTML(block));
    },
    convertToBlocks: function convertToBlocks() {
      replaceBlock(block.clientId, blockToBlocks(block));
    },
    attemptBlockRecovery: function attemptBlockRecovery() {
      replaceBlock(block.clientId, recoverBlock(block));
    }
  };
})])(BlockInvalidWarning);

exports.default = _default;
//# sourceMappingURL=block-invalid-warning.js.map