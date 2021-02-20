import BaseNode from "./base";
import { RectangleStyle } from "../types";

export default class RectangleNode extends BaseNode {
  style: RectangleStyle;

  constructor(
    nodeId: string,
    style: RectangleStyle,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.style = style;
  }

  buildTemplate(): string {
    return "";
  }

  buildCss(): string {
    return "";
  }
}
