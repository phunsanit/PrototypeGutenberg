"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _compose = require("@wordpress/compose");

var _domManager = _interopRequireDefault(require("./dom-manager"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _window = window,
    XMLHttpRequest = _window.XMLHttpRequest,
    FormData = _window.FormData;

var LegacyWidgetEditHandler = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LegacyWidgetEditHandler, _Component);

  var _super = _createSuper(LegacyWidgetEditHandler);

  function LegacyWidgetEditHandler() {
    var _this;

    (0, _classCallCheck2.default)(this, LegacyWidgetEditHandler);
    _this = _super.apply(this, arguments);
    _this.state = {
      form: null
    };
    _this.widgetNonce = null;
    _this.instanceUpdating = null;
    _this.onInstanceChange = _this.onInstanceChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.requestWidgetUpdater = _this.requestWidgetUpdater.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(LegacyWidgetEditHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.isStillMounted = true;
      this.trySetNonce();
      this.requestWidgetUpdater(undefined, function (response) {
        _this2.props.onInstanceChange(null, !!response.form);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (!this.widgetNonce) {
        this.trySetNonce();
      }

      if (prevProps.instance !== this.props.instance && this.instanceUpdating !== this.props.instance) {
        this.requestWidgetUpdater(undefined, function (response) {
          _this3.props.onInstanceChange(null, !!response.form);
        });
      }

      if (this.instanceUpdating === this.props.instance) {
        this.instanceUpdating = null;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          instanceId = _this$props.instanceId,
          id = _this$props.id,
          number = _this$props.number,
          idBase = _this$props.idBase,
          instance = _this$props.instance,
          isSelected = _this$props.isSelected,
          widgetName = _this$props.widgetName;
      var form = this.state.form;

      if (!form) {
        return null;
      }

      var widgetTitle = (0, _lodash.get)(instance, ['title']);
      var title = null;

      if (isSelected) {
        if (widgetTitle && widgetName) {
          title = "".concat(widgetName, ": ").concat(widgetTitle);
        } else if (!widgetTitle && widgetName) {
          title = widgetName;
        } else if (widgetTitle && !widgetName) {
          title = widgetTitle;
        }
      }

      return (0, _element.createElement)(_element.Fragment, null, title && (0, _element.createElement)("div", {
        className: "wp-block-legacy-widget__edit-widget-title"
      }, title), (0, _element.createElement)("div", {
        className: "wp-block-legacy-widget__edit-container" // Display none is used because when we switch from edit to preview,
        // we don't want to unmount the component.
        // Otherwise when we went back to edit we wound need to trigger
        // all widgets events again and some scripts may not deal well with this.
        ,
        style: {
          display: this.props.isVisible ? 'block' : 'none'
        }
      }, (0, _element.createElement)(_domManager.default, {
        isReferenceWidget: !!id,
        ref: function ref(_ref) {
          _this4.widgetEditDomManagerRef = _ref;
        },
        onInstanceChange: this.onInstanceChange,
        number: number ? number : instanceId * -1,
        id: id,
        idBase: idBase,
        form: form
      })));
    }
  }, {
    key: "trySetNonce",
    value: function trySetNonce() {
      var element = document.getElementById('_wpnonce_widgets');

      if (element && element.value) {
        this.widgetNonce = element.value;
      }
    }
  }, {
    key: "onInstanceChange",
    value: function onInstanceChange(instanceChanges) {
      var _this5 = this;

      var id = this.props.id;

      if (id) {
        // For reference widgets there is no need to query an endpoint,
        // the widget is already saved with ajax.
        this.props.onInstanceChange(instanceChanges, true);
        return;
      }

      this.requestWidgetUpdater(instanceChanges, function (response) {
        _this5.instanceUpdating = response.instance;

        _this5.props.onInstanceChange(response.instance, !!response.form);
      });
    }
  }, {
    key: "requestWidgetUpdater",
    value: function requestWidgetUpdater(instanceChanges, callback) {
      var _this6 = this;

      var _this$props2 = this.props,
          id = _this$props2.id,
          idBase = _this$props2.idBase,
          instance = _this$props2.instance,
          widgetClass = _this$props2.widgetClass;
      var isStillMounted = this.isStillMounted;

      if (!id && !widgetClass) {
        return;
      } // If we are in the presence of a reference widget, do a save ajax request
      // with empty changes so we retrieve the widget edit form.


      if (id) {
        var httpRequest = new XMLHttpRequest();
        var formData = new FormData();
        formData.append('action', 'save-widget');
        formData.append('id_base', idBase);
        formData.append('widget-id', id);
        formData.append('widget-width', '250');
        formData.append('widget-height', '200');
        formData.append('savewidgets', this.widgetNonce);
        httpRequest.open('POST', window.ajaxurl);
        httpRequest.addEventListener('load', function () {
          if (isStillMounted) {
            var form = httpRequest.responseText;

            _this6.setState({
              form: form
            });

            if (callback) {
              callback({
                form: form
              });
            }
          }
        });
        httpRequest.send(formData);
        return;
      }

      if (widgetClass) {
        (0, _apiFetch.default)({
          path: "/__experimental/widget-forms/".concat(widgetClass, "/"),
          data: {
            instance: instance,
            instance_changes: instanceChanges
          },
          method: 'POST'
        }).then(function (response) {
          if (isStillMounted) {
            _this6.setState({
              form: response.form
            });

            if (callback) {
              callback(response);
            }
          }
        });
      }
    }
  }]);
  return LegacyWidgetEditHandler;
}(_element.Component);

var _default = (0, _compose.withInstanceId)(LegacyWidgetEditHandler);

exports.default = _default;
//# sourceMappingURL=handler.js.map