import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { isEqual, debounce } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, RawHTML } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { Placeholder, Spinner } from '@wordpress/components';
export function rendererPath(block) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var urlQueryArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return addQueryArgs("/wp/v2/block-renderer/".concat(block), _objectSpread({
    context: 'edit'
  }, null !== attributes ? {
    attributes: attributes
  } : {}, {}, urlQueryArgs));
}
export var ServerSideRender = /*#__PURE__*/function (_Component) {
  _inherits(ServerSideRender, _Component);

  var _super = _createSuper(ServerSideRender);

  function ServerSideRender(props) {
    var _this;

    _classCallCheck(this, ServerSideRender);

    _this = _super.call(this, props);
    _this.state = {
      response: null
    };
    return _this;
  }

  _createClass(ServerSideRender, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isStillMounted = true;
      this.fetch(this.props); // Only debounce once the initial fetch occurs to ensure that the first
      // renders show data as soon as possible.

      this.fetch = debounce(this.fetch, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!isEqual(prevProps, this.props)) {
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

      var fetchRequest = this.currentFetchRequest = apiFetch({
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
        return createElement(EmptyResponsePlaceholder, _extends({
          response: response
        }, this.props));
      } else if (!response) {
        return createElement(LoadingResponsePlaceholder, _extends({
          response: response
        }, this.props));
      } else if (response.error) {
        return createElement(ErrorResponsePlaceholder, _extends({
          response: response
        }, this.props));
      }

      return createElement(RawHTML, {
        key: "html",
        className: className
      }, response);
    }
  }]);

  return ServerSideRender;
}(Component);
ServerSideRender.defaultProps = {
  EmptyResponsePlaceholder: function EmptyResponsePlaceholder(_ref) {
    var className = _ref.className;
    return createElement(Placeholder, {
      className: className
    }, __('Block rendered as empty.'));
  },
  ErrorResponsePlaceholder: function ErrorResponsePlaceholder(_ref2) {
    var response = _ref2.response,
        className = _ref2.className;
    var errorMessage = sprintf( // translators: %s: error message describing the problem
    __('Error loading block: %s'), response.errorMsg);
    return createElement(Placeholder, {
      className: className
    }, errorMessage);
  },
  LoadingResponsePlaceholder: function LoadingResponsePlaceholder(_ref3) {
    var className = _ref3.className;
    return createElement(Placeholder, {
      className: className
    }, createElement(Spinner, null));
  }
};
export default ServerSideRender;
//# sourceMappingURL=server-side-render.js.map