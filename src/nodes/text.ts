import BaseNode from "./base";
import Parser from "../parser";
import { TextStyle } from "../types";

export default class TextNode extends BaseNode {
  style: TextStyle;
  text: string;
  embedVariables: string[];
  embedCompound?: string;

  constructor(
    parser: Parser,
    figmaObj: any,
    embedVariables: string[],
    embedCompound?: string,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(figmaObj.id, conditionVariable, loopVariable, eventType, eventName);
    this.text = figmaObj.characters;
    this.style = parser.textStyle(figmaObj);
    this.embedVariables = embedVariables;
    this.embedCompound = embedCompound;
  }

  buildTemplate(): string {
    return `<p class="class-${this.className}">${this.text}</p>`;
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
