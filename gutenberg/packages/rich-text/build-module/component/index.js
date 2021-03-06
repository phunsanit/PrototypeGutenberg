import _extends from "@babel/runtime/helpers/esm/extends";
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
import classnames from 'classnames';
import { find, isNil, pickBy, startsWith } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, forwardRef } from '@wordpress/element';
import { BACKSPACE, DELETE, ENTER, LEFT, RIGHT, SPACE, ESCAPE } from '@wordpress/keycodes';
import { withSafeTimeout, compose } from '@wordpress/compose';
import isShallowEqual from '@wordpress/is-shallow-equal';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import FormatEdit from './format-edit';
import { create } from '../create';
import { apply } from '../to-dom';
import { toHTMLString } from '../to-html-string';
import { remove } from '../remove';
import { removeFormat } from '../remove-format';
import { isCollapsed } from '../is-collapsed';
import { LINE_SEPARATOR } from '../special-characters';
import { indentListItems } from '../indent-list-items';
import { getActiveFormats } from '../get-active-formats';
import { updateFormats } from '../update-formats';
import { removeLineSeparator } from '../remove-line-separator';
import { isEmptyLine } from '../is-empty';
import withFormatTypes from './with-format-types';
import { BoundaryStyle } from './boundary-style';
import { InlineWarning } from './inline-warning';
import { insert } from '../insert';
/** @typedef {import('@wordpress/element').WPSyntheticEvent} WPSyntheticEvent */

/**
 * All inserting input types that would insert HTML into the DOM.
 *
 * @see https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes
 *
 * @type {Set}
 */

var INSERTION_INPUT_TYPES_TO_IGNORE = new Set(['insertParagraph', 'insertOrderedList', 'insertUnorderedList', 'insertHorizontalRule', 'insertLink']);
/**
 * In HTML, leading and trailing spaces are not visible, and multiple spaces
 * elsewhere are visually reduced to one space. This rule prevents spaces from
 * collapsing so all space is visible in the editor and can be removed. It also
 * prevents some browsers from inserting non-breaking spaces at the end of a
 * line to prevent the space from visually disappearing. Sometimes these non
 * breaking spaces can linger in the editor causing unwanted non breaking spaces
 * in between words. If also prevent Firefox from inserting a trailing `br` node
 * to visualise any trailing space, causing the element to be saved.
 *
 * > Authors are encouraged to set the 'white-space' property on editing hosts
 * > and on markup that was originally created through these editing mechanisms
 * > to the value 'pre-wrap'. Default HTML whitespace handling is not well
 * > suited to WYSIWYG editing, and line wrapping will not work correctly in
 * > some corner cases if 'white-space' is left at its default value.
 *
 * https://html.spec.whatwg.org/multipage/interaction.html#best-practices-for-in-page-editors
 *
 * @type {string}
 */

var whiteSpace = 'pre-wrap';
/**
 * Default style object for the editable element.
 *
 * @type {Object<string,string>}
 */

var defaultStyle = {
  whiteSpace: whiteSpace
};
var EMPTY_ACTIVE_FORMATS = [];

function createPrepareEditableTree(props, prefix) {
  var fns = Object.keys(props).reduce(function (accumulator, key) {
    if (key.startsWith(prefix)) {
      accumulator.push(props[key]);
    }

    return accumulator;
  }, []);
  return function (value) {
    return fns.reduce(function (accumulator, fn) {
      return fn(accumulator, value.text);
    }, value.formats);
  };
}
/**
 * If the selection is set on the placeholder element, collapse the selection to
 * the start (before the placeholder).
 *
 * @param {Window} defaultView
 */


function fixPlaceholderSelection(defaultView) {
  var selection = defaultView.getSelection();
  var anchorNode = selection.anchorNode,
      anchorOffset = selection.anchorOffset;

  if (anchorNode.nodeType !== anchorNode.ELEMENT_NODE) {
    return;
  }

  var targetNode = anchorNode.childNodes[anchorOffset];

  if (!targetNode || targetNode.nodeType !== targetNode.ELEMENT_NODE || !targetNode.getAttribute('data-rich-text-placeholder')) {
    return;
  }

  selection.collapseToStart();
}
/**
 * See export statement below.
 */


var RichText = /*#__PURE__*/function (_Component) {
  _inherits(RichText, _Component);

  var _super = _createSuper(RichText);

  function RichText(_ref) {
    var _this;

    var value = _ref.value,
        selectionStart = _ref.selectionStart,
        selectionEnd = _ref.selectionEnd;

    _classCallCheck(this, RichText);

    _this = _super.apply(this, arguments);
    _this.getDocument = _this.getDocument.bind(_assertThisInitialized(_this));
    _this.getWindow = _this.getWindow.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.handleDelete = _this.handleDelete.bind(_assertThisInitialized(_this));
    _this.handleEnter = _this.handleEnter.bind(_assertThisInitialized(_this));
    _this.handleSpace = _this.handleSpace.bind(_assertThisInitialized(_this));
    _this.handleHorizontalNavigation = _this.handleHorizontalNavigation.bind(_assertThisInitialized(_this));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_this));
    _this.onCreateUndoLevel = _this.onCreateUndoLevel.bind(_assertThisInitialized(_this));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
    _this.onCompositionStart = _this.onCompositionStart.bind(_assertThisInitialized(_this));
    _this.onCompositionEnd = _this.onCompositionEnd.bind(_assertThisInitialized(_this));
    _this.onSelectionChange = _this.onSelectionChange.bind(_assertThisInitialized(_this));
    _this.createRecord = _this.createRecord.bind(_assertThisInitialized(_this));
    _this.applyRecord = _this.applyRecord.bind(_assertThisInitialized(_this));
    _this.valueToFormat = _this.valueToFormat.bind(_assertThisInitialized(_this));
    _this.onPointerDown = _this.onPointerDown.bind(_assertThisInitialized(_this));
    _this.formatToValue = _this.formatToValue.bind(_assertThisInitialized(_this));
    _this.Editable = _this.Editable.bind(_assertThisInitialized(_this));

    _this.onKeyDown = function (event) {
      if (event.defaultPrevented) {
        return;
      }

      _this.handleDelete(event);

      _this.handleEnter(event);

      _this.handleSpace(event);

      _this.handleHorizontalNavigation(event);
    };

    _this.state = {};
    _this.lastHistoryValue = value; // Internal values are updated synchronously, unlike props and state.

    _this.value = value;
    _this.record = _this.formatToValue(value);
    _this.record.start = selectionStart;
    _this.record.end = selectionEnd;
    return _this;
  }

  _createClass(RichText, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.getDocument().removeEventListener('selectionchange', this.onSelectionChange);
      this.getWindow().cancelAnimationFrame(this.rafId);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.applyRecord(this.record, {
        domOnly: true
      });
    }
  }, {
    key: "getDocument",
    value: function getDocument() {
      return this.props.forwardedRef.current.ownerDocument;
    }
  }, {
    key: "getWindow",
    value: function getWindow() {
      return this.getDocument().defaultView;
    }
  }, {
    key: "createRecord",
    value: function createRecord() {
      var _this$props = this.props,
          multilineTag = _this$props.__unstableMultilineTag,
          forwardedRef = _this$props.forwardedRef,
          preserveWhiteSpace = _this$props.preserveWhiteSpace;
      var selection = this.getWindow().getSelection();
      var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      return create({
        element: forwardedRef.current,
        range: range,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
        __unstableIsEditableTree: true,
        preserveWhiteSpace: preserveWhiteSpace
      });
    }
  }, {
    key: "applyRecord",
    value: function applyRecord(record) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          domOnly = _ref2.domOnly;

      var _this$props2 = this.props,
          multilineTag = _this$props2.__unstableMultilineTag,
          forwardedRef = _this$props2.forwardedRef;
      apply({
        value: record,
        current: forwardedRef.current,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
        prepareEditableTree: createPrepareEditableTree(this.props, 'format_prepare_functions'),
        __unstableDomOnly: domOnly,
        placeholder: this.props.placeholder
      });
    }
    /**
     * Handles a paste event.
     *
     * Saves the pasted data as plain text in `pastedPlainText`.
     *
     * @param {ClipboardEvent} event The paste event.
     */

  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var _this$props3 = this.props,
          formatTypes = _this$props3.formatTypes,
          onPaste = _this$props3.onPaste,
          isSelected = _this$props3.__unstableIsSelected,
          __unstableDisableFormats = _this$props3.__unstableDisableFormats;
      var _this$state$activeFor = this.state.activeFormats,
          activeFormats = _this$state$activeFor === void 0 ? [] : _this$state$activeFor;

      if (!isSelected) {
        event.preventDefault();
        return;
      }

      var clipboardData = event.clipboardData;
      var items = clipboardData.items,
          files = clipboardData.files; // In Edge these properties can be null instead of undefined, so a more
      // rigorous test is required over using default values.

      items = isNil(items) ? [] : items;
      files = isNil(files) ? [] : files;
      var plainText = '';
      var html = ''; // IE11 only supports `Text` as an argument for `getData` and will
      // otherwise throw an invalid argument error, so we try the standard
      // arguments first, then fallback to `Text` if they fail.

      try {
        plainText = clipboardData.getData('text/plain');
        html = clipboardData.getData('text/html');
      } catch (error1) {
        try {
          html = clipboardData.getData('Text');
        } catch (error2) {
          // Some browsers like UC Browser paste plain text by default and
          // don't support clipboardData at all, so allow default
          // behaviour.
          return;
        }
      }

      event.preventDefault(); // Allows us to ask for this information when we get a report.

      window.console.log('Received HTML:\n\n', html);
      window.console.log('Received plain text:\n\n', plainText);

      if (__unstableDisableFormats) {
        this.onChange(insert(this.record, plainText));
        return;
      }

      var record = this.record;
      var transformed = formatTypes.reduce(function (accumlator, _ref3) {
        var __unstablePasteRule = _ref3.__unstablePasteRule;

        // Only allow one transform.
        if (__unstablePasteRule && accumlator === record) {
          accumlator = __unstablePasteRule(record, {
            html: html,
            plainText: plainText
          });
        }

        return accumlator;
      }, record);

      if (transformed !== record) {
        this.onChange(transformed);
        return;
      }

      if (onPaste) {
        files = Array.from(files);
        Array.from(items).forEach(function (item) {
          if (!item.getAsFile) {
            return;
          }

          var file = item.getAsFile();

          if (!file) {
            return;
          }

          var name = file.name,
              type = file.type,
              size = file.size;

          if (!find(files, {
            name: name,
            type: type,
            size: size
          })) {
            files.push(file);
          }
        });
        onPaste({
          value: this.removeEditorOnlyFormats(record),
          onChange: this.onChange,
          html: html,
          plainText: plainText,
          files: files,
          activeFormats: activeFormats
        });
      }
    }
    /**
     * Handles a focus event on the contenteditable field, calling the
     * `unstableOnFocus` prop callback if one is defined. The callback does not
     * receive any arguments.
     *
     * This is marked as a private API and the `unstableOnFocus` prop is not
     * documented, as the current requirements where it is used are subject to
     * future refactoring following `isSelected` handling.
     *
     * In contrast with `setFocusedElement`, this is only triggered in response
     * to focus within the contenteditable field, whereas `setFocusedElement`
     * is triggered on focus within any `RichText` descendent element.
     *
     * @see setFocusedElement
     *
     * @private
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      var unstableOnFocus = this.props.unstableOnFocus;

      if (unstableOnFocus) {
        unstableOnFocus();
      }

      if (!this.props.__unstableIsSelected) {
        // We know for certain that on focus, the old selection is invalid. It
        // will be recalculated on the next mouseup, keyup, or touchend event.
        var index = undefined;
        var activeFormats = EMPTY_ACTIVE_FORMATS;
        this.record = _objectSpread({}, this.record, {
          start: index,
          end: index,
          activeFormats: activeFormats
        });
        this.props.onSelectionChange(index, index);
        this.setState({
          activeFormats: activeFormats
        });
      } else {
        this.props.onSelectionChange(this.record.start, this.record.end);
        this.setState({
          activeFormats: getActiveFormats(_objectSpread({}, this.record, {
            activeFormats: undefined
          }), EMPTY_ACTIVE_FORMATS)
        });
      } // Update selection as soon as possible, which is at the next animation
      // frame. The event listener for selection changes may be added too late
      // at this point, but this focus event is still too early to calculate
      // the selection.


      this.rafId = this.getWindow().requestAnimationFrame(this.onSelectionChange);
      this.getDocument().addEventListener('selectionchange', this.onSelectionChange);

      if (this.props.setFocusedElement) {
        deprecated('wp.blockEditor.RichText setFocusedElement prop', {
          alternative: 'selection state from the block editor store.'
        });
        this.props.setFocusedElement(this.props.instanceId);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.getDocument().removeEventListener('selectionchange', this.onSelectionChange);
    }
    /**
     * Handle input on the next selection change event.
     *
     * @param {WPSyntheticEvent} event Synthetic input event.
     */

  }, {
    key: "onInput",
    value: function onInput(event) {
      // Do not trigger a change if characters are being composed. Browsers
      // will usually emit a final `input` event when the characters are
      // composed.
      // As of December 2019, Safari doesn't support nativeEvent.isComposing.
      if (this.isComposing) {
        return;
      }

      var inputType;

      if (event) {
        inputType = event.inputType;
      }

      if (!inputType && event && event.nativeEvent) {
        inputType = event.nativeEvent.inputType;
      } // The browser formatted something or tried to insert HTML.
      // Overwrite it. It will be handled later by the format library if
      // needed.


      if (inputType && (inputType.indexOf('format') === 0 || INSERTION_INPUT_TYPES_TO_IGNORE.has(inputType))) {
        this.applyRecord(this.record);
        return;
      }

      var value = this.createRecord();
      var _this$record = this.record,
          start = _this$record.start,
          _this$record$activeFo = _this$record.activeFormats,
          activeFormats = _this$record$activeFo === void 0 ? [] : _this$record$activeFo; // Update the formats between the last and new caret position.

      var change = updateFormats({
        value: value,
        start: start,
        end: value.start,
        formats: activeFormats
      });
      this.onChange(change, {
        withoutHistory: true
      });
      var _this$props4 = this.props,
          inputRule = _this$props4.__unstableInputRule,
          markAutomaticChange = _this$props4.__unstableMarkAutomaticChange,
          allowPrefixTransformations = _this$props4.__unstableAllowPrefixTransformations,
          formatTypes = _this$props4.formatTypes,
          setTimeout = _this$props4.setTimeout,
          clearTimeout = _this$props4.clearTimeout; // Create an undo level when input stops for over a second.

      clearTimeout(this.onInput.timeout);
      this.onInput.timeout = setTimeout(this.onCreateUndoLevel, 1000); // Only run input rules when inserting text.

      if (inputType !== 'insertText') {
        return;
      }

      if (allowPrefixTransformations && inputRule) {
        inputRule(change, this.valueToFormat);
      }

      var transformed = formatTypes.reduce(function (accumlator, _ref4) {
        var __unstableInputRule = _ref4.__unstableInputRule;

        if (__unstableInputRule) {
          accumlator = __unstableInputRule(accumlator);
        }

        return accumlator;
      }, change);

      if (transformed !== change) {
        this.onCreateUndoLevel();
        this.onChange(_objectSpread({}, transformed, {
          activeFormats: activeFormats
        }));
        markAutomaticChange();
      }
    }
  }, {
    key: "onCompositionStart",
    value: function onCompositionStart() {
      this.isComposing = true; // Do not update the selection when characters are being composed as
      // this rerenders the component and might distroy internal browser
      // editing state.

      this.getDocument().removeEventListener('selectionchange', this.onSelectionChange);
    }
  }, {
    key: "onCompositionEnd",
    value: function onCompositionEnd() {
      this.isComposing = false; // Ensure the value is up-to-date for browsers that don't emit a final
      // input event after composition.

      this.onInput({
        inputType: 'insertText'
      }); // Tracking selection changes can be resumed.

      this.getDocument().addEventListener('selectionchange', this.onSelectionChange);
    }
    /**
     * Syncs the selection to local state. A callback for the `selectionchange`
     * native events, `keyup`, `mouseup` and `touchend` synthetic events, and
     * animation frames after the `focus` event.
     *
     * @param {Event|WPSyntheticEvent|DOMHighResTimeStamp} event
     */

  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(event) {
      if (event.type !== 'selectionchange' && !this.props.__unstableIsSelected) {
        return;
      }

      if (this.props.disabled) {
        return;
      } // In case of a keyboard event, ignore selection changes during
      // composition.


      if (this.isComposing) {
        return;
      }

      var _this$createRecord = this.createRecord(),
          start = _this$createRecord.start,
          end = _this$createRecord.end,
          text = _this$createRecord.text;

      var value = this.record; // Fallback mechanism for IE11, which doesn't support the input event.
      // Any input results in a selection change.

      if (text !== value.text) {
        this.onInput();
        return;
      }

      if (start === value.start && end === value.end) {
        // Sometimes the browser may set the selection on the placeholder
        // element, in which case the caret is not visible. We need to set
        // the caret before the placeholder if that's the case.
        if (value.text.length === 0 && start === 0) {
          fixPlaceholderSelection(this.getWindow());
        }

        return;
      }

      var _this$props5 = this.props,
          isCaretWithinFormattedText = _this$props5.__unstableIsCaretWithinFormattedText,
          onEnterFormattedText = _this$props5.__unstableOnEnterFormattedText,
          onExitFormattedText = _this$props5.__unstableOnExitFormattedText;

      var newValue = _objectSpread({}, value, {
        start: start,
        end: end,
        // Allow `getActiveFormats` to get new `activeFormats`.
        activeFormats: undefined
      });

      var activeFormats = getActiveFormats(newValue, EMPTY_ACTIVE_FORMATS); // Update the value with the new active formats.

      newValue.activeFormats = activeFormats;

      if (!isCaretWithinFormattedText && activeFormats.length) {
        onEnterFormattedText();
      } else if (isCaretWithinFormattedText && !activeFormats.length) {
        onExitFormattedText();
      } // It is important that the internal value is updated first,
      // otherwise the value will be wrong on render!


      this.record = newValue;
      this.applyRecord(newValue, {
        domOnly: true
      });
      this.props.onSelectionChange(start, end);
      this.setState({
        activeFormats: activeFormats
      });
    }
    /**
     * Sync the value to global state. The node tree and selection will also be
     * updated if differences are found.
     *
     * @param {Object}  record            The record to sync and apply.
     * @param {Object}  $2                Named options.
     * @param {boolean} $2.withoutHistory If true, no undo level will be
     *                                    created.
     */

  }, {
    key: "onChange",
    value: function onChange(record) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          withoutHistory = _ref5.withoutHistory;

      if (this.props.__unstableDisableFormats) {
        record.formats = Array(record.text.length);
        record.replacements = Array(record.text.length);
      }

      this.applyRecord(record);
      var start = record.start,
          end = record.end,
          _record$activeFormats = record.activeFormats,
          activeFormats = _record$activeFormats === void 0 ? [] : _record$activeFormats;
      var changeHandlers = pickBy(this.props, function (v, key) {
        return key.startsWith('format_on_change_functions_');
      });
      Object.values(changeHandlers).forEach(function (changeHandler) {
        changeHandler(record.formats, record.text);
      });
      this.value = this.valueToFormat(record);
      this.record = record; // Selection must be updated first, so it is recorded in history when
      // the content change happens.

      this.props.onSelectionChange(start, end);
      this.props.onChange(this.value);
      this.setState({
        activeFormats: activeFormats
      });

      if (!withoutHistory) {
        this.onCreateUndoLevel();
      }
    }
  }, {
    key: "onCreateUndoLevel",
    value: function onCreateUndoLevel() {
      // If the content is the same, no level needs to be created.
      if (this.lastHistoryValue === this.value) {
        return;
      }

      this.props.__unstableOnCreateUndoLevel();

      this.lastHistoryValue = this.value;
    }
    /**
     * Handles delete on keydown:
     * - outdent list items,
     * - delete content if everything is selected,
     * - trigger the onDelete prop when selection is uncollapsed and at an edge.
     *
     * @param {WPSyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "handleDelete",
    value: function handleDelete(event) {
      var keyCode = event.keyCode;

      if (keyCode !== DELETE && keyCode !== BACKSPACE && keyCode !== ESCAPE) {
        return;
      }

      if (this.props.__unstableDidAutomaticChange) {
        event.preventDefault();

        this.props.__unstableUndo();

        return;
      }

      if (keyCode === ESCAPE) {
        return;
      }

      var _this$props6 = this.props,
          onDelete = _this$props6.onDelete,
          multilineTag = _this$props6.__unstableMultilineTag;
      var _this$state$activeFor2 = this.state.activeFormats,
          activeFormats = _this$state$activeFor2 === void 0 ? [] : _this$state$activeFor2;
      var value = this.createRecord();
      var start = value.start,
          end = value.end,
          text = value.text;
      var isReverse = keyCode === BACKSPACE; // Always handle full content deletion ourselves.

      if (start === 0 && end !== 0 && end === text.length) {
        this.onChange(remove(value));
        event.preventDefault();
        return;
      }

      if (multilineTag) {
        var newValue; // Check to see if we should remove the first item if empty.

        if (isReverse && value.start === 0 && value.end === 0 && isEmptyLine(value)) {
          newValue = removeLineSeparator(value, !isReverse);
        } else {
          newValue = removeLineSeparator(value, isReverse);
        }

        if (newValue) {
          this.onChange(newValue);
          event.preventDefault();
          return;
        }
      } // Only process delete if the key press occurs at an uncollapsed edge.


      if (!onDelete || !isCollapsed(value) || activeFormats.length || isReverse && start !== 0 || !isReverse && end !== text.length) {
        return;
      }

      onDelete({
        isReverse: isReverse,
        value: value
      });
      event.preventDefault();
    }
    /**
     * Triggers the `onEnter` prop on keydown.
     *
     * @param {WPSyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "handleEnter",
    value: function handleEnter(event) {
      if (event.keyCode !== ENTER) {
        return;
      }

      event.preventDefault();
      var onEnter = this.props.onEnter;

      if (!onEnter) {
        return;
      }

      onEnter({
        value: this.removeEditorOnlyFormats(this.createRecord()),
        onChange: this.onChange,
        shiftKey: event.shiftKey
      });
    }
    /**
     * Indents list items on space keydown.
     *
     * @param {WPSyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "handleSpace",
    value: function handleSpace(event) {
      var keyCode = event.keyCode,
          shiftKey = event.shiftKey,
          altKey = event.altKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;
      var _this$props7 = this.props,
          multilineRootTag = _this$props7.__unstableMultilineRootTag,
          multilineTag = _this$props7.__unstableMultilineTag;

      if ( // Only override when no modifiers are pressed.
      shiftKey || altKey || metaKey || ctrlKey || keyCode !== SPACE || multilineTag !== 'li') {
        return;
      }

      var value = this.createRecord();

      if (!isCollapsed(value)) {
        return;
      }

      var text = value.text,
          start = value.start;
      var characterBefore = text[start - 1]; // The caret must be at the start of a line.

      if (characterBefore && characterBefore !== LINE_SEPARATOR) {
        return;
      }

      this.onChange(indentListItems(value, {
        type: multilineRootTag
      }));
      event.preventDefault();
    }
    /**
     * Handles horizontal keyboard navigation when no modifiers are pressed. The
     * navigation is handled separately to move correctly around format
     * boundaries.
     *
     * @param {WPSyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "handleHorizontalNavigation",
    value: function handleHorizontalNavigation(event) {
      var keyCode = event.keyCode,
          shiftKey = event.shiftKey,
          altKey = event.altKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;

      if ( // Only override left and right keys without modifiers pressed.
      shiftKey || altKey || metaKey || ctrlKey || keyCode !== LEFT && keyCode !== RIGHT) {
        return;
      }

      var value = this.record;
      var text = value.text,
          formats = value.formats,
          start = value.start,
          end = value.end,
          _value$activeFormats = value.activeFormats,
          activeFormats = _value$activeFormats === void 0 ? [] : _value$activeFormats;
      var collapsed = isCollapsed(value); // To do: ideally, we should look at visual position instead.

      var _this$getWindow$getCo = this.getWindow().getComputedStyle(this.props.forwardedRef.current),
          direction = _this$getWindow$getCo.direction;

      var reverseKey = direction === 'rtl' ? RIGHT : LEFT;
      var isReverse = event.keyCode === reverseKey; // If the selection is collapsed and at the very start, do nothing if
      // navigating backward.
      // If the selection is collapsed and at the very end, do nothing if
      // navigating forward.

      if (collapsed && activeFormats.length === 0) {
        if (start === 0 && isReverse) {
          return;
        }

        if (end === text.length && !isReverse) {
          return;
        }
      } // If the selection is not collapsed, let the browser handle collapsing
      // the selection for now. Later we could expand this logic to set
      // boundary positions if needed.


      if (!collapsed) {
        return;
      } // In all other cases, prevent default behaviour.


      event.preventDefault();
      var formatsBefore = formats[start - 1] || EMPTY_ACTIVE_FORMATS;
      var formatsAfter = formats[start] || EMPTY_ACTIVE_FORMATS;
      var newActiveFormatsLength = activeFormats.length;
      var source = formatsAfter;

      if (formatsBefore.length > formatsAfter.length) {
        source = formatsBefore;
      } // If the amount of formats before the caret and after the caret is
      // different, the caret is at a format boundary.


      if (formatsBefore.length < formatsAfter.length) {
        if (!isReverse && activeFormats.length < formatsAfter.length) {
          newActiveFormatsLength++;
        }

        if (isReverse && activeFormats.length > formatsBefore.length) {
          newActiveFormatsLength--;
        }
      } else if (formatsBefore.length > formatsAfter.length) {
        if (!isReverse && activeFormats.length > formatsAfter.length) {
          newActiveFormatsLength--;
        }

        if (isReverse && activeFormats.length < formatsBefore.length) {
          newActiveFormatsLength++;
        }
      }

      if (newActiveFormatsLength !== activeFormats.length) {
        var _newActiveFormats = source.slice(0, newActiveFormatsLength);

        var _newValue = _objectSpread({}, value, {
          activeFormats: _newActiveFormats
        });

        this.record = _newValue;
        this.applyRecord(_newValue);
        this.setState({
          activeFormats: _newActiveFormats
        });
        return;
      }

      var newPos = start + (isReverse ? -1 : 1);
      var newActiveFormats = isReverse ? formatsBefore : formatsAfter;

      var newValue = _objectSpread({}, value, {
        start: newPos,
        end: newPos,
        activeFormats: newActiveFormats
      });

      this.record = newValue;
      this.applyRecord(newValue);
      this.props.onSelectionChange(newPos, newPos);
      this.setState({
        activeFormats: newActiveFormats
      });
    }
    /**
     * Select object when they are clicked. The browser will not set any
     * selection when clicking e.g. an image.
     *
     * @param {WPSyntheticEvent} event Synthetic mousedown or touchstart event.
     */

  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      var target = event.target; // If the child element has no text content, it must be an object.

      if (target === this.props.forwardedRef.current || target.textContent) {
        return;
      }

      var parentNode = target.parentNode;
      var index = Array.from(parentNode.childNodes).indexOf(target);
      var range = this.getDocument().createRange();
      var selection = this.getWindow().getSelection();
      range.setStart(target.parentNode, index);
      range.setEnd(target.parentNode, index + 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props8 = this.props,
          tagName = _this$props8.tagName,
          value = _this$props8.value,
          selectionStart = _this$props8.selectionStart,
          selectionEnd = _this$props8.selectionEnd,
          placeholder = _this$props8.placeholder,
          isSelected = _this$props8.__unstableIsSelected; // Check if tag name changed.

      var shouldReapply = tagName !== prevProps.tagName; // Check if the content changed.

      shouldReapply = shouldReapply || value !== prevProps.value && value !== this.value;
      var selectionChanged = selectionStart !== prevProps.selectionStart && selectionStart !== this.record.start || selectionEnd !== prevProps.selectionEnd && selectionEnd !== this.record.end; // Check if the selection changed.

      shouldReapply = shouldReapply || isSelected && !prevProps.isSelected && selectionChanged;
      var prefix = 'format_prepare_props_';

      var predicate = function predicate(v, key) {
        return key.startsWith(prefix);
      };

      var prepareProps = pickBy(this.props, predicate);
      var prevPrepareProps = pickBy(prevProps, predicate); // Check if any format props changed.

      shouldReapply = shouldReapply || !isShallowEqual(prepareProps, prevPrepareProps); // Rerender if the placeholder changed.

      shouldReapply = shouldReapply || placeholder !== prevProps.placeholder;

      if (shouldReapply) {
        this.value = value;
        this.record = this.formatToValue(value);
        this.record.start = selectionStart;
        this.record.end = selectionEnd;
        this.applyRecord(this.record);
      } else if (selectionChanged) {
        this.record = _objectSpread({}, this.record, {
          start: selectionStart,
          end: selectionEnd
        });
      }
    }
    /**
     * Converts the outside data structure to our internal representation.
     *
     * @param {*} value The outside value, data type depends on props.
     * @return {Object} An internal rich-text value.
     */

  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      var _this$props9 = this.props,
          format = _this$props9.format,
          multilineTag = _this$props9.__unstableMultilineTag,
          preserveWhiteSpace = _this$props9.preserveWhiteSpace,
          disableFormats = _this$props9.__unstableDisableFormats;

      if (disableFormats) {
        return {
          text: value,
          formats: Array(value.length),
          replacements: Array(value.length)
        };
      }

      if (format !== 'string') {
        return value;
      }

      var prepare = createPrepareEditableTree(this.props, 'format_value_functions');
      value = create({
        html: value,
        multilineTag: multilineTag,
        multilineWrapperTags: multilineTag === 'li' ? ['ul', 'ol'] : undefined,
        preserveWhiteSpace: preserveWhiteSpace
      });
      value.formats = prepare(value);
      return value;
    }
    /**
     * Removes editor only formats from the value.
     *
     * Editor only formats are applied using `prepareEditableTree`, so we need to
     * remove them before converting the internal state
     *
     * @param {Object} value The internal rich-text value.
     * @return {Object} A new rich-text value.
     */

  }, {
    key: "removeEditorOnlyFormats",
    value: function removeEditorOnlyFormats(value) {
      this.props.formatTypes.forEach(function (formatType) {
        // Remove formats created by prepareEditableTree, because they are editor only.
        if (formatType.__experimentalCreatePrepareEditableTree) {
          value = removeFormat(value, formatType.name, 0, value.text.length);
        }
      });
      return value;
    }
    /**
     * Converts the internal value to the external data format.
     *
     * @param {Object} value The internal rich-text value.
     * @return {*} The external data format, data type depends on props.
     */

  }, {
    key: "valueToFormat",
    value: function valueToFormat(value) {
      var _this$props10 = this.props,
          format = _this$props10.format,
          multilineTag = _this$props10.__unstableMultilineTag,
          preserveWhiteSpace = _this$props10.preserveWhiteSpace,
          disableFormats = _this$props10.__unstableDisableFormats;

      if (disableFormats) {
        return value.text;
      }

      value = this.removeEditorOnlyFormats(value);

      if (format !== 'string') {
        return;
      }

      return toHTMLString({
        value: value,
        multilineTag: multilineTag,
        preserveWhiteSpace: preserveWhiteSpace
      });
    }
  }, {
    key: "Editable",
    value: function Editable(props) {
      var _this2 = this;

      var _this$props11 = this.props,
          _this$props11$tagName = _this$props11.tagName,
          TagName = _this$props11$tagName === void 0 ? 'div' : _this$props11$tagName,
          style = _this$props11.style,
          className = _this$props11.className,
          placeholder = _this$props11.placeholder,
          forwardedRef = _this$props11.forwardedRef,
          disabled = _this$props11.disabled;
      var ariaProps = pickBy(this.props, function (value, key) {
        return startsWith(key, 'aria-');
      });
      return createElement(TagName // Overridable props.
      , _extends({
        role: "textbox",
        "aria-multiline": true,
        "aria-label": placeholder
      }, props, ariaProps, {
        ref: forwardedRef,
        style: style ? _objectSpread({}, style, {
          whiteSpace: whiteSpace
        }) : defaultStyle,
        className: classnames('rich-text', className),
        onPaste: this.onPaste,
        onInput: this.onInput,
        onCompositionStart: this.onCompositionStart,
        onCompositionEnd: this.onCompositionEnd,
        onKeyDown: props.onKeyDown ? function (event) {
          props.onKeyDown(event);

          _this2.onKeyDown(event);
        } : this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onMouseDown: this.onPointerDown,
        onTouchStart: this.onPointerDown // Selection updates must be done at these events as they
        // happen before the `selectionchange` event. In some cases,
        // the `selectionchange` event may not even fire, for
        // example when the window receives focus again on click.
        ,
        onKeyUp: this.onSelectionChange,
        onMouseUp: this.onSelectionChange,
        onTouchEnd: this.onSelectionChange // Do not set the attribute if disabled.
        ,
        contentEditable: disabled ? undefined : true,
        suppressContentEditableWarning: !disabled
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props12 = this.props,
          isSelected = _this$props12.__unstableIsSelected,
          children = _this$props12.children,
          allowedFormats = _this$props12.allowedFormats,
          withoutInteractiveFormatting = _this$props12.withoutInteractiveFormatting,
          formatTypes = _this$props12.formatTypes,
          forwardedRef = _this$props12.forwardedRef;
      var activeFormats = this.state.activeFormats;

      var onFocus = function onFocus() {
        forwardedRef.current.focus();

        _this3.applyRecord(_this3.record);
      };

      return createElement(Fragment, null, createElement(BoundaryStyle, {
        activeFormats: activeFormats,
        forwardedRef: forwardedRef
      }), createElement(InlineWarning, {
        forwardedRef: forwardedRef
      }), isSelected && createElement(FormatEdit, {
        allowedFormats: allowedFormats,
        withoutInteractiveFormatting: withoutInteractiveFormatting,
        value: this.record,
        onChange: this.onChange,
        onFocus: onFocus,
        formatTypes: formatTypes
      }), children && children({
        isSelected: isSelected,
        value: this.record,
        onChange: this.onChange,
        onFocus: onFocus,
        Editable: this.Editable
      }), !children && createElement(this.Editable, null));
    }
  }]);

  return RichText;
}(Component);

RichText.defaultProps = {
  format: 'string',
  value: ''
};
var RichTextWrapper = compose([withSafeTimeout, withFormatTypes])(RichText);
/**
 * Renders a rich content input, providing users with the option to format the
 * content.
 */

export default forwardRef(function (props, ref) {
  return createElement(RichTextWrapper, _extends({}, props, {
    forwardedRef: ref
  }));
});
//# sourceMappingURL=index.js.map