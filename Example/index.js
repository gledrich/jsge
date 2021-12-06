/* eslint-disable no-use-before-define, max-classes-per-file */

import Engine from '../engine/Engine.js';
import Rectangle from '../engine/Rectangle.js';
import Vector2 from '../engine/Vector2.js';
import Text from '../engine/Text.js';

window.onload = () => {
  new DemoGame();
};

class DemoGame {
  constructor() {
    window.showFPS = this.showFPS.bind(this);
    window.hideFPS = this.hideFPS.bind(this);

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        new Rectangle({
          tag: 'food',
          position: new Vector2(
            i * (window.innerWidth / 10),
            j * (window.innerHeight / 10),
          ),
          width: 20,
          height: 20,
          colour: 'orange',
        });
      }
    }

    this.player = new Rectangle({
      position: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
      width: 50,
      height: 50,
      colour: 'red',
      zIndex: 1,
    });
    this.player.grow = () => {
      this.player.width += 1;
      this.player.height += 1;
    };

    this.showFPS();

    this.game = new Engine(this.update.bind(this), {
      title: 'Demo Game',
      backgroundColour: 'black',
    });
  }

  update() {
    if (this.fpsCounter) {
      this.fpsCounter.text = `FPS: ${this.game.fps}`;
    }

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

  showFPS() {
    this.fpsCounter = new Text({
      tag: 'fpsCounterText',
      colour: 'white',
      // backgroundColour: 'white',
      zIndex: 10,
      text: 'FPS: 0',
    });
  }

  hideFPS() {
    this.fpsCounter.destroySelf();
  }
}
