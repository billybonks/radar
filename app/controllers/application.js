import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { bindKeyboardShortcuts } from 'ember-keyboard-shortcuts';
import { task } from 'ember-concurrency';

export default class ApplicationController extends Controller {
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
  recordCollectionToCommand(records, type, cb) {
    return records
      .filter((record) => !record.isNew)
      .map((record) => {
        return {
          title: `${type}: ${record.name}`,
          callback(router) {
            cb(record, router);
          },
        };
      });
  }

  async buildModelCommands() {
    let charts = await this.store.findAll('chart');
    let mark = await this.store.findAll('mark');
    let dashboard = await this.store.findAll('dashboard');
    let dataset = await this.store.findAll('dataset');

    let chartCommands = this.recordCollectionToCommand(
      charts,
      'Chart',
      function callback(record, router) {
        router.transitionTo('graph.edit', record);
      }
    );

    let markCommands = this.recordCollectionToCommand(
      mark,
      'Mark',
      function callback(record, router) {
        router.transitionTo('mark.edit', record);
      }
    );

    let dashboardCommands = this.recordCollectionToCommand(
      dashboard,
      'Dashboard',
      function callback(record, router) {
        router.transitionTo('dashboard', record);
      }
    );

    let datasetCommands = this.recordCollectionToCommand(
      dataset,
      'Dataset',
      function callback(record, router) {
        router.transitionTo('dataset.edit', record);
      }
    );
    return [
      ...chartCommands,
      ...dashboardCommands,
      ...datasetCommands,
      ...markCommands,
    ];
  }

  @task *filterCommands() {
    let modelBasedCommands = yield this.buildModelCommands();

    return [...this.commands.pallete, ...modelBasedCommands];
  }

  @action
  openQuickInput() {
    this.displayQuickInput = true;
  }

  @action
  quickInputSelection(command) {
    if (command) {
      command.callback(this.router, this.store);
    }
    this.closeQuickInput();
  }

  closeQuickInput() {
    this.displayQuickInput = false;
  }
}
