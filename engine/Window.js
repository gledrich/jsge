import Canvas from './Canvas.js';
import Text from './Text.js';
import Line from './Line.js';
import Rectangle from './Rectangle.js';
import Sprite from './Sprite.js';

export default class Window {
  #ctx;

  #window;

  #canvas;

  static objects = new Set();

  constructor(
    { onLoadCallback, updateCallback },
    {
      title = 'Example',
      width = '100%',
      height = '100%',
      backgroundColour = 'white',
    } = {},
  ) {
    Window.objects.findAll = this.#findAllObjects.bind(this);

    this.title = document.createElement('title');
    this.title.innerHTML = title;
    document.getElementsByTagName('head')[0].appendChild(this.title);

    this.#window = document.createElement('div');
    this.#window.style.width = width;
    this.#window.style.height = height;

    this.backgroundColour = backgroundColour;

    this.#canvas = new Canvas();
    this.#ctx = this.#canvas.getContext('2d');

    document.addEventListener('mousemove', this.#setMousePos.bind(this));

    document.getElementsByTagName('body')[0].appendChild(this.#window);
    this.#window.appendChild(this.#canvas);

    this.updateCallback = updateCallback;
    this.onLoadCallback = () => {
      onLoadCallback();
      this.#onLoad();
    };
  }

  #onLoad() {
    this.#draw();

    window.requestAnimationFrame(this.#update.bind(this));
  }

  fps = 0;

  #oldTimestamp = 0;

  #secondsPassed;

  #update(timestamp) {
    this.#secondsPassed = (timestamp - this.#oldTimestamp) / 1000;
    this.#oldTimestamp = timestamp;

    this.fps = Math.round(1 / this.#secondsPassed);

    this.updateCallback();
    this.#draw();

    window.requestAnimationFrame(this.#update.bind(this));
  }

  #setBackground() {
    this.#ctx.fillStyle = this.backgroundColour;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  #draw() {
    this.#setBackground();

    Window.#sortSet().forEach((object) => {
      if (object instanceof Text) {
        this.#drawText(object);
      }

      if (object instanceof Line) {
        this.#drawLine(object);
      }

      if (object instanceof Rectangle) {
        this.#drawRectangle(object);
      }

      if (object instanceof Sprite) {
        this.#drawSprite(object);
      }
    });
  }

  #drawText(text) {
    if (text.backgroundColour) {
      this.#ctx.fillStyle = text.backgroundColour;
      this.#ctx.fillRect(
        text.position.x,
        text.position.y,
        text.width,
        text.height,
      );
    }

    this.#ctx.font = text.font;
    this.#ctx.fillStyle = text.colour;
    this.#ctx.textAlign = text.horizontalAlign;
    this.#ctx.textBaseline = text.verticalAlign;
    this.#ctx.fillText(
      text.text,
      text.position.x + text.width / 2,
      text.position.y + text.height / 2,
    );
  }

  #drawLine(line) {
    this.#ctx.lineWidth = line.width;
    this.#ctx.moveTo(line.x1, line.y1);
    this.#ctx.lineTo(line.x2, line.y2);
    this.#ctx.stroke();
  }

  #drawRectangle(rectangle) {
    this.#ctx.fillStyle = rectangle.colour;
    this.#ctx.fillRect(
      rectangle.position.x,
      rectangle.position.y,
      rectangle.width,
      rectangle.height,
    );
  }

  #drawSprite({
    img,
    cols,
    frameWidth,
    frameHeight,
    position,
    startCol,
    endCol,
    tag,
  }) {
    this.#ctx.imageSmoothingEnabled = true;
    this.#ctx.imageSmoothingQuality = 'high';

    const maxFrame = endCol - 1;

    while (Window[tag] < startCol) {
      Window[tag] += 1;
    }

    if (Window[tag] > maxFrame) {
      Window[tag] = startCol;
    }

    // Update rows and columns
    const column = Window[tag] % cols;
    const row = Math.floor(Window[tag] / cols);

    this.#ctx.drawImage(
      img,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      position.x,
      position.y,
      frameWidth * 3,
      frameHeight * 3,
    );
  }

  #findAllObjects(tag = '') {
    return Array.from(Window.objects).filter((obj) => obj.tag === tag);
  }

  #setMousePos(event) {
    if (event) {
      this.mouseX = event.x;
      this.mouseY = event.y;
    }
  }

  static #sortSet() {
    const arr = Array.from(Window.objects);
    arr.sort((a, b) => a.zIndex > b.zIndex);
    return new Set(arr);
  }

  static registerObject(object) {
    if (object instanceof Sprite) {
      this[object.tag] = 0;

      setInterval(() => {
        this[object.tag] += 1;
      }, 100);
    }

    this.objects.add(object);
  }

  static destroyObject(object) {
    if (object instanceof Sprite) {
      delete Window[object.tag];
    }

    this.objects.delete(object);
  }
}
