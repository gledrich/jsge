import Canvas from './Canvas.js';
import Line from './Line.js';
import Rectangle from './Rectangle.js';

export default class Window {
  #ctx;

  #window;

  #canvas;

  static objects = new Set();

  constructor(callback, {
    title = 'Example', width = '100%', height = '100%', backgroundColour = 'white',
  } = {}) {
    Window.objects.findAll = this.#findAll.bind(this);

    this.title = document.createElement('title');
    this.title.innerHTML = title;
    document.getElementsByTagName('head')[0].appendChild(this.title);

    this.#window = document.createElement('div');
    this.#window.style.width = width;
    this.#window.style.height = height;

    this.backgroundColour = backgroundColour;

    this.#canvas = new Canvas();
    this.#ctx = this.#canvas.getContext('2d');

    document.addEventListener('mousemove', this.#mouseMove.bind(this));

    document.getElementsByTagName('body')[0].appendChild(this.#window);
    this.#window.appendChild(this.#canvas);

    this.callback = callback;

    this.#onLoad();
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

    this.callback();

    this.#ctx.fillStyle = this.backgroundColour;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#draw();

    window.requestAnimationFrame(this.#update.bind(this));
  }

  static #sortSet() {
    const arr = Array.from(Window.objects);
    arr.sort((a, b) => a.zIndex > b.zIndex);
    return new Set(arr);
  }

  #draw() {
    Window.#sortSet().forEach((object) => {
      if (object instanceof Line) {
        this.#drawLine(object);
      }
      if (object instanceof Rectangle) {
        this.#drawRectangle(object);
      }
    });
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

  #findAll(tag = '') {
    return Array.from(Window.objects).filter((obj) => obj.tag === tag);
  }

  #mouseMove(event) {
    if (event) {
      this.mouseX = event.x;
      this.mouseY = event.y;
    }
  }

  static get mouseX() {
    return this.mouseX + this.#canvas.getBoundingClientRect().left;
  }

  static get mouseY() {
    return this.mouseY + this.#canvas.getBoundingClientRect().top;
  }

  static registerObject(object) {
    this.objects.add(object);
  }

  static destroyObject(object) {
    this.objects.delete(object);
  }
}
