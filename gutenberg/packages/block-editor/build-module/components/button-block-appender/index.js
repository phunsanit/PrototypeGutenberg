import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, Tooltip, VisuallyHidden } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { _x, sprintf } from '@wordpress/i18n';
import { Icon, create } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import Inserter from '../inserter';

function ButtonBlockAppender(_ref, ref) {
  var rootClientId = _ref.rootClientId,
      className = _ref.className,
      selectBlockOnInsert = _ref.__experimentalSelectBlockOnInsert,
      onFocus = _ref.onFocus,
      tabIndex = _ref.tabIndex;
  return createElement(Inserter, {
    position: "bottom center",
    rootClientId: rootClientId,
    __experimentalSelectBlockOnInsert: selectBlockOnInsert,
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          disabled = _ref2.disabled,
          isOpen = _ref2.isOpen,
          blockTitle = _ref2.blockTitle,
          hasSingleBlockType = _ref2.hasSingleBlockType;
      var label;

      if (hasSingleBlockType) {
        label = sprintf( // translators: %s: the name of the block when there is only one
        _x('Add %s', 'directly add the only allowed block'), blockTitle);
      } else {
        label = _x('Add block', 'Generic label for block inserter button');
      }

      var isToggleButton = !hasSingleBlockType;
      return createElement(Tooltip, {
        text: label
      }, createElement(Button, {
        ref: ref,
        onFocus: onFocus,
        tabIndex: tabIndex,
        className: classnames(className, 'block-editor-button-block-appender'),
        onClick: onToggle,
        "aria-haspopup": isToggleButton ? 'true' : undefined,
        "aria-expanded": isToggleButton ? isOpen : undefined,
        disabled: disabled,
        label: label
      }, createElement(VisuallyHidden, {
        as: "span"
      }, label), createElement(Icon, {
        icon: create
      })));
    },
    isAppender: true
  });
}
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/button-block-appender/README.md
 */


export default forwardRef(ButtonBlockAppender);
//# sourceMappingURL=index.js.map