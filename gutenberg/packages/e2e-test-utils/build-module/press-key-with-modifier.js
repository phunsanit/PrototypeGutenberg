import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { capitalize } from 'lodash';
/**
 * WordPress dependencies
 */

import { modifiers, SHIFT, ALT, CTRL } from '@wordpress/keycodes';
/**
 * Emulates a Ctrl+A SelectAll key combination by dispatching custom keyboard
 * events and using the results of those events to determine whether to call
 * `document.execCommand( 'selectall' );`. This is necessary because Puppeteer
 * does not emulate Ctrl+A SelectAll in macOS. Events are dispatched to ensure
 * that any `Event#preventDefault` which would have normally occurred in the
 * application as a result of Ctrl+A is respected.
 *
 * @see https://github.com/GoogleChrome/puppeteer/issues/1313
 * @see https://w3c.github.io/uievents/tools/key-event-viewer.html
 *
 * @return {Promise} Promise resolving once the SelectAll emulation completes.
 */

function emulateSelectAll() {
  return _emulateSelectAll.apply(this, arguments);
}

function _emulateSelectAll() {
  _emulateSelectAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.evaluate(function () {
              var isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
              document.activeElement.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: isMac ? 'Meta' : 'Control',
                code: isMac ? 'MetaLeft' : 'ControlLeft',
                location: window.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
                getModifierState: function getModifierState(keyArg) {
                  return keyArg === (isMac ? 'Meta' : 'Control');
                },
                ctrlKey: !isMac,
                metaKey: isMac,
                charCode: 0,
                keyCode: isMac ? 93 : 17,
                which: isMac ? 93 : 17
              }));
              var preventableEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'a',
                code: 'KeyA',
                location: window.KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
                getModifierState: function getModifierState(keyArg) {
                  return keyArg === (isMac ? 'Meta' : 'Control');
                },
                ctrlKey: !isMac,
                metaKey: isMac,
                charCode: 0,
                keyCode: 65,
                which: 65
              });
              var wasPrevented = !document.activeElement.dispatchEvent(preventableEvent) || preventableEvent.defaultPrevented;

              if (!wasPrevented) {
                document.execCommand('selectall', false, null);
              }

              document.activeElement.dispatchEvent(new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: isMac ? 'Meta' : 'Control',
                code: isMac ? 'MetaLeft' : 'ControlLeft',
                location: window.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
                getModifierState: function getModifierState() {
                  return false;
                },
                charCode: 0,
                keyCode: isMac ? 93 : 17,
                which: isMac ? 93 : 17
              }));
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _emulateSelectAll.apply(this, arguments);
}

function emulateClipboard(_x) {
  return _emulateClipboard.apply(this, arguments);
}
/**
 * Performs a key press with modifier (Shift, Control, Meta, Alt), where each modifier
 * is normalized to platform-specific modifier.
 *
 * @param {string} modifier Modifier key.
 * @param {string} key Key to press while modifier held.
 */


function _emulateClipboard() {
  _emulateClipboard = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(type) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return page.evaluate(function (_type) {
              if (_type !== 'paste') {
                window._clipboardData = new DataTransfer();
                var selection = window.getSelection();
                var plainText = selection.toString();
                var html = plainText;

                if (selection.rangeCount) {
                  var range = selection.getRangeAt(0);
                  var fragment = range.cloneContents();
                  html = Array.from(fragment.childNodes).map(function (node) {
                    return node.outerHTML || node.nodeValue;
                  }).join('');
                }

                window._clipboardData.setData('text/plain', plainText);

                window._clipboardData.setData('text/html', html);
              }

              document.activeElement.dispatchEvent(new ClipboardEvent(_type, {
                bubbles: true,
                clipboardData: window._clipboardData
              }));
            }, type);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _emulateClipboard.apply(this, arguments);
}

export function pressKeyWithModifier(_x2, _x3) {
  return _pressKeyWithModifier.apply(this, arguments);
}

function _pressKeyWithModifier() {
  _pressKeyWithModifier = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(modifier, key) {
    var isAppleOS, overWrittenModifiers, mappedModifiers, ctrlSwap;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(modifier.toLowerCase() === 'primary' && key.toLowerCase() === 'a')) {
              _context5.next = 4;
              break;
            }

            _context5.next = 3;
            return emulateSelectAll();

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
            if (!(modifier.toLowerCase() === 'primary' && key.toLowerCase() === 'c')) {
              _context5.next = 8;
              break;
            }

            _context5.next = 7;
            return emulateClipboard('copy');

          case 7:
            return _context5.abrupt("return", _context5.sent);

          case 8:
            if (!(modifier.toLowerCase() === 'primary' && key.toLowerCase() === 'x')) {
              _context5.next = 12;
              break;
            }

            _context5.next = 11;
            return emulateClipboard('cut');

          case 11:
            return _context5.abrupt("return", _context5.sent);

          case 12:
            if (!(modifier.toLowerCase() === 'primary' && key.toLowerCase() === 'v')) {
              _context5.next = 16;
              break;
            }

            _context5.next = 15;
            return emulateClipboard('paste');

          case 15:
            return _context5.abrupt("return", _context5.sent);

          case 16:
            isAppleOS = function isAppleOS() {
              return process.platform === 'darwin';
            };

            overWrittenModifiers = _objectSpread({}, modifiers, {
              shiftAlt: function shiftAlt(_isApple) {
                return _isApple() ? [SHIFT, ALT] : [SHIFT, CTRL];
              }
            });
            mappedModifiers = overWrittenModifiers[modifier](isAppleOS);

            ctrlSwap = function ctrlSwap(mod) {
              return mod === CTRL ? 'control' : mod;
            };

            _context5.next = 22;
            return Promise.all(mappedModifiers.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(mod) {
                var capitalizedMod;
                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        capitalizedMod = capitalize(ctrlSwap(mod));
                        return _context3.abrupt("return", page.keyboard.down(capitalizedMod));

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 22:
            _context5.next = 24;
            return page.keyboard.press(key);

          case 24:
            _context5.next = 26;
            return Promise.all(mappedModifiers.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(mod) {
                var capitalizedMod;
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        capitalizedMod = capitalize(ctrlSwap(mod));
                        return _context4.abrupt("return", page.keyboard.up(capitalizedMod));

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _pressKeyWithModifier.apply(this, arguments);
}
//# sourceMappingURL=press-key-with-modifier.js.map