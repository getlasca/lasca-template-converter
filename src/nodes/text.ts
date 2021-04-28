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
    return `<p class="class-${this.className}">` + this.text + "</p>";
  }

  buildCss(): string {
    return `p{color:red;}`;
  }
}
