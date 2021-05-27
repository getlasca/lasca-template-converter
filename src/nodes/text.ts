import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { TextStyle, Variable, Condition, Loop, Event } from "../types";

export default class TextNode extends BaseNode {
  style: TextStyle;
  text: string;

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
    this.text = figma.characters;
    this.style = parser.textStyle(figma);
  }

  buildTemplate(): string {
    return `<p class="class-${this.className}"${this.buildCondition()}>${
      this.text
    }</p>`;
  }

  buildCss(): string {
    let css = `color: rgba(${this.style.color.r},${this.style.color.g},${this.style.color.b},${this.style.color.a});`;
    css += ` font-size: ${this.style.fontSize}px;`;
    css += ` font-weight: ${this.style.fontWeight};`;
    css += ` font-family: ${this.style.fontFamily};`;
    css += this.buildBaseCss(this.style);
    return `.class-${this.className} { ${css} }`;
  }
}
