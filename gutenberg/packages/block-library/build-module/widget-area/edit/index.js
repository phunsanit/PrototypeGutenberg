import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { EntityProvider } from '@wordpress/core-data';
import { Panel, PanelBody } from '@wordpress/components';
/**
 * Internal dependencies
 */

import WidgetAreaInnerBlocks from './inner-blocks';
export default function WidgetAreaEdit(_ref) {
  var clientId = _ref.clientId,
      className = _ref.className,
      _ref$attributes = _ref.attributes,
      id = _ref$attributes.id,
      name = _ref$attributes.name;
  var index = useSelect(function (select) {
    return select('core/block-editor').getBlockIndex(clientId);
  }, [clientId]);
  return createElement(Panel, {
    className: className
  }, createElement(PanelBody, {
    title: name,
    initialOpen: index === 0
  }, createElement(EntityProvider, {
    kind: "root",
    type: "widgetArea",
    id: id
  }, createElement(WidgetAreaInnerBlocks, null))));
}
//# sourceMappingURL=index.js.map