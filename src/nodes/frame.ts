import BaseNode from "./base";
import GroupNode from "./group";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { FrameStyle, Variable, Condition, Loop, Event } from "../types";

export default class FrameNode extends BaseNode {
  isRoot: boolean;
  style: FrameStyle;
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    isRoot: boolean,
    isAutoLayoutChild: boolean,
    relativeParser?: Parser,
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      isAutoLayoutChild,
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
        case "FRAME": {
          const relativeParser = new Parser(node.width);
          childNode = new FrameNode(
            parser,
            idGenerator,
            node,
            false,
            figma.layoutMode !== "NONE",
            relativeParser,
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
            figma.layoutMode !== "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
        case "RECTANGLE":
          childNode = new RectangleNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode !== "NONE",
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
            figma.layoutMode !== "NONE",
            variables,
            conditions,
            loops,
            events
          );
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(
            childParser,
            idGenerator,
            node,
            figma.layoutMode !== "NONE",
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
    let css = `.class-${this.className} { ${mainCss} }`;
    if (childCss) {
      css += `.class-${this.className} > * { ${childCss} }`;
    }
    this.children.forEach((node: BaseNode) => {
      css += node.buildCss();
    });
    return css;
  }

  private buildFrameCss(): [string, string] {
    let css = "";
    let childCss = "";

    if (this.style.background) {
      css += `background-color: rgba(${this.style.background.r},${this.style.background.g},${this.style.background.b},${this.style.background.a});`;
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

    // AutoLayout
    if (this.style.layoutMode !== "NONE") {
      css += ` padding-left: ${this.style.paddingLeft}px;`;
      css += ` padding-right: ${this.style.paddingRight}px;`;
      css += ` padding-top: ${this.style.paddingTop}px;`;
      css += ` padding-bottom: ${this.style.paddingBottom}px;`;

      if (this.style.layoutMode === "HORIZONTAL") {
        css += " display: flex;";

        switch (this.style.primaryAxisAlignItems) {
          case "MIN": {
            css += " justify-content: flex-start;";
            childCss += `margin-right: ${this.style.itemSpacing}px;`;
            break;
          }
          case "MAX": {
            css += " justify-content: flex-end;";
            childCss += `margin-left: ${this.style.itemSpacing}px;`;
            break;
          }
          case "CENTER": {
            css += " justify-content: center;";
            childCss += `margin-left: ${this.style.itemSpacing / 2}px;`;
            childCss += `margin-right: ${this.style.itemSpacing / 2}px;`;
            break;
          }
          case "SPACE_BETWEEN": {
            css += " justify-content: space-between;";
            break;
          }
        }
      }
    } else {
      if (this.isRoot) {
        css += ` position: relative;`;
      } else {
        css += this.buildBaseCss(this.style);
      }
    }
    return [css, childCss];
  }
}
