import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardController extends Controller {
  @tracked displayWidgetPicker;
  @service store;

  closeWidgetPicker() {
    this.displayWidgetPicker = false;
  }

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
    if (chart) {
      let widget = this.store.createRecord('widget');
      widget.chart = chart;
      await widget.save();
      dashboard.widgets.pushObject(widget);
      await dashboard.save();
    }
    this.closeWidgetPicker();
  }

  @action
  onWidgetMove(widget, x, y) {
    widget.set('x', x);
    widget.set('y', y);
    console.log(widget);
  }
  @action
  onWidgetResize(widget, width, height) {
    widget.set('width', width);
    widget.set('height', height);
  }

  @action
  onWidgetResized(widget, width, height) {
    widget.set('width', width);
    widget.set('height', height);
    widget.save();
  }

  @action
  onWidgetMoved(widget) {
    widget.save();
  }

  @action
  save(dashboard) {
    dashboard.save();
  }

  @action
  async refreshWidget(chart) {
    await chart.content.run();
  }

  @action
  saveAndBlur(dashboard, _, element) {
    this.save(dashboard);
    element.srcElement.blur();
  }
}
