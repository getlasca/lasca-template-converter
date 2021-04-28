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
    return "<div></div>";
  }

  buildCss(): string {
    return "";
  }
}
