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

  protected buildVariable(): string {
    const variable = this.variables.find((variable) => {
      return this.nodeId === variable.nodeId;
    });
    return variable ? `{{ ${variable.expression} }}` : "";
  }

  protected buildCondition(): string {
    const condition = this.conditions.find((condition) => {
      return this.nodeId === condition.nodeId;
    });
    return condition ? ` v-if="${condition.expression}"` : "";
  }

  protected buildLoop(): string {
    const loop = this.loops.find((loop) => {
      return this.nodeId === loop.nodeId;
    });
    return loop
      ? ` v-for="${loop.itemVariable} in ${loop.variable}" :key="${loop.itemVariable}.id"`
      : "";
  }

  protected buildEvent(): string {
    const event = this.events.find((event) => {
      return this.nodeId === event.nodeId;
    });
    return event ? ` v-on:${event.eventType}="${event.name}"` : "";
  }

  protected buildBaseCss(input: BaseStyle): string {
    let css = " position: absolute;";

    switch (input.constraintsVertical) {
      case "MIN": {
        css += ` top: ${input.y}px;`;
        css += ` height: ${input.height}px;`;
        break;
      }
      case "MAX": {
        css += ` bottom: ${input.yFromBottom}px;`;
        css += ` height: ${input.height}px;`;
        break;
      }
      case "STRETCH": {
        css += ` top: ${input.y}px;`;
        css += ` bottom: ${input.yFromBottom}px;`;
        break;
      }
    }

    switch (input.constraintsHorizontal) {
      case "MIN": {
        css += ` left: ${input.x}px;`;
        css += ` width: ${input.width}px;`;
        break;
      }
      case "MAX": {
        css += ` right: ${input.xFromRight}px;`;
        css += ` width: ${input.width}px;`;
        break;
      }
      case "STRETCH": {
        css += ` left: ${input.x}px;`;
        css += ` right: ${input.xFromRight}px;`;
        break;
      }
    }

    return css;
  }
}
