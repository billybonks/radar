import Route from '@ember/routing/route';

export default class GraphCreateRoute extends Route {
  model() {
    let chart = this.store.createRecord('chart');
    let dataset = this.store.createRecord('dataset');
    chart.set('dataset', dataset);
    return chart;
  }
}
