import Model, { attr } from '@ember-data/model';
import visualisations from 'electron-test/viz/index';

export default class VisualisationModel extends Model {
  @attr('string') component;
  @attr('string') name;
  @attr() raw;
  @attr() options;

  get optionsGenerator() {
    let visualisation = visualisations.find((v) => v.id === this.id);
    return visualisation.optionsGenerator.bind(visualisation);
  }
}
