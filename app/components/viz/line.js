import Component from '@glimmer/component';
import { SchemaBuilder } from '../../viz/line';
export default class VizBarComponent extends Component {
  get schema() {
    let schemaBuilder = new SchemaBuilder(
      this.args.options,
      this.args.height,
      this.args.results
    );
    return schemaBuilder.schema;
  }
}
