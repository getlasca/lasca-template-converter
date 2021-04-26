import BaseNode from "./base";
import { FrameStyle } from "../types";

export default class FrameNode extends BaseNode {
  style: FrameStyle;
  children: BaseNode[];

  constructor(
    nodeId: string,
    style: FrameStyle,
    children: BaseNode[],
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.style = style;
    this.children = children;
  }

  buildTemplate(): string {
    let tag = `<div class="class-${this.className}">`;
    this.children.forEach((node: BaseNode) => {
      tag = tag + node.buildTemplate();
    });
    tag = tag + "</div>";
    return tag;
  }

  buildCss(): string {
    let css = `.class-${this.className} { ${this.buildFrameCss()} } `;
    this.children.forEach((node: BaseNode) => {
      css = css + node.buildCss();
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
