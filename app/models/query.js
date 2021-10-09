import Model, { attr, belongsTo } from '@ember-data/model';

export default class QueryModel extends Model {
  @attr('string') query;
  @attr('string') name;
  @belongsTo('datasource') datasource;
}
