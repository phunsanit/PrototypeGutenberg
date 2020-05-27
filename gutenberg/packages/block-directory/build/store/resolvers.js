"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = require("lodash");

var _dataControls = require("@wordpress/data-controls");

var _actions = require("./actions");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = {
  getDownloadableBlocks: /*#__PURE__*/_regenerator.default.mark(function getDownloadableBlocks(filterValue) {
    var results, blocks;
    return _regenerator.default.wrap(function getDownloadableBlocks$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (filterValue) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return (0, _actions.fetchDownloadableBlocks)(filterValue);

          case 5:
            _context.next = 7;
            return (0, _dataControls.apiFetch)({
              path: "__experimental/block-directory/search?term=".concat(filterValue)
            });

          case 7:
            results = _context.sent;
            blocks = results.map(function (result) {
              return (0, _lodash.mapKeys)(result, function (value, key) {
                return (0, _lodash.camelCase)(key);
              });
            });
            _context.next = 11;
            return (0, _actions.receiveDownloadableBlocks)(blocks, filterValue);

          case 11:
            _context.next = 18;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);

            if (!(_context.t0.code === 'rest_user_cannot_view')) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return (0, _actions.setInstallBlocksPermission)(false);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, getDownloadableBlocks, null, [[2, 13]]);
  }),
  hasInstallBlocksPermission: /*#__PURE__*/_regenerator.default.mark(function hasInstallBlocksPermission() {
    return _regenerator.default.wrap(function hasInstallBlocksPermission$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _dataControls.apiFetch)({
              path: "__experimental/block-directory/search?term="
            });

          case 3:
            _context2.next = 5;
            return (0, _actions.setInstallBlocksPermission)(true);

          case 5:
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            if (!(_context2.t0.code === 'rest_user_cannot_view')) {
              _context2.next = 12;
              break;
            }

            _context2.next = 12;
            return (0, _actions.setInstallBlocksPermission)(false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, hasInstallBlocksPermission, null, [[0, 7]]);
  })
};
exports.default = _default;
//# sourceMappingURL=resolvers.js.map