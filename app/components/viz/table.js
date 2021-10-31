import Component from '@glimmer/component';

export default class VizTableComponent extends Component {
  get columns() {
    return (this.args.options || [])
      .filter((opt) => opt.selected)
      .map((opt) => opt.field)
      .map((key) => ({
        name: key,
        valuePath: key,
      }));
  }
}
