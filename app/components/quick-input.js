//https://github.com/microsoft/vscode/blob/9e5ee5521a2142d4314660ce1d022082e61f137a/src/vs/base/parts/quickinput/browser/quickInput.ts
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class QuickInputComponent extends Component {
  @service commands;
  @service router;
  @service store;

  constructor() {
    super(...arguments);
    this.filteredCommands = this.commands.commands;
  }

  valueChanged(event) {
    const value = event.srcElement.value;
  }

  @action
  callCommand(command) {
    command.callback(this.router);
    this.args.onSelected();
  }

  get queries() {
    return this.store.findAll('chart');
  }
}
