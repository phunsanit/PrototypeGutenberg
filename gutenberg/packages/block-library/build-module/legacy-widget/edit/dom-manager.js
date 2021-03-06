import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, createRef } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';

var LegacyWidgetEditDomManager = /*#__PURE__*/function (_Component) {
  _inherits(LegacyWidgetEditDomManager, _Component);

  var _super = _createSuper(LegacyWidgetEditDomManager);

  function LegacyWidgetEditDomManager() {
    var _this;

    _classCallCheck(this, LegacyWidgetEditDomManager);

    _this = _super.apply(this, arguments);
    _this.containerRef = createRef();
    _this.formRef = createRef();
    _this.widgetContentRef = createRef();
    _this.idBaseInputRef = createRef();
    _this.widgetNumberInputRef = createRef();
    _this.triggerWidgetEvent = _this.triggerWidgetEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LegacyWidgetEditDomManager, [{
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
      return createElement("div", {
        className: "widget open",
        ref: this.containerRef
      }, createElement("div", {
        className: "widget-inside"
      }, createElement("form", {
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
      }, createElement("div", {
        ref: this.widgetContentRef,
        className: "widget-content",
        dangerouslySetInnerHTML: {
          __html: form
        }
      }), isReferenceWidget && createElement(Fragment, null, createElement("input", {
        type: "hidden",
        name: "widget-id",
        className: "widget-id",
        value: id
      }), createElement("input", {
        ref: this.idBaseInputRef,
        type: "hidden",
        name: "id_base",
        className: "id_base",
        value: idBase
      }), createElement("input", {
        ref: this.widgetNumberInputRef,
        type: "hidden",
        name: "widget_number",
        className: "widget_number",
        value: number
      }), createElement("input", {
        type: "hidden",
        name: "multi_number",
        className: "multi_number",
        value: ""
      }), createElement("input", {
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

        if (!isShallowEqual(currentFormData.getAll(rawKey), this.previousFormData.getAll(rawKey))) {
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
            if (includes(['widget-id', 'id_base', 'widget_number', 'multi_number', 'add_new'], rawKey)) {
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
}(Component);

export default LegacyWidgetEditDomManager;
//# sourceMappingURL=dom-manager.js.map