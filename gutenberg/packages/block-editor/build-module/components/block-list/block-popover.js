import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { findIndex } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useState, useCallback, useContext } from '@wordpress/element';
import { isUnmodifiedDefaultBlock } from '@wordpress/blocks';
import { Popover } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useViewportMatch } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockBreadcrumb from './breadcrumb';
import BlockContextualToolbar from './block-contextual-toolbar';
import Inserter from '../inserter';
import { BlockNodes } from './root-container';

function selector(select) {
  var _select = select('core/block-editor'),
      isNavigationMode = _select.isNavigationMode,
      isMultiSelecting = _select.isMultiSelecting,
      hasMultiSelection = _select.hasMultiSelection,
      isTyping = _select.isTyping,
      isCaretWithinFormattedText = _select.isCaretWithinFormattedText,
      getSettings = _select.getSettings,
      getLastMultiSelectedBlockClientId = _select.getLastMultiSelectedBlockClientId;

  return {
    isNavigationMode: isNavigationMode(),
    isMultiSelecting: isMultiSelecting(),
    isTyping: isTyping(),
    isCaretWithinFormattedText: isCaretWithinFormattedText(),
    hasMultiSelection: hasMultiSelection(),
    hasFixedToolbar: getSettings().hasFixedToolbar,
    lastClientId: getLastMultiSelectedBlockClientId()
  };
}

function BlockPopover(_ref) {
  var clientId = _ref.clientId,
      rootClientId = _ref.rootClientId,
      align = _ref.align,
      isValid = _ref.isValid,
      moverDirection = _ref.moverDirection,
      isEmptyDefaultBlock = _ref.isEmptyDefaultBlock,
      capturingClientId = _ref.capturingClientId;

  var _useSelect = useSelect(selector, []),
      isNavigationMode = _useSelect.isNavigationMode,
      isMultiSelecting = _useSelect.isMultiSelecting,
      isTyping = _useSelect.isTyping,
      isCaretWithinFormattedText = _useSelect.isCaretWithinFormattedText,
      hasMultiSelection = _useSelect.hasMultiSelection,
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      lastClientId = _useSelect.lastClientId;

  var isLargeViewport = useViewportMatch('medium');

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isToolbarForced = _useState2[0],
      setIsToolbarForced = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInserterShown = _useState4[0],
      setIsInserterShown = _useState4[1];

  var blockNodes = useContext(BlockNodes);
  var showEmptyBlockSideInserter = !isNavigationMode && isEmptyDefaultBlock && isValid;
  var shouldShowBreadcrumb = isNavigationMode;
  var shouldShowContextualToolbar = !isNavigationMode && !hasFixedToolbar && isLargeViewport && !showEmptyBlockSideInserter && !isMultiSelecting && (!isTyping || isCaretWithinFormattedText);
  var canFocusHiddenToolbar = !isNavigationMode && !shouldShowContextualToolbar && !hasFixedToolbar && !isEmptyDefaultBlock;
  useShortcut('core/block-editor/focus-toolbar', useCallback(function () {
    return setIsToolbarForced(true);
  }, []), {
    bindGlobal: true,
    eventName: 'keydown',
    isDisabled: !canFocusHiddenToolbar
  });

  if (!shouldShowBreadcrumb && !shouldShowContextualToolbar && !isToolbarForced && !showEmptyBlockSideInserter) {
    return null;
  }

  var node = blockNodes[clientId];

  if (capturingClientId) {
    node = document.getElementById('block-' + capturingClientId);
  }

  if (!node) {
    return null;
  }

  var anchorRef = node;

  if (hasMultiSelection) {
    var bottomNode = blockNodes[lastClientId]; // Wait to render the popover until the bottom reference is available
    // as well.

    if (!bottomNode) {
      return null;
    }

    anchorRef = {
      top: node,
      bottom: bottomNode
    };
  }

  function onFocus() {
    setIsInserterShown(true);
  }

  function onBlur() {
    setIsInserterShown(false);
  } // Position above the anchor, pop out towards the right, and position in the
  // left corner. For the side inserter, pop out towards the left, and
  // position in the right corner.
  // To do: refactor `Popover` to make this prop clearer.


  var popoverPosition = showEmptyBlockSideInserter ? 'top left right' : 'top right left';
  return createElement(Popover, {
    noArrow: true,
    animate: false,
    position: popoverPosition,
    focusOnMount: false,
    anchorRef: anchorRef,
    className: "block-editor-block-list__block-popover",
    __unstableSticky: !showEmptyBlockSideInserter,
    __unstableSlotName: "block-toolbar",
    __unstableBoundaryParent: true // Allow subpixel positioning for the block movement animation.
    ,
    __unstableAllowVerticalSubpixelPosition: moverDirection !== 'horizontal' && node,
    __unstableAllowHorizontalSubpixelPosition: moverDirection === 'horizontal' && node,
    onBlur: function onBlur() {
      return setIsToolbarForced(false);
    },
    shouldAnchorIncludePadding: true // Popover calculates the width once. Trigger a reset by remounting
    // the component.
    ,
    key: shouldShowContextualToolbar
  }, (shouldShowContextualToolbar || isToolbarForced) && createElement("div", {
    onFocus: onFocus,
    onBlur: onBlur // While ideally it would be enough to capture the
    // bubbling focus event from the Inserter, due to the
    // characteristics of click focusing of `button`s in
    // Firefox and Safari, it is not reliable.
    //
    // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
    ,
    tabIndex: -1,
    className: classnames('block-editor-block-list__block-popover-inserter', {
      'is-visible': isInserterShown
    })
  }, createElement(Inserter, {
    clientId: clientId,
    rootClientId: rootClientId
  })), (shouldShowContextualToolbar || isToolbarForced) && createElement(BlockContextualToolbar // If the toolbar is being shown because of being forced
  // it should focus the toolbar right after the mount.
  , {
    focusOnMount: isToolbarForced,
    "data-align": align
  }), shouldShowBreadcrumb && createElement(BlockBreadcrumb, {
    clientId: clientId,
    rootClientId: rootClientId,
    moverDirection: moverDirection,
    "data-align": align
  }), showEmptyBlockSideInserter && createElement("div", {
    className: "block-editor-block-list__empty-block-inserter"
  }, createElement(Inserter, {
    position: "top right",
    rootClientId: rootClientId,
    clientId: clientId
  })));
}

function wrapperSelector(select) {
  var _select2 = select('core/block-editor'),
      getSelectedBlockClientId = _select2.getSelectedBlockClientId,
      getFirstMultiSelectedBlockClientId = _select2.getFirstMultiSelectedBlockClientId,
      getBlockRootClientId = _select2.getBlockRootClientId,
      __unstableGetBlockWithoutInnerBlocks = _select2.__unstableGetBlockWithoutInnerBlocks,
      getBlockParents = _select2.getBlockParents,
      getBlockListSettings = _select2.getBlockListSettings,
      __experimentalGetBlockListSettingsForBlocks = _select2.__experimentalGetBlockListSettingsForBlocks;

  var clientId = getSelectedBlockClientId() || getFirstMultiSelectedBlockClientId();

  if (!clientId) {
    return;
  }

  var rootClientId = getBlockRootClientId(clientId);

  var _ref2 = __unstableGetBlockWithoutInnerBlocks(clientId) || {},
      name = _ref2.name,
      _ref2$attributes = _ref2.attributes,
      attributes = _ref2$attributes === void 0 ? {} : _ref2$attributes,
      isValid = _ref2.isValid;

  var blockParentsClientIds = getBlockParents(clientId);

  var _ref3 = getBlockListSettings(rootClientId) || {},
      __experimentalMoverDirection = _ref3.__experimentalMoverDirection; // Get Block List Settings for all ancestors of the current Block clientId


  var ancestorBlockListSettings = __experimentalGetBlockListSettingsForBlocks(blockParentsClientIds); // Find the index of the first Block with the `captureDescendantsToolbars` prop defined
  // This will be the top most ancestor because getBlockParents() returns tree from top -> bottom


  var topmostAncestorWithCaptureDescendantsToolbarsIndex = findIndex(ancestorBlockListSettings, ['__experimentalCaptureToolbars', true]);
  var capturingClientId;

  if (topmostAncestorWithCaptureDescendantsToolbarsIndex !== -1) {
    capturingClientId = blockParentsClientIds[topmostAncestorWithCaptureDescendantsToolbarsIndex];
  }

  return {
    clientId: clientId,
    rootClientId: getBlockRootClientId(clientId),
    name: name,
    align: attributes.align,
    isValid: isValid,
    moverDirection: __experimentalMoverDirection,
    isEmptyDefaultBlock: name && isUnmodifiedDefaultBlock({
      name: name,
      attributes: attributes
    }),
    capturingClientId: capturingClientId
  };
}

export default function WrappedBlockPopover() {
  var selected = useSelect(wrapperSelector, []);

  if (!selected) {
    return null;
  }

  var clientId = selected.clientId,
      rootClientId = selected.rootClientId,
      name = selected.name,
      align = selected.align,
      isValid = selected.isValid,
      moverDirection = selected.moverDirection,
      isEmptyDefaultBlock = selected.isEmptyDefaultBlock,
      capturingClientId = selected.capturingClientId;

  if (!name) {
    return null;
  }

  return createElement(BlockPopover, {
    clientId: clientId,
    rootClientId: rootClientId,
    align: align,
    isValid: isValid,
    moverDirection: moverDirection,
    isEmptyDefaultBlock: isEmptyDefaultBlock,
    capturingClientId: capturingClientId
  });
}
//# sourceMappingURL=block-popover.js.map