import Component from '@glimmer/component';

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

export default class VizBarComponent extends Component {
  get schema() {
    console.log(
      JSON.stringify({
        ...defaultSchema,
        ...this.data,
        ...this.signals,
        ...this.scales,
        ...this.size,
        ...this.marks,
      })
    );
    return {
      ...defaultSchema,
      ...this.data,
      ...this.signals,
      ...this.scales,
      ...this.size,
      ...this.marks,
    };
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

  get marks() {
    return { marks: [this.bars, this.tooltips] };
  }

  get size() {
    let padding = 10;
    return {
      width: this.args.width - padding * 2,
      height: this.args.height - padding * 2,
      padding,
    };
  }
  get data() {
    return {
      data: [
        {
          name: 'table',
          values: this.args.results,
        },
      ],
    };
  }

  get scales() {
    return {
      scales: [
        {
          name: 'xscale',
          type: 'band',
          domain: { data: 'table', field: this.args.options.xscale },
          range: 'width',
          padding: 0.05,
          round: true,
        },
        {
          name: 'yscale',
          domain: { data: 'table', field: this.args.options.yscale },
          nice: true,
          range: 'height',
        },
      ],
    };
  }

  get bars() {
    return {
      type: 'rect',
      from: { data: 'table' },
      encode: {
        enter: {
          x: { scale: 'xscale', field: this.args.options.xscale },
          width: { scale: 'xscale', band: 1 },
          y: { scale: 'yscale', field: this.args.options.yscale },
          y2: { scale: 'yscale', value: 0 },
        },
        update: {
          fill: { value: 'steelblue' },
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
            signal: `tooltip.${this.args.options.xscale}`,
            band: 10,
          },
          y: {
            scale: 'yscale',
            signal: `tooltip.${this.args.options.yscale}`,
            offset: -2,
          },
          text: { signal: 'tooltip.count' },
          fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
        },
      },
    };
  }
}
