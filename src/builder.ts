import {
  Breakpoint,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
  Link,
  Output,
} from "./types";
import FrameNode from "./nodes/frame";
import Parser from "./parser";
import IdGenerator from "./helper/idGenerator";

export interface ComponentNode {
  rootNode: FrameNode;
  breakPointId: string;
  min: number;
  max: number;
}

export default class Builder {
  componentNodes: ComponentNode[] = [];

  constructor(breakpoints: Breakpoint[]) {
    const breakPointIdGenerator = new IdGenerator();
    breakpoints.forEach((breakPoint: Breakpoint) => {
      const rootNode = this.parse(
        breakPoint.figma,
        breakPoint.mixedTexts,
        breakPoint.nodeImages,
        breakPoint.variables,
        breakPoint.conditions,
        breakPoint.loops,
        breakPoint.events,
        breakPoint.links
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
      jsxTemplate: this.buildTemplate("jsx"),
      vueTemplate: this.buildTemplate("vue"),
      css: this.buildCss(),
    };
  }

  private parse(
    figma: any,
    MixedTexts: MixedText[],
    nodeImages: NodeImage[],
    variables: Variable[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[],
    links: Link[]
  ): FrameNode {
    const parser = new Parser("ROOT_FRAME", figma);
    const classIdGenerator = new IdGenerator();
    return new FrameNode(
      parser,
      classIdGenerator,
      figma,
      true,
      "NONE",
      undefined,
      MixedTexts,
      nodeImages,
      variables,
      conditions,
      loops,
      events,
      links
    );
  }

  private buildTemplate(type: "jsx" | "vue"): string {
    return (
      "<div>" +
      this.componentNodes
        .map(
          (node) =>
            `<div ${type === "jsx" ? "className" : "class"}="breakpoint-${
              node.breakPointId
            }">${node.rootNode.buildTemplate(type)}</div>`
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
    min: number,
    max: number
  ): string {
    if (max !== 0 && min !== 0) {
      return (
        `.breakpoint-${breakPointId} { position: relative; } ` +
        `@media screen and (max-width: ${max}px) and (min-width: ${min}px) { ${css} } ` +
        `@media screen and (min-width: ${
          max + 1
        }px) { .breakpoint-${breakPointId} { display: none; } } ` +
        `@media screen and (max-width: ${
          min - 1
        }px) { .breakpoint-${breakPointId} { display: none; } }`
      );
    }
    if (max !== 0) {
      return (
        `.breakpoint-${breakPointId} { position: relative; } ` +
        `@media screen and (max-width: ${max}px) { ${css} } ` +
        `@media screen and (min-width: ${
          max + 1
        }px) { .breakpoint-${breakPointId} { display: none; } }`
      );
    }
    if (min !== 0) {
      return (
        `.breakpoint-${breakPointId} { position: relative; } ` +
        `@media screen and (min-width: ${min}px) { ${css} } ` +
        `@media screen and (max-width: ${
          min - 1
        }px) { .breakpoint-${breakPointId} { display: none; } }`
      );
    }
    return `.breakpoint-${breakPointId} { position: relative; } ` + css;
  }
}
