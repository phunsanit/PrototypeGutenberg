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
import { Component } from '@wordpress/element';
/**
 * External dependencies
 */

import { View, Image } from 'react-native';
/**
 * Internal dependencies
 */

function calculatePreferedImageSize(image, container) {
  var maxWidth = container.clientWidth;
  var exceedMaxWidth = image.width > maxWidth;
  var ratio = image.height / image.width;
  var width = exceedMaxWidth ? maxWidth : image.width;
  var height = exceedMaxWidth ? maxWidth * ratio : image.height;
  return {
    width: width,
    height: height
  };
}

var ImageSize = /*#__PURE__*/function (_Component) {
  _inherits(ImageSize, _Component);

  var _super = _createSuper(ImageSize);

  function ImageSize() {
    var _this;

    _classCallCheck(this, ImageSize);

    _this = _super.apply(this, arguments);
    _this.state = {
      width: undefined,
      height: undefined
    };
    _this.onLayout = _this.onLayout.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageSize, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.src !== prevProps.src) {
        this.image = {};
        this.setState({
          width: undefined,
          height: undefined
        });
        this.fetchImageSize();
      }

      if (this.props.dirtynessTrigger !== prevProps.dirtynessTrigger) {
        this.calculateSize();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchImageSize();
    }
  }, {
    key: "fetchImageSize",
    value: function fetchImageSize() {
      var _this2 = this;

      Image.getSize(this.props.src, function (width, height) {
        _this2.image = {
          width: width,
          height: height
        };

        _this2.calculateSize();
      });
    }
  }, {
    key: "calculateSize",
    value: function calculateSize() {
      if (this.image === undefined || this.container === undefined) {
        return;
      }

      var _calculatePreferedIma = calculatePreferedImageSize(this.image, this.container),
          width = _calculatePreferedIma.width,
          height = _calculatePreferedIma.height;

      this.setState({
        width: width,
        height: height
      });
    }
  }, {
    key: "onLayout",
    value: function onLayout(event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;
      this.container = {
        clientWidth: width,
        clientHeight: height
      };
      this.calculateSize();
    }
  }, {
    key: "render",
    value: function render() {
      var sizes = {
        imageWidth: this.image && this.image.width,
        imageHeight: this.image && this.image.height,
        containerWidth: this.container && this.container.width,
        containerHeight: this.container && this.container.height,
        imageWidthWithinContainer: this.state.width,
        imageHeightWithinContainer: this.state.height
      };
      return createElement(View, {
        onLayout: this.onLayout
      }, this.props.children(sizes));
    }
  }]);

  return ImageSize;
}(Component);

export default ImageSize;
//# sourceMappingURL=image-size.native.js.map