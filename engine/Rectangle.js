import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Rectangle {
  constructor(v1, { width, height }, colour = 'black', zIndex = 0) {
    if (!(v1 instanceof Vector2)) {
      throw new Error('v1 must be a Vector2!');
    }

    if (!width || !height) {
      throw new Error('You must provide a width and height for a rectangle');
    }

    this.position = v1;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.zIndex = zIndex;

    Window.registerObject(this);
  }
}
