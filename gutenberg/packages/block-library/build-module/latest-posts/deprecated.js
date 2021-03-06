import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/latest-posts",
  category: "widgets",
  attributes: {
    align: {
      type: "string",
      "enum": ["left", "center", "right", "wide", "full"]
    },
    className: {
      type: "string"
    },
    categories: {
      type: "array",
      items: {
        type: "object"
      }
    },
    postsToShow: {
      type: "number",
      "default": 5
    },
    displayPostContent: {
      type: "boolean",
      "default": false
    },
    displayPostContentRadio: {
      type: "string",
      "default": "excerpt"
    },
    excerptLength: {
      type: "number",
      "default": 55
    },
    displayPostDate: {
      type: "boolean",
      "default": false
    },
    postLayout: {
      type: "string",
      "default": "list"
    },
    columns: {
      type: "number",
      "default": 3
    },
    order: {
      type: "string",
      "default": "desc"
    },
    orderBy: {
      type: "string",
      "default": "date"
    },
    displayFeaturedImage: {
      type: "boolean",
      "default": false
    },
    featuredImageAlign: {
      type: "string",
      "enum": ["left", "center", "right"]
    },
    featuredImageSizeSlug: {
      type: "string",
      "default": "thumbnail"
    },
    featuredImageSizeWidth: {
      type: "number",
      "default": null
    },
    featuredImageSizeHeight: {
      type: "number",
      "default": null
    }
  },
  supports: {
    align: true,
    html: false
  }
};
var attributes = metadata.attributes;
export default [{
  attributes: _objectSpread({}, attributes, {
    categories: {
      type: 'string'
    }
  }),
  supports: {
    align: true,
    html: false
  },
  migrate: function migrate(oldAttributes) {
    // This needs the full category object, not just the ID.
    return _objectSpread({}, oldAttributes, {
      categories: [{
        id: Number(oldAttributes.categories)
      }]
    });
  },
  isEligible: function isEligible(_ref) {
    var categories = _ref.categories;
    return categories && 'string' === typeof categories;
  },
  save: function save() {
    return null;
  }
}];
//# sourceMappingURL=deprecated.js.map