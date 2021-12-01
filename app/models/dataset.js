import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') query;
  @attr('string') name;
  @belongsTo('datasource') datasource;
  @belongsTo('cache') cache;

  async refresh() {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      this.query
    );
    this.columns = Object.keys(results[0]);
    let properties = {
      results,
      columns: this.columns,
    };
    let cache = this.store.createRecord('cache', properties);
    await cache.save();
    console.log(cache.id);
    set(this, 'cache', cache);
    await this.save();
    this.results = results;
  }
}
