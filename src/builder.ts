import {
  BreakPoint,
  BreakpointRange,
  Component,
  Embed,
  Condition,
  Loop,
  Event,
  Output,
} from "./types";
import BaseNode from "./nodes/base";
import FrameNode from "./nodes/frame";
import TextNode from "./nodes/text";
import RectangleNode from "./nodes/rectangle";
import { genHash } from "./util";

export interface ComponentNode {
  rootNode: FrameNode;
  breakPointId: string;
  range?: BreakpointRange;
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
        breakPoint.figmaObj,
        variables,
        embeds,
        conditions,
        loops,
        events
      );
      this.componentNodes.push({
        rootNode: rootNode,
        range: breakPoint.range,
        breakPointId: breakPointId,
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
    figmaObj: any,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ): FrameNode {
    const style = {
      background: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      opacity: 1,
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
    const rootNode = new FrameNode(figmaObj.id, style, []);

    figmaObj.children.forEach((node: any) => {
      let childNode: BaseNode;
      let style: any;
      switch (node.type) {
        case "RECTANGLE":
          style = {
            background: "a",
            radius: "a",
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            opacity: 1,
            constraintsHorizontal: "a",
            constraintsVertical: "a",
          };
          childNode = new RectangleNode(node.id, style);
          break;
        case "TEXT":
          style = {
            background: "a",
            color: "a",
            fontSize: "a",
            fontWeight: "a",
            fontFamily: "a",
            x: 1,
            y: 1,
            width: 1,
            height: 1,
            opacity: 1,
            constraintsHorizontal: "a",
            constraintsVertical: "a",
          };
          childNode = new TextNode(node.id, style, node.characters, []);
          break;
        // Code to avoid switch statement error. There is no pattern that matches this case.
        default:
          childNode = new RectangleNode(node.id, style);
          break;
      }
      rootNode.children.push(childNode);
    });

    return rootNode;
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
          node.range
        );
      })
      .join(" ");
  }

  private buildBreakPointCss(
    css: string,
    breakPointId: string,
    range?: BreakpointRange
  ): string {
    if (range && range.max && range.min) {
      return `@media screen and (max-width: ${range.max}px) and (min-width: ${
        range.min
      }px) { ${css} } @media screen and (min-width: ${
        range.max + 1
      }px) and (max-width: ${
        range.min - 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    if (range && range.max) {
      return `@media screen and (max-width: ${
        range.max
      }px) { ${css} } @media screen and (min-width: ${
        range.max + 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    if (range && range.min) {
      return `@media screen and (min-width: ${
        range.min
      }px) { ${css} } @media screen and (max-width: ${
        range.min - 1
      }px) { .breakpoint-${breakPointId} { display: none; } }`;
    }
    return css;
  }
}
