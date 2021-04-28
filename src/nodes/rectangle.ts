import BaseNode from "./base";
import Parser from "../parser";
import { RectangleStyle } from "../types";

export default class RectangleNode extends BaseNode {
  style: RectangleStyle;

  constructor(
    parser: Parser,
    figmaObj: any,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(figmaObj.id, conditionVariable, loopVariable, eventType, eventName);
    this.style = parser.rectangleStyle(figmaObj);
  }

  buildTemplate(): string {
    return `<div class="class-${this.className}"></div>`;
  }

  buildCss(): string {
    let css = `background-color: rgba(${this.style.background.r},${this.style.background.g},${this.style.background.b},${this.style.background.a});`;
    if (this.style.border) {
      css += ` border: ${this.style.border.width}px solid rgba(${this.style.border.color.r},${this.style.border.color.g},${this.style.border.color.b},${this.style.border.color.a});`;
      if (this.style.border.inside) {
        css += ` box-sizing: border-box;`;
      }
    }
    if (this.style.radius !== 0) {
      css += ` border-radius: ${this.style.radius}px;`;
    }
    return `.class-${this.className} { ${css} }`;
  }
}
