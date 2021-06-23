import BaseNode from "./base";
import FrameNode from "./frame";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { Variable, Condition, Loop, Event } from "../types";

export default class GroupNode extends BaseNode {
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      layoutModeAsChild,
      variables,
      conditions,
      loops,
      events
    );

    figma.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "COMPONENT_SET":
        case "INSTANCE":
          childNode = new FrameNode(
            parser,
            idGenerator,
            node,
            false,
            "NONE",
            undefined,
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "GROUP":
          childNode = new GroupNode(
            parser,
            idGenerator,
            node,
            "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "RECTANGLE":
          childNode = new RectangleNode(
            parser,
            idGenerator,
            node,
            "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "TEXT":
          childNode = new TextNode(
            parser,
            idGenerator,
            node,
            "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(
            parser,
            idGenerator,
            node,
            "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
      }
      this.children.push(childNode);
    });
  }

  buildTemplate(): string {
    let tag = `<div${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}>`;
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
