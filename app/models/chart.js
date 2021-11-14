import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class ChartModel extends Model {
  @tracked results;
  @tracked columns;
  @tracked rawColumns;
  @attr('string') query;
  @attr('string') name;
  @attr() options;
  @belongsTo('datasource') datasource;
  @belongsTo('visualisation') visualisation;

  async run() {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      this.query
    );
    this.rawColumns = Object.keys(results[0]);
    this.options = this.visualisation.get('optionsGenerator')(this.rawColumns);
    this.results = results;
  }
}
