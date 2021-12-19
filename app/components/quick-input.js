//https://github.com/microsoft/vscode/blob/9e5ee5521a2142d4314660ce1d022082e61f137a/src/vs/base/parts/quickinput/browser/quickInput.ts
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuickInputComponent extends Component {
  @tracked filteredCommands;

  constructor() {
    super(...arguments);
    this.args.filterCommands.perform().then((result) => {
      this.filteredCommands = result;
    });
  }

  @action
  onSelected(command) {
    this.args.onSelected(command);
  }
}
