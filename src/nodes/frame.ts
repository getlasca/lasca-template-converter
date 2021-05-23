import BaseNode from "./base";
import GroupNode from "./group";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import { FrameStyle } from "../types";

export default class FrameNode extends BaseNode {
  isRoot: boolean;
  style: FrameStyle;
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    figma: any,
    isRoot: boolean,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(figma.id, conditionVariable, loopVariable, eventType, eventName);
    this.isRoot = isRoot;
    this.style = parser.frameStyle(figma);

    figma.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME": {
          const relativeParser = new Parser(
            figma.absoluteBoundingBox.x,
            figma.absoluteBoundingBox.y,
            figma.absoluteBoundingBox.width
          );
          childNode = new FrameNode(relativeParser, node, false);
          break;
        }
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
    let tag = `<div class="class-${this.className}">`;
    this.children.forEach((node: BaseNode) => {
      tag += node.buildTemplate();
    });
    tag += "</div>";
    return tag;
  }

  buildCss(): string {
    let css = `.class-${this.className} { ${this.buildFrameCss()} } `;
    this.children.forEach((node: BaseNode) => {
      css += node.buildCss();
    });
    return css;
  }

  private buildFrameCss(): string {
    let css = `background-color: rgba(${this.style.background.r},${this.style.background.g},${this.style.background.b},${this.style.background.a});`;
    if (this.style.border) {
      css += ` border: ${this.style.border.width}px solid rgba(${this.style.border.color.r},${this.style.border.color.g},${this.style.border.color.b},${this.style.border.color.a});`;
      if (this.style.border.inside) {
        css += ` box-sizing: border-box;`;
      }
    }
    if (this.style.radius !== 0) {
      css += ` border-radius: ${this.style.radius}px;`;
    }
    if (this.isRoot) {
      css += ` position: relative;`;
    } else {
      css += this.buildBaseCss(this.style);
    }
    return css;
  }
}
