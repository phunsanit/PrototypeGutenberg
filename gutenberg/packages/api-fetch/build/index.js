"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _i18n = require("@wordpress/i18n");

var _nonce = _interopRequireDefault(require("./middlewares/nonce"));

var _rootUrl = _interopRequireDefault(require("./middlewares/root-url"));

var _preloading = _interopRequireDefault(require("./middlewares/preloading"));

var _fetchAllMiddleware = _interopRequireDefault(require("./middlewares/fetch-all-middleware"));

var _namespaceEndpoint = _interopRequireDefault(require("./middlewares/namespace-endpoint"));

var _httpV = _interopRequireDefault(require("./middlewares/http-v1"));

var _userLocale = _interopRequireDefault(require("./middlewares/user-locale"));

var _mediaUpload = _interopRequireDefault(require("./middlewares/media-upload"));

var _response = require("./utils/response");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Default set of header values which should be sent with every request unless
 * explicitly provided through apiFetch options.
 *
 * @type {Object}
 */
var DEFAULT_HEADERS = {
  // The backend uses the Accept header as a condition for considering an
  // incoming request as a REST request.
  //
  // See: https://core.trac.wordpress.org/ticket/44534
  Accept: 'application/json, */*;q=0.1'
};
/**
 * Default set of fetch option values which should be sent with every request
 * unless explicitly provided through apiFetch options.
 *
 * @type {Object}
 */

var DEFAULT_OPTIONS = {
  credentials: 'include'
};
var middlewares = [_userLocale.default, _namespaceEndpoint.default, _httpV.default, _fetchAllMiddleware.default];

function registerMiddleware(middleware) {
  middlewares.unshift(middleware);
}

var checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw response;
};

var defaultFetchHandler = function defaultFetchHandler(nextOptions) {
  var url = nextOptions.url,
      path = nextOptions.path,
      data = nextOptions.data,
      _nextOptions$parse = nextOptions.parse,
      parse = _nextOptions$parse === void 0 ? true : _nextOptions$parse,
      remainingOptions = (0, _objectWithoutProperties2.default)(nextOptions, ["url", "path", "data", "parse"]);
  var body = nextOptions.body,
      headers = nextOptions.headers; // Merge explicitly-provided headers with default values.

  headers = _objectSpread({}, DEFAULT_HEADERS, {}, headers); // The `data` property is a shorthand for sending a JSON body.

  if (data) {
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  var responsePromise = window.fetch(url || path, _objectSpread({}, DEFAULT_OPTIONS, {}, remainingOptions, {
    body: body,
    headers: headers
  }));
  return responsePromise // Return early if fetch errors. If fetch error, there is most likely no
  // network connection. Unfortunately fetch just throws a TypeError and
  // the message might depend on the browser.
  .then(function (value) {
    return Promise.resolve(value).then(checkStatus).catch(function (response) {
      return (0, _response.parseAndThrowError)(response, parse);
    }).then(function (response) {
      return (0, _response.parseResponseAndNormalizeError)(response, parse);
    });
  }, function () {
    throw {
      code: 'fetch_error',
      message: (0, _i18n.__)('You are probably offline.')
    };
  });
};

var fetchHandler = defaultFetchHandler;
/**
 * Defines a custom fetch handler for making the requests that will override
 * the default one using window.fetch
 *
 * @param {Function} newFetchHandler The new fetch handler
 */

function setFetchHandler(newFetchHandler) {
  fetchHandler = newFetchHandler;
}

function apiFetch(options) {
  var steps = [].concat(middlewares, [fetchHandler]);

  var createRunStep = function createRunStep(index) {
    return function (workingOptions) {
      var step = steps[index];

      if (index === steps.length - 1) {
        return step(workingOptions);
      }

      var next = createRunStep(index + 1);
      return step(workingOptions, next);
    };
  };

  return new Promise(function (resolve, reject) {
    createRunStep(0)(options).then(resolve).catch(function (error) {
      if (error.code !== 'rest_cookie_invalid_nonce') {
        return reject(error);
      } // If the nonce is invalid, refresh it and try again.


      window.fetch(apiFetch.nonceEndpoint).then(checkStatus).then(function (data) {
        return data.text();
      }).then(function (text) {
        apiFetch.nonceMiddleware.nonce = text;
        apiFetch(options).then(resolve).catch(reject);
      }).catch(reject);
    });
  });
}

apiFetch.use = registerMiddleware;
apiFetch.setFetchHandler = setFetchHandler;
apiFetch.createNonceMiddleware = _nonce.default;
apiFetch.createPreloadingMiddleware = _preloading.default;
apiFetch.createRootURLMiddleware = _rootUrl.default;
apiFetch.fetchAllMiddleware = _fetchAllMiddleware.default;
apiFetch.mediaUploadMiddleware = _mediaUpload.default;
var _default = apiFetch;
exports.default = _default;
//# sourceMappingURL=index.js.map