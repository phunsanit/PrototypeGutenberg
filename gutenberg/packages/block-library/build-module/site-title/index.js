/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { mapMarker as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/site-title",
  category: "layout",
  attributes: {
    level: {
      type: "number",
      "default": 1
    }
  },
  supports: {
    html: false,
    lightBlockWrapper: true
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Site Title'),
  icon: icon,
  edit: edit
};
//# sourceMappingURL=index.js.map