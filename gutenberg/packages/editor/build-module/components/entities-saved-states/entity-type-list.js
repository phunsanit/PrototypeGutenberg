import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { some } from 'lodash';
/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
import { PanelBody } from '@wordpress/components';
import { page, layout, grid, blockDefault } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import EntityRecordItem from './entity-record-item';
var ENTITY_NAME_ICONS = {
  site: layout,
  page: page,
  post: grid,
  wp_template: grid
};
export default function EntityTypeList(_ref) {
  var list = _ref.list,
      unselectedEntities = _ref.unselectedEntities,
      setUnselectedEntities = _ref.setUnselectedEntities,
      closePanel = _ref.closePanel;
  var firstRecord = list[0];
  var entity = useSelect(function (select) {
    return select('core').getEntity(firstRecord.kind, firstRecord.name);
  }, [firstRecord.kind, firstRecord.name]); // Set icon based on type of entity.

  var name = firstRecord.name;
  var icon = ENTITY_NAME_ICONS[name] || blockDefault;
  return createElement(PanelBody, {
    title: entity.label,
    initialOpen: true,
    icon: icon
  }, list.map(function (record) {
    return createElement(EntityRecordItem, {
      key: record.key || 'site',
      record: record,
      checked: !some(unselectedEntities, function (elt) {
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