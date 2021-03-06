"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = QueryLoopEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _query = require("../query");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var TEMPLATE = [['core/post-title'], ['core/post-content']];

function QueryLoopEdit(_ref) {
  var clientId = _ref.clientId,
      _ref$context = _ref.context,
      _ref$context$query = _ref$context.query,
      perPage = _ref$context$query.perPage,
      offset = _ref$context$query.offset,
      categoryIds = _ref$context$query.categoryIds,
      queryContext = _ref$context.queryContext;

  var _ref2 = (0, _query.useQueryContext)() || queryContext,
      _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
      page = _ref3[0].page;

  var _useState = (0, _element.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      activeBlockContext = _useState2[0],
      setActiveBlockContext = _useState2[1];

  var _useSelect = (0, _data.useSelect)(function (select) {
    var query = {
      offset: perPage ? perPage * (page - 1) + offset : 0,
      categories: categoryIds
    };

    if (perPage) {
      query.per_page = perPage;
    }

    return {
      posts: select('core').getEntityRecords('postType', 'post', query),
      blocks: select('core/block-editor').getBlocks(clientId)
    };
  }, [perPage, page, offset, categoryIds, clientId]),
      posts = _useSelect.posts,
      blocks = _useSelect.blocks;

  var blockContexts = (0, _element.useMemo)(function () {
    return posts === null || posts === void 0 ? void 0 : posts.map(function (post) {
      return {
        postType: post.type,
        postId: post.id
      };
    });
  }, [posts]);
  return blockContexts ? blockContexts.map(function (blockContext) {
    return (0, _element.createElement)(_blockEditor.BlockContextProvider, {
      key: blockContext.postId,
      value: blockContext
    }, blockContext === (activeBlockContext || blockContexts[0]) ? (0, _element.createElement)(_blockEditor.InnerBlocks, {
      template: TEMPLATE
    }) : (0, _element.createElement)(_blockEditor.BlockPreview, {
      blocks: blocks,
      __experimentalLive: true,
      __experimentalOnClick: function __experimentalOnClick() {
        return setActiveBlockContext(blockContext);
      }
    }));
  }) : null;
}
//# sourceMappingURL=edit.js.map