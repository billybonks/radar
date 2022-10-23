import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderFunc extends Component {
  @action
  runRender(element) {
    this.args.visualisation.get('raw').render(element);
  }
}
