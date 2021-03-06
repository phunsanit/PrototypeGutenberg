"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _autosaveMonitor = _interopRequireDefault(require("../autosave-monitor"));

var _controls = require("../../store/controls");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback : window.requestAnimationFrame;
/**
 * Function which returns true if the current environment supports browser
 * sessionStorage, or false otherwise. The result of this function is cached and
 * reused in subsequent invocations.
 */

var hasSessionStorageSupport = (0, _lodash.once)(function () {
  try {
    // Private Browsing in Safari 10 and earlier will throw an error when
    // attempting to set into sessionStorage. The test here is intentional in
    // causing a thrown error as condition bailing from local autosave.
    window.sessionStorage.setItem('__wpEditorTestSessionStorage', '');
    window.sessionStorage.removeItem('__wpEditorTestSessionStorage');
    return true;
  } catch (error) {
    return false;
  }
});
/**
 * Custom hook which manages the creation of a notice prompting the user to
 * restore a local autosave, if one exists.
 */

function useAutosaveNotice() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      postId: select('core/editor').getCurrentPostId(),
      getEditedPostAttribute: select('core/editor').getEditedPostAttribute,
      hasRemoteAutosave: !!select('core/editor').getEditorSettings().autosave
    };
  }, []),
      postId = _useSelect.postId,
      getEditedPostAttribute = _useSelect.getEditedPostAttribute,
      hasRemoteAutosave = _useSelect.hasRemoteAutosave;

  var _useDispatch = (0, _data.useDispatch)('core/notices'),
      createWarningNotice = _useDispatch.createWarningNotice,
      removeNotice = _useDispatch.removeNotice;

  var _useDispatch2 = (0, _data.useDispatch)('core/editor'),
      editPost = _useDispatch2.editPost,
      resetEditorBlocks = _useDispatch2.resetEditorBlocks;

  (0, _element.useEffect)(function () {
    var localAutosave = (0, _controls.localAutosaveGet)(postId);

    if (!localAutosave) {
      return;
    }

    try {
      localAutosave = JSON.parse(localAutosave);
    } catch (error) {
      // Not usable if it can't be parsed.
      return;
    }

    var _localAutosave = localAutosave,
        title = _localAutosave.post_title,
        content = _localAutosave.content,
        excerpt = _localAutosave.excerpt;
    var edits = {
      title: title,
      content: content,
      excerpt: excerpt
    };
    {
      // Only display a notice if there is a difference between what has been
      // saved and that which is stored in sessionStorage.
      var hasDifference = Object.keys(edits).some(function (key) {
        return edits[key] !== getEditedPostAttribute(key);
      });

      if (!hasDifference) {
        // If there is no difference, it can be safely ejected from storage.
        (0, _controls.localAutosaveClear)(postId);
        return;
      }
    }

    if (hasRemoteAutosave) {
      return;
    }

    var noticeId = (0, _lodash.uniqueId)('wpEditorAutosaveRestore');
    createWarningNotice((0, _i18n.__)('The backup of this post in your browser is different from the version below.'), {
      id: noticeId,
      actions: [{
        label: (0, _i18n.__)('Restore the backup'),
        onClick: function onClick() {
          editPost((0, _lodash.omit)(edits, ['content']));
          resetEditorBlocks((0, _blocks.parse)(edits.content));
          removeNotice(noticeId);
        }
      }]
    });
  }, [postId]);
}
/**
 * Custom hook which ejects a local autosave after a successful save occurs.
 */


function useAutosavePurge() {
  var _useSelect2 = (0, _data.useSelect)(function (select) {
    return {
      postId: select('core/editor').getCurrentPostId(),
      isDirty: select('core/editor').isEditedPostDirty(),
      isAutosaving: select('core/editor').isAutosavingPost(),
      didError: select('core/editor').didPostSaveRequestFail()
    };
  }, []),
      postId = _useSelect2.postId,
      isDirty = _useSelect2.isDirty,
      isAutosaving = _useSelect2.isAutosaving,
      didError = _useSelect2.didError;

  var lastIsDirty = (0, _element.useRef)(isDirty);
  var lastIsAutosaving = (0, _element.useRef)(isAutosaving);
  (0, _element.useEffect)(function () {
    if (!didError && (lastIsAutosaving.current && !isAutosaving || lastIsDirty.current && !isDirty)) {
      (0, _controls.localAutosaveClear)(postId);
    }

    lastIsDirty.current = isDirty;
    lastIsAutosaving.current = isAutosaving;
  }, [isDirty, isAutosaving, didError]);
}

function LocalAutosaveMonitor() {
  var _useDispatch3 = (0, _data.useDispatch)('core/editor'),
      __experimentalLocalAutosave = _useDispatch3.__experimentalLocalAutosave;

  var autosave = (0, _element.useCallback)(function () {
    requestIdleCallback(__experimentalLocalAutosave);
  }, []);
  useAutosaveNotice();
  useAutosavePurge();

  var _useSelect3 = (0, _data.useSelect)(function (select) {
    return {
      localAutosaveInterval: select('core/editor').getEditorSettings().__experimentalLocalAutosaveInterval
    };
  }, []),
      localAutosaveInterval = _useSelect3.localAutosaveInterval;

  return (0, _element.createElement)(_autosaveMonitor.default, {
    interval: localAutosaveInterval,
    autosave: autosave,
    shouldThrottle: true
  });
}

var _default = (0, _compose.ifCondition)(hasSessionStorageSupport)(LocalAutosaveMonitor);

exports.default = _default;
//# sourceMappingURL=index.js.map