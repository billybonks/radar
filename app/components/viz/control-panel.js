import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class VizOptionsBarComponent extends Component {
  interpolate = [
    'basis',
    'cardinal',
    'catmull-rom',
    'linear',
    'monotone',
    'natural',
    'step',
    'step-after',
    'step-before',
  ];
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

  @action
  updateInterpolate(options, interpolate) {
    this.args.optionsUpdated({
      ...options,
      interpolate: interpolate,
    });
  }
}
