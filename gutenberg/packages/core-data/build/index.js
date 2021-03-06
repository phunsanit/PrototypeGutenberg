"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  EntityProvider: true
};
Object.defineProperty(exports, "EntityProvider", {
  enumerable: true,
  get: function get() {
    return _entityProvider.default;
  }
});

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var _controls = _interopRequireDefault(require("./controls"));

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

var resolvers = _interopRequireWildcard(require("./resolvers"));

var _entities = require("./entities");

var _name = require("./name");

var _entityProvider = _interopRequireWildcard(require("./entity-provider"));

Object.keys(_entityProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _entityProvider[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// The entity selectors/resolvers and actions are shortcuts to their generic equivalents
// (getEntityRecord, getEntityRecords, updateEntityRecord, updateEntityRecordss)
// Instead of getEntityRecord, the consumer could use more user-frieldly named selector: getPostType, getTaxonomy...
// The "kind" and the "name" of the entity are combined to generate these shortcuts.
var entitySelectors = _entities.defaultEntities.reduce(function (result, entity) {
  var kind = entity.kind,
      name = entity.name;

  result[(0, _entities.getMethodName)(kind, name)] = function (state, key) {
    return selectors.getEntityRecord(state, kind, name, key);
  };

  result[(0, _entities.getMethodName)(kind, name, 'get', true)] = function (state) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return selectors.getEntityRecords.apply(selectors, [state, kind, name].concat(args));
  };

  return result;
}, {});

var entityResolvers = _entities.defaultEntities.reduce(function (result, entity) {
  var kind = entity.kind,
      name = entity.name;

  result[(0, _entities.getMethodName)(kind, name)] = function (key) {
    return resolvers.getEntityRecord(kind, name, key);
  };

  var pluralMethodName = (0, _entities.getMethodName)(kind, name, 'get', true);

  result[pluralMethodName] = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return resolvers.getEntityRecords.apply(resolvers, [kind, name].concat(args));
  };

  result[pluralMethodName].shouldInvalidate = function (action) {
    var _resolvers$getEntityR;

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return (_resolvers$getEntityR = resolvers.getEntityRecords).shouldInvalidate.apply(_resolvers$getEntityR, [action, kind, name].concat(args));
  };

  return result;
}, {});

var entityActions = _entities.defaultEntities.reduce(function (result, entity) {
  var kind = entity.kind,
      name = entity.name;

  result[(0, _entities.getMethodName)(kind, name, 'save')] = function (key) {
    return actions.saveEntityRecord(kind, name, key);
  };

  return result;
}, {});

(0, _data.registerStore)(_name.REDUCER_KEY, {
  reducer: _reducer.default,
  controls: _controls.default,
  actions: _objectSpread({}, actions, {}, entityActions),
  selectors: _objectSpread({}, selectors, {}, entitySelectors),
  resolvers: _objectSpread({}, resolvers, {}, entityResolvers)
});
//# sourceMappingURL=index.js.map