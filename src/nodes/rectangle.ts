import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { RectangleStyle, Variable, Condition, Loop, Event } from "../types";

export default class RectangleNode extends BaseNode {
  style: RectangleStyle;

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(figma.id, idGenerator, variables, conditions, loops, events);
    this.style = parser.rectangleStyle(figma);
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
    css += this.buildBaseCss(this.style);
    return `.class-${this.className} { ${css} }`;
  }
}
