import { Page, Embed, Condition, Loop, Event, Output } from "./types";
import BaseNode from "./nodes/base";
import FrameNode from "./nodes/frame";
import TextNode from "./nodes/text";
import RectangleNode from "./nodes/rectangle";

export default class Builder {
  rootNode: FrameNode;

  constructor(
    page: Page,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ) {
    this.rootNode = this.parse(
      page,
      variables,
      embeds,
      conditions,
      loops,
      events
    );
  }

  build(): Output {
    return {
      template: this.buildTemplate(),
      css: this.buildCss(),
    };
  }

  private parse(
    page: Page,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ): FrameNode {
    // set rootNode from input

    // FrameNode
    const nodeId = Object.keys(page.figmaObj.nodes)[0];
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
    page.figmaObj.nodes[nodeId].document.children.forEach((node: any) => {
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
    return this.rootNode.buildTemplate();
  }

  private buildCss(): string {
    return this.rootNode.buildCss();
  }
}
