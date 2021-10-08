import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  VectorStyle,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

export default class VectorNode extends BaseNode {
  style: VectorStyle;

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
    this.style = parser.vectorStyle(figma);
  }

  buildTemplate(): string {
    return `<span class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}></span>`;
  }

  buildCss(): string {
    let css = this.buildBaseLayoutCss(this.style);
    const image = this.nodeImages.find((image) => this.nodeId === image.nodeId);
    if (image) {
      css += `background: no-repeat center center url(${
        process.env.LASCA_ASSETS_URL || "https://assets.lasca.app"
      }/node_images/node-${image.imageId}.svg);`;
    }
    return `.class-${this.className} { ${css} }`;
  }
}
