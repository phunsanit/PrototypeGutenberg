"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RichText = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNativeAztec = _interopRequireDefault(require("react-native-aztec"));

var _reactNative = require("react-native");

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _lodash = require("lodash");

var _memize = _interopRequireDefault(require("memize"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _htmlEntities = require("@wordpress/html-entities");

var _keycodes = require("@wordpress/keycodes");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

var _i18n = require("@wordpress/i18n");

var _formatEdit = _interopRequireDefault(require("./format-edit"));

var _applyFormat = require("../apply-format");

var _getActiveFormat = require("../get-active-format");

var _getActiveFormats = require("../get-active-formats");

var _insert = require("../insert");

var _isEmpty2 = require("../is-empty");

var _create = require("../create");

var _toHtmlString = require("../to-html-string");

var _removeLineSeparator = require("../remove-line-separator");

var _isCollapsed = require("../is-collapsed");

var _remove = require("../remove");

var _style = _interopRequireDefault(require("./style.scss"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var unescapeSpaces = function unescapeSpaces(text) {
  return text.replace(/&nbsp;|&#160;/gi, ' ');
};

var gutenbergFormatNamesToAztec = {
  'core/bold': 'bold',
  'core/italic': 'italic',
  'core/strikethrough': 'strikethrough'
};

var RichText = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(RichText, _Component);

  var _super = _createSuper(RichText);

  function RichText(_ref) {
    var _this;

    var value = _ref.value,
        selectionStart = _ref.selectionStart,
        selectionEnd = _ref.selectionEnd,
        multiline = _ref.__unstableMultilineTag;
    (0, _classCallCheck2.default)(this, RichText);
    _this = _super.apply(this, arguments);
    _this.isMultiline = false;

    if (multiline === true || multiline === 'p' || multiline === 'li') {
      _this.multilineTag = multiline === true ? 'p' : multiline;
      _this.isMultiline = true;
    }

    if (_this.multilineTag === 'li') {
      _this.multilineWrapperTags = ['ul', 'ol'];
    }

    _this.isIOS = _reactNative.Platform.OS === 'ios';
    _this.createRecord = _this.createRecord.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleEnter = _this.handleEnter.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleDelete = _this.handleDelete.bind((0, _assertThisInitialized2.default)(_this));
    _this.onPaste = _this.onPaste.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)(_this));
    _this.onTextUpdate = _this.onTextUpdate.bind((0, _assertThisInitialized2.default)(_this));
    _this.onContentSizeChange = _this.onContentSizeChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFormatChange = _this.onFormatChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.formatToValue = (0, _memize.default)(_this.formatToValue.bind((0, _assertThisInitialized2.default)(_this)), {
      maxSize: 1
    });
    _this.debounceCreateUndoLevel = (0, _lodash.debounce)(_this.onCreateUndoLevel, 1000); // This prevents a bug in Aztec which triggers onSelectionChange twice on format change

    _this.onSelectionChange = _this.onSelectionChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectionChangeFromAztec = _this.onSelectionChangeFromAztec.bind((0, _assertThisInitialized2.default)(_this));
    _this.valueToFormat = _this.valueToFormat.bind((0, _assertThisInitialized2.default)(_this));
    _this.getHtmlToRender = _this.getHtmlToRender.bind((0, _assertThisInitialized2.default)(_this));
    _this.insertString = _this.insertString.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      activeFormats: [],
      selectedFormat: null,
      height: 0
    };
    _this.needsSelectionUpdate = false;
    _this.savedContent = '';
    _this.isTouched = false;
    _this.lastAztecEventType = null;
    _this.lastHistoryValue = value; // Internal values that are update synchronously, unlike props.

    _this.value = value;
    _this.selectionStart = selectionStart;
    _this.selectionEnd = selectionEnd;
    return _this;
  }
  /**
   * Get the current record (value and selection) from props and state.
   *
   * @return {Object} The current record (value and selection).
   */


  (0, _createClass2.default)(RichText, [{
    key: "getRecord",
    value: function getRecord() {
      var _this$props = this.props,
          start = _this$props.selectionStart,
          end = _this$props.selectionEnd;
      var value = this.props.value;

      var _this$formatToValue = this.formatToValue(value),
          formats = _this$formatToValue.formats,
          replacements = _this$formatToValue.replacements,
          text = _this$formatToValue.text;

      var activeFormats = this.state.activeFormats;
      return {
        formats: formats,
        replacements: replacements,
        text: text,
        start: start,
        end: end,
        activeFormats: activeFormats
      };
    }
    /**
     * Creates a RichText value "record" from the current content and selection
     * information
     *
     *
     * @return {Object} A RichText value with formats and selection.
     */

  }, {
    key: "createRecord",
    value: function createRecord() {
      var preserveWhiteSpace = this.props.preserveWhiteSpace;

      var value = _objectSpread({
        start: this.selectionStart,
        end: this.selectionEnd
      }, (0, _create.create)({
        html: this.value,
        range: null,
        multilineTag: this.multilineTag,
        multilineWrapperTags: this.multilineWrapperTags,
        preserveWhiteSpace: preserveWhiteSpace
      }));

      var start = Math.min(this.selectionStart, value.text.length);
      var end = Math.min(this.selectionEnd, value.text.length);
      return _objectSpread({}, value, {
        start: start,
        end: end
      });
    }
  }, {
    key: "valueToFormat",
    value: function valueToFormat(value) {
      // remove the outer root tags
      return this.removeRootTagsProduceByAztec((0, _toHtmlString.toHTMLString)({
        value: value,
        multilineTag: this.multilineTag
      }));
    }
  }, {
    key: "getActiveFormatNames",
    value: function getActiveFormatNames(record) {
      var formatTypes = this.props.formatTypes;
      return formatTypes.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      }).filter(function (name) {
        return (0, _getActiveFormat.getActiveFormat)(record, name) !== undefined;
      }).map(function (name) {
        return gutenbergFormatNamesToAztec[name];
      }).filter(Boolean);
    }
  }, {
    key: "onFormatChange",
    value: function onFormatChange(record) {
      var start = record.start,
          end = record.end,
          _record$activeFormats = record.activeFormats,
          activeFormats = _record$activeFormats === void 0 ? [] : _record$activeFormats;
      var changeHandlers = (0, _lodash.pickBy)(this.props, function (v, key) {
        return key.startsWith('format_on_change_functions_');
      });
      Object.values(changeHandlers).forEach(function (changeHandler) {
        changeHandler(record.formats, record.text);
      });
      this.value = this.valueToFormat(record);
      this.props.onChange(this.value);
      this.setState({
        activeFormats: activeFormats
      });
      this.props.onSelectionChange(start, end);
      this.selectionStart = start;
      this.selectionEnd = end;
      this.onCreateUndoLevel();
      this.lastAztecEventType = 'format change';
    }
  }, {
    key: "insertString",
    value: function insertString(record, string) {
      if (record && string) {
        this.lastEventCount = undefined;
        var toInsert = (0, _insert.insert)(record, string);
        this.onFormatChange(toInsert);
      }
    }
  }, {
    key: "onCreateUndoLevel",
    value: function onCreateUndoLevel() {
      var onCreateUndoLevel = this.props.__unstableOnCreateUndoLevel; // If the content is the same, no level needs to be created.

      if (this.lastHistoryValue === this.value) {
        return;
      }

      onCreateUndoLevel();
      this.lastHistoryValue = this.value;
    }
    /*
     * Cleans up any root tags produced by aztec.
     * TODO: This should be removed on a later version when aztec doesn't return the top tag of the text being edited
     */

  }, {
    key: "removeRootTagsProduceByAztec",
    value: function removeRootTagsProduceByAztec(html) {
      var _this2 = this;

      var result = this.removeRootTag(this.props.tagName, html); // Temporary workaround for https://github.com/WordPress/gutenberg/pull/13763

      if (this.props.rootTagsToEliminate) {
        this.props.rootTagsToEliminate.forEach(function (element) {
          result = _this2.removeRootTag(element, result);
        });
      }

      if (this.props.tagsToEliminate) {
        this.props.tagsToEliminate.forEach(function (element) {
          result = _this2.removeTag(element, result);
        });
      }

      return result;
    }
  }, {
    key: "removeRootTag",
    value: function removeRootTag(tag, html) {
      var openingTagRegexp = RegExp('^<' + tag + '[^>]*>', 'gim');
      var closingTagRegexp = RegExp('</' + tag + '>$', 'gim');
      return html.replace(openingTagRegexp, '').replace(closingTagRegexp, '');
    }
  }, {
    key: "removeTag",
    value: function removeTag(tag, html) {
      var openingTagRegexp = RegExp('<' + tag + '>', 'gim');
      var closingTagRegexp = RegExp('</' + tag + '>', 'gim');
      return html.replace(openingTagRegexp, '').replace(closingTagRegexp, '');
    }
    /*
     * Handles any case where the content of the AztecRN instance has changed
     */

  }, {
    key: "onChange",
    value: function onChange(event) {
      var contentWithoutRootTag = this.removeRootTagsProduceByAztec(unescapeSpaces(event.nativeEvent.text)); // On iOS, onChange can be triggered after selection changes, even though there are no content changes.

      if (contentWithoutRootTag === this.value) {
        return;
      }

      this.lastEventCount = event.nativeEvent.eventCount;
      this.comesFromAztec = true;
      this.firedAfterTextChanged = true; // the onChange event always fires after the fact

      this.onTextUpdate(event);
      this.lastAztecEventType = 'input';
    }
  }, {
    key: "onTextUpdate",
    value: function onTextUpdate(event) {
      var contentWithoutRootTag = this.removeRootTagsProduceByAztec(unescapeSpaces(event.nativeEvent.text));
      this.debounceCreateUndoLevel();
      var refresh = this.value !== contentWithoutRootTag;
      this.value = contentWithoutRootTag; // we don't want to refresh if our goal is just to create a record

      if (refresh) {
        this.props.onChange(contentWithoutRootTag);
      }
    }
    /*
     * Handles any case where the content of the AztecRN instance has changed in size
     */

  }, {
    key: "onContentSizeChange",
    value: function onContentSizeChange(contentSize) {
      this.setState(contentSize);
      this.lastAztecEventType = 'content size change';
    }
  }, {
    key: "handleEnter",
    value: function handleEnter(event) {
      var onEnter = this.props.onEnter;

      if (!onEnter) {
        return;
      }

      onEnter({
        value: this.createRecord(),
        onChange: this.onFormatChange,
        shiftKey: event.shiftKey
      });
      this.lastAztecEventType = 'input';
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(event) {
      var keyCode = _keycodes.BACKSPACE; // TODO : should we differentiate BACKSPACE and DELETE?

      var isReverse = keyCode === _keycodes.BACKSPACE;
      var _this$props2 = this.props,
          onDelete = _this$props2.onDelete,
          multilineTag = _this$props2.__unstableMultilineTag;
      this.lastEventCount = event.nativeEvent.eventCount;
      this.comesFromAztec = true;
      this.firedAfterTextChanged = event.nativeEvent.firedAfterTextChanged;
      var value = this.createRecord();
      var start = value.start,
          end = value.end,
          text = value.text;
      var newValue; // Always handle full content deletion ourselves.

      if (start === 0 && end !== 0 && end >= text.length) {
        newValue = (0, _remove.remove)(value);
        this.onFormatChange(newValue);
        event.preventDefault();
        return;
      }

      if (multilineTag) {
        if (isReverse && value.start === 0 && value.end === 0 && (0, _isEmpty2.isEmptyLine)(value)) {
          newValue = (0, _removeLineSeparator.removeLineSeparator)(value, !isReverse);
        } else {
          newValue = (0, _removeLineSeparator.removeLineSeparator)(value, isReverse);
        }

        if (newValue) {
          this.onFormatChange(newValue);
          event.preventDefault();
          return;
        }
      } // Only process delete if the key press occurs at an uncollapsed edge.


      if (!onDelete || !(0, _isCollapsed.isCollapsed)(value) || isReverse && start !== 0 || !isReverse && end !== text.length) {
        return;
      }

      onDelete({
        isReverse: isReverse,
        value: value
      });
      event.preventDefault();
      this.lastAztecEventType = 'input';
    }
    /**
     * Handles a paste event from the native Aztec Wrapper.
     *
     * @param {Object} event The paste event which wraps `nativeEvent`.
     */

  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var _this$props3 = this.props,
          onPaste = _this$props3.onPaste,
          onChange = _this$props3.onChange;
      var _this$state$activeFor = this.state.activeFormats,
          activeFormats = _this$state$activeFor === void 0 ? [] : _this$state$activeFor;
      var _event$nativeEvent = event.nativeEvent,
          pastedText = _event$nativeEvent.pastedText,
          pastedHtml = _event$nativeEvent.pastedHtml,
          files = _event$nativeEvent.files;
      var currentRecord = this.createRecord();
      event.preventDefault(); // There is a selection, check if a URL is pasted.

      if (!(0, _isCollapsed.isCollapsed)(currentRecord)) {
        var trimmedText = (pastedHtml || pastedText).replace(/<[^>]+>/g, '').trim(); // A URL was pasted, turn the selection into a link

        if ((0, _url.isURL)(trimmedText)) {
          var linkedRecord = (0, _applyFormat.applyFormat)(currentRecord, {
            type: 'a',
            attributes: {
              href: (0, _htmlEntities.decodeEntities)(trimmedText)
            }
          });
          this.value = this.valueToFormat(linkedRecord);
          onChange(this.value); // Allows us to ask for this information when we get a report.

          window.console.log('Created link:\n\n', trimmedText);
          return;
        }
      }

      if (onPaste) {
        onPaste({
          value: currentRecord,
          onChange: this.onFormatChange,
          html: pastedHtml,
          plainText: pastedText,
          files: files,
          activeFormats: activeFormats
        });
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.isTouched = true;
      var _this$props4 = this.props,
          unstableOnFocus = _this$props4.unstableOnFocus,
          onSelectionChange = _this$props4.onSelectionChange;

      if (unstableOnFocus) {
        unstableOnFocus();
      } // We know for certain that on focus, the old selection is invalid. It
      // will be recalculated on `selectionchange`.


      onSelectionChange(this.selectionStart, this.selectionEnd);
      this.lastAztecEventType = 'focus';
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.isTouched = false; // Check if value is up to date with latest state of native AztecView

      if (event.nativeEvent.text && event.nativeEvent.text !== this.props.value) {
        this.onTextUpdate(event);
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }

      this.lastAztecEventType = 'blur';
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(start, end) {
      var hasChanged = this.selectionStart !== start || this.selectionEnd !== end;
      this.selectionStart = start;
      this.selectionEnd = end; // This is a manual selection change event if onChange was not triggered just before
      // and we did not just trigger a text update
      // `onChange` could be the last event and could have been triggered a long time ago so
      // this approach is not perfectly reliable

      var isManual = this.lastAztecEventType !== 'input' && this.props.value === this.value;

      if (hasChanged && isManual) {
        var value = this.createRecord();
        var activeFormats = (0, _getActiveFormats.getActiveFormats)(value);
        this.setState({
          activeFormats: activeFormats
        });
      }

      this.props.onSelectionChange(start, end);
    }
  }, {
    key: "onSelectionChangeFromAztec",
    value: function onSelectionChangeFromAztec(start, end, text, event) {
      // `end` can be less than `start` on iOS
      // Let's fix that here so `rich-text/slice` can work properly
      var realStart = Math.min(start, end);
      var realEnd = Math.max(start, end); // check and dicsard stray event, where the text and selection is equal to the ones already cached

      var contentWithoutRootTag = this.removeRootTagsProduceByAztec(unescapeSpaces(event.nativeEvent.text));

      if (contentWithoutRootTag === this.value && realStart === this.selectionStart && realEnd === this.selectionEnd) {
        return;
      }

      this.comesFromAztec = true;
      this.firedAfterTextChanged = true; // Selection change event always fires after the fact
      // update text before updating selection
      // Make sure there are changes made to the content before upgrading it upward

      this.onTextUpdate(event); // Aztec can send us selection change events after it has lost focus.
      // For instance the autocorrect feature will complete a partially written
      // word when resigning focus, causing a selection change event.
      // Forwarding this selection change could cause this RichText to regain
      // focus and start a focus loop.
      //
      // See https://github.com/wordpress-mobile/gutenberg-mobile/issues/1696

      if (this.props.__unstableIsSelected) {
        this.onSelectionChange(realStart, realEnd);
      } // Update lastEventCount to prevent Aztec from re-rendering the content it just sent


      this.lastEventCount = event.nativeEvent.eventCount;
      this.lastAztecEventType = 'selection change';
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return (0, _isEmpty2.isEmpty)(this.formatToValue(this.props.value));
    }
  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      var preserveWhiteSpace = this.props.preserveWhiteSpace; // Handle deprecated `children` and `node` sources.

      if (Array.isArray(value)) {
        return (0, _create.create)({
          html: _blocks.childrenBlock.toHTML(value),
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags,
          preserveWhiteSpace: preserveWhiteSpace
        });
      }

      if (this.props.format === 'string') {
        return (0, _create.create)({
          html: value,
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags,
          preserveWhiteSpace: preserveWhiteSpace
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return (0, _create.create)();
      }

      return value;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.tagName !== this.props.tagName || nextProps.reversed !== this.props.reversed || nextProps.start !== this.props.start) {
        this.lastEventCount = undefined;
        this.value = undefined;
        return true;
      } // TODO: Please re-introduce the check to avoid updating the content right after an `onChange` call.
      // It was removed in https://github.com/WordPress/gutenberg/pull/12417 to fix undo/redo problem.
      // If the component is changed React side (undo/redo/merging/splitting/custom text actions)
      // we need to make sure the native is updated as well.
      // Also, don't trust the "this.lastContent" as on Android, incomplete text events arrive
      //  with only some of the text, while the virtual keyboard's suggestion system does its magic.
      // ** compare with this.lastContent for optimizing performance by not forcing Aztec with text it already has
      // , but compare with props.value to not lose "half word" text because of Android virtual keyb autosuggestion behavior


      if (typeof nextProps.value !== 'undefined' && typeof this.props.value !== 'undefined' && (!this.comesFromAztec || !this.firedAfterTextChanged) && nextProps.value !== this.props.value) {
        // Gutenberg seems to try to mirror the caret state even on events that only change the content so,
        //  let's force caret update if state has selection set.
        if (typeof nextProps.selectionStart !== 'undefined' && typeof nextProps.selectionEnd !== 'undefined') {
          this.needsSelectionUpdate = true;
        }

        this.lastEventCount = undefined; // force a refresh on the native side
      }

      if (!this.comesFromAztec) {
        if (typeof nextProps.selectionStart !== 'undefined' && typeof nextProps.selectionEnd !== 'undefined' && nextProps.selectionStart !== this.props.selectionStart && nextProps.selectionStart !== this.selectionStart && nextProps.__unstableIsSelected) {
          this.needsSelectionUpdate = true;
          this.lastEventCount = undefined; // force a refresh on the native side
        }
      }

      return true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Request focus if wrapping block is selected and parent hasn't inhibited the focus request. This method of focusing
      //  is trying to implement the web-side counterpart of BlockList's `focusTabbable` where the BlockList is focusing an
      //  inputbox by searching the DOM. We don't have the DOM in RN so, using the combination of blockIsSelected and __unstableMobileNoFocusOnMount
      //  to determine if we should focus the RichText.
      if (this.props.blockIsSelected && !this.props.__unstableMobileNoFocusOnMount) {
        this._editor.focus();

        this.onSelectionChange(this.props.selectionStart || 0, this.props.selectionEnd || 0);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._editor.isFocused() && this.props.shouldBlurOnUnmount) {
        this._editor.blur();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value !== this.value) {
        this.value = this.props.value;
        this.lastEventCount = undefined;
      }

      var isSelected = this.props.__unstableIsSelected;
      var prevIsSelected = prevProps.__unstableIsSelected;

      if (isSelected && !prevIsSelected) {
        this._editor.focus(); // Update selection props explicitly when component is selected as Aztec won't call onSelectionChange
        // if its internal value hasn't change. When created, default value is 0, 0


        this.onSelectionChange(this.props.selectionStart || 0, this.props.selectionEnd || 0);
      } else if (!isSelected && prevIsSelected) {
        this._editor.blur();
      }
    }
  }, {
    key: "getHtmlToRender",
    value: function getHtmlToRender(record, tagName) {
      // Save back to HTML from React tree
      var value = this.valueToFormat(record);

      if (value === undefined) {
        this.lastEventCount = undefined; // force a refresh on the native side

        value = '';
      } // On android if content is empty we need to send no content or else the placeholder will not show.


      if (!this.isIOS && value === '') {
        return value;
      }

      if (tagName) {
        var extraAttributes = "";

        if (tagName === "ol") {
          if (this.props.reversed) {
            extraAttributes += " reversed";
          }

          if (this.props.start) {
            extraAttributes += " start=".concat(this.props.start);
          }
        }

        value = "<".concat(tagName, " ").concat(extraAttributes, ">").concat(value, "</").concat(tagName, ">");
      }

      return value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          tagName = _this$props5.tagName,
          style = _this$props5.style,
          isSelected = _this$props5.__unstableIsSelected,
          children = _this$props5.children,
          getStylesFromColorScheme = _this$props5.getStylesFromColorScheme,
          minWidth = _this$props5.minWidth,
          maxWidth = _this$props5.maxWidth,
          formatTypes = _this$props5.formatTypes,
          parentBlockStyles = _this$props5.parentBlockStyles,
          withoutInteractiveFormatting = _this$props5.withoutInteractiveFormatting,
          capabilities = _this$props5.capabilities;
      var record = this.getRecord();
      var html = this.getHtmlToRender(record, tagName);
      var placeholderStyle = getStylesFromColorScheme(_style.default.richTextPlaceholder, _style.default.richTextPlaceholderDark);
      var defaultPlaceholderTextColor = placeholderStyle.color;

      var _getStylesFromColorSc = getStylesFromColorScheme(_style.default.richText, _style.default.richTextDark),
          defaultColor = _getStylesFromColorSc.color,
          defaultTextDecorationColor = _getStylesFromColorSc.textDecorationColor,
          defaultFontFamily = _getStylesFromColorSc.fontFamily;

      var selection = null;

      if (this.needsSelectionUpdate) {
        this.needsSelectionUpdate = false;
        selection = {
          start: this.props.selectionStart,
          end: this.props.selectionEnd
        }; // On AztecAndroid, setting the caret to an out-of-bounds position will crash the editor so, let's check for some cases.

        if (!this.isIOS) {
          // The following regular expression is used in Aztec here:
          // https://github.com/wordpress-mobile/AztecEditor-Android/blob/b1fad439d56fa6d4aa0b78526fef355c59d00dd3/aztec/src/main/kotlin/org/wordpress/aztec/AztecParser.kt#L656
          var brBeforeParaMatches = html.match(/(<br>)+<\/p>$/g);

          if (brBeforeParaMatches) {
            console.warn('Oops, BR tag(s) at the end of content. Aztec will remove them, adapting the selection...');
            var count = (brBeforeParaMatches[0].match(/br/g) || []).length;

            if (count > 0) {
              var newSelectionStart = this.props.selectionStart - count;

              if (newSelectionStart < 0) {
                newSelectionStart = 0;
              }

              var newSelectionEnd = this.props.selectionEnd - count;

              if (newSelectionEnd < 0) {
                newSelectionEnd = 0;
              }

              selection = {
                start: newSelectionStart,
                end: newSelectionEnd
              };
            }
          }
        }
      }

      if (this.comesFromAztec) {
        this.comesFromAztec = false;
        this.firedAfterTextChanged = false;
      } // Logic below assures that `RichText` width will always have equal value when container is almost fully filled.


      var width = maxWidth && this.state.width && maxWidth - this.state.width < 10 ? maxWidth : this.state.width;
      return (0, _element.createElement)(_reactNative.View, null, children && children({
        isSelected: isSelected,
        value: record,
        onChange: this.onFormatChange,
        onFocus: function onFocus() {}
      }), (0, _element.createElement)(_reactNativeAztec.default, (0, _extends2.default)({
        ref: function ref(_ref3) {
          _this3._editor = _ref3;

          if (_this3.props.setRef) {
            _this3.props.setRef(_ref3);
          }
        },
        style: _objectSpread({
          backgroundColor: _style.default.richText.backgroundColor
        }, style, {}, this.isIOS && minWidth && maxWidth ? {
          width: width
        } : {
          maxWidth: maxWidth
        }, {
          minHeight: this.state.height
        }),
        text: {
          text: html,
          eventCount: this.lastEventCount,
          selection: selection
        },
        placeholder: this.props.placeholder,
        placeholderTextColor: this.props.placeholderTextColor || defaultPlaceholderTextColor,
        deleteEnter: this.props.deleteEnter,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onEnter: this.handleEnter,
        onBackspace: this.handleDelete,
        onPaste: this.onPaste,
        activeFormats: this.getActiveFormatNames(record),
        onContentSizeChange: this.onContentSizeChange,
        onCaretVerticalPositionChange: this.props.onCaretVerticalPositionChange,
        onSelectionChange: this.onSelectionChangeFromAztec,
        blockType: {
          tag: tagName
        },
        color: style && style.color || parentBlockStyles && parentBlockStyles.color || defaultColor,
        linkTextColor: defaultTextDecorationColor,
        maxImagesWidth: 200,
        fontFamily: this.props.fontFamily || defaultFontFamily,
        fontSize: this.props.fontSize || style && style.fontSize,
        fontWeight: this.props.fontWeight,
        fontStyle: this.props.fontStyle,
        disableEditingMenu: this.props.disableEditingMenu,
        isMultiline: this.isMultiline,
        textAlign: this.props.textAlign
      }, this.isIOS ? {
        maxWidth: maxWidth
      } : {}, {
        minWidth: minWidth,
        id: this.props.id,
        selectionColor: this.props.selectionColor
      })), isSelected && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_formatEdit.default, {
        formatTypes: formatTypes,
        value: record,
        withoutInteractiveFormatting: withoutInteractiveFormatting,
        onChange: this.onFormatChange,
        onFocus: function onFocus() {}
      }), (0, _element.createElement)(_blockEditor.BlockFormatControls, null, // eslint-disable-next-line no-undef
      __DEV__ && (0, _components.isMentionsSupported)(capabilities) && (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.ToolbarButton, {
        title: (0, _i18n.__)('Insert mention'),
        icon: (0, _element.createElement)(_icons.Icon, {
          icon: _icons.atSymbol
        }),
        onClick: function onClick() {
          (0, _reactNativeGutenbergBridge.addMention)().then(function (mentionUserId) {
            var stringToInsert = "@".concat(mentionUserId);

            if (_this3.isIOS) {
              stringToInsert += ' ';
            }

            _this3.insertString(record, stringToInsert);
          }).catch(function () {});
        }
      })))));
    }
  }]);
  return RichText;
}(_element.Component);

exports.RichText = RichText;
RichText.defaultProps = {
  format: 'string',
  value: '',
  tagName: 'div'
};

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref4) {
  var clientId = _ref4.clientId;

  var _select = select('core/block-editor'),
      getBlockParents = _select.getBlockParents,
      getBlock = _select.getBlock;

  var parents = getBlockParents(clientId, true);
  var parentBlock = parents ? getBlock(parents[0]) : undefined;
  var parentBlockStyles = (0, _lodash.get)(parentBlock, ['attributes', 'childrenStyles']) || {};
  return _objectSpread({
    formatTypes: select('core/rich-text').getFormatTypes()
  }, {
    parentBlockStyles: parentBlockStyles
  });
}), _compose.withPreferredColorScheme, _components.withSiteCapabilities])(RichText);

exports.default = _default;
//# sourceMappingURL=index.native.js.map