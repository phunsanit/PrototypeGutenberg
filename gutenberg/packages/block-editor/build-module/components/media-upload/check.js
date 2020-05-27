/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
export function MediaUploadCheck(_ref) {
  var hasUploadPermissions = _ref.hasUploadPermissions,
      _ref$fallback = _ref.fallback,
      fallback = _ref$fallback === void 0 ? null : _ref$fallback,
      children = _ref.children;
  return hasUploadPermissions ? children : fallback;
}
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-upload/README.md
 */

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    hasUploadPermissions: !!getSettings().mediaUpload
  };
})(MediaUploadCheck);
//# sourceMappingURL=check.js.map