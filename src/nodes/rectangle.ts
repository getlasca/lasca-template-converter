import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  RectangleStyle,
  MixedText,
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
      const image = this.nodeImages.find(
        (image) => this.nodeId === image.nodeId
      );
      if (image) {
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
    } else if (this.style.backgroundGradient) {
      let type = "";
      let position = ""; // TODO: position should be calculated from transform matrix by affin transformation
      switch (this.style.backgroundGradient.type) {
        case "GRADIENT_LINEAR": {
          type = "linear";
          position = "180deg";
          break;
        }
        case "GRADIENT_RADIAL": {
          type = "radial";
          position = "50% 50% at 50% 50%";
          break;
        }
        case "GRADIENT_ANGULAR": {
          type = "conic";
          position = "from 180deg at 50% 50%";
          break;
        }
      }
      const gradientStops = this.style.backgroundGradient.gradientStops
        .map((stop) => {
          return ` rgba(${stop.color.r},${stop.color.g},${stop.color.b},${
            stop.color.a
          }) ${
            this.style.backgroundGradient &&
            this.style.backgroundGradient.type === "GRADIENT_ANGULAR"
              ? Math.round(stop.position * 360 * 100) / 100 + "deg"
              : Math.round(stop.position * 100 * 100) / 100 + "%"
          }`;
        })
        .join(",");
      css += `background: ${type}-gradient(${position},${gradientStops});`;
    }
    if (this.style.border) {
      css += ` border: ${this.style.border.width}px solid rgba(${this.style.border.color.r},${this.style.border.color.g},${this.style.border.color.b},${this.style.border.color.a});`;
      if (this.style.border.inside) {
        css += ` box-sizing: border-box;`;
      }
    }
    const shadowsCss = this.style.shadows.map((shadow) => {
      return `${shadow.inner ? " inset" : ""} ${shadow.x}px ${shadow.y}px ${
        shadow.blur
      }px ${shadow.spread}px rgba(${shadow.color.r},${shadow.color.g},${
        shadow.color.b
      },${shadow.color.a})`;
    });
    if (shadowsCss.length > 0) {
      css += ` box-shadow:${shadowsCss.join(",")};`;
    }
    if (this.style.layerBlur) {
      css += ` filter: blur(${this.style.layerBlur.radius}px);`;
    }
    if (this.style.backgroundBlur) {
      css += ` backdrop-filter: blur(${this.style.backgroundBlur.radius}px);`;
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
