import BaseNode from "./base";
import GroupNode from "./group";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import VectorNode from "./vector";
import EmptyNode from "./empty";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  FrameStyle,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
  Link,
} from "../types";

export default class FrameNode extends BaseNode {
  isRoot: boolean;
  style: FrameStyle;
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    isRoot: boolean,
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
    this.isRoot = isRoot;
    this.style = parser.frameStyle(figma);
    const childParser = relativeParser || parser;

    figma.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME":
        case "COMPONENT":
        case "COMPONENT_SET":
        case "INSTANCE": {
          const relativeParser = new Parser("FRAME", node);
          childNode = new FrameNode(
            childParser,
            idGenerator,
            node,
            false,
            figma.layoutMode,
            relativeParser,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        }
        case "GROUP": {
          childNode = new GroupNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
            figma.layoutMode !== "NONE"
              ? new Parser("GROUP_RELATIVE_POSITION", node)
              : undefined,
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events,
            links
          );
          break;
        }
        case "RECTANGLE":
        case "ELLIPSE":
        case "LINE":
          childNode = new RectangleNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
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
            figma.layoutMode,
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
            figma.layoutMode,
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
            figma.layoutMode
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
    let css = this.buildFrameCss();
    this.children.forEach((node: BaseNode) => {
      css += node.buildCss();
    });
    return css;
  }

  private buildFrameCss(): string {
    let css = `.class-${this.className} { `;
    let childCss = "";

    css += this.buildBaseShapeCss(this.style);

    if (this.style.clipsContent) {
      css += " overflow: hidden;";
    }

    // AutoLayout
    if (this.style.layoutMode !== "NONE") {
      css += " box-sizing: border-box;";
      css += " display: flex;";
      css += ` flex-direction: ${
        this.style.layoutMode === "HORIZONTAL" ? "row" : "column"
      };`;
      css += ` padding-top: ${this.style.paddingTop}px;`;
      css += ` padding-bottom: ${this.style.paddingBottom}px;`;
      css += ` padding-left: ${this.style.paddingLeft}px;`;
      css += ` padding-right: ${this.style.paddingRight}px;`;

      const gapProperty =
        this.style.layoutMode === "HORIZONTAL" ? "column-gap" : "row-gap";

      switch (this.style.primaryAxisAlignItems) {
        case "MIN": {
          css += " justify-content: flex-start;";
          css += ` ${gapProperty}: ${this.style.itemSpacing}px;`;
          break;
        }
        case "MAX": {
          css += " justify-content: flex-end;";
          css += ` ${gapProperty}: ${this.style.itemSpacing}px;`;
          break;
        }
        case "CENTER": {
          css += " justify-content: center;";
          css += ` ${gapProperty}: ${this.style.itemSpacing}px;`;
          break;
        }
        case "SPACE_BETWEEN": {
          css += " justify-content: space-between;";

          // center if one element in autolayout frame
          childCss += ` .class-${this.className} > *:only-child { `;
          childCss += `margin: ${
            this.style.layoutMode === "HORIZONTAL" ? "0 auto" : "auto 0"
          };`;
          childCss += " }";
          break;
        }
      }

      switch (this.style.counterAxisAlignItems) {
        case "MIN": {
          css += " align-items: flex-start;";
          break;
        }
        case "MAX": {
          css += " align-items: flex-end;";
          break;
        }
        case "CENTER": {
          css += " align-items: center;";
          break;
        }
      }
    }

    css += this.buildBaseLayoutCss(this.style, this.isRoot);
    css += this.buildCursorCss();
    css += " }";
    return css + childCss;
  }
}
