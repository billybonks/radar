import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GraphCreateRoute extends Route {
  @service store;

  async model() {
    let chart = this.store.createRecord('chart');
    let dataset = this.store.createRecord('dataset');
    chart.set('dataset', dataset);
    chart.set('name', 'Untitled Chart');
    let datasources = await this.store.findAll('datasource');
    let visualisations = this.store.peekAll('visualisation');
    //this needs to be the last obe used in order to do that we need to save the values
    dataset.set('datasource', datasources.firstObject);
    chart.changeVis(visualisations.findBy('id', 'table'));
    return chart;
  }
}
