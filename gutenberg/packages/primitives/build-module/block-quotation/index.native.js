import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { Children, cloneElement } from '@wordpress/element';
import { withPreferredColorScheme } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './style.scss';
export var BlockQuotation = withPreferredColorScheme(function (props) {
  var getStylesFromColorScheme = props.getStylesFromColorScheme;
  var blockQuoteStyle = getStylesFromColorScheme(styles.wpBlockQuoteLight, styles.wpBlockQuoteDark);
  var newChildren = Children.map(props.children, function (child) {
    if (child && child.props.identifier === 'citation') {
      return cloneElement(child, {
        style: styles.wpBlockQuoteCitation
      });
    }

    if (child && child.props.identifier === 'value') {
      return cloneElement(child, {
        tagsToEliminate: ['div'],
        style: styles.wpBlockQuoteValue
      });
    }

    return child;
  });
  return createElement(View, {
    style: blockQuoteStyle
  }, newChildren);
});
//# sourceMappingURL=index.native.js.map