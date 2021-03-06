"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStablePath = getStablePath;
exports.default = void 0;

/**
 * Given a path, returns a normalized path where equal query parameter values
 * will be treated as identical, regardless of order they appear in the original
 * text.
 *
 * @param {string} path Original path.
 *
 * @return {string} Normalized path.
 */
function getStablePath(path) {
  var splitted = path.split('?');
  var query = splitted[1];
  var base = splitted[0];

  if (!query) {
    return base;
  } // 'b=1&c=2&a=5'


  return base + '?' + query // [ 'b=1', 'c=2', 'a=5' ]
  .split('&') // [ [ 'b, '1' ], [ 'c', '2' ], [ 'a', '5' ] ]
  .map(function (entry) {
    return entry.split('=');
  }) // [ [ 'a', '5' ], [ 'b, '1' ], [ 'c', '2' ] ]
  .sort(function (a, b) {
    return a[0].localeCompare(b[0]);
  }) // [ 'a=5', 'b=1', 'c=2' ]
  .map(function (pair) {
    return pair.join('=');
  }) // 'a=5&b=1&c=2'
  .join('&');
}

function createPreloadingMiddleware(preloadedData) {
  var cache = Object.keys(preloadedData).reduce(function (result, path) {
    result[getStablePath(path)] = preloadedData[path];
    return result;
  }, {});
  return function (options, next) {
    var _options$parse = options.parse,
        parse = _options$parse === void 0 ? true : _options$parse;

    if (typeof options.path === 'string') {
      var method = options.method || 'GET';
      var path = getStablePath(options.path);

      if (parse && 'GET' === method && cache[path]) {
        return Promise.resolve(cache[path].body);
      } else if ('OPTIONS' === method && cache[method] && cache[method][path]) {
        return Promise.resolve(cache[method][path]);
      }
    }

    return next(options);
  };
}

var _default = createPreloadingMiddleware;
exports.default = _default;
//# sourceMappingURL=preloading.js.map