import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class GraphCreateController extends Controller {
  @action
  trasitionToPage() {
    this.transitionToRoute('graph.edit', this.model);
  }
}
