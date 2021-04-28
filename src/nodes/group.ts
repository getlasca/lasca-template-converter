import BaseNode from "./base";
import FrameNode from "./frame";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";

export default class GroupNode extends BaseNode {
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    figmaObj: any,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(figmaObj.id, conditionVariable, loopVariable, eventType, eventName);

    figmaObj.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME":
          childNode = new FrameNode(parser, node);
          break;
        case "GROUP":
          childNode = new GroupNode(parser, node);
          break;
        case "RECTANGLE":
          childNode = new RectangleNode(parser, node);
          break;
        case "TEXT":
          childNode = new TextNode(parser, node, []);
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(parser, node);
          break;
      }
      this.children.push(childNode);
    });
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
