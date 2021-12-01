import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { bindKeyboardShortcuts } from 'ember-keyboard-shortcuts';
import { task } from 'ember-concurrency';

export default class ApplicationController extends Route {
  @tracked displayQuickInput = false;
  @service router;
  @service store;
  @service commands;

  word = 'qqq';
  keyboardShortcuts = {
    // trigger 'cancel' action when esc is pressed
    esc: {
      action: 'closeQuickInput', // action to trigger
      global: true, // whether to trigger inside input (default: true)
      preventDefault: true, // (default: true)rue
    },
    // trigger 'cancel' action when esc is pressed
    'ctrl+shift+p': {
      action: 'openQuickInput', // action to trigger
      global: true, // whether to trigger inside input (default: true)
      preventDefault: true, // (default: true)rue
    },
  };

  constructor() {
    super(...arguments);
    bindKeyboardShortcuts(this);
  }

  @task *filterCommands() {
    let charts = yield this.store.findAll('chart');
    let chartCommands = charts
      .filter((q) => !q.isNew)
      .map((query) => {
        return {
          title: `Chart: ${query.name}`,
          callback(router) {
            router.transitionTo('graph.edit', query);
          },
        };
      });
    let dashboards = yield this.store.findAll('dashboard');
    let dashboardCommands = dashboards
      .filter((dashboard) => !dashboard.isNew)
      .map((dashboard) => {
        return {
          title: `Dashboard: ${dashboard.name}`,
          callback(router) {
            router.transitionTo('dashboard', dashboard);
          },
        };
      });
    return [...this.commands.pallete, ...chartCommands, ...dashboardCommands];
  }

  openQuickInput() {
    this.displayQuickInput = true;
  }

  @action
  quickInputSelection(command) {
    command.callback(this.router, this.store);
    this.closeQuickInput();
  }

  closeQuickInput() {
    this.displayQuickInput = false;
  }
}
