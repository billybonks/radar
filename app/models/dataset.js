import Model, { attr, belongsTo } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';
import { set, get } from '@ember/object';
import { setProperties } from '@ember/object';

export default class DatasetModel extends Model {
  @tracked results;
  @tracked columns;

  @attr('string') query;
  @attr('string') name;
  @belongsTo('dataset', {
    async: true,
    inverse: null,
  })
  input;
  @belongsTo('datasource', {
    async: true,
    inverse: null,
  })
  datasource;
  @belongsTo('cache', {
    async: true,
    inverse: null,
  })
  cache;

  async refresh() {
    let cache = this.store.createRecord('cache', {});
    try {
      let input = get(this, 'input.content'); // eslint-disable-line ember/no-get
      let props = { input: {} };
      if (input) {
        await input.refresh();
        props = { input: input.results };
      }
      // let query = await window.desktopAPI.renderJinja(this.query, props);
      let cachableResults = await this.executeSql(this.query);
      setProperties(cache, cachableResults);
    } catch (e) {
      set(cache, 'error', e.toString());
    } finally {
      await cache.save();
      set(this, 'cache', cache);
      await this.save();
    }
  }

  async executeSql(query) {
    let { results, dataSummary, columns } =
      await window.desktopAPI.datasource.query(
        this.datasource.get('id'),
        query
      );
    this.results = results;
    this.columns = columns;
    return {
      results,
      dataSummary,
      columns: this.columns,
    };
  }
}
