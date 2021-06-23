import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import { Variable, Condition, Loop, Event } from "../types";

export default class EmptyNode extends BaseNode {
  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      layoutModeAsChild,
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
