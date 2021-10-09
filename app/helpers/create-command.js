import { helper } from '@ember/component/helper';

function createCommand([query] /*, named*/) {
  return {
    title: `Query: ${query.name}`,
    callback: function (query, router) {
      router.transitionTo('graph.edit', query);
    }.bind(null, query),
  };
}

export default helper(createCommand);
