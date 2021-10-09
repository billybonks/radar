import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class GraphreateController extends Controller {
  @tracked datasource;
  @tracked query = 'select * from pull_requests;';
  @action
  run() {
    this.datasource.run(this.query);
  }
  @action
  changeDataSource(datasource) {
    this.datasource = datasource;
  }
}
