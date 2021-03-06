import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { default as useSimulatedMediaQuery } from '../../components/use-simulated-media-query';
/**
 * Function to resize the editor window.
 *
 * @param {string} deviceType Used for determining the size of the container (e.g. Desktop, Tablet, Mobile)
 *
 * @return {Object} Inline styles to be added to resizable container.
 */

export default function useResizeCanvas(deviceType) {
  var _useState = useState(window.innerWidth),
      _useState2 = _slicedToArray(_useState, 2),
      actualWidth = _useState2[0],
      updateActualWidth = _useState2[1];

  useEffect(function () {
    if (deviceType === 'Desktop') {
      return;
    }

    var resizeListener = function resizeListener() {
      return updateActualWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeListener);
    return function () {
      window.removeEventListener('resize', resizeListener);
    };
  }, [deviceType]);

  var getCanvasWidth = function getCanvasWidth(device) {
    var deviceWidth;

    switch (device) {
      case 'Tablet':
        deviceWidth = 780;
        break;

      case 'Mobile':
        deviceWidth = 360;
        break;

      default:
        return null;
    }

    return deviceWidth < actualWidth ? deviceWidth : actualWidth;
  };

  var marginValue = function marginValue() {
    return window.innerHeight < 800 ? 36 : 72;
  };

  var contentInlineStyles = function contentInlineStyles(device) {
    switch (device) {
      case 'Tablet':
      case 'Mobile':
        return {
          width: getCanvasWidth(device),
          margin: marginValue() + 'px auto',
          flexGrow: 0,
          maxHeight: device === 'Mobile' ? '768px' : '1024px',
          overflowY: 'auto'
        };

      default:
        return null;
    }
  };

  useSimulatedMediaQuery('resizable-editor-section', getCanvasWidth(deviceType));
  return contentInlineStyles(deviceType);
}
//# sourceMappingURL=index.js.map