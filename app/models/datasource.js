import Model, { attr } from '@ember-data/model';

export default class DatasourceModel extends Model {
  @attr('string') name;
  @attr('string') connectionString;
}
