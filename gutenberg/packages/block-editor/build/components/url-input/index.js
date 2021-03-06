"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// Since URLInput is rendered in the context of other inputs, but should be
// considered a separate modal node, prevent keyboard events from propagating
// as being considered from the input.
var stopEventPropagation = function stopEventPropagation(event) {
  return event.stopPropagation();
};

var URLInput = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(URLInput, _Component);

  var _super = _createSuper(URLInput);

  function URLInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, URLInput);
    _this = _super.call(this, props);
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)(_this));
    _this.selectLink = _this.selectLink.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleOnClick = _this.handleOnClick.bind((0, _assertThisInitialized2.default)(_this));
    _this.bindSuggestionNode = _this.bindSuggestionNode.bind((0, _assertThisInitialized2.default)(_this));
    _this.autocompleteRef = props.autocompleteRef || (0, _element.createRef)();
    _this.inputRef = (0, _element.createRef)();
    _this.updateSuggestions = (0, _lodash.throttle)(_this.updateSuggestions.bind((0, _assertThisInitialized2.default)(_this)), 200);
    _this.suggestionNodes = [];
    _this.isUpdatingSuggestions = false;
    _this.state = {
      suggestions: [],
      showSuggestions: false,
      selectedSuggestion: null
    };
    return _this;
  }

  (0, _createClass2.default)(URLInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _this$state = this.state,
          showSuggestions = _this$state.showSuggestions,
          selectedSuggestion = _this$state.selectedSuggestion;
      var value = this.props.value; // only have to worry about scrolling selected suggestion into view
      // when already expanded

      if (showSuggestions && selectedSuggestion !== null && !this.scrollingIntoView) {
        this.scrollingIntoView = true;
        (0, _domScrollIntoView.default)(this.suggestionNodes[selectedSuggestion], this.autocompleteRef.current, {
          onlyScrollIfNeeded: true
        });
        this.props.setTimeout(function () {
          _this2.scrollingIntoView = false;
        }, 100);
      } // Only attempt an update on suggestions if the input value has actually changed.


      if (prevProps.value !== value && this.shouldShowInitialSuggestions()) {
        this.updateSuggestions();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.shouldShowInitialSuggestions()) {
        this.updateSuggestions();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      delete this.suggestionsRequest;
    }
  }, {
    key: "bindSuggestionNode",
    value: function bindSuggestionNode(index) {
      var _this3 = this;

      return function (ref) {
        _this3.suggestionNodes[index] = ref;
      };
    }
  }, {
    key: "shouldShowInitialSuggestions",
    value: function shouldShowInitialSuggestions() {
      var suggestions = this.state.suggestions;

      var _this$props = this.props,
          _this$props$__experim = _this$props.__experimentalShowInitialSuggestions,
          __experimentalShowInitialSuggestions = _this$props$__experim === void 0 ? false : _this$props$__experim,
          value = _this$props.value;

      return !this.isUpdatingSuggestions && __experimentalShowInitialSuggestions && !(value && value.length) && !(suggestions && suggestions.length);
    }
  }, {
    key: "updateSuggestions",
    value: function updateSuggestions() {
      var _this4 = this;

      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _this$props2 = this.props,
          fetchLinkSuggestions = _this$props2.__experimentalFetchLinkSuggestions,
          handleURLSuggestions = _this$props2.__experimentalHandleURLSuggestions;

      if (!fetchLinkSuggestions) {
        return;
      }

      var isInitialSuggestions = !(value && value.length); // Allow a suggestions request if:
      // - there are at least 2 characters in the search input (except manual searches where
      //   search input length is not required to trigger a fetch)
      // - this is a direct entry (eg: a URL)

      if (!isInitialSuggestions && (value.length < 2 || !handleURLSuggestions && (0, _url.isURL)(value))) {
        this.setState({
          showSuggestions: false,
          selectedSuggestion: null,
          loading: false
        });
        return;
      }

      this.isUpdatingSuggestions = true;
      this.setState({
        showSuggestions: true,
        selectedSuggestion: null,
        loading: true
      });
      var request = fetchLinkSuggestions(value, {
        isInitialSuggestions: isInitialSuggestions
      });
      request.then(function (suggestions) {
        // A fetch Promise doesn't have an abort option. It's mimicked by
        // comparing the request reference in on the instance, which is
        // reset or deleted on subsequent requests or unmounting.
        if (_this4.suggestionsRequest !== request) {
          return;
        }

        _this4.setState({
          suggestions: suggestions,
          loading: false
        });

        if (!!suggestions.length) {
          _this4.props.debouncedSpeak((0, _i18n.sprintf)(
          /* translators: %s: number of results. */
          (0, _i18n._n)('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', suggestions.length), suggestions.length), 'assertive');
        } else {
          _this4.props.debouncedSpeak((0, _i18n.__)('No results.'), 'assertive');
        }

        _this4.isUpdatingSuggestions = false;
      }).catch(function () {
        if (_this4.suggestionsRequest === request) {
          _this4.setState({
            loading: false
          });

          _this4.isUpdatingSuggestions = false;
        }
      }); // Note that this assignment is handled *before* the async search request
      // as a Promise always resolves on the next tick of the event loop.

      this.suggestionsRequest = request;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var inputValue = event.target.value;
      this.props.onChange(inputValue);

      if (!this.props.disableSuggestions) {
        this.updateSuggestions(inputValue.trim());
      }
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      var suggestions = this.state.suggestions;
      var _this$props3 = this.props,
          disableSuggestions = _this$props3.disableSuggestions,
          value = _this$props3.value; // When opening the link editor, if there's a value present, we want to load the suggestions pane with the results for this input search value
      // Don't re-run the suggestions on focus if there are already suggestions present (prevents searching again when tabbing between the input and buttons)

      if (value && !disableSuggestions && !this.isUpdatingSuggestions && !(suggestions && suggestions.length)) {
        // Ensure the suggestions are updated with the current input value
        this.updateSuggestions(value.trim());
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$state2 = this.state,
          showSuggestions = _this$state2.showSuggestions,
          selectedSuggestion = _this$state2.selectedSuggestion,
          suggestions = _this$state2.suggestions,
          loading = _this$state2.loading; // If the suggestions are not shown or loading, we shouldn't handle the arrow keys
      // We shouldn't preventDefault to allow block arrow keys navigation

      if (!showSuggestions || !suggestions.length || loading) {
        // In the Windows version of Firefox the up and down arrows don't move the caret
        // within an input field like they do for Mac Firefox/Chrome/Safari. This causes
        // a form of focus trapping that is disruptive to the user experience. This disruption
        // only happens if the caret is not in the first or last position in the text input.
        // See: https://github.com/WordPress/gutenberg/issues/5693#issuecomment-436684747
        switch (event.keyCode) {
          // When UP is pressed, if the caret is at the start of the text, move it to the 0
          // position.
          case _keycodes.UP:
            {
              if (0 !== event.target.selectionStart) {
                event.stopPropagation();
                event.preventDefault(); // Set the input caret to position 0

                event.target.setSelectionRange(0, 0);
              }

              break;
            }
          // When DOWN is pressed, if the caret is not at the end of the text, move it to the
          // last position.

          case _keycodes.DOWN:
            {
              if (this.props.value.length !== event.target.selectionStart) {
                event.stopPropagation();
                event.preventDefault(); // Set the input caret to the last position

                event.target.setSelectionRange(this.props.value.length, this.props.value.length);
              }

              break;
            }
        }

        return;
      }

      var suggestion = this.state.suggestions[this.state.selectedSuggestion];

      switch (event.keyCode) {
        case _keycodes.UP:
          {
            event.stopPropagation();
            event.preventDefault();
            var previousIndex = !selectedSuggestion ? suggestions.length - 1 : selectedSuggestion - 1;
            this.setState({
              selectedSuggestion: previousIndex
            });
            break;
          }

        case _keycodes.DOWN:
          {
            event.stopPropagation();
            event.preventDefault();
            var nextIndex = selectedSuggestion === null || selectedSuggestion === suggestions.length - 1 ? 0 : selectedSuggestion + 1;
            this.setState({
              selectedSuggestion: nextIndex
            });
            break;
          }

        case _keycodes.TAB:
          {
            if (this.state.selectedSuggestion !== null) {
              this.selectLink(suggestion); // Announce a link has been selected when tabbing away from the input field.

              this.props.speak((0, _i18n.__)('Link selected.'));
            }

            break;
          }

        case _keycodes.ENTER:
          {
            if (this.state.selectedSuggestion !== null) {
              event.stopPropagation();
              this.selectLink(suggestion);
            }

            break;
          }
      }
    }
  }, {
    key: "selectLink",
    value: function selectLink(suggestion) {
      this.props.onChange(suggestion.url, suggestion);
      this.setState({
        selectedSuggestion: null,
        showSuggestions: false
      });
    }
  }, {
    key: "handleOnClick",
    value: function handleOnClick(suggestion) {
      this.selectLink(suggestion); // Move focus to the input field when a link suggestion is clicked.

      this.inputRef.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props4 = this.props,
          label = _this$props4.label,
          instanceId = _this$props4.instanceId,
          className = _this$props4.className,
          isFullWidth = _this$props4.isFullWidth,
          hasBorder = _this$props4.hasBorder,
          renderSuggestions = _this$props4.__experimentalRenderSuggestions,
          _this$props4$placehol = _this$props4.placeholder,
          placeholder = _this$props4$placehol === void 0 ? (0, _i18n.__)('Paste URL or type to search') : _this$props4$placehol,
          _this$props4$value = _this$props4.value,
          value = _this$props4$value === void 0 ? '' : _this$props4$value,
          _this$props4$autoFocu = _this$props4.autoFocus,
          autoFocus = _this$props4$autoFocu === void 0 ? true : _this$props4$autoFocu,
          _this$props4$__experi = _this$props4.__experimentalShowInitialSuggestions,
          __experimentalShowInitialSuggestions = _this$props4$__experi === void 0 ? false : _this$props4$__experi;

      var _this$state3 = this.state,
          showSuggestions = _this$state3.showSuggestions,
          suggestions = _this$state3.suggestions,
          selectedSuggestion = _this$state3.selectedSuggestion,
          loading = _this$state3.loading;
      var id = "url-input-control-".concat(instanceId);
      var suggestionsListboxId = "block-editor-url-input-suggestions-".concat(instanceId);
      var suggestionOptionIdPrefix = "block-editor-url-input-suggestion-".concat(instanceId);
      var suggestionsListProps = {
        id: suggestionsListboxId,
        ref: this.autocompleteRef,
        role: 'listbox'
      };

      var buildSuggestionItemProps = function buildSuggestionItemProps(suggestion, index) {
        return {
          role: 'option',
          tabIndex: '-1',
          id: "".concat(suggestionOptionIdPrefix, "-").concat(index),
          ref: _this5.bindSuggestionNode(index),
          'aria-selected': index === selectedSuggestion
        };
      };
      /* eslint-disable jsx-a11y/no-autofocus */


      return (0, _element.createElement)(_components.BaseControl, {
        label: label,
        id: id,
        className: (0, _classnames.default)('block-editor-url-input', className, {
          'is-full-width': isFullWidth,
          'has-border': hasBorder
        })
      }, (0, _element.createElement)("input", {
        className: "block-editor-url-input__input",
        autoFocus: autoFocus,
        type: "text",
        "aria-label": (0, _i18n.__)('URL'),
        required: true,
        value: value,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onInput: stopEventPropagation,
        placeholder: placeholder,
        onKeyDown: this.onKeyDown,
        role: "combobox",
        "aria-expanded": showSuggestions,
        "aria-autocomplete": "list",
        "aria-owns": suggestionsListboxId,
        "aria-activedescendant": selectedSuggestion !== null ? "".concat(suggestionOptionIdPrefix, "-").concat(selectedSuggestion) : undefined,
        ref: this.inputRef
      }), loading && (0, _element.createElement)(_components.Spinner, null), (0, _lodash.isFunction)(renderSuggestions) && showSuggestions && !!suggestions.length && renderSuggestions({
        suggestions: suggestions,
        selectedSuggestion: selectedSuggestion,
        suggestionsListProps: suggestionsListProps,
        buildSuggestionItemProps: buildSuggestionItemProps,
        isLoading: loading,
        handleSuggestionClick: this.handleOnClick,
        isInitialSuggestions: __experimentalShowInitialSuggestions && !(value && value.length)
      }), !(0, _lodash.isFunction)(renderSuggestions) && showSuggestions && !!suggestions.length && (0, _element.createElement)(_components.Popover, {
        position: "bottom",
        noArrow: true,
        focusOnMount: false
      }, (0, _element.createElement)("div", (0, _extends2.default)({}, suggestionsListProps, {
        className: (0, _classnames.default)('block-editor-url-input__suggestions', "".concat(className, "__suggestions"))
      }), suggestions.map(function (suggestion, index) {
        return (0, _element.createElement)(_components.Button, (0, _extends2.default)({}, buildSuggestionItemProps(suggestion, index), {
          key: suggestion.id,
          className: (0, _classnames.default)('block-editor-url-input__suggestion', {
            'is-selected': index === selectedSuggestion
          }),
          onClick: function onClick() {
            return _this5.handleOnClick(suggestion);
          }
        }), suggestion.title);
      }))));
      /* eslint-enable jsx-a11y/no-autofocus */
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref, _ref2) {
      var value = _ref.value,
          disableSuggestions = _ref.disableSuggestions,
          _ref$__experimentalSh = _ref.__experimentalShowInitialSuggestions,
          __experimentalShowInitialSuggestions = _ref$__experimentalSh === void 0 ? false : _ref$__experimentalSh;

      var showSuggestions = _ref2.showSuggestions;
      var shouldShowSuggestions = showSuggestions;
      var hasValue = value && value.length;

      if (!__experimentalShowInitialSuggestions && !hasValue) {
        shouldShowSuggestions = false;
      }

      if (disableSuggestions === true) {
        shouldShowSuggestions = false;
      }

      return {
        showSuggestions: shouldShowSuggestions
      };
    }
  }]);
  return URLInput;
}(_element.Component);
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/url-input/README.md
 */


var _default = (0, _compose.compose)(_compose.withSafeTimeout, _components.withSpokenMessages, _compose.withInstanceId, (0, _data.withSelect)(function (select, props) {
  // If a link suggestions handler is already provided then
  // bail
  if ((0, _lodash.isFunction)(props.__experimentalFetchLinkSuggestions)) {
    return;
  }

  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    __experimentalFetchLinkSuggestions: getSettings().__experimentalFetchLinkSuggestions
  };
}))(URLInput);

exports.default = _default;
//# sourceMappingURL=index.js.map