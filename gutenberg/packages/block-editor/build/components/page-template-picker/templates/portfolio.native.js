"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
var Portfolio = {
  // translators: title for "Portfolio" page template
  name: (0, _i18n.__)('Portfolio'),
  key: 'portfolio',
  icon: '🎨',
  content: [{
    name: 'core/paragraph',
    attributes: {
      align: 'left',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)('My portfolio showcases various projects created throughout my career. See my contact information below and get in touch.')
    }
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/heading',
    attributes: {
      align: 'left',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)('Project Name'),
      level: 2
    }
  }, {
    name: 'core/gallery',
    attributes: {
      images: [{
        url: 'https://a8ctm1.files.wordpress.com/2019/08/scatter-1.jpg?w=640',
        id: '658'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/redcylinder-1.jpg?w=640',
        id: '659'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/redbox.jpg?w=640',
        id: '660'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/crab-1.jpg?w=640',
        id: '661'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/cat.jpg?w=640',
        id: '662'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/bluebox.jpg?w=640',
        id: '663'
      }],
      ids: [658, 659, 660, 661, 662, 663],
      caption: '',
      imageCrop: true,
      linkTo: 'none',
      sizeSlug: 'large'
    }
  }, {
    name: 'core/paragraph',
    attributes: {
      align: 'left',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)('A description of the project and the works presented.')
    }
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/separator',
    attributes: {}
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/heading',
    attributes: {
      align: 'left',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)('Project Name'),
      level: 2
    }
  }, {
    name: 'core/gallery',
    attributes: {
      images: [{
        url: 'https://a8ctm1.files.wordpress.com/2019/08/scatter-1.jpg?w=640',
        id: '658'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/redcylinder-1.jpg?w=640',
        id: '659'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/redbox.jpg?w=640',
        id: '660'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/crab-1.jpg?w=640',
        id: '661'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/cat.jpg?w=640',
        id: '662'
      }, {
        url: 'https://a8ctm1.files.wordpress.com/2019/08/bluebox.jpg?w=640',
        id: '663'
      }],
      ids: [658, 659, 660, 661, 662, 663],
      caption: '',
      imageCrop: true,
      linkTo: 'none',
      sizeSlug: 'large'
    }
  }, {
    name: 'core/paragraph',
    attributes: {
      align: 'left',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)('A description of the project and the works presented.')
    }
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/separator',
    attributes: {}
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/heading',
    attributes: {
      align: 'center',
      // translators: sample content for "Portfolio" page template
      content: (0, _i18n.__)("Let's build something together!"),
      level: 2
    }
  }, {
    name: 'core/buttons',
    attributes: {
      align: 'center'
    },
    innerBlocks: [{
      name: 'core/button',
      attributes: {
        url: '',
        // translators: sample content for "Portfolio" page template
        text: (0, _i18n.__)('Get in Touch'),
        linkTarget: '',
        rel: '',
        className: 'aligncenter'
      }
    }]
  }, {
    name: 'core/spacer',
    attributes: {
      height: 24
    }
  }, {
    name: 'core/separator',
    attributes: {}
  }]
};
var _default = Portfolio;
exports.default = _default;
//# sourceMappingURL=portfolio.native.js.map