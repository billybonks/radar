import Model, { attr, belongsTo } from '@ember-data/model';

export default class WidgetModel extends Model {
  @attr('number') x;
  @attr('number') y;
  @attr('number') width;
  @attr('number') height;
  @belongsTo('chart', { async: true, inverse: null }) chart;
}
