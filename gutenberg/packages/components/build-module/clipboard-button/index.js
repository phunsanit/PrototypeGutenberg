import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useRef, useEffect } from '@wordpress/element';
import { useCopyOnClick } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import Button from '../button';
export default function ClipboardButton(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onCopy = _ref.onCopy,
      onFinishCopy = _ref.onFinishCopy,
      text = _ref.text,
      buttonProps = _objectWithoutProperties(_ref, ["className", "children", "onCopy", "onFinishCopy", "text"]);

  var ref = useRef();
  var hasCopied = useCopyOnClick(ref, text);
  var lastHasCopied = useRef(hasCopied);
  useEffect(function () {
    if (lastHasCopied.current === hasCopied) {
      return;
    }

    if (hasCopied) {
      onCopy();
    } else {
      onFinishCopy();
    }

    lastHasCopied.current = hasCopied;
  }, [onCopy, onFinishCopy, hasCopied]);
  var classes = classnames('components-clipboard-button', className); // Workaround for inconsistent behavior in Safari, where <textarea> is not
  // the document.activeElement at the moment when the copy event fires.
  // This causes documentHasSelection() in the copy-handler component to
  // mistakenly override the ClipboardButton, and copy a serialized string
  // of the current block instead.

  var focusOnCopyEventTarget = function focusOnCopyEventTarget(event) {
    event.target.focus();
  };

  return createElement(Button, _extends({}, buttonProps, {
    className: classes,
    ref: ref,
    onCopy: focusOnCopyEventTarget
  }), children);
}
//# sourceMappingURL=index.js.map