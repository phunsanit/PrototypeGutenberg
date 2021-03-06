import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useMemo, useCallback, useState } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';
/**
 * Internal dependencies
 */

import SlotFillContext from './slot-fill-context';

function useSlotRegistry() {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      slots = _useState2[0],
      setSlots = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      fills = _useState4[0],
      setFills = _useState4[1];

  var registerSlot = useCallback(function (name, ref, fillProps) {
    setSlots(function (prevSlots) {
      var slot = prevSlots[name] || {};
      return _objectSpread({}, prevSlots, _defineProperty({}, name, _objectSpread({}, slot, {
        ref: ref || slot.ref,
        fillProps: fillProps || slot.fillProps || {}
      })));
    });
  }, []);
  var unregisterSlot = useCallback(function (name, ref) {
    setSlots(function (prevSlots) {
      var slot = prevSlots[name],
          nextSlots = _objectWithoutProperties(prevSlots, [name].map(_toPropertyKey)); // Make sure we're not unregistering a slot registered by another element
      // See https://github.com/WordPress/gutenberg/pull/19242#issuecomment-590295412


      if ((slot === null || slot === void 0 ? void 0 : slot.ref) === ref) {
        return nextSlots;
      }

      return prevSlots;
    });
  }, []);
  var updateSlot = useCallback(function (name, fillProps) {
    var slot = slots[name];

    if (!slot) {
      return;
    }

    if (!isShallowEqual(slot.fillProps, fillProps)) {
      slot.fillProps = fillProps;
      var slotFills = fills[name];

      if (slotFills) {
        // Force update fills
        slotFills.map(function (fill) {
          return fill.current.rerender();
        });
      }
    }
  }, [slots, fills]);
  var registerFill = useCallback(function (name, ref) {
    setFills(function (prevFills) {
      return _objectSpread({}, prevFills, _defineProperty({}, name, [].concat(_toConsumableArray(prevFills[name] || []), [ref])));
    });
  }, []);
  var unregisterFill = useCallback(function (name, ref) {
    setFills(function (prevFills) {
      if (prevFills[name]) {
        return _objectSpread({}, prevFills, _defineProperty({}, name, prevFills[name].filter(function (fillRef) {
          return fillRef !== ref;
        })));
      }

      return prevFills;
    });
  }, []); // Memoizing the return value so it can be directly passed to Provider value

  var registry = useMemo(function () {
    return {
      slots: slots,
      fills: fills,
      registerSlot: registerSlot,
      updateSlot: updateSlot,
      unregisterSlot: unregisterSlot,
      registerFill: registerFill,
      unregisterFill: unregisterFill
    };
  }, [slots, fills, registerSlot, unregisterSlot, registerFill, unregisterFill]);
  return registry;
}

export default function SlotFillProvider(_ref) {
  var children = _ref.children;
  var registry = useSlotRegistry();
  return createElement(SlotFillContext.Provider, {
    value: registry
  }, children);
}
//# sourceMappingURL=slot-fill-provider.js.map