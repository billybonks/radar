import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GraphEditRoute extends Route {
  @service store;

  model({ chart_id }) {
    return this.store.findRecord('chart', chart_id);
  }
}
