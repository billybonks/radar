/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import visulisations from 'electron-test/viz/index';

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

  @action
  changeVisulisation(query, visulisation) {
    query.set('visulisation', visulisation);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

  get visulisations() {
    return visulisations;
  }
}
