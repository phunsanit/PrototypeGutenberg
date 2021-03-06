/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/query",
  category: "layout",
  attributes: {
    queryId: {
      type: "number"
    },
    query: {
      type: "object",
      "default": {
        perPage: 3,
        pages: 1,
        offset: 0,
        categoryIds: []
      }
    }
  },
  providesContext: {
    queryId: "queryId",
    query: "query"
  },
  supports: {
    html: false
  }
};
import edit from './edit';
import save from './save';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Query'),
  edit: edit,
  save: save
};
export { useQueryContext } from './edit';
//# sourceMappingURL=index.js.map