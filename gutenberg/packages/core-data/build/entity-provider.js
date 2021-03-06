"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntityProvider;
exports.useEntityId = useEntityId;
exports.useEntityProp = useEntityProp;
exports.useEntityBlockEditor = useEntityBlockEditor;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _entities = require("./entities");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var entities = _objectSpread({}, _entities.defaultEntities.reduce(function (acc, entity) {
  if (!acc[entity.kind]) {
    acc[entity.kind] = {};
  }

  acc[entity.kind][entity.name] = {
    context: (0, _element.createContext)()
  };
  return acc;
}, {}), {}, _entities.kinds.reduce(function (acc, kind) {
  acc[kind.name] = {};
  return acc;
}, {}));

var getEntity = function getEntity(kind, type) {
  if (!entities[kind]) {
    throw new Error("Missing entity config for kind: ".concat(kind, "."));
  }

  if (!entities[kind][type]) {
    entities[kind][type] = {
      context: (0, _element.createContext)()
    };
  }

  return entities[kind][type];
};
/**
 * Context provider component for providing
 * an entity for a specific entity type.
 *
 * @param {Object} props          The component's props.
 * @param {string} props.kind     The entity kind.
 * @param {string} props.type     The entity type.
 * @param {number} props.id       The entity ID.
 * @param {*}      props.children The children to wrap.
 *
 * @return {Object} The provided children, wrapped with
 *                   the entity's context provider.
 */


function EntityProvider(_ref) {
  var kind = _ref.kind,
      type = _ref.type,
      id = _ref.id,
      children = _ref.children;
  var Provider = getEntity(kind, type).context.Provider;
  return (0, _element.createElement)(Provider, {
    value: id
  }, children);
}
/**
 * Hook that returns the ID for the nearest
 * provided entity of the specified type.
 *
 * @param {string} kind The entity kind.
 * @param {string} type The entity type.
 */


function useEntityId(kind, type) {
  return (0, _element.useContext)(getEntity(kind, type).context);
}
/**
 * Hook that returns the value and a setter for the
 * specified property of the nearest provided
 * entity of the specified type.
 *
 * @param {string} kind  The entity kind.
 * @param {string} type  The entity type.
 * @param {string} prop  The property name.
 * @param {string} [_id] An entity ID to use instead of the context-provided one.
 *
 * @return {[*, Function]} A tuple where the first item is the
 *                          property value and the second is the
 *                          setter.
 */


function useEntityProp(kind, type, prop, _id) {
  var providerId = useEntityId(kind, type);
  var id = _id !== null && _id !== void 0 ? _id : providerId;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getEntityRecord = _select.getEntityRecord,
        getEditedEntityRecord = _select.getEditedEntityRecord;

    var entity = getEntityRecord(kind, type, id); // Trigger resolver.

    var editedEntity = getEditedEntityRecord(kind, type, id);
    return entity && editedEntity ? {
      value: editedEntity[prop],
      fullValue: entity[prop]
    } : {};
  }, [kind, type, id, prop]),
      value = _useSelect.value,
      fullValue = _useSelect.fullValue;

  var _useDispatch = (0, _data.useDispatch)('core'),
      editEntityRecord = _useDispatch.editEntityRecord;

  var setValue = (0, _element.useCallback)(function (newValue) {
    editEntityRecord(kind, type, id, (0, _defineProperty2.default)({}, prop, newValue));
  }, [kind, type, id, prop]);
  return [value, setValue, fullValue];
}
/**
 * Hook that returns block content getters and setters for
 * the nearest provided entity of the specified type.
 *
 * The return value has the shape `[ blocks, onInput, onChange ]`.
 * `onInput` is for block changes that don't create undo levels
 * or dirty the post, non-persistent changes, and `onChange` is for
 * peristent changes. They map directly to the props of a
 * `BlockEditorProvider` and are intended to be used with it,
 * or similar components or hooks.
 *
 * @param {string} kind                            The entity kind.
 * @param {string} type                            The entity type.
 * @param {Object} options
 * @param {Object} [options.initialEdits]          Initial edits object for the entity record.
 * @param {string} [options.blocksProp='blocks']   The name of the entity prop that holds the blocks array.
 * @param {string} [options.contentProp='content'] The name of the entity prop that holds the serialized blocks.
 * @param {string} [options.id]                    An entity ID to use instead of the context-provided one.
 *
 * @return {[WPBlock[], Function, Function]} The block array and setters.
 */


function useEntityBlockEditor(kind, type) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      initialEdits = _ref2.initialEdits,
      _ref2$blocksProp = _ref2.blocksProp,
      blocksProp = _ref2$blocksProp === void 0 ? 'blocks' : _ref2$blocksProp,
      _ref2$contentProp = _ref2.contentProp,
      contentProp = _ref2$contentProp === void 0 ? 'content' : _ref2$contentProp,
      _id = _ref2.id;

  var providerId = useEntityId(kind, type);
  var id = _id !== null && _id !== void 0 ? _id : providerId;

  var _useEntityProp = useEntityProp(kind, type, contentProp, id),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      content = _useEntityProp2[0],
      setContent = _useEntityProp2[1];

  var _useDispatch2 = (0, _data.useDispatch)('core'),
      editEntityRecord = _useDispatch2.editEntityRecord;

  (0, _element.useEffect)(function () {
    if (initialEdits) {
      editEntityRecord(kind, type, id, initialEdits, {
        undoIgnore: true
      });
    }
  }, [id]);
  var initialBlocks = (0, _element.useMemo)(function () {
    // Guard against other instances that might have
    // set content to a function already.
    if (content && typeof content !== 'function') {
      var parsedContent = (0, _blocks.parse)(content);
      return parsedContent.length ? parsedContent : [];
    }

    return [];
  }, [content]);

  var _useEntityProp3 = useEntityProp(kind, type, blocksProp, id),
      _useEntityProp4 = (0, _slicedToArray2.default)(_useEntityProp3, 2),
      _useEntityProp4$ = _useEntityProp4[0],
      blocks = _useEntityProp4$ === void 0 ? initialBlocks : _useEntityProp4$,
      onInput = _useEntityProp4[1];

  var onChange = (0, _element.useCallback)(function (nextBlocks) {
    onInput(nextBlocks); // Use a function edit to avoid serializing often.

    setContent(function (_ref3) {
      var blocksToSerialize = _ref3.blocks;
      return (0, _blocks.serialize)(blocksToSerialize);
    });
  }, [onInput, setContent]);
  return [blocks, onInput, onChange];
}
//# sourceMappingURL=entity-provider.js.map