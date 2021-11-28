//https://github.com/microsoft/vscode/blob/9e5ee5521a2142d4314660ce1d022082e61f137a/src/vs/base/parts/quickinput/browser/quickInput.ts
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class QuickInputComponent extends Component {
  @tracked filteredCommands;
  @service commands;
  @service router;
  @service store;

  constructor() {
    super(...arguments);
    this.filterCommands.perform();
  }

  @task *filterCommands() {
    let charts = yield this.store.findAll('chart');
    let chartCommands = charts
      .filter((q) => !q.isNew)
      .map((query) => {
        return {
          title: `Chart: ${query.name}`,
          callback(router) {
            router.transitionTo('query.edit', query);
          },
        };
      });
    this.filteredCommands = [...this.commands.pallete, ...chartCommands];
  }

  valueChanged(event) {
    const value = event.srcElement.value;
  }

  @action
  callCommand(command) {
    command.callback(this.router);
    this.args.onSelected();
  }
}
