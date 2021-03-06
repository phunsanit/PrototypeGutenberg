import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState, useRef } from '@wordpress/element';
import { upload, Icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import { DropZoneConsumer, Context } from './provider';
export function useDropZone(_ref) {
  var element = _ref.element,
      onFilesDrop = _ref.onFilesDrop,
      onHTMLDrop = _ref.onHTMLDrop,
      onDrop = _ref.onDrop,
      isDisabled = _ref.isDisabled,
      withPosition = _ref.withPosition,
      _ref$__unstableIsRela = _ref.__unstableIsRelative,
      __unstableIsRelative = _ref$__unstableIsRela === void 0 ? false : _ref$__unstableIsRela;

  var _useContext = useContext(Context),
      addDropZone = _useContext.addDropZone,
      removeDropZone = _useContext.removeDropZone;

  var _useState = useState({
    isDraggingOverDocument: false,
    isDraggingOverElement: false,
    type: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    if (!isDisabled) {
      var dropZone = {
        element: element,
        onDrop: onDrop,
        onFilesDrop: onFilesDrop,
        onHTMLDrop: onHTMLDrop,
        setState: setState,
        withPosition: withPosition,
        isRelative: __unstableIsRelative
      };
      addDropZone(dropZone);
      return function () {
        removeDropZone(dropZone);
      };
    }
  }, [isDisabled, onDrop, onFilesDrop, onHTMLDrop, withPosition]);
  return state;
}

var DropZone = function DropZone(props) {
  return createElement(DropZoneConsumer, null, function (_ref2) {
    var addDropZone = _ref2.addDropZone,
        removeDropZone = _ref2.removeDropZone;
    return createElement(DropZoneComponent, _extends({
      addDropZone: addDropZone,
      removeDropZone: removeDropZone
    }, props));
  });
};

function DropZoneComponent(_ref3) {
  var className = _ref3.className,
      label = _ref3.label,
      onFilesDrop = _ref3.onFilesDrop,
      onHTMLDrop = _ref3.onHTMLDrop,
      onDrop = _ref3.onDrop;
  var element = useRef();

  var _useDropZone = useDropZone({
    element: element,
    onFilesDrop: onFilesDrop,
    onHTMLDrop: onHTMLDrop,
    onDrop: onDrop,
    __unstableIsRelative: true
  }),
      isDraggingOverDocument = _useDropZone.isDraggingOverDocument,
      isDraggingOverElement = _useDropZone.isDraggingOverElement,
      type = _useDropZone.type;

  var children;

  if (isDraggingOverElement) {
    children = createElement("div", {
      className: "components-drop-zone__content"
    }, createElement(Icon, {
      icon: upload,
      size: "40",
      className: "components-drop-zone__content-icon"
    }), createElement("span", {
      className: "components-drop-zone__content-text"
    }, label ? label : __('Drop files to upload')));
  }

  var classes = classnames('components-drop-zone', className, _defineProperty({
    'is-active': (isDraggingOverDocument || isDraggingOverElement) && (type === 'file' && onFilesDrop || type === 'html' && onHTMLDrop || type === 'default' && onDrop),
    'is-dragging-over-document': isDraggingOverDocument,
    'is-dragging-over-element': isDraggingOverElement
  }, "is-dragging-".concat(type), !!type));
  return createElement("div", {
    ref: element,
    className: classes
  }, children);
}

export default DropZone;
//# sourceMappingURL=index.js.map