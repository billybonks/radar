import { modifier } from 'ember-modifier';
import { parse, View, Warn } from 'vega';
export default modifier(function updateOnSchema(element, [schema]) {
  let runtime = parse(schema);
  const vis = new View(runtime);
  vis
    .logLevel(Warn) // set view logging level
    .renderer('svg') // set render type (defaults to 'canvas')
    .initialize(element) // set parent DOM element
    .hover(); // enable hover event processing, *only call once*!

  vis.runAsync(); // evaluate and render the view
});
