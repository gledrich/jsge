/* eslint-disable no-use-before-define, max-classes-per-file */

import Engine from './Engine.js';
import Line from './Line.js';
import Rectangle from './Rectangle.js';
import Vector2 from './Vector2.js';

window.onload = () => {
  new DemoGame();
};

class DemoGame {
  #frames;

  constructor() {
    this.person = new Person();

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        new Rectangle(
          new Vector2(i * (window.innerWidth / 10), j * (window.innerHeight / 10)),
          { width: 20, height: 20 },
          'orange',
        );
      }
    }

    // this.rectangle = new Rectangle(new Vector2(10, 10), { width: 50, height: 50 }, 'red', 1);

    this.game = new Engine(this.update.bind(this), { title: 'Demo Game', backgroundColour: 'black' });

    this.#frames = 0;
  }

  update() {
    this.#frames += 1;

    this.person.body.position = new Vector2(
      this.game.mouseX - this.person.body.width / 2,
      this.game.mouseY - this.person.body.height / 2,
    );
    this.person.update();

    // this.rectangle.x = this.game.mouseX;
    // this.rectangle.y = this.game.mouseY;
  }
}

class Person {
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
