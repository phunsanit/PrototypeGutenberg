import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Children } from '@wordpress/element';
import { Dropdown, Button, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { moreHorizontal } from '@wordpress/icons';

function Warning(_ref) {
  var className = _ref.className,
      actions = _ref.actions,
      children = _ref.children,
      secondaryActions = _ref.secondaryActions;
  return createElement("div", {
    className: classnames(className, 'block-editor-warning')
  }, createElement("div", {
    className: "block-editor-warning__contents"
  }, createElement("p", {
    className: "block-editor-warning__message"
  }, children), (Children.count(actions) > 0 || secondaryActions) && createElement("div", {
    className: "block-editor-warning__actions"
  }, Children.count(actions) > 0 && Children.map(actions, function (action, i) {
    return createElement("span", {
      key: i,
      className: "block-editor-warning__action"
    }, action);
  }), secondaryActions && createElement(Dropdown, {
    className: "block-editor-warning__secondary",
    position: "bottom left",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return createElement(Button, {
        icon: moreHorizontal,
        label: __('More options'),
        onClick: onToggle,
        "aria-expanded": isOpen
      });
    },
    renderContent: function renderContent() {
      return createElement(MenuGroup, null, secondaryActions.map(function (item, pos) {
        return createElement(MenuItem, {
          onClick: item.onClick,
          key: pos
        }, item.title);
      }));
    }
  }))));
}

export default Warning;
//# sourceMappingURL=index.js.map