/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ChartEditorComponent extends Component {
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
    this.args.chart.options = optionsRows;
  }

  @action
  changeDataSource(query, datasource) {
    query.set('datasource', datasource);
  }

  @action
  changeVisualisation(query, visualisation) {
    query.set('visualisation', visualisation);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

  get visualisation() {
    return this.store.peekAll('visualisation');
  }
}
