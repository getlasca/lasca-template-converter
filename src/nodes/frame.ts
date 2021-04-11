import BaseNode from "./base";
import { FrameStyle } from "../types";

export default class FrameNode extends BaseNode {
  style: FrameStyle;
  children: BaseNode[];

  constructor(
    nodeId: string,
    style: FrameStyle,
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
    let tag = "<div>";
    this.children.forEach((node: BaseNode) => {
      tag = tag + node.buildTemplate();
    });
    tag = tag + "</div>";
    return tag;
  }

  buildCss(): string {
    let css = "";
    this.children.forEach((node: BaseNode) => {
      css = css + node.buildCss();
    });
    return css;
  }
}
