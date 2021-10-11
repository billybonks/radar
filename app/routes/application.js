import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  beforeModel(transition) {
    if (transition.to.name === 'index') {
      this.transitionTo('graph.create');
    }
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    this.controller = controller;
  }

  @action
  openQuickInput() {
    this.controller.openQuickInput();
  }

  @action
  closeQuickInput() {
    this.controller.closeQuickInput();
  }
}
