// hack to fix https://github.com/billybonks/radar/issues/36

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store');
  store.findAll('chart');
}

export default {
  initialize,
};
