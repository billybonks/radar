import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DatasetEditorComponent extends Component {
  @tracked results;
  @tracked columns;
  @tracked optionsRows;
  @service store;

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
  changeDataSet(dataset, input) {
    dataset.set('dataset', input);
  }

  get datasets() {
    return this.store.findAll('dataset');
  }
}
