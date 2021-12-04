export default {
  id: 'line',
  name: 'Line',
  component: 'viz/line',
  optionsGenerator() {
    return {
      xscale: 'state',
      yscale: 'count',
    };
  },
  options: {
    component: 'viz/options/bar',
  },
};
