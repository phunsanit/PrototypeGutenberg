import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(getAuthors),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(getCurrentUser),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(getEntityRecord),
    _marked4 = /*#__PURE__*/_regeneratorRuntime.mark(getEntityRecords),
    _marked5 = /*#__PURE__*/_regeneratorRuntime.mark(getCurrentTheme),
    _marked6 = /*#__PURE__*/_regeneratorRuntime.mark(getThemeSupports),
    _marked7 = /*#__PURE__*/_regeneratorRuntime.mark(getEmbedPreview),
    _marked8 = /*#__PURE__*/_regeneratorRuntime.mark(hasUploadPermissions),
    _marked9 = /*#__PURE__*/_regeneratorRuntime.mark(canUser),
    _marked10 = /*#__PURE__*/_regeneratorRuntime.mark(getAutosaves),
    _marked11 = /*#__PURE__*/_regeneratorRuntime.mark(getAutosave);

/**
 * External dependencies
 */
import { find, includes, get, hasIn, compact } from 'lodash';
/**
 * WordPress dependencies
 */

import { addQueryArgs } from '@wordpress/url';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import { receiveUserQuery, receiveCurrentTheme, receiveCurrentUser, receiveEntityRecords, receiveThemeSupports, receiveEmbedPreview, receiveUserPermission, receiveAutosaves } from './actions';
import { getKindEntities } from './entities';
import { apiFetch, resolveSelect } from './controls';
import { ifNotResolved } from './utils';
/**
 * Requests authors from the REST API.
 */

export function getAuthors() {
  var users;
  return _regeneratorRuntime.wrap(function getAuthors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return apiFetch({
            path: '/wp/v2/users/?who=authors&per_page=-1'
          });

        case 2:
          users = _context.sent;
          _context.next = 5;
          return receiveUserQuery('authors', users);

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

export function getCurrentUser() {
  var currentUser;
  return _regeneratorRuntime.wrap(function getCurrentUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return apiFetch({
            path: '/wp/v2/users/me'
          });

        case 2:
          currentUser = _context2.sent;
          _context2.next = 5;
          return receiveCurrentUser(currentUser);

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

export function getEntityRecord(kind, name) {
  var key,
      entities,
      entity,
      record,
      _args3 = arguments;
  return _regeneratorRuntime.wrap(function getEntityRecord$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          key = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '';
          _context3.next = 3;
          return getKindEntities(kind);

        case 3:
          entities = _context3.sent;
          entity = find(entities, {
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
          return apiFetch({
            path: "".concat(entity.baseURL, "/").concat(key, "?context=edit")
          });

        case 9:
          record = _context3.sent;
          _context3.next = 12;
          return receiveEntityRecords(kind, name, record);

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

export var getRawEntityRecord = ifNotResolved(getEntityRecord, 'getEntityRecord');
/**
 * Requests an entity's record from the REST API.
 */

export var getEditedEntityRecord = ifNotResolved(getRawEntityRecord, 'getRawEntityRecord');
/**
 * Requests the entity's records from the REST API.
 *
 * @param {string}  kind   Entity kind.
 * @param {string}  name   Entity name.
 * @param {Object?} query  Query Object.
 */

export function getEntityRecords(kind, name) {
  var query,
      entities,
      entity,
      path,
      records,
      _args4 = arguments;
  return _regeneratorRuntime.wrap(function getEntityRecords$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          query = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
          _context4.next = 3;
          return getKindEntities(kind);

        case 3:
          entities = _context4.sent;
          entity = find(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return");

        case 7:
          path = addQueryArgs(entity.baseURL, _objectSpread({}, query, {
            context: 'edit'
          }));
          _context4.next = 10;
          return apiFetch({
            path: path
          });

        case 10:
          records = _context4.sent;
          _context4.next = 13;
          return receiveEntityRecords(kind, name, Object.values(records), query);

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


export function getCurrentTheme() {
  var activeThemes;
  return _regeneratorRuntime.wrap(function getCurrentTheme$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return apiFetch({
            path: '/wp/v2/themes?status=active'
          });

        case 2:
          activeThemes = _context5.sent;
          _context5.next = 5;
          return receiveCurrentTheme(activeThemes[0]);

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

export function getThemeSupports() {
  var activeThemes;
  return _regeneratorRuntime.wrap(function getThemeSupports$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return apiFetch({
            path: '/wp/v2/themes?status=active'
          });

        case 2:
          activeThemes = _context6.sent;
          _context6.next = 5;
          return receiveThemeSupports(activeThemes[0].theme_supports);

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

export function getEmbedPreview(url) {
  var embedProxyResponse;
  return _regeneratorRuntime.wrap(function getEmbedPreview$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return apiFetch({
            path: addQueryArgs('/oembed/1.0/proxy', {
              url: url
            })
          });

        case 3:
          embedProxyResponse = _context7.sent;
          _context7.next = 6;
          return receiveEmbedPreview(url, embedProxyResponse);

        case 6:
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 12;
          return receiveEmbedPreview(url, false);

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

export function hasUploadPermissions() {
  return _regeneratorRuntime.wrap(function hasUploadPermissions$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          deprecated("select( 'core' ).hasUploadPermissions()", {
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

export function canUser(action, resource, id) {
  var methods, method, path, response, allowHeader, key, isAllowed;
  return _regeneratorRuntime.wrap(function canUser$(_context9) {
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
          return apiFetch({
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
          if (hasIn(response, ['headers', 'get'])) {
            // If the request is fetched using the fetch api, the header can be
            // retrieved using the 'get' method.
            allowHeader = response.headers.get('allow');
          } else {
            // If the request was preloaded server-side and is returned by the
            // preloading middleware, the header will be a simple property.
            allowHeader = get(response, ['headers', 'Allow'], '');
          }

          key = compact([action, resource, id]).join('/');
          isAllowed = includes(allowHeader, method);
          _context9.next = 19;
          return receiveUserPermission(key, isAllowed);

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

export function getAutosaves(postType, postId) {
  var _yield$resolveSelect, restBase, autosaves;

  return _regeneratorRuntime.wrap(function getAutosaves$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return resolveSelect('getPostType', postType);

        case 2:
          _yield$resolveSelect = _context10.sent;
          restBase = _yield$resolveSelect.rest_base;
          _context10.next = 6;
          return apiFetch({
            path: "/wp/v2/".concat(restBase, "/").concat(postId, "/autosaves?context=edit")
          });

        case 6:
          autosaves = _context10.sent;

          if (!(autosaves && autosaves.length)) {
            _context10.next = 10;
            break;
          }

          _context10.next = 10;
          return receiveAutosaves(postId, autosaves);

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

export function getAutosave(postType, postId) {
  return _regeneratorRuntime.wrap(function getAutosave$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return resolveSelect('getAutosaves', postType, postId);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
//# sourceMappingURL=resolvers.js.map