/**
 * External dependencies
 */
import { isEmpty, each } from 'lodash';
/**
 * Internal dependencies
 */

import { NEW_TAB_REL } from './constants';
export function calculatePreferedImageSize(image, container) {
  var maxWidth = container.clientWidth;
  var exceedMaxWidth = image.width > maxWidth;
  var ratio = image.height / image.width;
  var width = exceedMaxWidth ? maxWidth : image.width;
  var height = exceedMaxWidth ? maxWidth * ratio : image.height;
  return {
    width: width,
    height: height
  };
}
export function removeNewTabRel(currentRel) {
  var newRel = currentRel;

  if (currentRel !== undefined && !isEmpty(newRel)) {
    if (!isEmpty(newRel)) {
      each(NEW_TAB_REL, function (relVal) {
        var regExp = new RegExp('\\b' + relVal + '\\b', 'gi');
        newRel = newRel.replace(regExp, '');
      }); // Only trim if NEW_TAB_REL values was replaced.

      if (newRel !== currentRel) {
        newRel = newRel.trim();
      }

      if (isEmpty(newRel)) {
        newRel = undefined;
      }
    }
  }

  return newRel;
}
/**
 * Helper to get the link target settings to be stored.
 *
 * @param {boolean} value         The new link target value.
 * @param {Object} attributes     Block attributes.
 * @param {Object} attributes.rel Image block's rel attribute.
 *
 * @return {Object} Updated link target settings.
 */

export function getUpdatedLinkTargetSettings(value, _ref) {
  var rel = _ref.rel;
  var linkTarget = value ? '_blank' : undefined;
  var updatedRel;

  if (!linkTarget && !rel) {
    updatedRel = undefined;
  } else {
    updatedRel = removeNewTabRel(rel);
  }

  return {
    linkTarget: linkTarget,
    rel: updatedRel
  };
}
//# sourceMappingURL=utils.js.map