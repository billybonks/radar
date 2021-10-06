import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DatasourcesCreateController extends Controller {
  @action
  save(datasourceModel) {
    datasourceModel.save();
  }
}
