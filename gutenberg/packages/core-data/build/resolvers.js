"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthors = getAuthors;
exports.getCurrentUser = getCurrentUser;
exports.getEntityRecord = getEntityRecord;
exports.getEntityRecords = getEntityRecords;
exports.getCurrentTheme = getCurrentTheme;
exports.getThemeSupports = getThemeSupports;
exports.getEmbedPreview = getEmbedPreview;
exports.hasUploadPermissions = hasUploadPermissions;
exports.canUser = canUser;
exports.getAutosaves = getAutosaves;
exports.getAutosave = getAutosave;
exports.getEditedEntityRecord = exports.getRawEntityRecord = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = require("lodash");

var _url = require("@wordpress/url");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _actions = require("./actions");

var _entities = require("./entities");

var _controls = require("./controls");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regenerator.default.mark(getAuthors),
    _marked2 = /*#__PURE__*/_regenerator.default.mark(getCurrentUser),
    _marked3 = /*#__PURE__*/_regenerator.default.mark(getEntityRecord),
    _marked4 = /*#__PURE__*/_regenerator.default.mark(getEntityRecords),
    _marked5 = /*#__PURE__*/_regenerator.default.mark(getCurrentTheme),
    _marked6 = /*#__PURE__*/_regenerator.default.mark(getThemeSupports),
    _marked7 = /*#__PURE__*/_regenerator.default.mark(getEmbedPreview),
    _marked8 = /*#__PURE__*/_regenerator.default.mark(hasUploadPermissions),
    _marked9 = /*#__PURE__*/_regenerator.default.mark(canUser),
    _marked10 = /*#__PURE__*/_regenerator.default.mark(getAutosaves),
    _marked11 = /*#__PURE__*/_regenerator.default.mark(getAutosave);

/**
 * Requests authors from the REST API.
 */
function getAuthors() {
  var users;
  return _regenerator.default.wrap(function getAuthors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/users/?who=authors&per_page=-1'
          });

        case 2:
          users = _context.sent;
          _context.next = 5;
          return (0, _actions.receiveUserQuery)('authors', users);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Requests the current user from the REST API.
 */


function getCurrentUser() {
  var currentUser;
  return _regenerator.default.wrap(function getCurrentUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/users/me'
          });

        case 2:
          currentUser = _context2.sent;
          _context2.next = 5;
          return (0, _actions.receiveCurrentUser)(currentUser);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Requests an entity's record from the REST API.
 *
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 */


function getEntityRecord(kind, name) {
  var key,
      entities,
      entity,
      record,
      _args3 = arguments;
  return _regenerator.default.wrap(function getEntityRecord$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          key = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '';
          _context3.next = 3;
          return (0, _entities.getKindEntities)(kind);

        case 3:
          entities = _context3.sent;
          entity = (0, _lodash.find)(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          _context3.next = 9;
          return (0, _controls.apiFetch)({
            path: "".concat(entity.baseURL, "/").concat(key, "?context=edit")
          });

        case 9:
          record = _context3.sent;
          _context3.next = 12;
          return (0, _actions.receiveEntityRecords)(kind, name, record);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Requests an entity's record from the REST API.
 */


var getRawEntityRecord = (0, _utils.ifNotResolved)(getEntityRecord, 'getEntityRecord');
/**
 * Requests an entity's record from the REST API.
 */

exports.getRawEntityRecord = getRawEntityRecord;
var getEditedEntityRecord = (0, _utils.ifNotResolved)(getRawEntityRecord, 'getRawEntityRecord');
/**
 * Requests the entity's records from the REST API.
 *
 * @param {string}  kind   Entity kind.
 * @param {string}  name   Entity name.
 * @param {Object?} query  Query Object.
 */

exports.getEditedEntityRecord = getEditedEntityRecord;

function getEntityRecords(kind, name) {
  var query,
      entities,
      entity,
      path,
      records,
      _args4 = arguments;
  return _regenerator.default.wrap(function getEntityRecords$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          _context4.next = 3;
          return (0, _entities.getKindEntities)(kind);

        case 3:
          entities = _context4.sent;
          entity = (0, _lodash.find)(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return");

        case 7:
          path = (0, _url.addQueryArgs)(entity.baseURL, _objectSpread({}, query, {
            context: 'edit'
          }));
          _context4.next = 10;
          return (0, _controls.apiFetch)({
            path: path
          });

        case 10:
          records = _context4.sent;
          _context4.next = 13;
          return (0, _actions.receiveEntityRecords)(kind, name, Object.values(records), query);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

getEntityRecords.shouldInvalidate = function (action, kind, name) {
  return action.type === 'RECEIVE_ITEMS' && action.invalidateCache && kind === action.kind && name === action.name;
};
/**
 * Requests the current theme.
 */


function getCurrentTheme() {
  var activeThemes;
  return _regenerator.default.wrap(function getCurrentTheme$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/themes?status=active'
          });

        case 2:
          activeThemes = _context5.sent;
          _context5.next = 5;
          return (0, _actions.receiveCurrentTheme)(activeThemes[0]);

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * Requests theme supports data from the index.
 */


function getThemeSupports() {
  var activeThemes;
  return _regenerator.default.wrap(function getThemeSupports$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/themes?status=active'
          });

        case 2:
          activeThemes = _context6.sent;
          _context6.next = 5;
          return (0, _actions.receiveThemeSupports)(activeThemes[0].theme_supports);

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
/**
 * Requests a preview from the from the Embed API.
 *
 * @param {string} url   URL to get the preview for.
 */


function getEmbedPreview(url) {
  var embedProxyResponse;
  return _regenerator.default.wrap(function getEmbedPreview$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _controls.apiFetch)({
            path: (0, _url.addQueryArgs)('/oembed/1.0/proxy', {
              url: url
            })
          });

        case 3:
          embedProxyResponse = _context7.sent;
          _context7.next = 6;
          return (0, _actions.receiveEmbedPreview)(url, embedProxyResponse);

        case 6:
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 12;
          return (0, _actions.receiveEmbedPreview)(url, false);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 8]]);
}
/**
 * Requests Upload Permissions from the REST API.
 *
 * @deprecated since 5.0. Callers should use the more generic `canUser()` selector instead of
 *            `hasUploadPermissions()`, e.g. `canUser( 'create', 'media' )`.
 */


function hasUploadPermissions() {
  return _regenerator.default.wrap(function hasUploadPermissions$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          (0, _deprecated.default)("select( 'core' ).hasUploadPermissions()", {
            alternative: "select( 'core' ).canUser( 'create', 'media' )"
          });
          return _context8.delegateYield(canUser('create', 'media'), "t0", 2);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
/**
 * Checks whether the current user can perform the given action on the given
 * REST resource.
 *
 * @param {string}  action   Action to check. One of: 'create', 'read', 'update',
 *                           'delete'.
 * @param {string}  resource REST resource to check, e.g. 'media' or 'posts'.
 * @param {?string} id       ID of the rest resource to check.
 */


function canUser(action, resource, id) {
  var methods, method, path, response, allowHeader, key, isAllowed;
  return _regenerator.default.wrap(function canUser$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          methods = {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            delete: 'DELETE'
          };
          method = methods[action];

          if (method) {
            _context9.next = 4;
            break;
          }

          throw new Error("'".concat(action, "' is not a valid action."));

        case 4:
          path = id ? "/wp/v2/".concat(resource, "/").concat(id) : "/wp/v2/".concat(resource);
          _context9.prev = 5;
          _context9.next = 8;
          return (0, _controls.apiFetch)({
            path: path,
            // Ideally this would always be an OPTIONS request, but unfortunately there's
            // a bug in the REST API which causes the Allow header to not be sent on
            // OPTIONS requests to /posts/:id routes.
            // https://core.trac.wordpress.org/ticket/45753
            method: id ? 'GET' : 'OPTIONS',
            parse: false
          });

        case 8:
          response = _context9.sent;
          _context9.next = 14;
          break;

        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](5);
          return _context9.abrupt("return");

        case 14:
          if ((0, _lodash.hasIn)(response, ['headers', 'get'])) {
            // If the request is fetched using the fetch api, the header can be
            // retrieved using the 'get' method.
            allowHeader = response.headers.get('allow');
          } else {
            // If the request was preloaded server-side and is returned by the
            // preloading middleware, the header will be a simple property.
            allowHeader = (0, _lodash.get)(response, ['headers', 'Allow'], '');
          }

          key = (0, _lodash.compact)([action, resource, id]).join('/');
          isAllowed = (0, _lodash.includes)(allowHeader, method);
          _context9.next = 19;
          return (0, _actions.receiveUserPermission)(key, isAllowed);

        case 19:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, null, [[5, 11]]);
}
/**
 * Request autosave data from the REST API.
 *
 * @param {string} postType The type of the parent post.
 * @param {number} postId   The id of the parent post.
 */


function getAutosaves(postType, postId) {
  var _yield$resolveSelect, restBase, autosaves;

  return _regenerator.default.wrap(function getAutosaves$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _controls.resolveSelect)('getPostType', postType);

        case 2:
          _yield$resolveSelect = _context10.sent;
          restBase = _yield$resolveSelect.rest_base;
          _context10.next = 6;
          return (0, _controls.apiFetch)({
            path: "/wp/v2/".concat(restBase, "/").concat(postId, "/autosaves?context=edit")
          });

        case 6:
          autosaves = _context10.sent;

          if (!(autosaves && autosaves.length)) {
            _context10.next = 10;
            break;
          }

          _context10.next = 10;
          return (0, _actions.receiveAutosaves)(postId, autosaves);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}
/**
 * Request autosave data from the REST API.
 *
 * This resolver exists to ensure the underlying autosaves are fetched via
 * `getAutosaves` when a call to the `getAutosave` selector is made.
 *
 * @param {string} postType The type of the parent post.
 * @param {number} postId   The id of the parent post.
 */


function getAutosave(postType, postId) {
  return _regenerator.default.wrap(function getAutosave$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _controls.resolveSelect)('getAutosaves', postType, postId);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
//# sourceMappingURL=resolvers.js.map