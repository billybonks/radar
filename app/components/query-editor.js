/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class QueryEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;

  @service store;

  @action
  async run(query) {
    this.__optionsRowsCache = null;
    await query.run();
  }

  @action
  async save(query) {
    query.save();
  }

  @action
  async optionsUpdated(optionsRows) {
    this.optionsRows = optionsRows;
  }

  @action
  changeDataSource(query, datasource) {
    query.set('datasource', datasource);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }
}
