import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DatasetCreateRoute extends Route {
  @service store;

  model() {
    let dataset = this.store.createRecord('dataset');
    return dataset;
  }
}
