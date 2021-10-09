import Route from '@ember/routing/route';

export default class GraphCreateRoute extends Route {
  model() {
    return this.store.createRecord('query');
  }
}
