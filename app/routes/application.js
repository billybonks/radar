import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service store;

  async model() {
    return {
      datasets: await this.store.findAll('dataset'),
      charts: await this.store.findAll('chart')
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
