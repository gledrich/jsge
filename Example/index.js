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

    this.showFPS();

    // 0: Load, 1: Play, 2: Finish
    this.gameState = 0;

    this.game = new Engine(
      {
        onLoadCallback: this.onLoad.bind(this),
        updateCallback: this.update.bind(this),
      },
      {
        title: 'Demo Game',
        backgroundColour: 'black',
      },
    );

    this.game.onLoad();
  }

  onLoad() {
    console.log('loaded game');

    const titleText = new Text({
      tag: 'titleText',
      colour: 'purple',
      backgroundColour: 'white',
      fontSize: 50,
      zIndex: 10,
      text: 'Demo Game',
      position: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
      height: 300,
      width: 500,
    });
    titleText.position = new Vector2(
      window.innerWidth / 2 - titleText.width / 2,
      window.innerHeight / 2 - titleText.height / 2,
    );

    this.game
      .setTimeout(titleText.destroySelf.bind(titleText), 2000)
      .then(() => {
        this.gameState = 1;

        const rows = 10;
        const cols = 10;

        for (let i = 1; i <= rows; i += 1) {
          for (let j = 1; j <= cols; j += 1) {
            const paddingHorizontal = window.innerWidth / rows;
            const paddingVertical = window.innerHeight / cols;

            new Rectangle({
              tag: 'food',
              position: new Vector2(
                i * ((window.innerWidth - paddingHorizontal) / rows),
                j * ((window.innerHeight - paddingVertical) / cols),
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
          const growBy = 1.5;

          this.player.width += growBy;
          this.player.height += growBy;
        };
      });
  }

  update() {
    if (this.fpsCounter) {
      this.fpsCounter.text = `FPS: ${this.game.fps}`;
    }

    // Check if game is playing
    if (this.gameState === 1) {
      this.player.position = new Vector2(
        this.game.mouseX - this.player.width / 2,
        this.game.mouseY - this.player.height / 2,
      );
    }

    const food = this.game.objects.findAll('food');

    food.forEach((pieceOfFood) => {
      if (this.player.hasCollided(pieceOfFood)) {
        pieceOfFood.destroySelf();
        this.player.grow();
      }
    });

    if (!food.length && this.gameState === 1) {
      this.gameState = 2;
    }

    if (!food.length && this.gameState === 2) {
      const completedText = new Text({
        tag: 'completedText',
        colour: 'purple',
        backgroundColour: 'white',
        fontSize: 50,
        zIndex: 10,
        text: 'Completed',
        position: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
        height: 300,
        width: 500,
      });
      completedText.position = new Vector2(
        window.innerWidth / 2 - completedText.width / 2,
        window.innerHeight / 2 - completedText.height / 2,
      );
    }
  }

  showFPS() {
    this.fpsCounter = new Text({
      tag: 'fpsCounterText',
      colour: 'white',
      zIndex: 10,
      text: 'FPS: 0',
    });
  }

  hideFPS() {
    this.fpsCounter.destroySelf();
  }
}
