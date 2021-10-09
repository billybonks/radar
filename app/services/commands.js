import Service from '@ember/service';

const COMMANDS = [
  {
    id: 'create:datasource',
    title: 'Create Datasource',
    callback(router) {
      router.transitionTo('datasources.create');
    },
  },
  {
    id: 'list:datasource',
    title: 'List Datasources',
    callback(router) {
      router.transitionTo('datasources.list');
    },
  },
  {
    id: 'create:graph',
    title: 'Create Graph',
    callback(router) {
      router.transitionTo('graph.create');
    },
  },
];

export default class CommandsService extends Service {
  constructor() {
    super();
    this.pallete = COMMANDS;
  }
}
