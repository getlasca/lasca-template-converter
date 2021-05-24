import BaseNode from "./base";
import FrameNode from "./frame";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";

export default class GroupNode extends BaseNode {
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figmaObj: any,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(
      figmaObj.id,
      idGenerator,
      conditionVariable,
      loopVariable,
      eventType,
      eventName
    );

    figmaObj.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME":
          childNode = new FrameNode(parser, idGenerator, node, false);
          break;
        case "GROUP":
          childNode = new GroupNode(parser, idGenerator, node);
          break;
        case "RECTANGLE":
          childNode = new RectangleNode(parser, idGenerator, node);
          break;
        case "TEXT":
          childNode = new TextNode(parser, idGenerator, node, []);
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(parser, idGenerator, node);
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
    return this.children
      .map((node: BaseNode) => {
        return node.buildCss();
      })
      .join(" ");
  }
}
