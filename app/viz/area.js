export default {
  id: 'area',
  name: 'Area',
  component: 'viz/area',
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
