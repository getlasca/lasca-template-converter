import BaseNode from "./base";
import TextNode from "./text";
import RectangleNode from "./rectangle";
import Parser from "../parser";
import { FrameStyle } from "../types";

export default class FrameNode extends BaseNode {
  style: FrameStyle;
  children: BaseNode[] = [];

  constructor(
    parser: Parser,
    figmaObj: any,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(figmaObj.id, conditionVariable, loopVariable, eventType, eventName);
    this.style = parser.frameStyle(figmaObj);

    figmaObj.children.forEach((node: any) => {
      let childNode: BaseNode;
      switch (node.type) {
        case "RECTANGLE":
          childNode = new RectangleNode(node.id, parser.rectangleStyle(node));
          break;
        case "TEXT":
          childNode = new TextNode(
            node.id,
            parser.textStyle(node),
            node.characters,
            []
          );
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(node.id, parser.rectangleStyle(node));
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
    return css;
  }
}
