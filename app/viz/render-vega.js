import { parse, View, Warn } from 'vega';
import { compile } from 'vega-lite';

function getSpec(schema) {
  let vegaSchema = 'https://vega.github.io/schema/vega/v5.json';
  let isVegaSchema = schema['$schema'] === vegaSchema;
  return isVegaSchema ? schema : compile(schema).spec;
}

export default function (schema, element) {
  let spec = getSpec(schema);

  let runtime = parse(spec);
  const vis = new View(runtime);
  vis
    .logLevel(Warn) // set view logging level
    .renderer('svg') // set render type (defaults to 'canvas')
    .initialize(element) // set parent DOM element
    .hover(); // enable hover event processing, *only call once*!

  vis.runAsync().catch(() => {
    element.innerHTML = 'something went wrong';
  }); // evaluate and render the view
}
