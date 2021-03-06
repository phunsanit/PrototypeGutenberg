/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { heading as icon } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import deprecated from './deprecated';
import edit from './edit';
var metadata = {
  name: "core/heading",
  category: "common",
  attributes: {
    align: {
      type: "string"
    },
    content: {
      type: "string",
      source: "html",
      selector: "h1,h2,h3,h4,h5,h6",
      "default": ""
    },
    level: {
      type: "number",
      "default": 2
    },
    placeholder: {
      type: "string"
    }
  },
  supports: {
    className: false,
    anchor: true,
    __unstablePasteTextInline: true,
    lightBlockWrapper: true,
    __experimentalColor: true,
    __experimentalLineHeight: true,
    __experimentalFontSize: true
  }
};
import save from './save';
import transforms from './transforms';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Heading'),
  description: __('Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.'),
  icon: icon,
  keywords: [__('title'), __('subtitle')],
  example: {
    attributes: {
      content: __('Code is Poetry'),
      level: 2
    }
  },
  __experimentalLabel: function __experimentalLabel(attributes, _ref) {
    var context = _ref.context;

    if (context === 'accessibility') {
      var content = attributes.content,
          level = attributes.level;
      return isEmpty(content) ? sprintf(
      /* translators: accessibility text. %s: heading level. */
      __('Level %s. Empty.'), level) : sprintf(
      /* translators: accessibility text. 1: heading level. 2: heading content. */
      __('Level %1$s. %2$s'), level, content);
    }
  },
  transforms: transforms,
  deprecated: deprecated,
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: (attributes.content || '') + (attributesToMerge.content || '')
    };
  },
  edit: edit,
  save: save
};
//# sourceMappingURL=index.js.map