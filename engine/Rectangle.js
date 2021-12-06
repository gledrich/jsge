import Window from './Window.js';
import Vector2 from './Vector2.js';

export default class Rectangle {
  constructor({
    tag = 'rect', position, width, height, colour = 'black', zIndex = 0,
  }) {
    if (!(position instanceof Vector2)) {
      throw new Error('v1 must be a Vector2!');
    }

    if (!width || !height) {
      throw new Error('You must provide a width and height for a rectangle');
    }

    this.tag = tag;
    this.position = position;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.zIndex = zIndex;

    Window.registerObject(this);
  }

  destroySelf() {
    Window.destroyObject(this);
  }

  hasCollided(obj) {
    // rectangle
    if (obj instanceof Rectangle) {
      let bigger;
      let smaller;

      if (this.width > obj.width || this.height > obj.height) {
        bigger = this;
        smaller = obj;
      } else {
        bigger = obj;
        smaller = this;
      }

      if (
        // top left corner
        (smaller.position.x > bigger.position.x
          && smaller.position.x < bigger.position.x + bigger.width
          && smaller.position.y > bigger.position.y
          && smaller.position.y < bigger.position.y + bigger.height)
        // top right corner
        || (
          smaller.position.x + smaller.width > bigger.position.x
          && smaller.position.x + smaller.width < bigger.position.x + bigger.width
          && smaller.position.y > bigger.position.y
          && smaller.position.y < bigger.position.y + bigger.height
        )
        // bottom left corner
        || (
          smaller.position.x > bigger.position.x
          && smaller.position.x < bigger.position.x + bigger.width
          && smaller.position.y + smaller.height > bigger.position.y
          && smaller.position.y + smaller.height < bigger.position.y + bigger.height
        )
        // bottom right corner
        || (
          smaller.position.x + smaller.width > bigger.position.x
          && smaller.position.x + smaller.width < bigger.position.x + bigger.width
          && smaller.position.y + smaller.height > bigger.position.y
          && smaller.position.y + smaller.height < bigger.position.y + bigger.height
        )
      ) {
        return true;
      }

      return false;
    }

    return false;
  }
}
