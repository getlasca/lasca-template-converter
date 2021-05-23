import {
  BreakPoint,
  Component,
  Embed,
  Condition,
  Loop,
  Event,
  Output,
} from "./types";
import FrameNode from "./nodes/frame";
import Parser from "./parser";
import { genHash } from "./util";

export interface ComponentNode {
  rootNode: FrameNode;
  breakPointId: string;
  min?: number;
  max?: number;
}

export default class Builder {
  componentNodes: ComponentNode[] = [];

  constructor(
    component: Component,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ) {
    component.breakpoints.forEach((breakPoint: BreakPoint) => {
      const breakPointId = genHash();
      const rootNode = this.parse(
        breakPoint.figma,
        variables,
        embeds,
        conditions,
        loops,
        events
      );
      this.componentNodes.push({
        rootNode: rootNode,
        breakPointId: breakPointId,
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
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ): FrameNode {
    const parser = new Parser(
      figma.absoluteBoundingBox.x,
      figma.absoluteBoundingBox.y,
      figma.absoluteBoundingBox.width
    );
    return new FrameNode(parser, figma, true);
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
