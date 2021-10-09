import Route from '@ember/routing/route';

export default class DatasourcesCreateRoute extends Route {
  model() {
    return this.store.createRecord('datasource');
  }
}
