import BaseNode from "./base";
import FrameNode from "./frame";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import VectorNode from "./vector";
import EmptyNode from "./empty";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  GroupStyle,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
  Link,
} from "../types";

export default class GroupNode extends BaseNode {
  children: BaseNode[] = [];
  style: GroupStyle;

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild:
      | "NONE"
      | "HORIZONTAL"
      | "VERTICAL"
      | "AUTOLAYOUT_GROUP"
      | "HORIZONTAL_GROUP_FILL_CONTAINER",
    relativeParser?: Parser,
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = [],
    links: Link[] = []
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
      events,
      links
    );

    this.style = parser.groupStyle(figma);
    const childParser = relativeParser || parser;

    let childLayoutModeAsChild = this.layoutModeAsChild;
    if (
      (this.layoutModeAsChild === "HORIZONTAL" &&
        this.style.layoutGrow === 1) ||
      (this.layoutModeAsChild === "VERTICAL" &&
        this.style.layoutAlign === "STRETCH")
    ) {
      childLayoutModeAsChild = "HORIZONTAL_GROUP_FILL_CONTAINER";
    } else if (["HORIZONTAL", "VERTICAL"].includes(this.layoutModeAsChild)) {
      childLayoutModeAsChild = "AUTOLAYOUT_GROUP";
    }

    figma.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "COMPONENT_SET":
        case "INSTANCE":
          childNode = new FrameNode(
            childParser,
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
            events,
            links
          );
          break;
        case "GROUP":
          childNode = new GroupNode(
            childParser,
            idGenerator,
            node,
            childLayoutModeAsChild,
            undefined,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        case "RECTANGLE":
        case "ELLIPSE":
        case "LINE":
          childNode = new RectangleNode(
            childParser,
            idGenerator,
            node,
            childLayoutModeAsChild,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        case "TEXT":
          childNode = new TextNode(
            childParser,
            idGenerator,
            node,
            childLayoutModeAsChild,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        case "VECTOR":
          childNode = new VectorNode(
            childParser,
            idGenerator,
            node,
            childLayoutModeAsChild,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        default:
          childNode = new EmptyNode(
            childParser,
            idGenerator,
            node,
            childLayoutModeAsChild
          );
          break;
      }
      this.children.push(childNode);
    });
  }

  buildTemplate(type: "jsx" | "vue"): string {
    let inner = "";
    this.children.forEach((node: BaseNode) => {
      inner += node.buildTemplate(type);
    });
    return this.buildTag(type, "div", this.className, inner);
  }

  buildCss(): string {
    let css = "";
    let cssInner = "";

    if (this.style.isFixedPosition) {
      cssInner += ` position: fixed;`;
      cssInner += ` left: ${this.style.x}px;`;
      cssInner += ` top: ${this.style.y}px;`;
    }

    if (["HORIZONTAL", "VERTICAL"].includes(this.layoutModeAsChild)) {
      cssInner += this.buildAutoLayoutChildCss(
        this.style.width,
        this.style.height,
        false,
        false,
        this.style.layoutAlign,
        this.style.layoutGrow
      );
    }

    const cursorCss = this.buildCursorCss();
    if (cursorCss) {
      cssInner += cursorCss;
    }

    if (cssInner) {
      css += `.class-${this.className} {${cssInner} }`;
    }

    css += this.children
      .map((node: BaseNode) => {
        return node.buildCss();
      })
      .join(" ");
    return css;
  }
}
