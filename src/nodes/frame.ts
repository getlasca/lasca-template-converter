import BaseNode from "./base";
import GroupNode from "./group";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import EmptyNode from "./empty";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  FrameStyle,
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
          const relativeParser = new Parser(node);
          childNode = new FrameNode(
            parser,
            idGenerator,
            node,
            false,
            figma.layoutMode,
            relativeParser,
            nodeImages,
            variables,
            conditions,
            loops,
            events
          );
          break;
        }
        case "GROUP":
          childNode = new GroupNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
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
            childParser,
            idGenerator,
            node,
            figma.layoutMode,
            node.type,
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
    let tag = `<div class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}>`;
    this.children.forEach((node: BaseNode) => {
      tag += node.buildTemplate();
    });
    tag += "</div>";
    return tag;
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

    if (this.style.backgroundColor) {
      css += `background-color: rgba(${this.style.backgroundColor.r},${this.style.backgroundColor.g},${this.style.backgroundColor.b},${this.style.backgroundColor.a});`;
    } else if (this.style.backgroundImage) {
      this.nodeImages.forEach((image) => {
        if (this.nodeId === image.nodeId) {
          css += `background: no-repeat center center url(https://assets.lasca.app/node_images/node-${image.imageId}.png);`;

          switch (this.style.backgroundImage?.scaleMode) {
            case "FILL": {
              css += `background-size: cover;`;
              break;
            }
            case "FIT": {
              css += `background-size: contain;`;
              break;
            }
          }
        }
      });
    }
    if (this.style.border) {
      css += ` border: ${this.style.border.width}px solid rgba(${this.style.border.color.r},${this.style.border.color.g},${this.style.border.color.b},${this.style.border.color.a});`;
      if (this.style.border.inside) {
        css += ` box-sizing: border-box;`;
      }
    }
    if (this.style.shadow) {
      css += ` box-shadow:`;
      if (this.style.shadow.inner) {
        css += ` inset`;
      }
      css += ` ${this.style.shadow.x}px ${this.style.shadow.y}px`;
      if (this.style.shadow.blur !== 0) {
        css += ` ${this.style.shadow.blur}px`;
        if (this.style.shadow.spread !== 0) {
          css += ` ${this.style.shadow.spread}px`;
        }
      }
      css += ` rgba(${this.style.shadow.color.r},${this.style.shadow.color.g},${this.style.shadow.color.b},${this.style.shadow.color.a});`;
    }
    if (
      this.style.radius.topLeft !== 0 ||
      this.style.radius.topRight !== 0 ||
      this.style.radius.bottomRight !== 0 ||
      this.style.radius.bottomLeft !== 0
    ) {
      css += ` border-radius: ${this.style.radius.topLeft}px ${this.style.radius.topRight}px ${this.style.radius.bottomRight}px ${this.style.radius.bottomLeft}px;`;
    }
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
          childCss += ` .class-${this.className} > *:not(:first-of-type) { `;
          childCss += `margin-${
            this.style.layoutMode === "HORIZONTAL" ? "left" : "top"
          }: ${this.style.itemSpacing}px;`;
          childCss += " }";
          break;
        }
        case "CENTER": {
          css += " justify-content: center;";
          childCss += ` .class-${this.className} > * { `;
          childCss += `margin-${
            this.style.layoutMode === "HORIZONTAL" ? "left" : "top"
          }: ${this.style.itemSpacing / 2}px;`;
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
    css += " }";
    return [css, childCss];
  }
}
