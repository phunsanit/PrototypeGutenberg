import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import PostTypeSupportCheck from '../post-type-support-check';
export default function PostSlugCheck(_ref) {
  var children = _ref.children;
  return createElement(PostTypeSupportCheck, {
    supportKeys: "slug"
  }, children);
}
//# sourceMappingURL=check.js.map