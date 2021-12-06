import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Text {
  constructor({
    tag = 'text',
    colour = 'black',
    backgroundColour,
    fontSize = '25',
    font = 'Arial',
    text = '',
    position = new Vector2(0, 0),
    zIndex = 0,
  }) {
    this.tag = tag;
    this.colour = colour;
    this.backgroundColour = backgroundColour;
    this.fontSize = parseInt(fontSize, 10);
    this.font = `${fontSize}px ${font}`;
    this.text = text;
    this.zIndex = zIndex;
    this.length = text.length;
    this.position = position;

    Window.registerObject(this);
  }

  destroySelf() {
    Window.destroyObject(this);
  }
}
