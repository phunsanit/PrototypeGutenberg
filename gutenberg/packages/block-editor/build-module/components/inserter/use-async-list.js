import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * WordPress dependencies
 */
import { useEffect, useReducer } from '@wordpress/element';
import { createQueue } from '@wordpress/priority-queue';
/**
 * Returns the first items from list that are present on state.
 *
 * @param {Array} list  New array.
 * @param {Array} state Current state.
 * @return {Array} First items present iin state.
 */

function getFirstItemsPresentInState(list, state) {
  var firstItems = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];

    if (!state.includes(item)) {
      break;
    }

    firstItems.push(item);
  }

  return firstItems;
}
/**
 * Reducer keeping track of a list of appended items.
 *
 * @param {Array}  state  Current state
 * @param {Object} action Action
 *
 * @return {Array} update state.
 */


function listReducer(state, action) {
  if (action.type === 'reset') {
    return action.list;
  }

  if (action.type === 'append') {
    return [].concat(_toConsumableArray(state), [action.item]);
  }

  return state;
}
/**
 * React hook returns an array which items get asynchronously appended from a source array.
 * This behavior is useful if we want to render a list of items asynchronously for performance reasons.
 *
 * @param {Array} list Source array.
 * @return {Array} Async array.
 */


function useAsyncList(list) {
  var _useReducer = useReducer(listReducer, []),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      current = _useReducer2[0],
      dispatch = _useReducer2[1];

  useEffect(function () {
    // On reset, we keep the first items that were previously rendered.
    var firstItems = getFirstItemsPresentInState(list, current);
    dispatch({
      type: 'reset',
      list: firstItems
    });
    var asyncQueue = createQueue();

    var append = function append(index) {
      return function () {
        if (list.length <= index) {
          return;
        }

        dispatch({
          type: 'append',
          item: list[index]
        });
        asyncQueue.add({}, append(index + 1));
      };
    };

    asyncQueue.add({}, append(firstItems.length));
    return function () {
      return asyncQueue.reset();
    };
  }, [list]);
  return current;
}

export default useAsyncList;
//# sourceMappingURL=use-async-list.js.map