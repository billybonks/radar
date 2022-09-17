import Component from '@glimmer/component';

export default class VizBarComponent extends Component {
  get schema() {
    const computedSchema = {
      ...this.defaultSchema,
      ...this.data,
      ...this.signals,
      ...this.scales,
      ...this.size,
      ...this.marks,
      ...this.config,
      ...this.encoding,
      ...this.params,
    };
    console.log(JSON.stringify(computedSchema));
    return computedSchema;
  }

  get defaultSchema() {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Stock prices of 5 Tech Companies over Time.',
      width: 'container',
      background: '',
      height: this.args.height - 40,
      mark: 'line',
    };
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
          titleColor: 'white',
        },
        axisY: {
          grid: true,
          domain: false,
          gridOpacity: 0.2,
        },
        legend: {
          labelColor: 'white',
          titleColor: 'white',
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
  get isSeries() {
    return !!this.args.options.seriesColumn;
  }

  get params() {
    return {
      params: [
        {
          name: 'selectedSeries',
          select: { type: 'point', fields: [this.args.options.seriesColumn] },
          bind: 'legend',
        },
      ],
    };
  }

  get encoding() {
    let encoding = {
      x: { field: this.args.options.xscale },
      y: {
        field: this.args.options.yscale,
        sort: '-y',
        type: 'quantitative',
      },
      opacity: {
        condition: { param: 'selectedSeries', value: 1 },
        value: 0.2,
      },
    };

    if (this.isSeries) {
      encoding = {
        ...encoding,
        color: { field: this.args.options.seriesColumn },
      };
    }
    return { encoding };
  }

  get data() {
    return {
      data: {
        values: this.args.results,
      },
    };
  }
}
