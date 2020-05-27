"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AutosaveMonitor = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AutosaveMonitor = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(AutosaveMonitor, _Component);

  var _super = _createSuper(AutosaveMonitor);

  function AutosaveMonitor() {
    (0, _classCallCheck2.default)(this, AutosaveMonitor);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(AutosaveMonitor, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isDirty = _this$props.isDirty,
          editsReference = _this$props.editsReference,
          isAutosaveable = _this$props.isAutosaveable,
          isAutosaving = _this$props.isAutosaving; // The edits reference is held for comparison to avoid scheduling an
      // autosave if an edit has not been made since the last autosave
      // completion. This is assigned when the autosave completes, and reset
      // when an edit occurs.
      //
      // See: https://github.com/WordPress/gutenberg/issues/12318

      if (editsReference !== prevProps.editsReference) {
        this.didAutosaveForEditsReference = false;
      }

      if (!isAutosaving && prevProps.isAutosaving) {
        this.didAutosaveForEditsReference = true;
      }

      if (prevProps.isDirty !== isDirty || prevProps.isAutosaveable !== isAutosaveable || prevProps.editsReference !== editsReference) {
        this.toggleTimer(isDirty && isAutosaveable && !this.didAutosaveForEditsReference);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleTimer(false);
    }
  }, {
    key: "toggleTimer",
    value: function toggleTimer(isPendingSave) {
      var _this = this;

      var _this$props2 = this.props,
          interval = _this$props2.interval,
          _this$props2$shouldTh = _this$props2.shouldThrottle,
          shouldThrottle = _this$props2$shouldTh === void 0 ? false : _this$props2$shouldTh; // By default, AutosaveMonitor will wait for a pause in editing before
      // autosaving. In other words, its action is "debounced".
      //
      // The `shouldThrottle` props allows overriding this behaviour, thus
      // making the autosave action "throttled".

      if (!shouldThrottle && this.pendingSave) {
        clearTimeout(this.pendingSave);
        delete this.pendingSave;
      }

      if (isPendingSave && !(shouldThrottle && this.pendingSave)) {
        this.pendingSave = setTimeout(function () {
          _this.props.autosave();

          delete _this.pendingSave;
        }, interval * 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return AutosaveMonitor;
}(_element.Component);

exports.AutosaveMonitor = AutosaveMonitor;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, ownProps) {
  var _select = select('core'),
      getReferenceByDistinctEdits = _select.getReferenceByDistinctEdits;

  var _select2 = select('core/editor'),
      isEditedPostDirty = _select2.isEditedPostDirty,
      isEditedPostAutosaveable = _select2.isEditedPostAutosaveable,
      isAutosavingPost = _select2.isAutosavingPost,
      getEditorSettings = _select2.getEditorSettings;

  var _ownProps$interval = ownProps.interval,
      interval = _ownProps$interval === void 0 ? getEditorSettings().autosaveInterval : _ownProps$interval;
  return {
    isDirty: isEditedPostDirty(),
    isAutosaveable: isEditedPostAutosaveable(),
    editsReference: getReferenceByDistinctEdits(),
    isAutosaving: isAutosavingPost(),
    interval: interval
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    autosave: function autosave() {
      var _ownProps$autosave = ownProps.autosave,
          autosave = _ownProps$autosave === void 0 ? dispatch('core/editor').autosave : _ownProps$autosave;
      autosave();
    }
  };
})])(AutosaveMonitor);

exports.default = _default;
//# sourceMappingURL=index.js.map