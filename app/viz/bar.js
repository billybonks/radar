import renderVegaSchema from './render-vega';

export default {
  id: 'bar',
  name: 'Bar',
  component: 'viz/render-func',
  render(element, results, options) {
    let schemaBuilder = new SchemaBuilder(options, results);
    renderVegaSchema(element, schemaBuilder.schema);
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

let defaultSchema = {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  autosize: 'fit',
  description:
    'A basic bar chart example, with value labels shown upon mouse hover.',
  signals: [
    {
      name: 'tooltip',
      value: {},
      on: [
        { events: 'rect:mouseover', update: 'datum' },
        { events: 'rect:mouseout', update: '{}' },
      ],
    },
  ],
  axes: [
    { orient: 'bottom', scale: 'xscale', labelColor: 'white' },
    { orient: 'left', scale: 'yscale', labelColor: 'white' },
  ],
};

class SchemaBuilder {
  constructor(options, data) {
    this.options = options;
    this.values = data;
  }
  get isSeries() {
    return !!this.options.seriesColumn;
  }

  get seriesColumn() {
    return this.options.seriesColumn;
  }
  get schema() {
    const computedSchema = {
      ...defaultSchema,
      ...this.data,
      ...this.signals,
      ...this.scales,
      ...this.size,
      ...this.marks,
    };
    console.log(JSON.stringify(computedSchema));
    return computedSchema;
  }

  get signals() {
    return {
      signals: [
        {
          name: 'tooltip',
          value: {},
          on: [
            { events: 'rect:mouseover', update: 'datum' },
            { events: 'rect:mouseout', update: '{}' },
          ],
        },
      ],
    };
  }

  get seriesColours() {
    return {
      name: 'color',
      type: 'ordinal',
      range: 'category',
      domain: { data: 'table', field: this.seriesColumn },
    };
  }

  get marks() {
    if (this.isSeries) {
      return {
        type: 'group',
        from: {
          facet: {
            name: 'series',
            data: 'table',
            groupby: this.seriesColumn,
          },
        },
        marks: [this.bars, this.tooltips],
      };
    }

    return { marks: [this.bars, this.tooltips] };
  }

  get size() {
    let padding = 10;
    return {
      width: this.options.width - padding * 2,
      height: this.options.height - padding * 2,
      padding,
    };
  }

  get data() {
    return {
      data: [
        {
          name: 'table',
          values: this.values,
        },
      ],
    };
  }

  get scales() {
    const defaultScales = [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: this.options.xscale },
        range: 'width',
        padding: 0.05,
        round: true,
      },
      {
        name: 'yscale',
        domain: { data: 'table', field: this.options.yscale },
        nice: true,
        range: 'height',
      },
    ];

    if (this.isSeries) {
      return {
        scales: [...defaultScales, this.seriesColours],
      };
    } else {
      return {
        scales: defaultScales,
      };
    }
  }

  get bars() {
    return {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: this.options.xscale },
          width: { scale: 'xscale', band: 1 },
          y: { scale: 'yscale', field: this.options.yscale },
          y2: { scale: 'yscale', value: 0 },
        },
        update: {
          fill: this.isSeries
            ? { scale: 'color', field: 'town' }
            : { value: 'steelblue' },
        },
        hover: {
          fill: { value: 'red' },
        },
      },
    };
  }

  get tooltips() {
    return {
      type: 'text',
      encode: {
        enter: {
          align: { value: 'center' },
          baseline: { value: 'bottom' },
          fill: { value: 'white' },
        },
        update: {
          x: {
            scale: 'xscale',
            signal: `tooltip.${this.options.xscale}`,
            band: 2,
          },
          y: {
            scale: 'yscale',
            signal: `tooltip.${this.options.yscale}`,
            offset: -2,
          },
          text: [{ signal: "tooltip.count + ' ' + tooltip.town" }],
          fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
        },
      },
    };
  }
}
