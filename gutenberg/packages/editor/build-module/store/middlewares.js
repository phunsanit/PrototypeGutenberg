/**
 * External dependencies
 */
import refx from 'refx';
/**
 * Internal dependencies
 */

import effects from './effects';
/**
 * Applies the custom middlewares used specifically in the editor module.
 *
 * @param {Object} store Store Object.
 *
 * @return {Object} Update Store Object.
 */

function applyMiddlewares(store) {
  var enhancedDispatch = function enhancedDispatch() {
    throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
  };

  var middlewareAPI = {
    getState: store.getState,
    dispatch: function dispatch() {
      return enhancedDispatch.apply(void 0, arguments);
    }
  };
  enhancedDispatch = refx(effects)(middlewareAPI)(store.dispatch);
  store.dispatch = enhancedDispatch;
  return store;
}

export default applyMiddlewares;
//# sourceMappingURL=middlewares.js.map