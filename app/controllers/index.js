import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @service modelNavigator;

  @action
  onClickCard(record) {
    this.modelNavigator.navigate(record);
  }
}
