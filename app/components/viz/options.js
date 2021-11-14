/* eslint-disable ember/no-computed-properties-in-native-classes */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class VizOptionsComponent extends Component {
  @action
  updateRow({ rowValue }, key, event) {
    set(rowValue, key, event.target.checked);
    let arrayNotifier = {};
    this.args.optionsRows.pushObject(arrayNotifier);
    this.args.optionsRows.removeObject(arrayNotifier);
    this.args.optionsUpdated(this.args.optionsRows);
  }

  get optionsColumns() {
    let cols = ['field', ...Object.keys(this.args.vizOptions)];
    return cols.map((col) => ({ name: col, valuePath: col }));
  }
}
