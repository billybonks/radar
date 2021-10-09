import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GraphreateController extends Controller {
  @tracked datasource;
  @tracked results;
  @tracked query = 'select * from pull_requests limit 10;';
  @action
  async run() {
    let result = await window.desktopAPI.datasource.query(
      this.datasource.id,
      this.query
    );
    debugger
    this.results = result;
  }
  @action
  changeDataSource(datasource) {
    this.datasource = datasource;
  }

  get columns() {
    return Object.keys(this.results[0]);
  }
}
