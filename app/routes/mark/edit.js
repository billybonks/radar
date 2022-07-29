import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MarkEditRoute extends Route {
  @service store;

  model({ mark_id }) {
    return this.store.find('mark', mark_id);
  }
}
