import Component from '@glimmer/component';

let defaultSchema = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  description: 'Stock prices of 5 Tech Companies over Time.',
  width: 'container',
  background: '',
  height: 250,
  mark: 'line',
};
export default class VizBarComponent extends Component {
  get schema() {
    const computedSchema = {
      ...defaultSchema,
      ...this.data,
      ...this.signals,
      ...this.scales,
      ...this.size,
      ...this.marks,
      ...this.config,
      ...this.encoding,
    };
    console.log(JSON.stringify(computedSchema));
    return computedSchema;
  }

  get config() {
    return {
      config: {
        view: {
          stroke: 'transparent',
        },
        axis: {
          domain: true,
          grid: false,
          ticks: true,
          labelColor: 'white',
        },
        legend: {
          labelColor: 'white',
        },
      },
    };
  }

  get signals() {
    return {};
  }

  get marks() {
    return {};
  }
  get scales() {
    return {};
  }
  get size() {
    return {};
  }

  get encoding() {
    return {
      encoding: {
        x: { field: this.args.options.xscale },
        y: { field: this.args.options.yscale, sort: '-y' },
        // color: { field: 'symbol', type: 'nominal' },
      },
    };
  }

  get data() {
    return {
      data: {
        values: this.args.results,
      },
    };
  }
}
