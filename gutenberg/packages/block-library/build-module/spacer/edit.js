import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ResizableBox, RangeControl } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
var MIN_SPACER_HEIGHT = 20;
var MAX_SPACER_HEIGHT = 500;

var SpacerEdit = function SpacerEdit(_ref) {
  var attributes = _ref.attributes,
      isSelected = _ref.isSelected,
      setAttributes = _ref.setAttributes,
      onResizeStart = _ref.onResizeStart,
      _onResizeStop = _ref.onResizeStop;
  var height = attributes.height;

  var updateHeight = function updateHeight(value) {
    setAttributes({
      height: value
    });
  };

  return createElement(Fragment, null, createElement(ResizableBox, {
    className: classnames('block-library-spacer__resize-container', {
      'is-selected': isSelected
    }),
    size: {
      height: height
    },
    minHeight: MIN_SPACER_HEIGHT,
    enable: {
      top: false,
      right: false,
      bottom: true,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    },
    onResizeStart: onResizeStart,
    onResizeStop: function onResizeStop(event, direction, elt, delta) {
      _onResizeStop();

      var spacerHeight = Math.min(parseInt(height + delta.height, 10), MAX_SPACER_HEIGHT);
      updateHeight(spacerHeight);
    },
    showHandle: isSelected
  }), createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Spacer settings')
  }, createElement(RangeControl, {
    label: __('Height in pixels'),
    min: MIN_SPACER_HEIGHT,
    max: Math.max(MAX_SPACER_HEIGHT, height),
    value: height,
    onChange: updateHeight
  }))));
};

export default compose([withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      toggleSelection = _dispatch.toggleSelection;

  return {
    onResizeStart: function onResizeStart() {
      return toggleSelection(false);
    },
    onResizeStop: function onResizeStop() {
      return toggleSelection(true);
    }
  };
}), withInstanceId])(SpacerEdit);
//# sourceMappingURL=edit.js.map