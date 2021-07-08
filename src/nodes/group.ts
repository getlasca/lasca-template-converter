import BaseNode from "./base";
import FrameNode from "./frame";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import VectorNode from "./vector";
import EmptyNode from "./empty";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

export default class GroupNode extends BaseNode {
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      layoutModeAsChild,
      mixedTexts,
      nodeImages,
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
            mixedTexts,
            nodeImages,
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
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "RECTANGLE":
        case "ELLIPSE":
        case "LINE":
          childNode = new RectangleNode(
            parser,
            idGenerator,
            node,
            "NONE",
            node.type,
            mixedTexts,
            nodeImages,
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
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "Vector":
          childNode = new VectorNode(
            parser,
            idGenerator,
            node,
            "NONE",
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events
          );
          break;
        default:
          childNode = new EmptyNode(
            parser,
            idGenerator,
            node,
            "NONE",
            mixedTexts,
            nodeImages,
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
