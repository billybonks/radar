import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') query;
  @attr('string') name;
  @belongsTo('datasource') datasource;

  async refresh() {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      this.query
    );
    this.columns = Object.keys(results[0]);
    this.results = results;
  }
}
