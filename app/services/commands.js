import Service from '@ember/service';

const COMMANDS = [
  {
    id: 'create:datasource',
    title: 'Create Datasource',
    callback(router) {
      router.transitionTo('datasources.create');
    },
  },
];

export default class CommandsService extends Service {
  constructor() {
    super();
    this.pallete = COMMANDS;
  }
}
