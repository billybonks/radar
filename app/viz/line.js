import renderVegaSchema from './render-vega';

export default {
  id: 'line',
  name: 'Line',
  component: 'viz/render-func',
  render(element, results, options) {
    let schemaBuilder = new SchemaBuilder(options, results);
    let schema = schemaBuilder.schema;
    renderVegaSchema(element, schema);
  },
  optionsGenerator() {
    return {
      xscale: 'state',
      yscale: 'count',
    };
  },
  options: {
    component: 'viz/control-panel',
  },
};

export class SchemaBuilder {
  constructor(options, data) {
    this.options = options;
    this.values = data;
  }
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
    return computedSchema;
  }

  get defaultSchema() {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      width: 'container',
      background: '',
      height: this.options.height - 40,
      mark: {
        point: true,
        tooltip: true,
        type: 'line',
        interpolate: this.options.interpolate || 'monotone',
      },
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
    return !!this.options.seriesColumn;
  }

  get params() {
    if (!this.isSeries) {
      return [];
    }
    return {
      params: [
        {
          name: 'selectedSeries',
          select: { type: 'point', fields: [this.options.seriesColumn] },
          bind: 'legend',
        },
      ],
    };
  }

  get encoding() {
    let encoding = {
      x: { field: this.options.xscale },
      y: {
        field: this.options.yscale,
        sort: '-y',
        type: 'quantitative',
      },
      tooltip: [{ field: this.options.xscale }, { field: this.options.yscale }],
    };
    if (this.isSeries) {
      encoding = {
        ...encoding,
        opacity: {
          condition: { param: 'selectedSeries', value: 1 },
          value: 0.2,
        },
        color: { field: this.options.seriesColumn },
      };
    }
    return { encoding };
  }

  get data() {
    return {
      data: {
        values: this.values,
      },
    };
  }
}
