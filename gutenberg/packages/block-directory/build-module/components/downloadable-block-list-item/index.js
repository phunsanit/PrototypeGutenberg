import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import DownloadableBlockAuthorInfo from '../downloadable-block-author-info';
import DownloadableBlockHeader from '../downloadable-block-header';
import DownloadableBlockInfo from '../downloadable-block-info';
import DownloadableBlockNotice from '../downloadable-block-notice';

function DownloadableBlockListItem(_ref) {
  var item = _ref.item,
      onClick = _ref.onClick;
  var icon = item.icon,
      title = item.title,
      description = item.description,
      rating = item.rating,
      activeInstalls = item.activeInstalls,
      ratingCount = item.ratingCount,
      author = item.author,
      humanizedUpdated = item.humanizedUpdated,
      authorBlockCount = item.authorBlockCount,
      authorBlockRating = item.authorBlockRating;
  return createElement("li", {
    className: "block-directory-downloadable-block-list-item"
  }, createElement("article", {
    className: "block-directory-downloadable-block-list-item__panel"
  }, createElement("header", {
    className: "block-directory-downloadable-block-list-item__header"
  }, createElement(DownloadableBlockHeader, {
    icon: icon,
    onClick: onClick,
    title: title,
    rating: rating,
    ratingCount: ratingCount
  })), createElement("section", {
    className: "block-directory-downloadable-block-list-item__body"
  }, createElement(DownloadableBlockNotice, {
    onClick: onClick,
    block: item
  }), createElement(DownloadableBlockInfo, {
    activeInstalls: activeInstalls,
    description: description,
    humanizedUpdated: humanizedUpdated
  })), createElement("footer", {
    className: "block-directory-downloadable-block-list-item__footer"
  }, createElement(DownloadableBlockAuthorInfo, {
    author: author,
    authorBlockCount: authorBlockCount,
    authorBlockRating: authorBlockRating
  }))));
}

export default DownloadableBlockListItem;
//# sourceMappingURL=index.js.map