import Model, { attr } from '@ember-data/model';

export default class CacheModel extends Model {
  @attr() results;
  @attr() dataSummary;
  @attr() columns;
  @attr('string') error;
}
