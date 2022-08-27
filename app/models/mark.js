import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';
import { get } from '@ember/object';

export default class MarkModel extends Model {
  @belongsTo('dataset') dataset;
  @attr('string') definition;
  @attr('string') name;

  get hydratedSchema() {
    if (!this.definition) {
      return null;
    }
    let schema = JSON.parse(this.definition);
    if (schema.data) {
      return schema;
    }
    try {
      let result = {
        ...schema,
        data: [
          {
            name: 'table',
            values: get(this, 'dataset.cache').content.results, // eslint-disable-line ember/no-get
          },
        ],
      };
      return result;
    } catch (e) {
      return {};
    }
  }
}
