import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';

export default class ChartModel extends Model {
  @attr('string') name;
  @attr('number', { defaultValue: 200 }) width;
  @attr('number', { defaultValue: 200 }) height;
  @attr() options;
  @belongsTo('visualisation', { async: true, inverse: null }) visualisation;
  @belongsTo('dataset', { async: true, inverse: null }) dataset;
  @tracked loading;

  async run() {
    this.loading = true;
    await this.dataset.content.refresh();
    this.loading = false;
  }

  updateOptions() {
    // eslint-disable-next-line ember/no-get
    this.options = get(
      this,
      'visualisation.optionsGenerator'
    )(
      get(this, 'dataset.cache.columns') // eslint-disable-line ember/no-get
    );
  }

  changeVis(visualisation) {
    set(this, 'visualisation', visualisation);
    this.updateOptions();
  }
}
