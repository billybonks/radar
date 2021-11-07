/* eslint-disable ember/no-computed-properties-in-native-classes */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set, computed } from '@ember/object';
import { A } from '@ember/array';
import { next } from '@ember/runloop';

export default class VizOptionsComponent extends Component {
  @action
  updateRow({ rowValue }, key, event) {
    set(rowValue, key, event.target.checked);
    let arrayNotifier = {};
    this.optionsRows.pushObject(arrayNotifier);
    this.optionsRows.removeObject(arrayNotifier);
    this.args.optionsUpdated(this.optionsRows);
  }

  @computed('args.{columns,vizOptions}')
  get optionsRows() {
    if (!this.args.columns) {
      return [];
    }
    let options = Object.fromEntries(
      Object.keys(this.args.vizOptions).map((key) => [key, true])
    );
    let optionsRows = this.args.columns.map((col) => {
      return {
        field: col,
        ...options,
      };
    });
    let opts = A(optionsRows);
    next(() => this.args.optionsUpdated(opts));
    return opts;
  }

  get optionsColumns() {
    let cols = ['field', ...Object.keys(this.args.vizOptions)];
    return cols.map((col) => ({ name: col, valuePath: col }));
  }
}
