import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class DatasetCreateController extends Controller {
  @service router;

  @action
  trasitionToPage() {
    this.router.transitionTo('dataset.edit', this.model);
  }
}
