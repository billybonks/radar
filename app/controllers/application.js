import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { bindKeyboardShortcuts } from 'ember-keyboard-shortcuts';

export default class ApplicationController extends Route {
  @tracked displayQuickInput = false;
  word = 'qqq';
  keyboardShortcuts = {
    // trigger 'cancel' action when esc is pressed
    esc: {
      action: 'closeModal', // action to trigger
      global: true, // whether to trigger inside input (default: true)
      preventDefault: true, // (default: true)rue
    },
    // trigger 'cancel' action when esc is pressed
    'ctrl+shift+p': {
      action: 'openQuickInput', // action to trigger
      global: true, // whether to trigger inside input (default: true)
      preventDefault: true, // (default: true)rue
    },
  };

  constructor() {
    super(...arguments);
    bindKeyboardShortcuts(this);
  }

  openQuickInput() {
    this.displayQuickInput = true;
  }

  @action
  closeModal() {
    this.displayQuickInput = false;
  }
}
