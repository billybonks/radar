import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DatasetEditRoute extends Route {
  @service store;

  model({ dataset_id }) {
    return this.store.findRecord('dataset', dataset_id);
  }
}
