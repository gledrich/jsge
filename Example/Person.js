import Rectangle from '../engine/Rectangle';
import Vector2 from '../engine/Vector2';

export default class Person {
  constructor() {
    this.constantWidth = 50;
    this.constantHeight = 50;

    this.body = new Rectangle(
      new Vector2(window.innerWidth / 2, window.innerHeight / 2),
      { width: this.constantWidth, height: this.constantHeight },
      'red',
      1,
    );
    this.head = new Rectangle(
      new Vector2(this.body.position.x, this.body.position.y - this.constantWidth),
      { width: this.constantWidth, height: this.constantHeight },
      'yellow',
      1,
    );
    this.armLeft = new Rectangle(
      new Vector2(this.body.position.x - this.constantWidth, this.body.position.y),
      { width: this.constantWidth / 2, height: this.body.height / 2 - 5 },
      'grey',
      1,
    );
    this.armRight = new Rectangle(
      new Vector2(this.body.position.x + this.body.width, this.body.position.y),
      { width: this.constantWidth / 2, height: this.body.height / 2 - 5 },
      'grey',
      1,
    );
    this.legLeft = new Rectangle(
      new Vector2(this.body.position.x, this.body.position.y + this.body.height),
      { width: this.body.width / 2 - 5, height: this.body.height / 2 },
      'grey',
      1,
    );
    this.legRight = new Rectangle(
      new Vector2(
        this.body.position.x + this.body.width / 2 + 5,
        this.body.position.y + this.body.height,
      ),
      { width: this.body.width / 2 - 5, height: this.body.height / 2 },
      'grey',
      1,
    );
  }

  update() {
    this.head.position.x = this.body.position.x;
    this.head.position.y = this.body.position.y - this.constantWidth;
    this.armLeft.position.x = this.body.position.x - this.constantWidth / 2;
    this.armLeft.position.y = this.body.position.y;
    this.armRight.position.x = this.body.position.x + this.body.width;
    this.armRight.position.y = this.body.position.y;
    this.legLeft.position.x = this.body.position.x;
    this.legLeft.position.y = this.body.position.y + this.body.height;
    this.legRight.position.x = this.body.position.x + this.body.width / 2 + 5;
    this.legRight.position.y = this.body.position.y + this.body.height;
  }
}
