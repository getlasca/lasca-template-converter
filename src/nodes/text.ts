import BaseNode from "./base";
import Parser from "../parser";
import IdGenerator from "../helper/idGenerator";
import {
  TextStyle,
  TextRangeStyle,
  TextRangeStyleMapping,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

export default class TextNode extends BaseNode {
  style: TextStyle;
  mixedText?: MixedText;
  textRangeStyles: TextRangeStyleMapping[] = [];
  text: string;

  constructor(
    parser: Parser,
    idGenerator: IdGenerator,
    figma: any,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = []
  ) {
    super(
      figma.id,
      idGenerator,
      layoutModeAsChild,
      mixedTexts,
      nodeImages,
      variables,
      conditions,
      loops,
      events
    );
    this.text = figma.characters;
    this.style = parser.textStyle(figma);
    this.mixedText = mixedTexts.find(
      (mixedText) => mixedText.nodeId === this.nodeId
    );
    if (this.mixedText) {
      this.textRangeStyles = this.mixedText.style.styleMixedTable.map(
        (style) => {
          return {
            styleId: style.id,
            style: parser.textRangeStyle(style),
          };
        }
      );
    }
  }

  buildTemplate(): string {
    const attr = `class="class-${
      this.className
    }"${this.buildCondition()}${this.buildLoop()}${this.buildEvent()}`;

    if (this.mixedText) {
      const charStyles = this.mixedText.style.characterStyleMixed;
      let innerTag = "";
      let sliceIndex = 0;

      for (let i = 0; i < charStyles.length; i++) {
        const isSwitchChar = i !== 0 && charStyles[i - 1] !== charStyles[i];
        const isLastChar = i === charStyles.length - 1;

        if (isSwitchChar) {
          const className = `class-${this.className}-${charStyles[i - 1]}`;
          const text = this.text.slice(sliceIndex, i);

          innerTag += `<span class="${className}">${text}</span>`;
          sliceIndex = i;
        }

        if (isLastChar) {
          const className = `class-${this.className}-${charStyles[i]}`;
          const text = this.text.slice(sliceIndex);

          innerTag += `<span class="${className}">${text}</span>`;
        }
      }

      // TODO: should consider embed variables
      return `<span ${attr}>${innerTag}</span>`;
    } else {
      return `<span ${attr}>${this.buildVariable() || this.text}</span>`;
    }
  }

  buildCss(): string {
    let css = `white-space: pre;`;
    css += ` text-align: ${this.convertTextAlignHorizontal(
      this.style.textAlignHorizontal
    )};`;
    if (this.style.textAlignVertical !== "TOP") {
      css += ` display: flex;`;
      css += ` align-items: ${
        this.style.textAlignVertical === "BOTTOM" ? "flex-end" : "center"
      };`;
    }
    if (this.style.shadow && !this.style.shadow.inner) {
      css += ` text-shadow:`;
      css += ` ${this.style.shadow.x}px ${this.style.shadow.y}px`;
      if (this.style.shadow.blur !== 0) {
        css += ` ${this.style.shadow.blur}px`;
      }
      css += ` rgba(${this.style.shadow.color.r},${this.style.shadow.color.g},${this.style.shadow.color.b},${this.style.shadow.color.a});`;
    }
    css += this.buildRangeCssBase(this.style);
    css += this.buildBaseLayoutCss(this.style);
    return `.class-${this.className} { ${css} }` + this.buildRangeCss();
  }

  private buildRangeCss(): string {
    let css = "";
    for (let i = 0; i < this.textRangeStyles.length; i++) {
      css += ` .class-${this.className}-${
        this.textRangeStyles[i].styleId
      } { ${this.buildRangeCssBase(this.textRangeStyles[i].style)} }`;
    }
    return css;
  }

  private buildRangeCssBase(style: TextRangeStyle): string {
    let css = "";
    if (style.fontSize) {
      css += ` font-size: ${style.fontSize}px;`;
    }
    if (style.color) {
      css += ` color: rgba(${style.color.r},${style.color.g},${style.color.b},${style.color.a});`;
    }
    if (style.fontWeight) {
      css += ` font-weight: ${this.convertFontWeight(style.fontWeight)};`;
    }
    if (style.fontFamily) {
      css += ` font-family: '${style.fontFamily}', sans-serif;`;
    }
    if (style.textDecoration && style.textDecoration !== "NONE") {
      css += ` text-decoration: ${
        style.textDecoration === "UNDERLINE" ? "underline" : "line-through"
      };`;
    }
    if (style.letterSpacing) {
      css += ` letter-spacing: ${style.letterSpacing};`;
    }
    if (style.lineHeight) {
      css += ` line-height: ${style.lineHeight};`;
    }
    return css;
  }

  private convertFontWeight(weight: string): number {
    switch (weight) {
      case "Thin":
        return 100;
      case "Extra Light":
        return 200;
      case "Light":
        return 300;
      case "Regular":
        return 400;
      case "Normal":
        return 400;
      case "Medium":
        return 500;
      case "Semi Bold":
        return 600;
      case "Bold":
        return 700;
      case "Extra Bold":
        return 800;
      case "Black":
        return 800;
      default:
        return 400;
    }
  }

  private convertTextAlignHorizontal(align: string): string {
    switch (align) {
      case "LEFT":
        return "left";
      case "CENTER":
        return "center";
      case "RIGHT":
        return "right";
      case "JUSTIFIED":
        return "justify";
      default:
        return "left";
    }
  }
}
