import IdGenerator from "../helper/idGenerator";
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
    idGenerator: IdGenerator,
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
    this.className = idGenerator.getId() + "";
  }

  abstract buildTemplate(): string;
  abstract buildCss(): string;

  protected buildBaseCss(input: BaseStyle): string {
    let css = " position: absolute;";
    css += ` top: ${input.y}px;`;
    css += ` height: ${input.height}px;`;

    switch (input.constraintsHorizontal) {
      case "LEFT": {
        css += ` left: ${input.x}px;`;
        css += ` width: ${input.width}px;`;
        break;
      }
      case "RIGHT": {
        css += ` right: ${input.xFromRight}px;`;
        css += ` width: ${input.width}px;`;
        break;
      }
      case "LEFT_RIGHT": {
        css += ` left: ${input.x}px;`;
        css += ` right: ${input.xFromRight}px;`;
        break;
      }
    }

    return css;
  }
}
