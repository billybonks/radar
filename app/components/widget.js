import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WidgetComponent extends Component {
  @tracked height;
  @tracked width;

  @action
  registerResize() {
    this.ro = new ResizeObserver((entries) => {
      let contentRect = entries[0].contentRect;
      this.width = contentRect.width;
      this.height = contentRect.height;
    });
    this.ro.observe(arguments[0]);
  }

  get size() {
    return { width: this.width, height: this.height - 39 };
  }
}
