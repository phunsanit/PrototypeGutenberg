import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createContext, useContext } from '@wordpress/element';
export function isMentionsSupported(capabilities) {
  return capabilities.mentions === true;
}
export var SiteCapabilitiesContext = createContext({});
export var useSiteCapabilities = function useSiteCapabilities() {
  var siteCapabilities = useContext(SiteCapabilitiesContext);
  return siteCapabilities;
};
export var withSiteCapabilities = function withSiteCapabilities(WrappedComponent) {
  return function (props) {
    return createElement(SiteCapabilitiesContext.Consumer, null, function (capabilities) {
      return createElement(WrappedComponent, _extends({}, props, {
        capabilities: capabilities
      }));
    });
  };
};
//# sourceMappingURL=index.js.map