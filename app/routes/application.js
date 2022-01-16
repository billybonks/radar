import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  changeset,
  parse,
  View,
  None,
  Error as VegaLogError,
  Warn,
  Info,
  Debug,
} from 'vega';

export default class ApplicationRoute extends Route {
  @service router;
  beforeModel(transition) {
    if (transition.to.name === 'index') {
      this.router.transitionTo('graph.create');
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
