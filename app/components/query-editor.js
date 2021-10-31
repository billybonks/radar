/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default class QueryEditorComponent extends Component {
  @tracked results;
  @tracked columns;

  @service store;

  @action
  async run(query) {
    this.__optionsRowsCache = null;
    await query.run();
    let arrayNotifier = {};
    this.optionsRows.pushObject(arrayNotifier);
    this.optionsRows.removeObject(arrayNotifier);
  }

  @action
  async save(query) {
    query.save();
  }

  @action
  changeDataSource(query, datasource) {
    query.set('datasource', datasource);
  }

  @action
  updateRow({ rowValue }, key, event) {
    set(rowValue, key, event.target.checked);
    let arrayNotifier = {};
    this.optionsRows.pushObject(arrayNotifier);
    this.optionsRows.removeObject(arrayNotifier);
  }

  @computed('args.query.rawColumns', 'args.query.viz.options')
  get optionsRows() {
    if (!this.args.query.rawColumns) {
      return [];
    }
    let options = Object.fromEntries(
      Object.keys(this.args.query.viz.options).map((key) => [key, true])
    );
    let optionsRows = this.args.query.rawColumns.map((col) => {
      return {
        field: col,
        ...options,
      };
    });
    return A(optionsRows);
  }

  get optionsColumns() {
    let cols = ['field', ...Object.keys(this.args.query.viz.options)];
    return cols.map((col) => ({ name: col, valuePath: col }));
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

}
