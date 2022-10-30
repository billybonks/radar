import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';

export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') query;
  @attr('string') error;
  @attr('string') name;
  @belongsTo('dataset') input;
  @belongsTo('datasource') datasource;
  @belongsTo('cache') cache;

  async refresh() {
    try {
      let input = get(this, 'input.content'); // eslint-disable-line ember/no-get
      let props = { input: {} };
      if (input) {
        await input.refresh();
        props = { input: input.results };
      }
      let query = await window.desktopAPI.renderJinja(this.query, props);
      await this.executeSql(query);
    } catch (e) {
      set(this, 'cache', null);
      set(this, 'error', e.toString());
    }
  }

  async executeSql(query) {
    let { results, dataSummary, columns } =
      await window.desktopAPI.datasource.query(
        this.datasource.get('id'),
        query
      );
    this.columns = columns;
    let properties = {
      results,
      dataSummary,
      columns: this.columns,
    };
    let cache = this.store.createRecord('cache', properties);
    await cache.save();
    console.log(cache.id);
    set(this, 'cache', cache);
    set(this, 'error', null);
    await this.save();
    this.results = results;
  }
}
