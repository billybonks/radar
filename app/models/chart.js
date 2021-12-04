import Model, { attr, belongsTo } from '@ember-data/model';

export default class ChartModel extends Model {
  @attr('string') name;
  @attr('number', { defaultValue: 200 }) width;
  @attr('number', { defaultValue: 200 }) height;
  @attr() options;
  @belongsTo('visualisation') visualisation;
  @belongsTo('dataset') dataset;

  async run() {
    await this.dataset.content.refresh();
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
