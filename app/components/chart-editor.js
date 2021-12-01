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
  onChartResized(chart, width, height) {
    chart.set('width', width);
    chart.set('height', height);
    chart.save();
  }

  @action
  onChartResize(chart, width, height) {
    chart.set('width', width);
    chart.set('height', height);
  }

  @action
  async run(query) {
    this.__optionsRowsCache = null;
    await query.run();
  }

  @action
  async save(chart) {
    chart.save();
    chart.dataset.save();
  }

  @action
  async optionsUpdated(optionsRows) {
    this.args.chart.options = optionsRows;
  }

  @action
  changeDataSource(dataset, datasource) {
    dataset.set('datasource', datasource);
  }

  @action
  changeVisualisation(dataset, visualisation) {
    dataset.set('visualisation', visualisation);
  }

  get datasources() {
    return this.store.findAll('datasource');
  }

  get visualisation() {
    return this.store.peekAll('visualisation');
  }
}
