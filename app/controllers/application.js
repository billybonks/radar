import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { bindKeyboardShortcuts } from 'ember-keyboard-shortcuts';
import { task } from 'ember-concurrency';
import Dashboard from 'electron-test/models/dashboard';
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
  @task *filterCommands() {
    let chartCommands = this.recordCollectionToCommand(
      yield this.store.findAll('chart'),
      'Chart',
      function callback(record, router) {
        router.transitionTo('graph.edit', record);
      }
    );

    let markCommands = this.recordCollectionToCommand(
      yield this.store.findAll('mark'),
      'Mark',
      function callback(record, router) {
        router.transitionTo('mark.edit', record);
      }
    );

    let dashboardCommands = this.recordCollectionToCommand(
      yield this.store.findAll('dashboard'),
      'Dashboard',
      function callback(record, router) {
        router.transitionTo('dashboard', record);
      }
    );

    let datasetCommands = this.recordCollectionToCommand(
      yield this.store.findAll('dataset'),
      'Dataset',
      function callback(record, router) {
        router.transitionTo('dataset.edit', record);
      }
    );

    return [
      ...this.commands.pallete,
      ...chartCommands,
      ...dashboardCommands,
      ...datasetCommands,
      ...markCommands,
    ];
  }

  onClickCard(record) {}

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
