import IdGenerator from "../helper/idGenerator";
import { BaseStyle, Variable, Condition, Loop, Event } from "../types";

export default abstract class BaseNode {
  nodeId: string;
  className: string;
  variables: Variable[];
  conditions: Condition[];
  loops: Loop[];
  events: Event[];

  constructor(
    nodeId: string,
    idGenerator: IdGenerator,
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    this.nodeId = nodeId;
    this.className = idGenerator.getId() + "";
    this.variables = variables;
    this.conditions = conditions;
    this.loops = loops;
    this.events = events;
  }

  abstract buildTemplate(): string;
  abstract buildCss(): string;

  protected buildCondition(): string {
    const condition = this.conditions.find((condition) => {
      return this.nodeId === condition.nodeId;
    });
    if (condition) {
      return ` v-if="${condition.expression}"`;
    }
    return "";
  }

  protected buildEvent(): string {
    const event = this.events.find((event) => {
      return this.nodeId === event.nodeId;
    });
    if (event) {
      return ` v-on:${event.eventType}="${event.name}"`;
    }
    return "";
  }

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
