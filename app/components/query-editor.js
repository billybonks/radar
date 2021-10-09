import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class QueryEditorComponent extends Component {
  @tracked results;
  @service store;

  @action
  async run(query) {
    let result = await window.desktopAPI.datasource.query(
      query.datasource.get('id'),
      query.query
    );
    this.results = result;
  }
  @action
  async save(query) {
    query.save();
  }
  @action
  changeDataSource(query, datasource) {
    query.set('datasource', datasource);
  }

  get columns() {
    return Object.keys(this.results[0]);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }
}
