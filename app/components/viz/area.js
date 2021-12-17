import LineChartComponent from 'electron-test/components/viz/line';

export default class VizBarComponent extends LineChartComponent {
  get marks() {
    return {
      marks: [
        {
          type: 'area',
          from: { data: 'table' },
          encode: {
            enter: {
              x: { scale: 'xscale', field: this.args.options.xscale },
              y: { scale: 'yscale', field: this.args.options.yscale },
              y2: { scale: 'yscale', value: 0 },
              fill: { value: 'steelblue' },
            },
            update: {
              interpolate: { signal: 'interpolate' },
              strokeOpacity: { value: 1 },
            },
            hover: {
              strokeOpacity: { value: 0.5 },
            },
          },
        },
      ],
    };
  }
}
