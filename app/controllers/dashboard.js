import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
export default class DashboardController extends Controller {
  @tracked displayWidgetPicker;
  // eslint-disable-next-line require-yield
  @task *filterCommands() {
    return this.store.findAll('chart');
  }

  @action
  addWidget(dashboard) {
    this.displayWidgetPicker = true;
  }

  @action
  async selectWidget(dashboard, chart) {
    let widget = this.store.createRecord('widget');
    widget.chart = chart;
    await widget.save();
    dashboard.widgets.pushObject(widget);
    await dashboard.save();
  }
}
