import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import { visitAdminPage } from './visit-admin-page';
/**
 * Creates new post.
 *
 * @param {Object} obj Object to create new post, along with tips enabling option.
 */

export function createNewPost() {
  return _createNewPost.apply(this, arguments);
}

function _createNewPost() {
  _createNewPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _ref,
        postType,
        title,
        content,
        excerpt,
        _ref$showWelcomeGuide,
        showWelcomeGuide,
        query,
        isWelcomeGuideActive,
        isFullscreenMode,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, postType = _ref.postType, title = _ref.title, content = _ref.content, excerpt = _ref.excerpt, _ref$showWelcomeGuide = _ref.showWelcomeGuide, showWelcomeGuide = _ref$showWelcomeGuide === void 0 ? false : _ref$showWelcomeGuide;
            query = addQueryArgs('', {
              post_type: postType,
              post_title: title,
              content: content,
              excerpt: excerpt
            }).slice(1);
            _context.next = 4;
            return visitAdminPage('post-new.php', query);

          case 4:
            _context.next = 6;
            return page.evaluate(function () {
              return wp.data.select('core/edit-post').isFeatureActive('welcomeGuide');
            });

          case 6:
            isWelcomeGuideActive = _context.sent;
            _context.next = 9;
            return page.evaluate(function () {
              return wp.data.select('core/edit-post').isFeatureActive('fullscreenMode');
            });

          case 9:
            isFullscreenMode = _context.sent;

            if (!(showWelcomeGuide !== isWelcomeGuideActive)) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return page.evaluate(function () {
              return wp.data.dispatch('core/edit-post').toggleFeature('welcomeGuide');
            });

          case 13:
            _context.next = 15;
            return page.reload();

          case 15:
            if (!isFullscreenMode) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return page.evaluate(function () {
              return wp.data.dispatch('core/edit-post').toggleFeature('fullscreenMode');
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createNewPost.apply(this, arguments);
}
//# sourceMappingURL=create-new-post.js.map