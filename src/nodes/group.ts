import BaseNode from "./base";
import { GroupStyle } from "../types";

export default class GroupNode extends BaseNode {
  style: GroupStyle;
  children: BaseNode[];

  constructor(
    nodeId: string,
    style: GroupStyle,
    children: BaseNode[],
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.style = style;
    this.children = children;
  }

  buildTemplate(): string {
    return "";
  }

  buildCss(): string {
    return "";
  }
}
