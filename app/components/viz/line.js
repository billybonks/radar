import BarChartComponent from 'electron-test/components/viz/bar';

export default class VizBarComponent extends BarChartComponent {
  get scales() {
    return {
      scales: [
        {
          name: 'xscale',
          type: 'point',
          range: 'width',
          domain: { data: 'table', field: this.args.options.xscale },
        },
        {
          name: 'yscale',
          type: 'linear',
          range: 'height',
          nice: true,
          zero: true,
          domain: { data: 'table', field: this.args.options.yscale },
        },
      ],
    };
  }

  get signals() {
    return {
      signals: [
        {
          name: 'interpolate',
          value: 'linear',
          bind: {
            input: 'select',
            options: [
              'basis',
              'cardinal',
              'catmull-rom',
              'linear',
              'monotone',
              'natural',
              'step',
              'step-after',
              'step-before',
            ],
          },
        },
      ],
    };
  }

  get marks() {
    return {
      marks: [
        {
          type: 'line',
          from: { data: 'table' },
          encode: {
            enter: {
              x: { scale: 'xscale', field: this.args.options.xscale },
              y: { scale: 'yscale', field: this.args.options.yscale },
              strokeWidth: { value: 2 },
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
