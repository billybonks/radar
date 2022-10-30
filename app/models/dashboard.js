import Model, { attr, hasMany } from '@ember-data/model';

export default class DashboardModel extends Model {
  @attr('string') name;
  @hasMany('widget', { async: true, inverse: null }) widgets;
}
