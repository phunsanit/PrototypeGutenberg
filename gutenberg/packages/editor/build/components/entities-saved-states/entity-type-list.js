"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EntityTypeList;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _entityRecordItem = _interopRequireDefault(require("./entity-record-item"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ENTITY_NAME_ICONS = {
  site: _icons.layout,
  page: _icons.page,
  post: _icons.grid,
  wp_template: _icons.grid
};

function EntityTypeList(_ref) {
  var list = _ref.list,
      unselectedEntities = _ref.unselectedEntities,
      setUnselectedEntities = _ref.setUnselectedEntities,
      closePanel = _ref.closePanel;
  var firstRecord = list[0];
  var entity = (0, _data.useSelect)(function (select) {
    return select('core').getEntity(firstRecord.kind, firstRecord.name);
  }, [firstRecord.kind, firstRecord.name]); // Set icon based on type of entity.

  var name = firstRecord.name;
  var icon = ENTITY_NAME_ICONS[name] || _icons.blockDefault;
  return (0, _element.createElement)(_components.PanelBody, {
    title: entity.label,
    initialOpen: true,
    icon: icon
  }, list.map(function (record) {
    return (0, _element.createElement)(_entityRecordItem.default, {
      key: record.key || 'site',
      record: record,
      checked: !(0, _lodash.some)(unselectedEntities, function (elt) {
        return elt.kind === record.kind && elt.name === record.name && elt.key === record.key;
      }),
      onChange: function onChange(value) {
        return setUnselectedEntities(record, value);
      },
      closePanel: closePanel
    });
  }));
}
//# sourceMappingURL=entity-type-list.js.map