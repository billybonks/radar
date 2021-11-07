import visualisation from 'electron-test/viz/index';

export function initialize(appInstance) {
  let store = appInstance.lookup('service:store');
  let data = visualisation.map((v) => ({
    id: v.id,
    type: 'visualisation',
    attributes: {
      ...v,
      id: null,
    },
  }));
  store.push({ data });
}

export default {
  initialize,
};
