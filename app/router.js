import EmberRouter from '@ember/routing/router';
import config from 'electron-test/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('datasources.create');

  this.route('datasources', function () {
    this.route('create');
    this.route('list');
  });

  this.route('graph', function () {
    this.route('create');
    this.route('edit', { path: '/edit/:chart_id' });
  });
});
