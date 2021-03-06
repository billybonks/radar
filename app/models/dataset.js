import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') type;
  @attr('string') query;
  @attr('string') error;
  @attr('string') name;
  @belongsTo('dataset') input;
  @belongsTo('datasource') datasource;
  @belongsTo('cache') cache;

  async refresh() {
    try {
      if (this.type === 'jinja') {
        let input = this.get('input.content');
        await input.refresh();
        let props = { input: input.results };
        let query = await window.desktopAPI.renderJinja(this.query, props);
        await this.executeSql(query);
      } else {
        return await this.executeSql(this.query);
      }
    } catch (e) {
      set(this, 'cache', null);
      set(this, 'error', e.toString());
    }

  }

  async executeSql(query) {
    let results = await window.desktopAPI.datasource.query(
      this.datasource.get('id'),
      query
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
    set(this, 'error', null);
    await this.save();
    this.results = results;
  }
}
