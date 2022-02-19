import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DatasetEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;
  types = ['sql', 'jinja']
  @service store;

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
    await this.args.dataset.refresh()
    debugger
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


  get datasources() {
    return this.store.findAll('datasource');
  }

  get datasets() {
    return this.store.findAll('dataset');
  }
}
