import Component from '@glimmer/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';

function dragMouseDown(element, e) {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  this.pos3 = e.clientX;
  this.pos4 = e.clientY;
  document.onmouseup = closeDragElement.bind(this);
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag.bind(this, element);
}

function closeDragElement() {
  this.args.onMoved();
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}

function elementDrag(element, e) {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  this.pos1 = this.pos3 - e.clientX;
  this.pos2 = this.pos4 - e.clientY;
  this.pos3 = e.clientX;
  this.pos4 = e.clientY;
  // set the element's new position:
  let y = element.parentElement.offsetTop - this.pos2;
  let x = element.parentElement.offsetLeft - this.pos1;
  // console.log(x)
  this.args.onMove(x, y);
}

export default class WidgetComponent extends Component {
  @action
  registerResize() {
    if (!this.args.onResize) {
      return;
    }
    this.ro = new ResizeObserver((entries) => {
      let contentRect = entries[0].contentRect;
      let width = contentRect.width;
      let height = contentRect.height;
      if (width === 0 && height === 0) {
        return;
      }
      this.args.onResize(width, height);
      clearTimeout(this.resizeEvent);
      this.resizeEvent = setTimeout(() => {
        this.args.onResized(width, height);
      }, 100);
    });
    this.ro.observe(arguments[0]);
  }

  @action
  registerDrag(element) {
    if (!this.args.onMove) {
      return;
    }
    element.onmousedown = dragMouseDown.bind(this, element);
  }

  get style() {
    return htmlSafe(
      `width:${this.args.width}px;height:${this.args.height}px;top:${this.args.y}px;left:${this.args.x}px`,
    );
  }

  get size() {
    return { width: this.args.width, height: this.args.height - 39 };
  }
}
