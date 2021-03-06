"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorGlobalKeyboardShortcuts = EditorGlobalKeyboardShortcuts;
exports.default = void 0;

var _element = require("@wordpress/element");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _blockEditor = require("@wordpress/block-editor");

var _saveShortcut = _interopRequireDefault(require("./save-shortcut"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function VisualEditorGlobalKeyboardShortcuts() {
  var _useDispatch = (0, _data.useDispatch)('core/editor'),
      redo = _useDispatch.redo,
      undo = _useDispatch.undo,
      savePost = _useDispatch.savePost;

  var isEditedPostDirty = (0, _data.useSelect)(function (select) {
    return select('core/editor').isEditedPostDirty;
  }, []);
  (0, _keyboardShortcuts.useShortcut)('core/editor/undo', function (event) {
    undo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  (0, _keyboardShortcuts.useShortcut)('core/editor/redo', function (event) {
    redo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  (0, _keyboardShortcuts.useShortcut)('core/editor/save', function (event) {
    event.preventDefault(); // TODO: This should be handled in the `savePost` effect in
    // considering `isSaveable`. See note on `isEditedPostSaveable`
    // selector about dirtiness and meta-boxes.
    //
    // See: `isEditedPostSaveable`

    if (!isEditedPostDirty()) {
      return;
    }

    savePost();
  }, {
    bindGlobal: true
  });
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_saveShortcut.default, null));
}

var _default = VisualEditorGlobalKeyboardShortcuts;
exports.default = _default;

function EditorGlobalKeyboardShortcuts() {
  (0, _deprecated.default)('EditorGlobalKeyboardShortcuts', {
    alternative: 'VisualEditorGlobalKeyboardShortcuts',
    plugin: 'Gutenberg'
  });
  return (0, _element.createElement)(VisualEditorGlobalKeyboardShortcuts, null);
}
//# sourceMappingURL=visual-editor-shortcuts.js.map