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
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      layoutModeAsChild,
      variables,
      conditions,
      loops,
      events
    );
    this.text = figma.characters;
    this.style = parser.textStyle(figma);
  }

  buildTemplate(): string {
    return `<p class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}>${
      this.buildVariable() || this.text
    }</p>`;
  }

  buildCss(): string {
    let css = `color: rgba(${this.style.color.r},${this.style.color.g},${this.style.color.b},${this.style.color.a});`;
    css += ` font-size: ${this.style.fontSize}px;`;
    css += ` font-weight: ${this.style.fontWeight};`;
    css += ` font-family: ${this.style.fontFamily};`;
    if (this.style.letterSpacing !== 0) {
      css += ` letter-spacing: ${this.style.letterSpacing}px;`;
    }
    if (this.style.shadow && !this.style.shadow.inner) {
      css += ` text-shadow:`;
      css += ` ${this.style.shadow.x}px ${this.style.shadow.y}px`;
      if (this.style.shadow.blur !== 0) {
        css += ` ${this.style.shadow.blur}px`;
      }
      css += ` rgba(${this.style.shadow.color.r},${this.style.shadow.color.g},${this.style.shadow.color.b},${this.style.shadow.color.a});`;
    }
    css += this.buildBaseLayoutCss(this.style);
    return `.class-${this.className} { ${css} }`;
  }
}
