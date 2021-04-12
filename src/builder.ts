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

export interface ComponentNode {
  rootNode: FrameNode;
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
      const rootNode = this.parse(
        breakPoint.figmaObj,
        variables,
        embeds,
        conditions,
        loops,
        events
      );
      this.componentNodes.push({ rootNode: rootNode, range: breakPoint.range });
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
    // set rootNode from input

    // FrameNode
    const nodeId = Object.keys(figmaObj.nodes)[0];
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
    const frameNode = new FrameNode(nodeId, style, []);

    // RectangleNode, TextNode
    figmaObj.nodes[nodeId].document.children.forEach((node: any) => {
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
      frameNode.children.push(childNode);
    });

    return frameNode;
  }

  private buildTemplate(): string {
    return this.componentNodes
      .map((node) => node.rootNode.buildTemplate())
      .join("");
  }

  private buildCss(): string {
    return this.componentNodes
      .map((node) => {
        return this.buildBreadPointCss(node.rootNode.buildCss(), node.range);
      })
      .join(" ");
  }

  private buildBreadPointCss(css: string, range?: BreakpointRange): string {
    if (range && range.max && range.min) {
      return `@media screen and (max-width: ${range.max}px) and (min-width: ${range.min}px) { ${css} }`;
    }
    if (range && range.max) {
      return `@media screen and (max-width: ${range.max}px) { ${css} }`;
    }
    if (range && range.min) {
      return `@media screen and (min-width: ${range.min}px) { ${css} }`;
    }
    return css;
  }
}
