import _regeneratorRuntime from "@babel/runtime/regenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { toggleMoreMenu } from './toggle-more-menu';
/**
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */

export function switchEditorModeTo(_x) {
  return _switchEditorModeTo.apply(this, arguments);
}

function _switchEditorModeTo() {
  _switchEditorModeTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(mode) {
    var _yield$page$$x, _yield$page$$x2, button;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return toggleMoreMenu();

          case 2:
            _context.next = 4;
            return page.$x("//button[contains(text(), '".concat(mode, " editor')]"));

          case 4:
            _yield$page$$x = _context.sent;
            _yield$page$$x2 = _slicedToArray(_yield$page$$x, 1);
            button = _yield$page$$x2[0];
            _context.next = 9;
            return button.click('button');

          case 9:
            _context.next = 11;
            return toggleMoreMenu();

          case 11:
            if (!(mode === 'Code')) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return page.waitForSelector('.editor-post-text-editor');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _switchEditorModeTo.apply(this, arguments);
}
//# sourceMappingURL=switch-editor-mode-to.js.map