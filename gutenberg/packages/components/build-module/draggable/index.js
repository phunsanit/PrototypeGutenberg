import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSafeTimeout } from '@wordpress/compose';
var dragImageClass = 'components-draggable__invisible-drag-image';
var cloneWrapperClass = 'components-draggable__clone';
var cloneHeightTransformationBreakpoint = 700;
var clonePadding = 20;

var Draggable = /*#__PURE__*/function (_Component) {
  _inherits(Draggable, _Component);

  var _super = _createSuper(Draggable);

  function Draggable() {
    var _this;

    _classCallCheck(this, Draggable);

    _this = _super.apply(this, arguments);
    _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
    _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.resetDragState = _this.resetDragState.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Draggable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.resetDragState();
    }
    /**
     * Removes the element clone, resets cursor, and removes drag listener.
     *
     * @param  {Object} event The non-custom DragEvent.
     */

  }, {
    key: "onDragEnd",
    value: function onDragEnd(event) {
      var _this$props$onDragEnd = this.props.onDragEnd,
          onDragEnd = _this$props$onDragEnd === void 0 ? noop : _this$props$onDragEnd;
      event.preventDefault();
      this.resetDragState();
      this.props.setTimeout(onDragEnd);
    }
    /**
     * Updates positioning of element clone based on mouse movement during dragging.
     *
     * @param  {Object} event The non-custom DragEvent.
     */

  }, {
    key: "onDragOver",
    value: function onDragOver(event) {
      this.cloneWrapper.style.top = "".concat(parseInt(this.cloneWrapper.style.top, 10) + event.clientY - this.cursorTop, "px");
      this.cloneWrapper.style.left = "".concat(parseInt(this.cloneWrapper.style.left, 10) + event.clientX - this.cursorLeft, "px"); // Update cursor coordinates.

      this.cursorLeft = event.clientX;
      this.cursorTop = event.clientY;
    }
    /**
     * This method does a couple of things:
     *
     * - Clones the current element and spawns clone over original element.
     * - Adds a fake temporary drag image to avoid browser defaults.
     * - Sets transfer data.
     * - Adds dragover listener.
     *
     * @param  {Object} event The non-custom DragEvent.
     */

  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      var _this$props = this.props,
          elementId = _this$props.elementId,
          transferData = _this$props.transferData,
          _this$props$onDragSta = _this$props.onDragStart,
          onDragStart = _this$props$onDragSta === void 0 ? noop : _this$props$onDragSta;
      var element = document.getElementById(elementId);

      if (!element) {
        event.preventDefault();
        return;
      } // Set a fake drag image to avoid browser defaults. Remove from DOM
      // right after. event.dataTransfer.setDragImage is not supported yet in
      // IE, we need to check for its existence first.


      if ('function' === typeof event.dataTransfer.setDragImage) {
        var dragImage = document.createElement('div');
        dragImage.id = "drag-image-".concat(elementId);
        dragImage.classList.add(dragImageClass);
        document.body.appendChild(dragImage);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
        this.props.setTimeout(function () {
          document.body.removeChild(dragImage);
        });
      }

      event.dataTransfer.setData('text', JSON.stringify(transferData)); // Prepare element clone and append to element wrapper.

      var elementRect = element.getBoundingClientRect();
      var elementWrapper = element.parentNode;
      var elementTopOffset = parseInt(elementRect.top, 10);
      var elementLeftOffset = parseInt(elementRect.left, 10);
      var clone = element.cloneNode(true);
      clone.id = "clone-".concat(elementId);
      this.cloneWrapper = document.createElement('div');
      this.cloneWrapper.classList.add(cloneWrapperClass);
      this.cloneWrapper.style.width = "".concat(elementRect.width + clonePadding * 2, "px");

      if (elementRect.height > cloneHeightTransformationBreakpoint) {
        // Scale down clone if original element is larger than 700px.
        this.cloneWrapper.style.transform = 'scale(0.5)';
        this.cloneWrapper.style.transformOrigin = 'top left'; // Position clone near the cursor.

        this.cloneWrapper.style.top = "".concat(event.clientY - 100, "px");
        this.cloneWrapper.style.left = "".concat(event.clientX, "px");
      } else {
        // Position clone right over the original element (20px padding).
        this.cloneWrapper.style.top = "".concat(elementTopOffset - clonePadding, "px");
        this.cloneWrapper.style.left = "".concat(elementLeftOffset - clonePadding, "px");
      } // Hack: Remove iFrames as it's causing the embeds drag clone to freeze


      Array.from(clone.querySelectorAll('iframe')).forEach(function (child) {
        return child.parentNode.removeChild(child);
      });
      this.cloneWrapper.appendChild(clone);
      elementWrapper.appendChild(this.cloneWrapper); // Mark the current cursor coordinates.

      this.cursorLeft = event.clientX;
      this.cursorTop = event.clientY; // Update cursor to 'grabbing', document wide.

      document.body.classList.add('is-dragging-components-draggable');
      document.addEventListener('dragover', this.onDragOver);
      this.props.setTimeout(onDragStart);
    }
    /**
     * Cleans up drag state when drag has completed, or component unmounts
     * while dragging.
     */

  }, {
    key: "resetDragState",
    value: function resetDragState() {
      // Remove drag clone
      document.removeEventListener('dragover', this.onDragOver);

      if (this.cloneWrapper && this.cloneWrapper.parentNode) {
        this.cloneWrapper.parentNode.removeChild(this.cloneWrapper);
        this.cloneWrapper = null;
      } // Reset cursor.


      document.body.classList.remove('is-dragging-components-draggable');
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children({
        onDraggableStart: this.onDragStart,
        onDraggableEnd: this.onDragEnd
      });
    }
  }]);

  return Draggable;
}(Component);

export default withSafeTimeout(Draggable);
//# sourceMappingURL=index.js.map