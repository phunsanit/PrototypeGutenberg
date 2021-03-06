"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendererPath = rendererPath;
exports.default = exports.ServerSideRender = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

var _components = require("@wordpress/components");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function rendererPath(block) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var urlQueryArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _url.addQueryArgs)("/wp/v2/block-renderer/".concat(block), _objectSpread({
    context: 'edit'
  }, null !== attributes ? {
    attributes: attributes
  } : {}, {}, urlQueryArgs));
}

var ServerSideRender = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ServerSideRender, _Component);

  var _super = _createSuper(ServerSideRender);

  function ServerSideRender(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ServerSideRender);
    _this = _super.call(this, props);
    _this.state = {
      response: null
    };
    return _this;
  }

  (0, _createClass2.default)(ServerSideRender, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isStillMounted = true;
      this.fetch(this.props); // Only debounce once the initial fetch occurs to ensure that the first
      // renders show data as soon as possible.

      this.fetch = (0, _lodash.debounce)(this.fetch, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!(0, _lodash.isEqual)(prevProps, this.props)) {
        this.fetch(this.props);
      }
    }
  }, {
    key: "fetch",
    value: function fetch(props) {
      var _this2 = this;

      if (!this.isStillMounted) {
        return;
      }

      if (null !== this.state.response) {
        this.setState({
          response: null
        });
      }

      var block = props.block,
          _props$attributes = props.attributes,
          attributes = _props$attributes === void 0 ? null : _props$attributes,
          _props$urlQueryArgs = props.urlQueryArgs,
          urlQueryArgs = _props$urlQueryArgs === void 0 ? {} : _props$urlQueryArgs;
      var path = rendererPath(block, attributes, urlQueryArgs); // Store the latest fetch request so that when we process it, we can
      // check if it is the current request, to avoid race conditions on slow networks.

      var fetchRequest = this.currentFetchRequest = (0, _apiFetch.default)({
        path: path
      }).then(function (response) {
        if (_this2.isStillMounted && fetchRequest === _this2.currentFetchRequest && response) {
          _this2.setState({
            response: response.rendered
          });
        }
      }).catch(function (error) {
        if (_this2.isStillMounted && fetchRequest === _this2.currentFetchRequest) {
          _this2.setState({
            response: {
              error: true,
              errorMsg: error.message
            }
          });
        }
      });
      return fetchRequest;
    }
  }, {
    key: "render",
    value: function render() {
      var response = this.state.response;
      var _this$props = this.props,
          className = _this$props.className,
          EmptyResponsePlaceholder = _this$props.EmptyResponsePlaceholder,
          ErrorResponsePlaceholder = _this$props.ErrorResponsePlaceholder,
          LoadingResponsePlaceholder = _this$props.LoadingResponsePlaceholder;

      if (response === '') {
        return (0, _element.createElement)(EmptyResponsePlaceholder, (0, _extends2.default)({
          response: response
        }, this.props));
      } else if (!response) {
        return (0, _element.createElement)(LoadingResponsePlaceholder, (0, _extends2.default)({
          response: response
        }, this.props));
      } else if (response.error) {
        return (0, _element.createElement)(ErrorResponsePlaceholder, (0, _extends2.default)({
          response: response
        }, this.props));
      }

      return (0, _element.createElement)(_element.RawHTML, {
        key: "html",
        className: className
      }, response);
    }
  }]);
  return ServerSideRender;
}(_element.Component);

exports.ServerSideRender = ServerSideRender;
ServerSideRender.defaultProps = {
  EmptyResponsePlaceholder: function EmptyResponsePlaceholder(_ref) {
    var className = _ref.className;
    return (0, _element.createElement)(_components.Placeholder, {
      className: className
    }, (0, _i18n.__)('Block rendered as empty.'));
  },
  ErrorResponsePlaceholder: function ErrorResponsePlaceholder(_ref2) {
    var response = _ref2.response,
        className = _ref2.className;
    var errorMessage = (0, _i18n.sprintf)( // translators: %s: error message describing the problem
    (0, _i18n.__)('Error loading block: %s'), response.errorMsg);
    return (0, _element.createElement)(_components.Placeholder, {
      className: className
    }, errorMessage);
  },
  LoadingResponsePlaceholder: function LoadingResponsePlaceholder(_ref3) {
    var className = _ref3.className;
    return (0, _element.createElement)(_components.Placeholder, {
      className: className
    }, (0, _element.createElement)(_components.Spinner, null));
  }
};
var _default = ServerSideRender;
exports.default = _default;
//# sourceMappingURL=server-side-render.js.map