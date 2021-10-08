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

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = [],
    parentLoopVaribles: string[] = []
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
      parentLoopVaribles
    );
    this.style = parser.rectangleStyle(figma);
  }

  buildTemplate(): string {
    return `<div class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}></div>`;
  }

  buildCss(): string {
    return `.class-${this.className} { ${
      this.buildBaseShapeCss(this.style) + this.buildBaseLayoutCss(this.style)
    } }`;
  }
}
