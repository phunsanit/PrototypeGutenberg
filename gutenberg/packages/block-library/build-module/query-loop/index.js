/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { loop } from '@wordpress/icons';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/query-loop",
  category: "layout",
  context: ["queryId", "query", "queryContext"],
  supports: {
    reusable: false,
    html: false
  }
};
import edit from './edit';
import save from './save';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Query Loop'),
  icon: loop,
  edit: edit,
  save: save
};
//# sourceMappingURL=index.js.map