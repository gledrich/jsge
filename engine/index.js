/* eslint-disable no-use-before-define, max-classes-per-file */

import Engine from './Engine.js';
import Rectangle from './Rectangle.js';
import Vector2 from './Vector2.js';

window.onload = () => {
  new DemoGame();
};

class DemoGame {
  #frames;

  constructor() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        new Rectangle(
          {
            tag: 'food',
            position: new Vector2(
              i * (window.innerWidth / 10),
              j * (window.innerHeight / 10),
            ),
            width: 20,
            height: 20,
            colour: 'orange',
          },
        );
      }
    }

    this.player = new Rectangle(

      {
        position: new Vector2(10, 10), width: 50, height: 50, colour: 'red', zIndex: 1,
      },
    );
    this.player.grow = this.grow.bind(this);

    this.game = new Engine(this.update.bind(this), {
      title: 'Demo Game',
      backgroundColour: 'black',
    });

    this.#frames = 0;
  }

  update() {
    this.#frames += 1;

    this.player.position = new Vector2(
      this.game.mouseX - this.player.width / 2,
      this.game.mouseY - this.player.height / 2,
    );

    this.game.objects.findAll('food').forEach((pieceOfFood) => {
      if (this.player.hasCollided(pieceOfFood)) {
        pieceOfFood.destroySelf();
        this.player.grow();
      }
    });
  }

  grow() {
    this.player.width += 1;
    this.player.height += 1;
  }
}
