import BaseNode from "./base";

export default class GroupNode extends BaseNode {
  children: BaseNode[];

  constructor(
    nodeId: string,
    children: BaseNode[],
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.children = children;
  }

  buildTemplate(): string {
    let tag = "<div>";
    this.children.forEach((node: BaseNode) => {
      tag += node.buildTemplate();
    });
    tag += "</div>";
    return tag;
  }

  buildCss(): string {
    return "";
  }
}
