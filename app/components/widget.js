import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class WidgetComponent extends Component {
  @action
  registerResize() {
    this.ro = new ResizeObserver((entries) => {
      let contentRect = entries[0].contentRect;
      this.width = contentRect.width;
      this.height = contentRect.height;
      console.log(`${this.width}  ${this.height}`);
    });
    this.ro.observe(arguments[0]);
  }
}