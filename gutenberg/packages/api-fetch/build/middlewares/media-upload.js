"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _i18n = require("@wordpress/i18n");

var _response = require("../utils/response");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Middleware handling media upload failures and retries.
 *
 * @param {Object}   options Fetch options.
 * @param {Function} next    [description]
 *
 * @return {*} The evaluated result of the remaining middleware chain.
 */
function mediaUploadMiddleware(options, next) {
  var isMediaUploadRequest = options.path && options.path.indexOf('/wp/v2/media') !== -1 || options.url && options.url.indexOf('/wp/v2/media') !== -1;

  if (!isMediaUploadRequest) {
    return next(options, next);
  }

  var retries = 0;
  var maxRetries = 5;

  var postProcess = function postProcess(attachmentId) {
    retries++;
    return next({
      path: "/wp/v2/media/".concat(attachmentId, "/post-process"),
      method: 'POST',
      data: {
        action: 'create-image-subsizes'
      },
      parse: false
    }).catch(function () {
      if (retries < maxRetries) {
        return postProcess(attachmentId);
      }

      next({
        path: "/wp/v2/media/".concat(attachmentId, "?force=true"),
        method: 'DELETE'
      });
      return Promise.reject();
    });
  };

  return next(_objectSpread({}, options, {
    parse: false
  })).catch(function (response) {
    var attachmentId = response.headers.get('x-wp-upload-attachment-id');

    if (response.status >= 500 && response.status < 600 && attachmentId) {
      return postProcess(attachmentId).catch(function () {
        if (options.parse !== false) {
          return Promise.reject({
            code: 'post_process',
            message: (0, _i18n.__)('Media upload failed. If this is a photo or a large image, please scale it down and try again.')
          });
        }

        return Promise.reject(response);
      });
    }

    return (0, _response.parseAndThrowError)(response, options.parse);
  }).then(function (response) {
    return (0, _response.parseResponseAndNormalizeError)(response, options.parse);
  });
}

var _default = mediaUploadMiddleware;
exports.default = _default;
//# sourceMappingURL=media-upload.js.map