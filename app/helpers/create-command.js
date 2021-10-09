import { helper } from '@ember/component/helper';

function createCommand([query] /*, named*/) {
  return {
    title: `Query: ${query.name}`,
    callback: function (router) {
      router.transitionTo('query.edit', query);
    }.bind(null, query),
  };
}

export default helper(createCommand);
