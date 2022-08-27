import Service from '@ember/service';
import Dashboard from 'electron-test/models/dashboard';
import Dataset from 'electron-test/models/dataset';
import Chart from 'electron-test/models/chart';
import Datasource from 'electron-test/models/Datasource';
import Mark from 'electron-test/models/Datasource';
import { inject as service } from '@ember/service';

export default class ModelNavigatorService extends Service {
  @service router;

  navigate(record) {
    let router = this.router;
    if (record instanceof Dashboard) {
      router.transitionTo('dashboard.edit', record);
    }
    if (record instanceof Dataset) {
      router.transitionTo('dataset.edit', record);
    }
    if (record instanceof Chart) {
      router.transitionTo('graph.edit', record);
    }
    // eslint-disable-next-line no-empty
    if (record instanceof Datasource) {
    }
    if (record instanceof Mark) {
      router.transitionTo('mark.edit', record);
    }
  }
}
