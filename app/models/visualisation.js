import Model, { attr } from '@ember-data/model';

export default class VisualisationModel extends Model {
  @attr('string') component;
  @attr('string') name;
  @attr() options;
}
