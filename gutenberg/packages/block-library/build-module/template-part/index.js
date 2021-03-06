/**
 * External dependencies
 */
import { startCase } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/template-part",
  category: "layout",
  attributes: {
    postId: {
      type: "number"
    },
    slug: {
      type: "string"
    },
    theme: {
      type: "string"
    }
  },
  supports: {
    html: false
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Template Part'),
  __experimentalLabel: function __experimentalLabel(_ref) {
    var slug = _ref.slug;
    return startCase(slug);
  },
  edit: edit
};
//# sourceMappingURL=index.js.map