import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import classnames from 'classnames';
import { unstable_useCompositeState as useCompositeState, unstable_Composite as Composite, unstable_CompositeGroup as CompositeGroup } from 'reakit';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Cell from './cell';
import { Root, Row } from './styles/alignment-matrix-control-styles';
import { useRTL } from '../utils/rtl';
import AlignmentMatrixControlIcon from './icon';
import { GRID, getItemId } from './utils';

function useBaseId(id) {
  var instanceId = useInstanceId(AlignmentMatrixControl, 'alignment-matrix-control');
  return id || instanceId;
}

export default function AlignmentMatrixControl(_ref) {
  var className = _ref.className,
      id = _ref.id,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? __('Alignment Matrix Control') : _ref$label,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? 'center center' : _ref$defaultValue,
      value = _ref.value,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 92 : _ref$width,
      props = _objectWithoutProperties(_ref, ["className", "id", "label", "defaultValue", "value", "onChange", "width"]);

  var _useState = useState(value !== null && value !== void 0 ? value : defaultValue),
      _useState2 = _slicedToArray(_useState, 1),
      immutableDefaultValue = _useState2[0];

  var isRTL = useRTL();
  var baseId = useBaseId(id);
  var initialCurrentId = getItemId(baseId, immutableDefaultValue);
  var composite = useCompositeState({
    baseId: baseId,
    currentId: initialCurrentId,
    rtl: isRTL
  });

  var handleOnChange = function handleOnChange(nextValue) {
    onChange(nextValue);
  };

  useEffect(function () {
    if (typeof value !== 'undefined') {
      composite.setCurrentId(getItemId(baseId, value));
    }
  }, [value, composite.setCurrentId]);
  var classes = classnames('component-alignment-matrix-control', className);
  return createElement(Composite, _extends({}, props, composite, {
    "aria-label": label,
    as: Root,
    className: classes,
    role: "grid",
    width: width
  }), GRID.map(function (cells, index) {
    return createElement(CompositeGroup, _extends({}, composite, {
      as: Row,
      role: "row",
      key: index
    }), cells.map(function (cell) {
      var cellId = getItemId(baseId, cell);
      var isActive = composite.currentId === cellId;
      return createElement(Cell, _extends({}, composite, {
        id: cellId,
        isActive: isActive,
        key: cell,
        value: cell,
        onFocus: function onFocus() {
          return handleOnChange(cell);
        }
      }));
    }));
  }));
}
AlignmentMatrixControl.Icon = AlignmentMatrixControlIcon;
//# sourceMappingURL=index.js.map