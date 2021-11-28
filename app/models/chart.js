import Model, { attr, belongsTo } from '@ember-data/model';

export default class ChartModel extends Model {
  @attr('string') name;
  @attr() options;
  @belongsTo('visualisation') visualisation;
  @belongsTo('dataset') dataset;

  async run() {
    await this.dataset.content.refresh();
    this.options = this.visualisation.get('optionsGenerator')(
      this.get('dataset.cache.columns')
    );
  }
}