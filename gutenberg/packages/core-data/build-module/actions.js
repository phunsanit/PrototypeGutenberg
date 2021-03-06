import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(editEntityRecord),
    _marked2 = /*#__PURE__*/_regeneratorRuntime.mark(undo),
    _marked3 = /*#__PURE__*/_regeneratorRuntime.mark(redo),
    _marked4 = /*#__PURE__*/_regeneratorRuntime.mark(saveEntityRecord),
    _marked5 = /*#__PURE__*/_regeneratorRuntime.mark(saveEditedEntityRecord);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { castArray, get, isEqual, find } from 'lodash';
/**
 * Internal dependencies
 */

import { receiveItems, receiveQueriedItems } from './queried-data';
import { getKindEntities, DEFAULT_ENTITY_KEY } from './entities';
import { select, apiFetch } from './controls';
/**
 * Returns an action object used in signalling that authors have been received.
 *
 * @param {string}       queryID Query ID.
 * @param {Array|Object} users   Users received.
 *
 * @return {Object} Action object.
 */

export function receiveUserQuery(queryID, users) {
  return {
    type: 'RECEIVE_USER_QUERY',
    users: castArray(users),
    queryID: queryID
  };
}
/**
 * Returns an action used in signalling that the current user has been received.
 *
 * @param {Object} currentUser Current user object.
 *
 * @return {Object} Action object.
 */

export function receiveCurrentUser(currentUser) {
  return {
    type: 'RECEIVE_CURRENT_USER',
    currentUser: currentUser
  };
}
/**
 * Returns an action object used in adding new entities.
 *
 * @param {Array} entities  Entities received.
 *
 * @return {Object} Action object.
 */

export function addEntities(entities) {
  return {
    type: 'ADD_ENTITIES',
    entities: entities
  };
}
/**
 * Returns an action object used in signalling that entity records have been received.
 *
 * @param {string}       kind            Kind of the received entity.
 * @param {string}       name            Name of the received entity.
 * @param {Array|Object} records         Records received.
 * @param {?Object}      query           Query Object.
 * @param {?boolean}     invalidateCache Should invalidate query caches
 *
 * @return {Object} Action object.
 */

export function receiveEntityRecords(kind, name, records, query) {
  var invalidateCache = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // Auto drafts should not have titles, but some plugins rely on them so we can't filter this
  // on the server.
  if (kind === 'postType') {
    records = castArray(records).map(function (record) {
      return record.status === 'auto-draft' ? _objectSpread({}, record, {
        title: ''
      }) : record;
    });
  }

  var action;

  if (query) {
    action = receiveQueriedItems(records, query);
  } else {
    action = receiveItems(records);
  }

  return _objectSpread({}, action, {
    kind: kind,
    name: name,
    invalidateCache: invalidateCache
  });
}
/**
 * Returns an action object used in signalling that the current theme has been received.
 *
 * @param {Object} currentTheme The current theme.
 *
 * @return {Object} Action object.
 */

export function receiveCurrentTheme(currentTheme) {
  return {
    type: 'RECEIVE_CURRENT_THEME',
    currentTheme: currentTheme
  };
}
/**
 * Returns an action object used in signalling that the index has been received.
 *
 * @param {Object} themeSupports Theme support for the current theme.
 *
 * @return {Object} Action object.
 */

export function receiveThemeSupports(themeSupports) {
  return {
    type: 'RECEIVE_THEME_SUPPORTS',
    themeSupports: themeSupports
  };
}
/**
 * Returns an action object used in signalling that the preview data for
 * a given URl has been received.
 *
 * @param {string}  url     URL to preview the embed for.
 * @param {*}       preview Preview data.
 *
 * @return {Object} Action object.
 */

export function receiveEmbedPreview(url, preview) {
  return {
    type: 'RECEIVE_EMBED_PREVIEW',
    url: url,
    preview: preview
  };
}
/**
 * Returns an action object that triggers an
 * edit to an entity record.
 *
 * @param {string} kind     Kind of the edited entity record.
 * @param {string} name     Name of the edited entity record.
 * @param {number} recordId Record ID of the edited entity record.
 * @param {Object} edits    The edits.
 * @param {Object} options  Options for the edit.
 * @param {boolean} options.undoIgnore Whether to ignore the edit in undo history or not.
 *
 * @return {Object} Action object.
 */

export function editEntityRecord(kind, name, recordId, edits) {
  var options,
      entity,
      _entity$transientEdit,
      transientEdits,
      _entity$mergedEdits,
      mergedEdits,
      record,
      editedRecord,
      edit,
      _args = arguments;

  return _regeneratorRuntime.wrap(function editEntityRecord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};
          _context.next = 3;
          return select('getEntity', kind, name);

        case 3:
          entity = _context.sent;

          if (entity) {
            _context.next = 6;
            break;
          }

          throw new Error("The entity being edited (".concat(kind, ", ").concat(name, ") does not have a loaded config."));

        case 6:
          _entity$transientEdit = entity.transientEdits, transientEdits = _entity$transientEdit === void 0 ? {} : _entity$transientEdit, _entity$mergedEdits = entity.mergedEdits, mergedEdits = _entity$mergedEdits === void 0 ? {} : _entity$mergedEdits;
          _context.next = 9;
          return select('getRawEntityRecord', kind, name, recordId);

        case 9:
          record = _context.sent;
          _context.next = 12;
          return select('getEditedEntityRecord', kind, name, recordId);

        case 12:
          editedRecord = _context.sent;
          edit = {
            kind: kind,
            name: name,
            recordId: recordId,
            // Clear edits when they are equal to their persisted counterparts
            // so that the property is not considered dirty.
            edits: Object.keys(edits).reduce(function (acc, key) {
              var recordValue = record[key];
              var editedRecordValue = editedRecord[key];
              var value = mergedEdits[key] ? _objectSpread({}, editedRecordValue, {}, edits[key]) : edits[key];
              acc[key] = isEqual(recordValue, value) ? undefined : value;
              return acc;
            }, {}),
            transientEdits: transientEdits
          };
          return _context.abrupt("return", _objectSpread({
            type: 'EDIT_ENTITY_RECORD'
          }, edit, {
            meta: {
              undo: !options.undoIgnore && _objectSpread({}, edit, {
                // Send the current values for things like the first undo stack entry.
                edits: Object.keys(edits).reduce(function (acc, key) {
                  acc[key] = editedRecord[key];
                  return acc;
                }, {})
              })
            }
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Action triggered to undo the last edit to
 * an entity record, if any.
 */

export function undo() {
  var undoEdit;
  return _regeneratorRuntime.wrap(function undo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return select('getUndoEdit');

        case 2:
          undoEdit = _context2.sent;

          if (undoEdit) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return");

        case 5:
          _context2.next = 7;
          return _objectSpread({
            type: 'EDIT_ENTITY_RECORD'
          }, undoEdit, {
            meta: {
              isUndo: true
            }
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
/**
 * Action triggered to redo the last undoed
 * edit to an entity record, if any.
 */

export function redo() {
  var redoEdit;
  return _regeneratorRuntime.wrap(function redo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select('getRedoEdit');

        case 2:
          redoEdit = _context3.sent;

          if (redoEdit) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return");

        case 5:
          _context3.next = 7;
          return _objectSpread({
            type: 'EDIT_ENTITY_RECORD'
          }, redoEdit, {
            meta: {
              isRedo: true
            }
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
/**
 * Forces the creation of a new undo level.
 *
 * @return {Object} Action object.
 */

export function __unstableCreateUndoLevel() {
  return {
    type: 'CREATE_UNDO_LEVEL'
  };
}
/**
 * Action triggered to save an entity record.
 *
 * @param {string} kind    Kind of the received entity.
 * @param {string} name    Name of the received entity.
 * @param {Object} record  Record to be saved.
 * @param {Object} options Saving options.
 */

export function saveEntityRecord(kind, name, record) {
  var _ref,
      _ref$isAutosave,
      isAutosave,
      entities,
      entity,
      entityIdKey,
      recordId,
      _i,
      _Object$entries,
      _Object$entries$_i,
      key,
      value,
      evaluatedValue,
      updatedRecord,
      error,
      persistedEntity,
      currentEdits,
      path,
      persistedRecord,
      currentUser,
      currentUserId,
      autosavePost,
      data,
      newRecord,
      _data,
      _args4 = arguments;

  return _regeneratorRuntime.wrap(function saveEntityRecord$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _ref = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {
            isAutosave: false
          }, _ref$isAutosave = _ref.isAutosave, isAutosave = _ref$isAutosave === void 0 ? false : _ref$isAutosave;
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
          entityIdKey = entity.key || DEFAULT_ENTITY_KEY;
          recordId = record[entityIdKey]; // Evaluate optimized edits.
          // (Function edits that should be evaluated on save to avoid expensive computations on every edit.)

          _i = 0, _Object$entries = Object.entries(record);

        case 10:
          if (!(_i < _Object$entries.length)) {
            _context4.next = 24;
            break;
          }

          _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];

          if (!(typeof value === 'function')) {
            _context4.next = 21;
            break;
          }

          _context4.t0 = value;
          _context4.next = 16;
          return select('getEditedEntityRecord', kind, name, recordId);

        case 16:
          _context4.t1 = _context4.sent;
          evaluatedValue = (0, _context4.t0)(_context4.t1);
          _context4.next = 20;
          return editEntityRecord(kind, name, recordId, _defineProperty({}, key, evaluatedValue), {
            undoIgnore: true
          });

        case 20:
          record[key] = evaluatedValue;

        case 21:
          _i++;
          _context4.next = 10;
          break;

        case 24:
          _context4.next = 26;
          return {
            type: 'SAVE_ENTITY_RECORD_START',
            kind: kind,
            name: name,
            recordId: recordId,
            isAutosave: isAutosave
          };

        case 26:
          _context4.prev = 26;
          path = "".concat(entity.baseURL).concat(recordId ? '/' + recordId : '');
          _context4.next = 30;
          return select('getRawEntityRecord', kind, name, recordId);

        case 30:
          persistedRecord = _context4.sent;

          if (!isAutosave) {
            _context4.next = 55;
            break;
          }

          _context4.next = 34;
          return select('getCurrentUser');

        case 34:
          currentUser = _context4.sent;
          currentUserId = currentUser ? currentUser.id : undefined;
          _context4.next = 38;
          return select('getAutosave', persistedRecord.type, persistedRecord.id, currentUserId);

        case 38:
          autosavePost = _context4.sent;
          // Autosaves need all expected fields to be present.
          // So we fallback to the previous autosave and then
          // to the actual persisted entity if the edits don't
          // have a value.
          data = _objectSpread({}, persistedRecord, {}, autosavePost, {}, record);
          data = Object.keys(data).reduce(function (acc, key) {
            if (['title', 'excerpt', 'content'].includes(key)) {
              // Edits should be the "raw" attribute values.
              acc[key] = get(data[key], 'raw', data[key]);
            }

            return acc;
          }, {
            status: data.status === 'auto-draft' ? 'draft' : data.status
          });
          _context4.next = 43;
          return apiFetch({
            path: "".concat(path, "/autosaves"),
            method: 'POST',
            data: data
          });

        case 43:
          updatedRecord = _context4.sent;

          if (!(persistedRecord.id === updatedRecord.id)) {
            _context4.next = 51;
            break;
          }

          newRecord = _objectSpread({}, persistedRecord, {}, data, {}, updatedRecord);
          newRecord = Object.keys(newRecord).reduce(function (acc, key) {
            // These properties are persisted in autosaves.
            if (['title', 'excerpt', 'content'].includes(key)) {
              // Edits should be the "raw" attribute values.
              acc[key] = get(newRecord[key], 'raw', newRecord[key]);
            } else if (key === 'status') {
              // Status is only persisted in autosaves when going from
              // "auto-draft" to "draft".
              acc[key] = persistedRecord.status === 'auto-draft' && newRecord.status === 'draft' ? newRecord.status : persistedRecord.status;
            } else {
              // These properties are not persisted in autosaves.
              acc[key] = get(persistedRecord[key], 'raw', persistedRecord[key]);
            }

            return acc;
          }, {});
          _context4.next = 49;
          return receiveEntityRecords(kind, name, newRecord, undefined, true);

        case 49:
          _context4.next = 53;
          break;

        case 51:
          _context4.next = 53;
          return receiveAutosaves(persistedRecord.id, updatedRecord);

        case 53:
          _context4.next = 70;
          break;

        case 55:
          // Auto drafts should be converted to drafts on explicit saves and we should not respect their default title,
          // but some plugins break with this behavior so we can't filter it on the server.
          _data = record;

          if (kind === 'postType' && persistedRecord && persistedRecord.status === 'auto-draft') {
            if (!_data.status) {
              _data = _objectSpread({}, _data, {
                status: 'draft'
              });
            }

            if (!_data.title || _data.title === 'Auto Draft') {
              _data = _objectSpread({}, _data, {
                title: ''
              });
            }
          } // Get the full local version of the record before the update,
          // to merge it with the edits and then propagate it to subscribers


          _context4.next = 59;
          return select('__experimentalGetEntityRecordNoResolver', kind, name, recordId);

        case 59:
          persistedEntity = _context4.sent;
          _context4.next = 62;
          return select('getEntityRecordEdits', kind, name, recordId);

        case 62:
          currentEdits = _context4.sent;
          _context4.next = 65;
          return receiveEntityRecords(kind, name, _objectSpread({}, persistedEntity, {}, _data), undefined, true);

        case 65:
          _context4.next = 67;
          return apiFetch({
            path: path,
            method: recordId ? 'PUT' : 'POST',
            data: _data
          });

        case 67:
          updatedRecord = _context4.sent;
          _context4.next = 70;
          return receiveEntityRecords(kind, name, updatedRecord, undefined, true);

        case 70:
          _context4.next = 93;
          break;

        case 72:
          _context4.prev = 72;
          _context4.t2 = _context4["catch"](26);
          error = _context4.t2; // If we got to the point in the try block where we made an optimistic update,
          // we need to roll it back here.

          if (!(persistedEntity && currentEdits)) {
            _context4.next = 93;
            break;
          }

          _context4.next = 78;
          return receiveEntityRecords(kind, name, persistedEntity, undefined, true);

        case 78:
          _context4.t3 = editEntityRecord;
          _context4.t4 = kind;
          _context4.t5 = name;
          _context4.t6 = recordId;
          _context4.t7 = _objectSpread;
          _context4.t8 = {};
          _context4.t9 = currentEdits;
          _context4.t10 = {};
          _context4.next = 88;
          return select('getEntityRecordEdits', kind, name, recordId);

        case 88:
          _context4.t11 = _context4.sent;
          _context4.t12 = (0, _context4.t7)(_context4.t8, _context4.t9, _context4.t10, _context4.t11);
          _context4.t13 = {
            undoIgnore: true
          };
          _context4.next = 93;
          return (0, _context4.t3)(_context4.t4, _context4.t5, _context4.t6, _context4.t12, _context4.t13);

        case 93:
          _context4.next = 95;
          return {
            type: 'SAVE_ENTITY_RECORD_FINISH',
            kind: kind,
            name: name,
            recordId: recordId,
            error: error,
            isAutosave: isAutosave
          };

        case 95:
          return _context4.abrupt("return", updatedRecord);

        case 96:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[26, 72]]);
}
/**
 * Action triggered to save an entity record's edits.
 *
 * @param {string} kind     Kind of the entity.
 * @param {string} name     Name of the entity.
 * @param {Object} recordId ID of the record.
 * @param {Object} options  Saving options.
 */

export function saveEditedEntityRecord(kind, name, recordId, options) {
  var edits, record;
  return _regeneratorRuntime.wrap(function saveEditedEntityRecord$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return select('hasEditsForEntityRecord', kind, name, recordId);

        case 2:
          if (_context5.sent) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return");

        case 4:
          _context5.next = 6;
          return select('getEntityRecordNonTransientEdits', kind, name, recordId);

        case 6:
          edits = _context5.sent;
          record = _objectSpread({
            id: recordId
          }, edits);
          return _context5.delegateYield(saveEntityRecord(kind, name, record, options), "t0", 9);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}
/**
 * Returns an action object used in signalling that Upload permissions have been received.
 *
 * @param {boolean} hasUploadPermissions Does the user have permission to upload files?
 *
 * @return {Object} Action object.
 */

export function receiveUploadPermissions(hasUploadPermissions) {
  return {
    type: 'RECEIVE_USER_PERMISSION',
    key: 'create/media',
    isAllowed: hasUploadPermissions
  };
}
/**
 * Returns an action object used in signalling that the current user has
 * permission to perform an action on a REST resource.
 *
 * @param {string}  key       A key that represents the action and REST resource.
 * @param {boolean} isAllowed Whether or not the user can perform the action.
 *
 * @return {Object} Action object.
 */

export function receiveUserPermission(key, isAllowed) {
  return {
    type: 'RECEIVE_USER_PERMISSION',
    key: key,
    isAllowed: isAllowed
  };
}
/**
 * Returns an action object used in signalling that the autosaves for a
 * post have been received.
 *
 * @param {number}       postId    The id of the post that is parent to the autosave.
 * @param {Array|Object} autosaves An array of autosaves or singular autosave object.
 *
 * @return {Object} Action object.
 */

export function receiveAutosaves(postId, autosaves) {
  return {
    type: 'RECEIVE_AUTOSAVES',
    postId: postId,
    autosaves: castArray(autosaves)
  };
}
//# sourceMappingURL=actions.js.map