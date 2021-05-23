import { genHash } from "../util";
import { BaseStyle } from "../types";

export default abstract class BaseNode {
  nodeId: string;
  className: string;
  conditionVariable?: string;
  loopVariable?: string;
  eventType?: string;
  eventName?: string;

  constructor(
    nodeId: string,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    this.nodeId = nodeId;
    this.conditionVariable = conditionVariable;
    this.loopVariable = loopVariable;
    this.eventType = eventType;
    this.eventName = eventName;
    this.className = genHash();
  }

  abstract buildTemplate(): string;
  abstract buildCss(): string;

  protected buildBaseCss(input: BaseStyle): string {
    let css = " position: absolute;";
    css += ` top: ${input.y}px;`;
    css += ` width: ${input.width}px;`;
    css += ` height: ${input.height}px;`;
    if (input.constraintsHorizontal === "LEFT") {
      css += ` left: ${input.x}px;`;
    } else if (input.constraintsHorizontal === "RIGHT") {
      css += ` right: ${input.xFromRight}px;`;
    }
    return css;
  }
}
