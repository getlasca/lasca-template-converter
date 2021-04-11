import BaseNode from "./base";
import { TextStyle } from "../types";

export default class TextNode extends BaseNode {
  style: TextStyle;
  text: string;
  embedVariables: string[];
  embedCompound?: string;

  constructor(
    nodeId: string,
    style: TextStyle,
    text: string,
    embedVariables: string[],
    embedCompound?: string,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.text = text;
    this.style = style;
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
