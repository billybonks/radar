import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);
    this.controller = controller;
    this.x = 1;
  }

  @action
  openQuickInput() {
    this.controller.openQuickInput();
  }

  @action
  closeQuickInput() {
    this.controller.closeModal();
  }
}
