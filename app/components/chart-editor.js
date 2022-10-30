/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class ChartEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;
  @tracked datasources;

  @service store;

  constructor() {
    super(...arguments);
    this.store.findAll('datasource').then((results) => {
      this.datasources = results;
    });
  }
  @action
  onChartResized(chart, width, height) {
    chart.set('width', width);
    chart.set('height', height);
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
  updateCode(code) {
    set(this.args.chart.dataset, 'query', code);
  }

  @action
  async save(chart) {
    let dataset = chart.get('dataset.content');
    await chart.get('dataset.save').call(dataset);
    await chart.save();
    if (this.args.onSave) {
      this.args.onSave();
    }
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
  changeVisualisation(chart, visualisation) {
    chart.changeVis(visualisation);
  }

  get datasources() {
    return;
  }

  get visualisation() {
    return this.store.peekAll('visualisation');
  }
}
