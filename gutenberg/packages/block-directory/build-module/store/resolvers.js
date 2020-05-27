import _regeneratorRuntime from "@babel/runtime/regenerator";

/**
 * External dependencies
 */
import { camelCase, mapKeys } from 'lodash';
/**
 * WordPress dependencies
 */

import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */

import { fetchDownloadableBlocks, receiveDownloadableBlocks, setInstallBlocksPermission } from './actions';
export default {
  getDownloadableBlocks: /*#__PURE__*/_regeneratorRuntime.mark(function getDownloadableBlocks(filterValue) {
    var results, blocks;
    return _regeneratorRuntime.wrap(function getDownloadableBlocks$(_context) {
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
            return fetchDownloadableBlocks(filterValue);

          case 5:
            _context.next = 7;
            return apiFetch({
              path: "__experimental/block-directory/search?term=".concat(filterValue)
            });

          case 7:
            results = _context.sent;
            blocks = results.map(function (result) {
              return mapKeys(result, function (value, key) {
                return camelCase(key);
              });
            });
            _context.next = 11;
            return receiveDownloadableBlocks(blocks, filterValue);

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
            return setInstallBlocksPermission(false);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, getDownloadableBlocks, null, [[2, 13]]);
  }),
  hasInstallBlocksPermission: /*#__PURE__*/_regeneratorRuntime.mark(function hasInstallBlocksPermission() {
    return _regeneratorRuntime.wrap(function hasInstallBlocksPermission$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return apiFetch({
              path: "__experimental/block-directory/search?term="
            });

          case 3:
            _context2.next = 5;
            return setInstallBlocksPermission(true);

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
            return setInstallBlocksPermission(false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, hasInstallBlocksPermission, null, [[0, 7]]);
  })
};
//# sourceMappingURL=resolvers.js.map