import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, chevronRight } from '@wordpress/icons';
import { ColorIndicator } from '@wordpress/components';
/**
 * Internal dependencies
 */

import Cell from './cell';
import styles from './styles.scss';
export default function BottomSheetColorCell(props) {
  var color = props.color,
      cellProps = _objectWithoutProperties(props, ["color"]);

  return createElement(Cell, _extends({}, cellProps, {
    accessibilityRole: 'none',
    accessibilityHint:
    /* translators: accessibility text (hint for moving to color settings) */
    __('Double tap to go to color settings'),
    editable: false,
    value: !color && 'Default'
  }), color && createElement(ColorIndicator, {
    color: color,
    style: styles.colorCircle
  }), createElement(Icon, {
    icon: chevronRight
  }));
}
//# sourceMappingURL=color-cell.native.js.map