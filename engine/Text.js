import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Text {
  #onMouseClick;

  constructor({
    tag = 'text',
    colour = 'black',
    backgroundColour,
    fontSize = '25', // px
    font = 'Helvetica',
    text = '',
    horizontalAlign = 'center', // [left, right, center, start, end]
    verticalAlign = 'middle', // [top, hanging, middle, alphabetic, ideographic, bottom]
    position = new Vector2(0, 0),
    width,
    height,
    zIndex = 0,
    register = true,
    onClick,
  }) {
    this.tag = tag;
    this.colour = colour;
    this.backgroundColour = backgroundColour;
    this.fontSize = parseInt(fontSize, 10);
    this.font = `${fontSize}px ${font}`;
    this.text = text;
    this.length = text.length;
    this.position = position;
    this.horizontalAlign = horizontalAlign;
    this.verticalAlign = verticalAlign;
    this.width = width || this.fontSize * this.length;
    this.height = height || this.fontSize * 2;
    this.zIndex = zIndex;
    this.#onMouseClick = this.#mouseClick.bind(this);

    if (onClick) {
      this.onClick = onClick;
      document.addEventListener('click', this.#onMouseClick);
    }

    if (register) {
      this.registerSelf();
    }
  }

  registerSelf() {
    if (!this.registered) {
      document.addEventListener('click', this.#onMouseClick);
      Window.registerObject(this);
      this.registered = true;
    }
  }

  destroySelf() {
    if (this.registered) {
      document.removeEventListener('click', this.#onMouseClick);
      Window.destroyObject(this);
      this.registered = false;
    }
  }

  #mouseClick(event) {
    if (event.x > this.position.x
      && event.x < this.position.x + this.width
      && event.y > this.position.y
      && event.y < this.position.y + this.height) {
      if (this.onClick) {
        this.onClick();
      }
    }
  }
}
