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
}
