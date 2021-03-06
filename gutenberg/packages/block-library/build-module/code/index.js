/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { code as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import edit from './edit';
var metadata = {
  name: "core/code",
  category: "formatting",
  attributes: {
    content: {
      type: "string",
      source: "text",
      selector: "code"
    }
  },
  supports: {
    html: false,
    lightBlockWrapper: true
  }
};
import save from './save';
import transforms from './transforms';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Code'),
  description: __('Display code snippets that respect your spacing and tabs.'),
  icon: icon,
  example: {
    attributes: {
      /* eslint-disable @wordpress/i18n-no-collapsible-whitespace */
      // translators: Preserve \n markers for line breaks
      content: __('// A "block" is the abstract term used\n// to describe units of markup that\n// when composed together, form the\n// content or layout of a page.\nregisterBlockType( name, settings );')
      /* eslint-enable @wordpress/i18n-no-collapsible-whitespace */

    }
  },
  transforms: transforms,
  edit: edit,
  save: save
};
//# sourceMappingURL=index.js.map