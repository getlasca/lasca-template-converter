import BaseNode from "./base";
import GroupNode from "./group";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { FrameStyle } from "../types";

export default class FrameNode extends BaseNode {
  isRoot: boolean;
  style: FrameStyle;
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    isRoot: boolean,
    relativeParser?: Parser,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(
      figma.id,
      idGenerator,
      conditionVariable,
      loopVariable,
      eventType,
      eventName
    );
    this.isRoot = isRoot;
    this.style = parser.frameStyle(figma);
    const childParser = relativeParser || parser;

    figma.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "FRAME": {
          const relativeParser = new Parser(
            node.absoluteBoundingBox.x,
            node.absoluteBoundingBox.y,
            node.absoluteBoundingBox.width
          );
          childNode = new FrameNode(
            parser,
            idGenerator,
            node,
            false,
            relativeParser
          );
          break;
        }
        case "GROUP":
          childNode = new GroupNode(childParser, idGenerator, node);
          break;
        case "RECTANGLE":
          childNode = new RectangleNode(childParser, idGenerator, node);
          break;
        case "TEXT":
          childNode = new TextNode(childParser, idGenerator, node, []);
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(childParser, idGenerator, node);
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
