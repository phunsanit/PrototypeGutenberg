"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createNonceMiddleware(nonce) {
  function middleware(options, next) {
    var _options$headers = options.headers,
        headers = _options$headers === void 0 ? {} : _options$headers; // If an 'X-WP-Nonce' header (or any case-insensitive variation
    // thereof) was specified, no need to add a nonce header.

    for (var headerName in headers) {
      if (headerName.toLowerCase() === 'x-wp-nonce') {
        return next(options);
      }
    }

    return next(_objectSpread({}, options, {
      headers: _objectSpread({}, headers, {
        'X-WP-Nonce': middleware.nonce
      })
    }));
  }

  middleware.nonce = nonce;
  return middleware;
}

var _default = createNonceMiddleware;
exports.default = _default;
//# sourceMappingURL=nonce.js.map