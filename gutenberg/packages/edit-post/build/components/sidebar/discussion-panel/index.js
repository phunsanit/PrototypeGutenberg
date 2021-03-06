"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var PANEL_NAME = 'discussion-panel';

function DiscussionPanel(_ref) {
  var isEnabled = _ref.isEnabled,
      isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel;

  if (!isEnabled) {
    return null;
  }

  return (0, _element.createElement)(_editor.PostTypeSupportCheck, {
    supportKeys: ['comments', 'trackbacks']
  }, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Discussion'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, (0, _element.createElement)(_editor.PostTypeSupportCheck, {
    supportKeys: "comments"
  }, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostComments, null))), (0, _element.createElement)(_editor.PostTypeSupportCheck, {
    supportKeys: "trackbacks"
  }, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostPingbacks, null)))));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    isEnabled: select('core/edit-post').isEditorPanelEnabled(PANEL_NAME),
    isOpened: select('core/edit-post').isEditorPanelOpened(PANEL_NAME)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onTogglePanel: function onTogglePanel() {
      return dispatch('core/edit-post').toggleEditorPanelOpened(PANEL_NAME);
    }
  };
})])(DiscussionPanel);

exports.default = _default;
//# sourceMappingURL=index.js.map