import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Resizer from '../utils/resizer';

export default class SplitPaneComponent extends Component {
  @tracked filteredCommands;
  @tracked panes;
  @tracked activePane;

  constructor() {
    super(...arguments);
    this.resizer = new Resizer(this.onMouseUp.bind(this));
  }

  @action
  registerPane(pane) {
    this.resizer.registerPane(pane);
  }

  onMouseUp() {
    this.activeSash.classList.remove('active');
    this.activeSash = null;
  }

  @action
  sashClicked(event) {
    this.resizer.activatePane(event.target.parentElement);
    this.activeSash = event.target;
    this.activeSash.classList.add('active');
  }
}

// let drag = false; //if true draging is in process

// slider.addEventListener('mousedown', () => (drag = true));
// document.body.addEventListener('mouseup', () => (drag = false));
// document.body.addEventListener('mousemove', (event) => {
//   if (drag) {
//     const extra = getExtraWidth(pane);
//     pane.style.flex = `0 0 ${pane.offsetWidth - event.movementX - extra}px`;
//   }
// });
