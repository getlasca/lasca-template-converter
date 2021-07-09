import {
  BaseStyle,
  FrameStyle,
  TextStyle,
  TextRangeStyle,
  RectangleStyle,
  VectorStyle,
} from "./types";

export default class Parser {
  baseWidth: number;
  fixedPositionNodes: { nodeId: string; fillContainer: boolean }[] = [];

  constructor(node: any, isRoot = false) {
    this.baseWidth = node.width;
    if (isRoot) {
      this.fixedPositionNodes = this.getFixedPositionNodes(node);
    }
  }

  frameStyle(obj: any): FrameStyle {
    const fills = obj.fills.filter((fill: any) => {
      return fill.visible !== false;
    });
    return {
      ...this.baseStyle(obj),
      ...{
        layoutMode: obj.layoutMode,
        primaryAxisSizingMode: obj.primaryAxisSizingMode,
        counterAxisSizingMode: obj.counterAxisSizingMode,
        primaryAxisAlignItems: obj.primaryAxisAlignItems,
        counterAxisAlignItems: obj.counterAxisAlignItems,
        paddingLeft: obj.paddingLeft,
        paddingRight: obj.paddingRight,
        paddingTop: obj.paddingTop,
        paddingBottom: obj.paddingBottom,
        itemSpacing: obj.itemSpacing,
        backgroundColor:
          fills.length !== 0 && fills[0].type === "SOLID"
            ? {
                r: fills[0].color.r * 255,
                g: fills[0].color.g * 255,
                b: fills[0].color.b * 255,
                a: fills[0].opacity * obj.opacity,
              }
            : undefined,
        backgroundImage:
          fills.length !== 0 && fills[0].type === "IMAGE"
            ? {
                scaleMode: fills[0].scaleMode,
              }
            : undefined,
        radius: {
          topLeft: obj.topLeftRadius,
          topRight: obj.topRightRadius,
          bottomRight: obj.bottomRightRadius,
          bottomLeft: obj.bottomLeftRadius,
        },
        clipsContent: obj.clipsContent,
      },
    };
  }

  rectangleStyle(obj: any): RectangleStyle {
    let fills = [];
    if (obj.type === "LINE") {
      fills = obj.strokes.filter((stroke: any) => {
        return stroke.visible !== false;
      });
    } else {
      fills = obj.fills.filter((fill: any) => {
        return fill.visible !== false;
      });
    }

    return {
      ...this.baseStyle(obj),
      ...{
        backgroundColor:
          fills.length !== 0 && fills[0].type === "SOLID"
            ? {
                r: fills[0].color.r * 255,
                g: fills[0].color.g * 255,
                b: fills[0].color.b * 255,
                a: fills[0].opacity * obj.opacity,
              }
            : undefined,
        backgroundImage:
          fills.length !== 0 && fills[0].type === "IMAGE"
            ? {
                scaleMode: fills[0].scaleMode,
              }
            : undefined,
        radius: {
          topLeft: obj.topLeftRadius || 0,
          topRight: obj.topRightRadius || 0,
          bottomRight: obj.bottomRightRadius || 0,
          bottomLeft: obj.bottomLeftRadius || 0,
        },
      },
    };
  }

  textStyle(obj: any): TextStyle {
    return {
      ...this.baseStyle(obj),
      ...this.textRangeStyle(obj),
      ...{
        textAlignHorizontal: obj.textAlignHorizontal,
        textAlignVertical: obj.textAlignVertical,
      },
    };
  }

  textRangeStyle(obj: any): TextRangeStyle {
    return {
      color:
        obj.fills && obj.fills.length > 0
          ? {
              r: obj.fills[0].color.r * 255,
              g: obj.fills[0].color.g * 255,
              b: obj.fills[0].color.b * 255,
              a: obj.opacity
                ? obj.fills[0].opacity * obj.opacity
                : obj.fills[0].opacity, // obj.opacity is undefined in case of mixed text
            }
          : undefined,
      fontSize: obj.fontSize,
      fontWeight: obj.fontName ? obj.fontName.style : undefined,
      fontFamily: obj.fontName ? obj.fontName.family : undefined,
      letterSpacing:
        obj.letterSpacing && obj.letterSpacing.value !== 0
          ? obj.letterSpacing.unit === "PIXELS"
            ? `${obj.letterSpacing.value}px`
            : `${obj.letterSpacing.value / 100}em`
          : undefined,
      textDecoration: obj.textDecoration,
      lineHeight:
        obj.lineHeight && obj.lineHeight.unit !== "AUTO"
          ? obj.lineHeight.unit === "PIXELS"
            ? `${obj.lineHeight.value}px`
            : `${obj.lineHeight.value}%`
          : undefined,
    };
  }

  vectorStyle(obj: any): VectorStyle {
    return this.baseStyle(obj);
  }

  private baseStyle(obj: any): BaseStyle {
    const fixedPositionNode = this.fixedPositionNodes.find(
      (n) => n.nodeId === obj.id
    );
    const strokes = obj.strokes.filter((stroke: any) => {
      return stroke.visible !== false;
    });
    const shadows = obj.effects.filter((effect: any) => {
      return (
        effect.visible && ["DROP_SHADOW", "INNER_SHADOW"].includes(effect.type)
      );
    });

    return {
      x: obj.x,
      xFromCenter: this.baseWidth / 2 - obj.x,
      xFromRight: this.baseWidth - (obj.x + obj.width),
      y: obj.type === "LINE" ? obj.y - obj.strokeWeight : obj.y,
      width: obj.width,
      height: obj.type === "LINE" ? obj.strokeWeight : obj.height,
      constraintsHorizontal:
        fixedPositionNode && fixedPositionNode.fillContainer
          ? "STRETCH"
          : obj.constraints.horizontal,
      constraintsVertical: obj.constraints.vertical,
      layoutAlign: obj.layoutAlign,
      layoutGrow: obj.layoutGrow,
      isFixedPosition: !!fixedPositionNode,
      border:
        obj.type !== "LINE" && strokes.length !== 0
          ? {
              color: {
                r: strokes[0].color.r * 255,
                g: strokes[0].color.g * 255,
                b: strokes[0].color.b * 255,
                a: strokes[0].opacity || 1,
              },
              width: obj.strokeWeight,
              inside: obj.strokeAlign === "INSIDE",
            }
          : undefined,
      shadow:
        shadows.length !== 0
          ? {
              color: {
                r: shadows[0].color.r * 255,
                g: shadows[0].color.g * 255,
                b: shadows[0].color.b * 255,
                a: shadows[0].color.a,
              },
              x: shadows[0].offset.x,
              y: shadows[0].offset.y,
              blur: shadows[0].radius,
              spread: shadows[0].spread || 0,
              inner: shadows[0].type === "INNER_SHADOW",
            }
          : undefined,
    };
  }

  private getFixedPositionNodes(
    node: any
  ): { nodeId: string; fillContainer: boolean }[] {
    if (!node.numberOfFixedChildren || node.numberOfFixedChildren === 0) {
      return [];
    }
    return node.children
      .slice(-1 * node.numberOfFixedChildren)
      .map((child: any) => {
        return { nodeId: child.id, fillContainer: node.width <= child.width };
      });
  }
}
