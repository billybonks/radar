import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DatasourcesListController extends Controller {
  @action
  async scan(datasourceModel) {
    await window.desktopAPI.datasource.scan(datasourceModel.id);
    datasourceModel.reload();
  }
}
