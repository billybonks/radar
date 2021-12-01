import Component from '@glimmer/component';

export default class VizTableComponent extends Component {
  get columns() {
    return Object.keys(this.args.results[0]).map((key) => ({
      name: key,
      valuePath: key,
    }));
  }
}
