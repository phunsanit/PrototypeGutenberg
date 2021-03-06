"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFeature = toggleFeature;
exports.__experimentalSetPreviewDeviceType = __experimentalSetPreviewDeviceType;

/**
 * Returns an action object used to toggle a feature flag.
 *
 * @param {string} feature Feature name.
 *
 * @return {Object} Action object.
 */
function toggleFeature(feature) {
  return {
    type: 'TOGGLE_FEATURE',
    feature: feature
  };
}
/**
 * Returns an action object used to toggle the width of the editing canvas.
 *
 * @param {string} deviceType
 *
 * @return {Object} Action object.
 */


function __experimentalSetPreviewDeviceType(deviceType) {
  return {
    type: 'SET_PREVIEW_DEVICE_TYPE',
    deviceType: deviceType
  };
}
//# sourceMappingURL=actions.js.map