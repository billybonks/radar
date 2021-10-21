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

  get datasources() {
    return this.store.findAll('datasource');
  }
}
