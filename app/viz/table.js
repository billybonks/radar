import { A } from '@ember/array';

export default {
  id: 'table',
  name: 'Table',
  component: 'viz/table',
  optionsGenerator(columns) {
    if (!columns) {
      return [];
    }
    let options = Object.fromEntries(
      Object.keys(this.options).map((key) => [key, true]),
    );
    let optionsRows = columns.map((col) => {
      return {
        field: col,
        ...options,
      };
    });
    return A(optionsRows);
  },
  options: {
    selected: {
      type: 'multiple',
    },
  },
};
