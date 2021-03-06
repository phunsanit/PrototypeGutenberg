import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { focus } from '@wordpress/dom';
import { useCallback } from '@wordpress/element';
import { UP, DOWN, LEFT, RIGHT } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import RovingTabIndexContainer from './roving-tab-index';
/**
 * Return focusables in a row element, excluding those from other branches
 * nested within the row.
 *
 * @param {Element} rowElement The DOM element representing the row.
 *
 * @return {?Array} The array of focusables in the row.
 */

function getRowFocusables(rowElement) {
  var focusablesInRow = focus.focusable.find(rowElement);

  if (!focusablesInRow || !focusablesInRow.length) {
    return;
  }

  return focusablesInRow.filter(function (focusable) {
    return focusable.closest('[role="row"]') === rowElement;
  });
}
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/components/src/tree-grid/README.md
 */


export default function TreeGrid(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var onKeyDown = useCallback(function (event) {
    var keyCode = event.keyCode,
        metaKey = event.metaKey,
        ctrlKey = event.ctrlKey,
        altKey = event.altKey,
        shiftKey = event.shiftKey;
    var hasModifierKeyPressed = metaKey || ctrlKey || altKey || shiftKey;

    if (hasModifierKeyPressed || !includes([UP, DOWN, LEFT, RIGHT], keyCode)) {
      return;
    } // The event will be handled, stop propagation.


    event.stopPropagation();
    var _document = document,
        activeElement = _document.activeElement;
    var treeGridElement = event.currentTarget;

    if (!treeGridElement.contains(activeElement)) {
      return;
    } // Calculate the columnIndex of the active element.


    var activeRow = activeElement.closest('[role="row"]');
    var focusablesInRow = getRowFocusables(activeRow);
    var currentColumnIndex = focusablesInRow.indexOf(activeElement);

    if (includes([LEFT, RIGHT], keyCode)) {
      // Calculate to the next element.
      var nextIndex;

      if (keyCode === LEFT) {
        nextIndex = Math.max(0, currentColumnIndex - 1);
      } else {
        nextIndex = Math.min(currentColumnIndex + 1, focusablesInRow.length - 1);
      } // Focus is either at the left or right edge of the grid. Do nothing.


      if (nextIndex === currentColumnIndex) {
        // Prevent key use for anything else. For example, Voiceover
        // will start reading text on continued use of left/right arrow
        // keys.
        event.preventDefault();
        return;
      } // Focus the next element.


      focusablesInRow[nextIndex].focus(); // Prevent key use for anything else. This ensures Voiceover
      // doesn't try to handle key navigation.

      event.preventDefault();
    } else if (includes([UP, DOWN], keyCode)) {
      // Calculate the rowIndex of the next row.
      var rows = Array.from(treeGridElement.querySelectorAll('[role="row"]'));
      var currentRowIndex = rows.indexOf(activeRow);
      var nextRowIndex;

      if (keyCode === UP) {
        nextRowIndex = Math.max(0, currentRowIndex - 1);
      } else {
        nextRowIndex = Math.min(currentRowIndex + 1, rows.length - 1);
      } // Focus is either at the top or bottom edge of the grid. Do nothing.


      if (nextRowIndex === currentRowIndex) {
        // Prevent key use for anything else. For example, Voiceover
        // will start navigating horizontally when reaching the vertical
        // bounds of a table.
        event.preventDefault();
        return;
      } // Get the focusables in the next row.


      var focusablesInNextRow = getRowFocusables(rows[nextRowIndex]); // If for some reason there are no focusables in the next row, do nothing.

      if (!focusablesInNextRow || !focusablesInNextRow.length) {
        // Prevent key use for anything else. For example, Voiceover
        // will still focus text when using arrow keys, while this
        // component should limit navigation to focusables.
        event.preventDefault();
        return;
      } // Try to focus the element in the next row that's at a similar column to the activeElement.


      var _nextIndex = Math.min(currentColumnIndex, focusablesInNextRow.length - 1);

      focusablesInNextRow[_nextIndex].focus(); // Prevent key use for anything else. This ensures Voiceover
      // doesn't try to handle key navigation.


      event.preventDefault();
    }
  }, []);
  return createElement(RovingTabIndexContainer, null, createElement("table", _extends({}, props, {
    role: "treegrid",
    onKeyDown: onKeyDown
  }), createElement("tbody", null, children)));
}
export { default as TreeGridRow } from './row';
export { default as TreeGridCell } from './cell';
//# sourceMappingURL=index.js.map