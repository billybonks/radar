import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class QueryEditorComponent extends Component {
  @tracked results;
  @service store;

  @action
  async run(query) {
    query.run();
  }

  @action
  async save(query) {
    query.save();
  }

  @action
  changeDataSource(query, datasource) {
    query.set('datasource', datasource);
  }

  updateRow({ rowValue }, key, event) {
    rowValue[key] = event.target.checked;
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

  get optionsColumns() {
    let cols = ['field', ...Object.keys(this.visualisationConfig.options)];
    return cols.map((col) => ({ name: col, valuePath: col }));
  }

  get optionsRows() {
    let options = Object.fromEntries(
      Object.keys(this.visualisationConfig.options).map((key) => [key, false])
    );
    return this.args.query.rawColumns.map((col) => {
      return {
        field: col,
        ...options,
      };
    });
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
