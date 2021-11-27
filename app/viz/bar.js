import { A } from '@ember/array';

export default {
  id: 'bar',
  name: 'Bar',
  component: 'viz/bar',
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
