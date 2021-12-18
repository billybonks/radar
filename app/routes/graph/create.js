import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GraphCreateRoute extends Route {
  @service store;

  model() {
    let chart = this.store.createRecord('chart');
    let dataset = this.store.createRecord('dataset');
    chart.set('dataset', dataset);
    return chart;
  }
}
