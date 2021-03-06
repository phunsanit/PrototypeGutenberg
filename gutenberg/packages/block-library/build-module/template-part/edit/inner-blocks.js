import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityBlockEditor } from '@wordpress/core-data';
import { InnerBlocks } from '@wordpress/block-editor';
export default function TemplatePartInnerBlocks() {
  var _useEntityBlockEditor = useEntityBlockEditor('postType', 'wp_template_part', {
    initialEdits: {
      status: 'publish'
    }
  }),
      _useEntityBlockEditor2 = _slicedToArray(_useEntityBlockEditor, 3),
      blocks = _useEntityBlockEditor2[0],
      onInput = _useEntityBlockEditor2[1],
      onChange = _useEntityBlockEditor2[2];

  return createElement(InnerBlocks, {
    value: blocks,
    onInput: onInput,
    onChange: onChange
  });
}
//# sourceMappingURL=inner-blocks.js.map