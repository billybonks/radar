import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service store;

  async model() {
    return {
      datasets: await this.store.findAll('dataset'),
      charts: await this.store.findAll('chart'),
      dashboards: await this.store.findAll('dashboard'),
      datasources: await this.store.findAll('datasource'),
    };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    //TODO: fix When we remove the current shitty hotkey thing
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controller = controller;
  }

  @action
  openQuickInput() {
    //TODO: fix When we remove the current shitty hotkey thing
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controller.openQuickInput();
  }

  @action
  closeQuickInput() {
    //TODO: fix When we remove the current shitty hotkey thing
    // eslint-disable-next-line ember/no-controller-access-in-routes
    this.controller.closeQuickInput();
  }
}
