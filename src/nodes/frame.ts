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
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    relativeParser?: Parser,
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
            events
          );
          break;
        }
        case "GROUP": {
          childNode = new GroupNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
            figma.layoutMode === "NONE"
              ? undefined
              : new Parser("GROUP_AUTOLAYOUT_CHILD", node),
            mixedTexts,
            nodeImages,
            variables,
            conditions,
            loops,
            events
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
            events
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
            events
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
            events
          );
          break;
        default:
          childNode = new EmptyNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
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

  buildTemplate(type: "jsx" | "vue"): string {
    let inner = "";
    this.children.forEach((node: BaseNode) => {
      inner += node.buildTemplate(type);
    });
    return this.buildTag(type, "div", this.className, inner);
  }

  buildCss(): string {
    const [mainCss, childCss] = this.buildFrameCss();
    let css = mainCss + childCss;
    this.children.forEach((node: BaseNode) => {
      css += node.buildCss();
    });
    return css;
  }

  private buildFrameCss(): [string, string] {
    let css = `.class-${this.className} { `;
    let childCss = "";

    css += this.buildBaseShapeCss(this.style);

    if (this.style.clipsContent) {
      css += " overflow: hidden;";
    }

    // AutoLayout
    if (this.style.layoutMode !== "NONE") {
      css += ` padding-left: ${this.style.paddingLeft}px;`;
      css += ` padding-right: ${this.style.paddingRight}px;`;
      css += ` padding-top: ${this.style.paddingTop}px;`;
      css += ` padding-bottom: ${this.style.paddingBottom}px;`;
      css += " box-sizing: border-box;";
      css += " display: flex;";
      css += ` flex-direction: ${
        this.style.layoutMode === "HORIZONTAL" ? "row" : "column"
      };`;

      switch (this.style.primaryAxisAlignItems) {
        case "MIN": {
          css += " justify-content: flex-start;";
          childCss += ` .class-${this.className} > *:not(:last-child) { `;
          childCss += `margin-${
            this.style.layoutMode === "HORIZONTAL" ? "right" : "bottom"
          }: ${this.style.itemSpacing}px;`;
          childCss += " }";
          break;
        }
        case "MAX": {
          css += " justify-content: flex-end;";
          childCss += ` .class-${this.className} > *:not(:first-child) { `;
          childCss += `margin-${
            this.style.layoutMode === "HORIZONTAL" ? "left" : "top"
          }: ${this.style.itemSpacing}px;`;
          childCss += " }";
          break;
        }
        case "CENTER": {
          css += " justify-content: center;";

          childCss += ` .class-${this.className} > *:not(:first-child) { `;
          childCss += `margin-${
            this.style.layoutMode === "HORIZONTAL" ? "left" : "top"
          }: ${this.style.itemSpacing / 2}px;`;
          childCss += " }";

          childCss += ` .class-${this.className} > *:not(:last-child) { `;
          childCss += ` margin-${
            this.style.layoutMode === "HORIZONTAL" ? "right" : "bottom"
          }: ${this.style.itemSpacing / 2}px;`;
          childCss += " }";
          break;
        }
        case "SPACE_BETWEEN": {
          css += " justify-content: space-between;";
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
    return [css, childCss];
  }
}
