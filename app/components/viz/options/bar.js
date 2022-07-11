import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class VizOptionsBarComponent extends Component {
  @action
  updateX(options, column) {
    this.args.optionsUpdated({
      ...options,
      xscale: column,
    });
  }

  @action
  updateY(options, column) {
    this.args.optionsUpdated({
      ...options,
      yscale: column,
    });
  }

  @action
  updateSeries(options, column) {
    this.args.optionsUpdated({
      ...options,
      seriesColumn: column,
    });
  }
}
