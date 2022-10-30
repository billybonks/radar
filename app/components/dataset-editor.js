import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class DatasetEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;
  types = ['sql', 'jinja'];
  @tracked datasources;
  @tracked datasets;
  @service store;

  constructor() {
    super(...arguments);
    this.store.findAll('datasource').then((results) => {
      this.datasources = results;
    });
    this.store.findAll('dataset').then((results) => {
      this.datasets = results;
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
  updateCode(code) {
    set(this.args.dataset, 'query', code);
  }

  @action
  async run() {
    await this.args.dataset.refresh();
  }

  @action
  async save(dataset) {
    await dataset.save();
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
  changeDataSet(dataset, input) {
    dataset.set('input', input);
  }

  @action
  changeType(dataset, type) {
    dataset.set('type', type);
  }
}
