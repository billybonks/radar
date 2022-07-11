import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default class MarkModel extends Model {
  @belongsTo('dataset') dataset;
  @attr('string') definition;
  @attr('string') name;

  get hydratedSchema() {
    try {
      let schema = JSON.parse(this.definition);
      let result = {
        ...schema,
        data: [
          {
            name: 'table',
            values: this.get('dataset.cache').content.results,
          },
        ],
      };
      return result;
    } catch(e){
      return {}
    }

  }
}
