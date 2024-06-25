import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

let eventListener = function () {
  if (!this.activeSash) {
    return;
  }
  this.activeSash.classList.remove('active');
  this.activePane = null;
  this.activeSibling = null;
  this.activeSash = null;
  document.removeEventListener('mouseup', this.eventListener);
};

function getPrecentage(element) {
  return element.style.height.replace('%', '');
}
export default class SplitPaneComponent extends Component {
  @tracked filteredCommands;
  @tracked panes;
  @tracked activePane;

  constructor() {
    super(...arguments);
    this.panes = [];
    this.eventListener = eventListener.bind(this);
    document.body.addEventListener('mouseup', this.eventListener);
    document.body.addEventListener('mousemove', (event) => {
      if (this.activePane) {
        let activePaneHeight =
          this.activePane.offsetHeight + this.activePane.offsetTop;
        let cursorY = event.clientY;
        let delta = activePaneHeight - cursorY;
        let percentageChange = delta / activePaneHeight;

        // let percentage = this.activePane.offsetHeight / delta;
        this.activePane.style.height = `${
          getPrecentage(this.activePane) - percentageChange
        }%`;
        this.activeSibling.style.height = `${
          parseFloat(this.activeSibling.style.height.replace('%', '')) +
          percentageChange
        }%`;
      }
    });
  }

  @action
  registerPane(pane) {
    this.panes = [...this.panes, pane];
    let distribution = 100 / (this.panes.length || 1);
    this.panes.forEach((pane) => {
      pane.style.height = `${distribution}%`;
    });
  }

  @action
  sashClicked(event) {
    this.activePane = event.target.parentElement;
    this.activeSibling = this.activePane.nextElementSibling;
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
