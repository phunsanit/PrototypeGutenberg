import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { some, groupBy } from 'lodash';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { __, sprintf, _n } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useCallback } from '@wordpress/element';
import { close as closeIcon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import EntityTypeList from './entity-type-list';
var ENTITY_NAMES = {
  wp_template_part: function wp_template_part(number) {
    return _n('template part', 'template parts', number);
  },
  wp_template: function wp_template(number) {
    return _n('template', 'templates', number);
  },
  post: function post(number) {
    return _n('post', 'posts', number);
  },
  page: function page(number) {
    return _n('page', 'pages', number);
  },
  site: function site(number) {
    return _n('site', 'sites', number);
  }
};
var PLACEHOLDER_PHRASES = {
  // 0 is a back up, but should never be observed.
  0: __('There are no changes.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  1: __('Changes have been made to your %s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  2: __('Changes have been made to your %1$s and %2$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  3: __('Changes have been made to your %1$s, %2$s, and %3$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  4: __('Changes have been made to your %1$s, %2$s, %3$s, and %4$s.'),

  /* translators: placeholders represent pre-translated singular/plural entity names (page, post, template, site, etc.) */
  5: __('Changes have been made to your %1$s, %2$s, %3$s, %4$s, and %5$s.')
};
export default function EntitiesSavedStates(_ref) {
  var isOpen = _ref.isOpen,
      close = _ref.close;

  var _useSelect = useSelect(function (select) {
    return {
      dirtyEntityRecords: select('core').__experimentalGetDirtyEntityRecords()
    };
  }, []),
      dirtyEntityRecords = _useSelect.dirtyEntityRecords;

  var _useDispatch = useDispatch('core'),
      saveEditedEntityRecord = _useDispatch.saveEditedEntityRecord; // To group entities by type.


  var partitionedSavables = Object.values(groupBy(dirtyEntityRecords, 'name')); // Get labels for text-prompt phrase.

  var entityNamesForPrompt = [];
  partitionedSavables.forEach(function (list) {
    if (ENTITY_NAMES[list[0].name]) {
      entityNamesForPrompt.push(ENTITY_NAMES[list[0].name](list.length));
    }
  }); // Get text-prompt phrase based on number of entity types changed.

  var placeholderPhrase = PLACEHOLDER_PHRASES[entityNamesForPrompt.length] || // Fallback for edge case that should not be observed (more than 5 entity types edited).
  __('Changes have been made to multiple entity types.'); // eslint-disable-next-line @wordpress/valid-sprintf


  var promptPhrase = sprintf.apply(void 0, [placeholderPhrase].concat(entityNamesForPrompt)); // Unchecked entities to be ignored by save function.

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      unselectedEntities = _useState2[0],
      _setUnselectedEntities = _useState2[1];

  var setUnselectedEntities = function setUnselectedEntities(_ref2, checked) {
    var kind = _ref2.kind,
        name = _ref2.name,
        key = _ref2.key;

    if (checked) {
      _setUnselectedEntities(unselectedEntities.filter(function (elt) {
        return elt.kind !== kind || elt.name !== name || elt.key !== key;
      }));
    } else {
      _setUnselectedEntities([].concat(_toConsumableArray(unselectedEntities), [{
        kind: kind,
        name: name,
        key: key
      }]));
    }
  };

  var saveCheckedEntities = function saveCheckedEntities() {
    var entitiesToSave = dirtyEntityRecords.filter(function (_ref3) {
      var kind = _ref3.kind,
          name = _ref3.name,
          key = _ref3.key;
      return !some(unselectedEntities, function (elt) {
        return elt.kind === kind && elt.name === name && elt.key === key;
      });
    });
    entitiesToSave.forEach(function (_ref4) {
      var kind = _ref4.kind,
          name = _ref4.name,
          key = _ref4.key;
      saveEditedEntityRecord(kind, name, key);
    });
    close(entitiesToSave);
  };

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isReviewing = _useState4[0],
      setIsReviewing = _useState4[1];

  var toggleIsReviewing = function toggleIsReviewing() {
    return setIsReviewing(function (value) {
      return !value;
    });
  }; // Explicitly define this with no argument passed.  Using `close` on
  // its own will use the event object in place of the expected saved entities.


  var dismissPanel = useCallback(function () {
    return close();
  }, [close]);
  return isOpen ? createElement("div", {
    className: "entities-saved-states__panel"
  }, createElement("div", {
    className: "entities-saved-states__panel-header"
  }, createElement(Button, {
    isPrimary: true,
    disabled: dirtyEntityRecords.length - unselectedEntities.length === 0,
    onClick: saveCheckedEntities,
    className: "editor-entities-saved-states__save-button"
  }, __('Save')), createElement(Button, {
    onClick: dismissPanel,
    icon: closeIcon,
    label: __('Close panel')
  })), createElement("div", {
    className: "entities-saved-states__text-prompt"
  }, createElement("strong", null, __('Are you ready to save?')), createElement("p", null, promptPhrase), createElement("p", null, createElement(Button, {
    onClick: toggleIsReviewing,
    isLink: true,
    className: "entities-saved-states__review-changes-button"
  }, isReviewing ? __('Hide changes.') : __('Review changes.')))), isReviewing && partitionedSavables.map(function (list) {
    return createElement(EntityTypeList, {
      key: list[0].name,
      list: list,
      closePanel: dismissPanel,
      unselectedEntities: unselectedEntities,
      setUnselectedEntities: setUnselectedEntities
    });
  })) : null;
}
//# sourceMappingURL=index.js.map