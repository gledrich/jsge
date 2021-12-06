import Window from './Window.js';

export default class Engine {
  #window;

  constructor(callback, opts) {
    this.#window = new Window(callback, opts);
  }

  get mouseX() {
    return this.#window.mouseX;
  }

  get mouseY() {
    return this.#window.mouseY;
  }

  get objects() {
    return Window.objects;
  }

  get fps() {
    return this.#window.fps;
  }

  get onLoad() {
    return this.#window.onLoadCallback;
  }

  get setTimeout() {
    return this.timeout;
  }

  set cursor(value) {
    document.getElementById('canvas').style.cursor = value;
  }

  async timeout(timeoutFn, time) {
    await new Promise((resolve) => {
      setTimeout(resolve, time);
    });
    timeoutFn();
  }

  countdown(milliseconds, fn, onEnded) {
    setTimeout(onEnded, milliseconds);

    for (let i = 1; i <= milliseconds; i += 1) {
      if (i % 1000 === 0) {
        setTimeout(fn, i);
      }
    }
  }
}
