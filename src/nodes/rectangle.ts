import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  RectangleStyle,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

export default class RectangleNode extends BaseNode {
  style: RectangleStyle;
  type: "RECTANGLE" | "ELLIPSE" | "LINE";

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    type: "RECTANGLE" | "ELLIPSE" | "LINE",
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
    this.style = parser.rectangleStyle(figma);
    this.type = type;
  }

  buildTemplate(): string {
    return `<div class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}></div>`;
  }

  buildCss(): string {
    let css = "";
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
    if (this.type === "ELLIPSE") {
      css += ` border-radius: 50%;`;
    } else if (
      this.style.radius.topLeft !== 0 ||
      this.style.radius.topRight !== 0 ||
      this.style.radius.bottomRight !== 0 ||
      this.style.radius.bottomLeft !== 0
    ) {
      css += ` border-radius: ${this.style.radius.topLeft}px ${this.style.radius.topRight}px ${this.style.radius.bottomRight}px ${this.style.radius.bottomLeft}px;`;
    }
    css += this.buildBaseLayoutCss(this.style);
    return `.class-${this.className} { ${css} }`;
  }
}
