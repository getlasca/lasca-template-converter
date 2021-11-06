import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

export default class EmptyNode extends BaseNode {
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
    MixedTexts: MixedText[] = [],
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
      MixedTexts,
      nodeImages,
      variables,
      conditions,
      loops,
      events
    );
  }

  buildTemplate(): string {
    return "";
  }

  buildCss(): string {
    return "";
  }
}
