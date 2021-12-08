import Window from './Window.js';

const sprites = new Set();

export default class Sprite {
  constructor({
    img = new Image(),
    rows,
    cols,
    position,
    startCol,
    endCol,
    zIndex = 100,
    tag,
  } = {}) {
    if (!tag) {
      throw new Error('You must provide a tag for a Sprite');
    }

    this.img = img;
    this.rows = rows;
    this.cols = cols;
    this.position = position;
    this.startCol = startCol;
    this.endCol = endCol;
    this.zIndex = zIndex;
    this.tag = tag;

    if (sprites.has(this.tag)) {
      throw new Error(`Tag "${this.tag}" has already been used. Try another value`);
    }

    sprites.add(this.tag);

    this.img.onload = () => {
      this.frameWidth = this.img.width / this.cols;
      this.frameHeight = this.img.height / this.rows;
    };

    this.registered = false;
  }

  play() {
    if (!this.registered) {
      Window.registerObject(this);
      this.registered = true;
    }
  }

  stop() {
    if (this.registered) {
      Window.destroyObject(this);
      sprites.delete(this.tag);
    }
  }
}
