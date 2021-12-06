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
        backgroundColour: '#A7DCCC',
      },
    );

    this.game.cursor = 'pointer';

    this.game.onLoad();

    this.completedText = new Text({
      tag: 'completedText',
      colour: 'white',
      backgroundColour: '#43aa8b',
      fontSize: 50,
      zIndex: 10,
      text: 'Completed',
      height: 300,
      width: 500,
      register: false,
    });
    this.restartText = new Text({
      tag: 'restartText',
      colour: 'white',
      backgroundColour: '#577590',
      fontSize: 30,
      zIndex: 20,
      text: 'Restart',
      register: false,
      onClick: () => {
        this.restart();
      },
    });
  }

  onLoad() {
    console.log('loaded game');

    if (this.gameState === 0) {
      const titleText = new Text({
        tag: 'titleText',
        colour: 'white',
        backgroundColour: '#43aa8b',
        fontSize: 50,
        zIndex: 10,
        text: 'Demo Game',
        height: 300,
        width: 500,
      });
      titleText.position = new Vector2(
        window.innerWidth / 2 - titleText.width / 2,
        window.innerHeight / 2 - titleText.height / 2,
      );

      const countDownText = new Text({
        tag: 'restartText',
        colour: 'white',
        backgroundColour: '#577590',
        width: 100,
        fontSize: 30,
        zIndex: 20,
        text: '3',
      });
      countDownText.position = new Vector2(
        titleText.position.x
          + (titleText.width / 2 - countDownText.width / 2),
        titleText.position.y
          + (titleText.height - countDownText.height),
      );

      this.game.countdown(3000, () => {
        countDownText.text = `${parseInt(countDownText.text, 10) - 1}`;
      }, () => {
        countDownText.destroySelf();
      });

      this.game
        .setTimeout(titleText.destroySelf.bind(titleText), 3000)
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
                width: 40,
                height: 40,
                colour: '#F3722C',
              });
            }
          }

          this.player = new Rectangle({
            position: new Vector2(
              window.innerWidth / 2,
              window.innerHeight / 2,
            ),
            width: 50,
            height: 50,
            colour: '#F94144',
            zIndex: 1,
          });
          this.player.grow = () => {
            const growBy = 1.5;

            this.player.width += growBy;
            this.player.height += growBy;
          };
        });
    }
  }

  update() {
    if (this.fpsCounter) {
      this.fpsCounter.text = `FPS: ${this.game.fps}`;
    }

    let food = [];

    // Check if game is playing
    if (this.gameState === 1) {
      this.game.cursor = 'none';

      this.player.position = new Vector2(
        this.game.mouseX - this.player.width / 2,
        this.game.mouseY - this.player.height / 2,
      );

      food = this.game.objects.findAll('food');

      food.forEach((pieceOfFood) => {
        if (this.player.hasCollided(pieceOfFood)) {
          pieceOfFood.destroySelf();
          this.player.grow();
        }
      });

      if (!food.length) {
        this.gameState = 2;
      }
    }

    if (!food.length && this.gameState === 2) {
      this.player.destroySelf();
      this.game.cursor = 'pointer';

      if (!this.completedText.registered) {
        this.completedText.registerSelf();
      }

      if (!this.restartText.registered) {
        this.restartText.registerSelf();
      }

      this.completedText.position = new Vector2(
        window.innerWidth / 2 - this.completedText.width / 2,
        window.innerHeight / 2 - this.completedText.height / 2,
      );

      this.restartText.position = new Vector2(
        this.completedText.position.x
          + (this.completedText.width / 2 - this.restartText.width / 2),
        this.completedText.position.y
          + (this.completedText.height - this.restartText.height),
      );
    }
  }

  restart() {
    this.restartText.destroySelf();
    this.gameState = 0;
    this.completedText.destroySelf();
    this.player.destroySelf();
    this.onLoad();
  }

  showFPS() {
    this.fpsCounter = new Text({
      tag: 'fpsCounterText',
      colour: '#577590',
      zIndex: 10,
      text: 'FPS: 0',
    });
  }

  hideFPS() {
    this.fpsCounter.destroySelf();
  }
}
