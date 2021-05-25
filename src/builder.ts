import { Breakpoint, Variable, Condition, Loop, Event, Output } from "./types";
import FrameNode from "./nodes/frame";
import Parser from "./parser";
import IdGenerator from "./helper/idGenerator";

export interface ComponentNode {
  rootNode: FrameNode;
  breakPointId: string;
  min?: number;
  max?: number;
}

export default class Builder {
  componentNodes: ComponentNode[] = [];

  constructor(breakpoints: Breakpoint[]) {
    const breakPointIdGenerator = new IdGenerator();
    breakpoints.forEach((breakPoint: Breakpoint) => {
      const rootNode = this.parse(
        breakPoint.figma,
        breakPoint.variables,
        breakPoint.conditions,
        breakPoint.loops,
        breakPoint.events
      );
      this.componentNodes.push({
        rootNode: rootNode,
        breakPointId: breakPointIdGenerator.getId() + "",
        min: breakPoint.min,
        max: breakPoint.max,
      });
    });
  }

  build(): Output {
    return {
      template: this.buildTemplate(),
      css: this.buildCss(),
    };
  }

  private parse(
    figma: any,
    variables: Variable[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ): FrameNode {
    const parser = new Parser(
      figma.absoluteBoundingBox.x,
      figma.absoluteBoundingBox.y,
      figma.absoluteBoundingBox.width
    );
    const classIdGenerator = new IdGenerator();
    return new FrameNode(parser, classIdGenerator, figma, true);
  }

  private buildTemplate(): string {
    return (
      "<div>" +
      this.componentNodes
        .map(
          (node) =>
            `<div class="breakpoint-${
              node.breakPointId
            }">${node.rootNode.buildTemplate()}</div>`
        )
        .join("") +
      "</div>"
    );
  }

  private buildCss(): string {
    return this.componentNodes
      .map((node) => {
        return this.buildBreakPointCss(
          node.rootNode.buildCss(),
          node.breakPointId,
          node.min,
          node.max
        );
      })
      .join(" ");
  }

  private buildBreakPointCss(
    css: string,
    breakPointId: string,
    min?: number,
    max?: number
  ): string {
    if (max && min) {
      return `@media screen and (max-width: ${max}px) and (min-width: ${min}px) { ${css} } @media screen and (min-width: ${
        max + 1
      }px) and (max-width: ${
        min - 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    if (max) {
      return `@media screen and (max-width: ${max}px) { ${css} } @media screen and (min-width: ${
        max + 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    if (min) {
      return `@media screen and (min-width: ${min}px) { ${css} } @media screen and (max-width: ${
        min - 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    return css;
  }
}
