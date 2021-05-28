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
    relativeParser?: Parser,
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(figma.id, idGenerator, variables, conditions, loops, events);
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
    let css = `.class-${this.className} { ${this.buildFrameCss()} }`;
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
