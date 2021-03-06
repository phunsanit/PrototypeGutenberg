import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { once, uniqueId, omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { useCallback, useEffect, useRef } from '@wordpress/element';
import { ifCondition } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { parse } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import AutosaveMonitor from '../autosave-monitor';
import { localAutosaveGet, localAutosaveClear } from '../../store/controls';
var requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback : window.requestAnimationFrame;
/**
 * Function which returns true if the current environment supports browser
 * sessionStorage, or false otherwise. The result of this function is cached and
 * reused in subsequent invocations.
 */

var hasSessionStorageSupport = once(function () {
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
  var _useSelect = useSelect(function (select) {
    return {
      postId: select('core/editor').getCurrentPostId(),
      getEditedPostAttribute: select('core/editor').getEditedPostAttribute,
      hasRemoteAutosave: !!select('core/editor').getEditorSettings().autosave
    };
  }, []),
      postId = _useSelect.postId,
      getEditedPostAttribute = _useSelect.getEditedPostAttribute,
      hasRemoteAutosave = _useSelect.hasRemoteAutosave;

  var _useDispatch = useDispatch('core/notices'),
      createWarningNotice = _useDispatch.createWarningNotice,
      removeNotice = _useDispatch.removeNotice;

  var _useDispatch2 = useDispatch('core/editor'),
      editPost = _useDispatch2.editPost,
      resetEditorBlocks = _useDispatch2.resetEditorBlocks;

  useEffect(function () {
    var localAutosave = localAutosaveGet(postId);

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
        localAutosaveClear(postId);
        return;
      }
    }

    if (hasRemoteAutosave) {
      return;
    }

    var noticeId = uniqueId('wpEditorAutosaveRestore');
    createWarningNotice(__('The backup of this post in your browser is different from the version below.'), {
      id: noticeId,
      actions: [{
        label: __('Restore the backup'),
        onClick: function onClick() {
          editPost(omit(edits, ['content']));
          resetEditorBlocks(parse(edits.content));
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
  var _useSelect2 = useSelect(function (select) {
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

  var lastIsDirty = useRef(isDirty);
  var lastIsAutosaving = useRef(isAutosaving);
  useEffect(function () {
    if (!didError && (lastIsAutosaving.current && !isAutosaving || lastIsDirty.current && !isDirty)) {
      localAutosaveClear(postId);
    }

    lastIsDirty.current = isDirty;
    lastIsAutosaving.current = isAutosaving;
  }, [isDirty, isAutosaving, didError]);
}

function LocalAutosaveMonitor() {
  var _useDispatch3 = useDispatch('core/editor'),
      __experimentalLocalAutosave = _useDispatch3.__experimentalLocalAutosave;

  var autosave = useCallback(function () {
    requestIdleCallback(__experimentalLocalAutosave);
  }, []);
  useAutosaveNotice();
  useAutosavePurge();

  var _useSelect3 = useSelect(function (select) {
    return {
      localAutosaveInterval: select('core/editor').getEditorSettings().__experimentalLocalAutosaveInterval
    };
  }, []),
      localAutosaveInterval = _useSelect3.localAutosaveInterval;

  return createElement(AutosaveMonitor, {
    interval: localAutosaveInterval,
    autosave: autosave,
    shouldThrottle: true
  });
}

export default ifCondition(hasSessionStorageSupport)(LocalAutosaveMonitor);
//# sourceMappingURL=index.js.map