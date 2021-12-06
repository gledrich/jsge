export default class Text {
  constructor({
    tag = 'text', colour = 'black', font = '25px Arial', text = '',
  }) {
    this.tag = tag;
    this.colour = colour;
    this.font = font;
    this.text = text;
  }
}
