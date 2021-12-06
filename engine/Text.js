import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Text {
  constructor({
    tag = 'text',
    colour = 'black',
    backgroundColour,
    fontSize = '25', // px
    font = 'Arial',
    text = '',
    horizontalAlign = 'center', // [left, right, center, start, end]
    verticalAlign = 'middle', // [top, hanging, middle, alphabetic, ideographic, bottom]
    position = new Vector2(0, 0),
    width,
    height,
    zIndex = 0,
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

    Window.registerObject(this);
  }

  destroySelf() {
    Window.destroyObject(this);
  }
}
