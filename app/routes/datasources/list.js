import Route from '@ember/routing/route';

export default class DatasourcesListRoute extends Route {
  model() {
    return this.store.findAll('datasource');
  }
}
