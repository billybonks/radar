import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class ChartModel extends Model {
  @attr('string') name;
  @attr('number', { defaultValue: 200 }) width;
  @attr('number', { defaultValue: 200 }) height;
  @attr() options;
  @belongsTo('visualisation') visualisation;
  @belongsTo('dataset') dataset;
  @tracked loading;

  async run() {
    this.loading = true;
    await this.dataset.content.refresh();
    this.loading = false;
  }

  updateOptions() {
    this.options = this.visualisation.get('optionsGenerator')(
      this.get('dataset.cache.columns')
    );
  }

  changeVis(visualisation) {
    this.set('visualisation', visualisation);
    this.updateOptions();
  }
}
