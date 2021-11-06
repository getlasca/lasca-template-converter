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
  Link,
} from "../types";

export default class RectangleNode extends BaseNode {
  style: RectangleStyle;

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild:
      | "NONE"
      | "HORIZONTAL"
      | "VERTICAL"
      | "AUTOLAYOUT_GROUP"
      | "HORIZONTAL_GROUP_FILL_CONTAINER",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = [],
    links: Link[] = []
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
      events,
      links
    );
    this.style = parser.rectangleStyle(figma);
  }

  buildTemplate(type: "jsx" | "vue"): string {
    return this.buildTag(type, "div", this.className, "");
  }

  buildCss(): string {
    return `.class-${this.className} { ${
      this.buildBaseShapeCss(this.style) +
      this.buildBaseLayoutCss(this.style) +
      this.buildCursorCss()
    } }`;
  }
}
