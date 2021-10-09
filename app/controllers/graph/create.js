import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GraphreateController extends Controller {
  @tracked results;
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
  changeDataSource(datasource) {
    this.model.set('datasource', datasource);
  }

  get columns() {
    return Object.keys(this.results[0]);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }
}
