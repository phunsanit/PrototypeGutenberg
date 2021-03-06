"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _listenerHooks = require("./listener-hooks");

/**
 * Internal dependencies
 */

/**
 * Data component used for initializing the editor and re-initializes
 * when postId changes or on unmount.
 *
 * @param {number} postId  The id of the post.
 * @return {null} This is a data component so does not render any ui.
 */
function _default(_ref) {
  var postId = _ref.postId;
  (0, _listenerHooks.useBlockSelectionListener)(postId);
  (0, _listenerHooks.useUpdatePostLinkListener)(postId);
  return null;
}
//# sourceMappingURL=index.js.map