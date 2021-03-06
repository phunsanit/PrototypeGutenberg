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

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LegacyWidgetEditDomManager = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LegacyWidgetEditDomManager, _Component);

  var _super = _createSuper(LegacyWidgetEditDomManager);

  function LegacyWidgetEditDomManager() {
    var _this;

    (0, _classCallCheck2.default)(this, LegacyWidgetEditDomManager);
    _this = _super.apply(this, arguments);
    _this.containerRef = (0, _element.createRef)();
    _this.formRef = (0, _element.createRef)();
    _this.widgetContentRef = (0, _element.createRef)();
    _this.idBaseInputRef = (0, _element.createRef)();
    _this.widgetNumberInputRef = (0, _element.createRef)();
    _this.triggerWidgetEvent = _this.triggerWidgetEvent.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(LegacyWidgetEditDomManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.triggerWidgetEvent('widget-added');
      this.previousFormData = new window.FormData(this.formRef.current);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var shouldTriggerWidgetUpdateEvent = false; // We can not leverage react render otherwise we would destroy dom changes applied by the plugins.
      // We manually update the required dom node replicating what the widget screen and the customizer do.

      if (nextProps.idBase !== this.props.idBase && this.idBaseInputRef.current) {
        this.idBaseInputRef.current.value = nextProps.idBase;
        shouldTriggerWidgetUpdateEvent = true;
      }

      if (nextProps.number !== this.props.number && this.widgetNumberInputRef.current) {
        this.widgetNumberInputRef.current.value = nextProps.number;
      }

      if (nextProps.form !== this.props.form && this.widgetContentRef.current) {
        var widgetContent = this.widgetContentRef.current;
        widgetContent.innerHTML = nextProps.form;
        shouldTriggerWidgetUpdateEvent = true;
      }

      if (shouldTriggerWidgetUpdateEvent) {
        this.triggerWidgetEvent('widget-updated');
        this.previousFormData = new window.FormData(this.formRef.current);
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          id = _this$props.id,
          idBase = _this$props.idBase,
          number = _this$props.number,
          form = _this$props.form,
          isReferenceWidget = _this$props.isReferenceWidget;
      return (0, _element.createElement)("div", {
        className: "widget open",
        ref: this.containerRef
      }, (0, _element.createElement)("div", {
        className: "widget-inside"
      }, (0, _element.createElement)("form", {
        className: "form",
        ref: this.formRef,
        method: "post",
        onBlur: function onBlur() {
          if (_this2.shouldTriggerInstanceUpdate()) {
            if (isReferenceWidget) {
              if (_this2.containerRef.current) {
                window.wpWidgets.save(window.jQuery(_this2.containerRef.current));
              }
            }

            _this2.props.onInstanceChange(_this2.retrieveUpdatedInstance());
          }
        }
      }, (0, _element.createElement)("div", {
        ref: this.widgetContentRef,
        className: "widget-content",
        dangerouslySetInnerHTML: {
          __html: form
        }
      }), isReferenceWidget && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("input", {
        type: "hidden",
        name: "widget-id",
        className: "widget-id",
        value: id
      }), (0, _element.createElement)("input", {
        ref: this.idBaseInputRef,
        type: "hidden",
        name: "id_base",
        className: "id_base",
        value: idBase
      }), (0, _element.createElement)("input", {
        ref: this.widgetNumberInputRef,
        type: "hidden",
        name: "widget_number",
        className: "widget_number",
        value: number
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "multi_number",
        className: "multi_number",
        value: ""
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "add_new",
        className: "add_new",
        value: ""
      })))));
    }
  }, {
    key: "shouldTriggerInstanceUpdate",
    value: function shouldTriggerInstanceUpdate() {
      if (!this.formRef.current) {
        return false;
      }

      if (!this.previousFormData) {
        return true;
      }

      var currentFormData = new window.FormData(this.formRef.current);
      var currentFormDataKeys = Array.from(currentFormData.keys());
      var previousFormDataKeys = Array.from(this.previousFormData.keys());

      if (currentFormDataKeys.length !== previousFormDataKeys.length) {
        return true;
      }

      for (var _i = 0, _currentFormDataKeys = currentFormDataKeys; _i < _currentFormDataKeys.length; _i++) {
        var rawKey = _currentFormDataKeys[_i];

        if (!(0, _isShallowEqual.default)(currentFormData.getAll(rawKey), this.previousFormData.getAll(rawKey))) {
          this.previousFormData = currentFormData;
          return true;
        }
      }

      return false;
    }
  }, {
    key: "triggerWidgetEvent",
    value: function triggerWidgetEvent(event) {
      window.jQuery(window.document).trigger(event, [window.jQuery(this.containerRef.current)]);
    }
  }, {
    key: "retrieveUpdatedInstance",
    value: function retrieveUpdatedInstance() {
      if (this.formRef.current) {
        var form = this.formRef.current;
        var formData = new window.FormData(form);
        var updatedInstance = {};

        var _iterator = _createForOfIteratorHelper(formData.keys()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var rawKey = _step.value;

            // This fields are added to the form because the widget JavaScript code may use this values.
            // They are not relevant for the update mechanism.
            if ((0, _lodash.includes)(['widget-id', 'id_base', 'widget_number', 'multi_number', 'add_new'], rawKey)) {
              continue;
            }

            var matches = rawKey.match(/[^\[]*\[[-\d]*\]\[([^\]]*)\]/);
            var keyParsed = matches && matches[1] ? matches[1] : rawKey;
            var value = formData.getAll(rawKey);

            if (value.length > 1) {
              updatedInstance[keyParsed] = value;
            } else {
              updatedInstance[keyParsed] = value[0];
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return updatedInstance;
      }
    }
  }]);
  return LegacyWidgetEditDomManager;
}(_element.Component);

var _default = LegacyWidgetEditDomManager;
exports.default = _default;
//# sourceMappingURL=dom-manager.js.map