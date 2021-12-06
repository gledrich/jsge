import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Line {
  constructor(v1, v2, width = 1, zIndex = 0) {
    if (!(v1 instanceof Vector2)) {
      throw new Error('v1 must be a Vector2!');
    }

    if (!(v2 instanceof Vector2)) {
      throw new Error('v2 must be a Vector2!');
    }

    this.width = width;
    this.x1 = v1.x;
    this.y1 = v1.y;
    this.x2 = v2.x;
    this.y2 = v2.y;
    this.zIndex = zIndex;

    Window.registerObject(this);
  }
}
