const getPixelSize = (size, parentSize, innerWidth, innerHeight) => {
  if (size && typeof size === 'string') {
    if (size.endsWith('px')) {
      return Number(size.replace('px', ''));
    }
    if (size.endsWith('%')) {
      const ratio = Number(size.replace('%', '')) / 100;
      return parentSize * ratio;
    }
    if (size.endsWith('vw')) {
      const ratio = Number(size.replace('vw', '')) / 100;
      return innerWidth * ratio;
    }
    if (size.endsWith('vh')) {
      const ratio = Number(size.replace('vh', '')) / 100;
      return innerHeight * ratio;
    }
  }
  return size;
};

function getPrecentage(element) {
  return element.style.height.replace('%', '');
}

class Resizer {
  constructor(onMouseUp) {
    this.onMouseUpCallback = onMouseUp;
    this.panes = [];
    this.handleMouseMove = this.onMouseMove.bind(this);
    this.handleMouseUp = this.deactivatePane.bind(this);
  }

  registerPane(pane) {
    this.panes = [...this.panes, pane];
    let distribution = 100 / (this.panes.length || 1);
    this.panes.forEach((pane) => {
      pane.style.height = `${distribution}%`;
    });
  }

  onMouseMove(event) {
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
  }

  activatePane(activePane) {
    this.activePane = activePane;
    this.activeSibling = this.activePane.nextElementSibling;
    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseup', this.handleMouseUp);
  }

  deactivatePane() {
    this.activePane = null;
    this.activeSibling = null;
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    this.onMouseUpCallback();
  }
}

export default Resizer;
