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
];

export default class CommandsService extends Service {
  constructor() {
    super();
    this.pallete = COMMANDS;
  }
}
