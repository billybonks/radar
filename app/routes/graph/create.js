import Route from '@ember/routing/route';

export default class GraphCreateRoute extends Route {
  model() {
    debugger;
    return this.store.createRecord('chart');
  }
}
