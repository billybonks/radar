import { modifier } from 'ember-modifier';

export default modifier(function updateOnSchema(
  element,
  [results, visualisationModel, options, height]
) {
  try {
    visualisationModel
      .get('raw')
      .render(element, results, { ...options, height });
  } catch {
    element.innerHTML = 'something went wrong';
  }
});
