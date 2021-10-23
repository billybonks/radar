import Component from '@glimmer/component';
import { action } from '@ember/object';
import { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class QueryEditorComponent extends Component {
  @tracked results;
  @tracked columns;

  @service store;

  @action
  async run(query) {
    await query.run();
    this.generateOptions();
    this.recalculateColumns();
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
    this.recalculateColumns();
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

  generateOptions() {
    let options = Object.fromEntries(
      Object.keys(this.visualisationConfig.options).map((key) => [key, true])
    );
    this.optionsRows = this.args.query.rawColumns.map((col) => {
      return {
        field: col,
        ...options,
      };
    });
  }

  recalculateColumns() {
    this.columns = this.optionsRows
      .filter((opt) => opt.selected)
      .map((opt) => opt.field)
      .map((key) => ({
        name: key,
        valuePath: key,
      }));
  }

  get optionsColumns() {
    let cols = ['field', ...Object.keys(this.visualisationConfig.options)];
    return cols.map((col) => ({ name: col, valuePath: col }));
  }

  get visualisationConfig() {
    return {
      options: {
        selected: {
          type: 'multiple',
        },
      },
    };
  }
}
