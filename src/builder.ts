import { Page, Embed, Condition, Loop, Event, Output } from './types'
import FrameNode from './nodes/frame'
import TextNode from './nodes/text'
import RectangleNode from './nodes/rectangle'

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
    const nodeId = Object.keys(page.figmaObj.nodes)[0]
    const style = {
      background: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      opacity: 1,
      constraintsHorizontal: "a",
      constraintsVertical: "a"
    }
    const frameNode = new FrameNode(nodeId, style, [])

    // TextNode
    page.figmaObj.nodes[nodeId].document.children.forEach((node: any) => {
      if (node.type === "TEXT") {
        const textStyle = {
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
          constraintsVertical: "a"
        }
        const textNode = new TextNode(node.id, textStyle, node.characters, [])
        frameNode.children.push(textNode)
      }
    });

    // RectangleNode
    page.figmaObj.nodes[nodeId].document.children.forEach((node: any) => {
      if (node.type === "RECTANGLE") {
        const rectangleStyle = {
          background: "a",
          radius: "a",
          x: 1,
          y: 1,
          width: 1,
          height: 1,
          opacity: 1,
          constraintsHorizontal: "a",
          constraintsVertical: "a"
        }
        const rectangleNode = new RectangleNode(node.id, rectangleStyle)
        frameNode.children.push(rectangleNode)
      }
    });

    return frameNode
  }

  private buildTemplate(): string {
    // buildTemplate
    // use children's each BaseNode.buildTemplate() method
    return this.rootNode.buildTemplate();
  }

  private buildCss(): string {
    return "";
  }
}
