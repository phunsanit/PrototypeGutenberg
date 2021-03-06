import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Toggles the More Menu.
 */
export function toggleMoreMenu() {
  return _toggleMoreMenu.apply(this, arguments);
}

function _toggleMoreMenu() {
  _toggleMoreMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect(page).toClick('.edit-post-more-menu [aria-label="More tools & options"]');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toggleMoreMenu.apply(this, arguments);
}
//# sourceMappingURL=toggle-more-menu.js.map