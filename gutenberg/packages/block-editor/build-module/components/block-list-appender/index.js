import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { last } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { getDefaultBlockName } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import DefaultBlockAppender from '../default-block-appender';
import ButtonBlockAppender from '../button-block-appender';

function stopPropagation(event) {
  event.stopPropagation();
}

function BlockListAppender(_ref) {
  var blockClientIds = _ref.blockClientIds,
      rootClientId = _ref.rootClientId,
      canInsertDefaultBlock = _ref.canInsertDefaultBlock,
      isLocked = _ref.isLocked,
      CustomAppender = _ref.renderAppender,
      className = _ref.className,
      _ref$tagName = _ref.tagName,
      TagName = _ref$tagName === void 0 ? 'div' : _ref$tagName;

  if (isLocked || CustomAppender === false) {
    return null;
  }

  var appender;

  if (CustomAppender) {
    // Prefer custom render prop if provided.
    appender = createElement(CustomAppender, null);
  } else if (canInsertDefaultBlock) {
    // Render the default block appender when renderAppender has not been
    // provided and the context supports use of the default appender.
    appender = createElement(DefaultBlockAppender, {
      rootClientId: rootClientId,
      lastBlockClientId: last(blockClientIds)
    });
  } else {
    // Fallback in the case no renderAppender has been provided and the
    // default block can't be inserted.
    appender = createElement(ButtonBlockAppender, {
      rootClientId: rootClientId,
      className: "block-list-appender__toggle"
    });
  }

  return createElement(TagName // A `tabIndex` is used on the wrapping `div` element in order to
  // force a focus event to occur when an appender `button` element
  // is clicked. In some browsers (Firefox, Safari), button clicks do
  // not emit a focus event, which could cause this event to propagate
  // unexpectedly. The `tabIndex` ensures that the interaction is
  // captured as a focus, without also adding an extra tab stop.
  //
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
  , {
    tabIndex: -1 // Prevent the block from being selected when the appender is
    // clicked.
    ,
    onFocus: stopPropagation,
    className: classnames('block-list-appender', className)
  }, appender);
}

export default withSelect(function (select, _ref2) {
  var rootClientId = _ref2.rootClientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      canInsertBlockType = _select.canInsertBlockType,
      getTemplateLock = _select.getTemplateLock;

  return {
    isLocked: !!getTemplateLock(rootClientId),
    blockClientIds: getBlockOrder(rootClientId),
    canInsertDefaultBlock: canInsertBlockType(getDefaultBlockName(), rootClientId)
  };
})(BlockListAppender);
//# sourceMappingURL=index.js.map