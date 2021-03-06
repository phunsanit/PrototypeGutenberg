"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = QueryEdit;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _queryToolbar = _interopRequireDefault(require("./query-toolbar"));

var _queryProvider = _interopRequireWildcard(require("./query-provider"));

Object.keys(_queryProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _queryProvider[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TEMPLATE = [['core/query-loop'], ['core/query-pagination']];

function QueryEdit(_ref) {
  var _ref$attributes = _ref.attributes,
      queryId = _ref$attributes.queryId,
      query = _ref$attributes.query,
      setAttributes = _ref.setAttributes;
  var instanceId = (0, _compose.useInstanceId)(QueryEdit); // We need this for multi-query block pagination.
  // Query parameters for each block are scoped to their ID.

  (0, _element.useEffect)(function () {
    if (!queryId) {
      setAttributes({
        queryId: instanceId
      });
    }
  }, [queryId, instanceId]);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_queryToolbar.default, {
    query: query,
    setQuery: function setQuery(newQuery) {
      return setAttributes({
        query: _objectSpread({}, query, {}, newQuery)
      });
    }
  })), (0, _element.createElement)(_queryProvider.default, null, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    template: TEMPLATE
  })));
}
//# sourceMappingURL=index.js.map