import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class QueryModel extends Model {
  @tracked results;
  @tracked columns;
  @attr('string') query;
  @attr('string') name;
  @belongsTo('datasource') datasource;

  async run() {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      this.query
    );
    this.results = results;
    this.columns = Object.keys(this.results[0]).map((key) => ({
      name: key,
      valuePath: key,
    }));
  }
}
