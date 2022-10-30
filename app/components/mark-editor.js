import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class DatasetEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;
  @tracked datasets;

  @service store;

  constructor() {
    super(...arguments);
    this.store.findAll('dataset').then((results) => {
      this.datasets = results;
    });
  }

  @action
  async save(dataset) {
    await dataset.save();
    if (this.args.onSave) {
      this.args.onSave();
    }
  }

  @action
  updateCode(code) {
    set(this.args.mark, 'definition', code);
  }

  @action
  async optionsUpdated(optionsRows) {
    this.args.chart.options = optionsRows;
  }

  @action
  changeDataSet(dataset, input) {
    dataset.set('dataset', input);
  }
}
