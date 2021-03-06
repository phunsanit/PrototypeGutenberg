"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = require("lodash");

var _phrasingContent = require("./phrasing-content");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Whether or not the given node is figure content.
 *
 * @param {Node}   node   The node to check.
 * @param {Object} schema The schema to use.
 *
 * @return {boolean} True if figure content, false if not.
 */
function isFigureContent(node, schema) {
  var tag = node.nodeName.toLowerCase(); // We are looking for tags that can be a child of the figure tag, excluding
  // `figcaption` and any phrasing content.

  if (tag === 'figcaption' || (0, _phrasingContent.isTextContent)(node)) {
    return false;
  }

  return (0, _lodash.has)(schema, ['figure', 'children', tag]);
}
/**
 * Whether or not the given node can have an anchor.
 *
 * @param {Node}   node   The node to check.
 * @param {Object} schema The schema to use.
 *
 * @return {boolean} True if it can, false if not.
 */


function canHaveAnchor(node, schema) {
  var tag = node.nodeName.toLowerCase();
  return (0, _lodash.has)(schema, ['figure', 'children', 'a', 'children', tag]);
}
/**
 * Wraps the given element in a figure element.
 *
 * @param {Element} element       The element to wrap.
 * @param {Element} beforeElement The element before which to place the figure.
 */


function wrapFigureContent(element) {
  var beforeElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element;
  var figure = element.ownerDocument.createElement('figure');
  beforeElement.parentNode.insertBefore(figure, beforeElement);
  figure.appendChild(element);
}
/**
 * This filter takes figure content out of paragraphs, wraps it in a figure
 * element, and moves any anchors with it if needed.
 *
 * @param {Node}     node   The node to filter.
 * @param {Document} doc    The document of the node.
 * @param {Object}   schema The schema to use.
 *
 * @return {void}
 */


function _default(node, doc, schema) {
  if (!isFigureContent(node, schema)) {
    return;
  }

  var nodeToInsert = node;
  var parentNode = node.parentNode; // If the figure content can have an anchor and its parent is an anchor with
  // only the figure content, take the anchor out instead of just the content.

  if (canHaveAnchor(node, schema) && parentNode.nodeName === 'A' && parentNode.childNodes.length === 1) {
    nodeToInsert = node.parentNode;
  }

  var wrapper = nodeToInsert.closest('p,div'); // If wrapped in a paragraph or div, only extract if it's aligned or if
  // there is no text content.
  // Otherwise, if directly at the root, wrap in a figure element.

  if (wrapper) {
    // In jsdom-jscore, 'node.classList' can be undefined.
    // In this case, default to extract as it offers a better UI experience on mobile.
    if (!node.classList) {
      wrapFigureContent(nodeToInsert, wrapper);
    } else if (node.classList.contains('alignright') || node.classList.contains('alignleft') || node.classList.contains('aligncenter') || !wrapper.textContent.trim()) {
      wrapFigureContent(nodeToInsert, wrapper);
    }
  } else if (nodeToInsert.parentNode.nodeName === 'BODY') {
    wrapFigureContent(nodeToInsert);
  }
}
//# sourceMappingURL=figure-content-reducer.js.map