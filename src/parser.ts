import {
  BaseStyle,
  ShapeStyle,
  FrameStyle,
  TextStyle,
  TextRangeStyle,
  RectangleStyle,
  GroupStyle,
  VectorStyle,
} from "./types";

export default class Parser {
  baseWidth: number;
  groupRelativeX?: number = undefined;
  groupRelativeY?: number = undefined;
  fixedPositionNodes: { nodeId: string; fillContainer: boolean }[] = [];

  constructor(
    type: "FRAME" | "ROOT_FRAME" | "GROUP_RELATIVE_POSITION",
    node: any
  ) {
    this.baseWidth = node.width;
    switch (type) {
      case "ROOT_FRAME": {
        this.fixedPositionNodes = this.getFixedPositionNodes(node);
        break;
      }
      // in case of autolayout child group node or position fixed group node, x and y must be calculated relatively
      case "GROUP_RELATIVE_POSITION": {
        this.groupRelativeX = node.x;
        this.groupRelativeY = node.y;
        break;
      }
    }
  }

  frameStyle(obj: any): FrameStyle {
    const fills = obj.fills.filter((fill: any) => {
      return fill.visible !== false;
    });
    return {
      ...this.baseStyle(obj),
      ...this.shapeStyle(obj, fills),
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
      ...this.shapeStyle(obj, fills),
    };
  }

  textStyle(obj: any): TextStyle {
    return {
      ...this.baseStyle(obj),
      ...this.textRangeStyle(obj),
      ...{
        textAlignHorizontal: obj.textAlignHorizontal,
        textAlignVertical: obj.textAlignVertical,
        wrapped: obj.textAutoResize !== "WIDTH_AND_HEIGHT",
        textIndent: obj.paragraphIndent,
      },
    };
  }

  textRangeStyle(obj: any): TextRangeStyle {
    return {
      color:
        obj.fills && obj.fills.length > 0
          ? {
              r: Math.round(obj.fills[0].color.r * 255),
              g: Math.round(obj.fills[0].color.g * 255),
              b: Math.round(obj.fills[0].color.b * 255),
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
      textCase: obj.textCase,
      textDecoration: obj.textDecoration,
      lineHeight:
        obj.lineHeight && obj.lineHeight.unit !== "AUTO"
          ? obj.lineHeight.unit === "PIXELS"
            ? `${obj.lineHeight.value}px`
            : `${obj.lineHeight.value}%`
          : undefined,
    };
  }

  groupStyle(obj: any): GroupStyle {
    const fixedPositionNode = this.fixedPositionNodes.find(
      (n) => n.nodeId === obj.id
    );

    return {
      x: obj.x,
      y: obj.y,
      width: obj.width,
      height: obj.height,
      isFixedPosition: !!fixedPositionNode,
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
      const effectTypes =
        obj.type === "TEXT" ? ["DROP_SHADOW"] : ["DROP_SHADOW", "INNER_SHADOW"]; // CSS has no text inner shadow expression.
      return effect.visible && effectTypes.includes(effect.type);
    });
    const layerBlur = obj.effects.find((effect: any) => {
      return effect.visible && effect.type === "LAYER_BLUR";
    });
    const backgroundBlur = obj.effects.find((effect: any) => {
      return effect.visible && effect.type === "BACKGROUND_BLUR";
    });

    return {
      x: this.groupRelativeX ? obj.x - this.groupRelativeX : obj.x,
      xFromCenter: this.baseWidth / 2 - obj.x,
      xFromRight: this.baseWidth - (obj.x + obj.width),
      y:
        obj.type === "LINE"
          ? obj.y - obj.strokeWeight
          : this.groupRelativeY
          ? obj.y - this.groupRelativeY
          : obj.y,
      width: obj.width,
      height: obj.type === "LINE" ? obj.strokeWeight : obj.height,
      isWidthAuto:
        (obj.type === "FRAME" && obj.layoutMode === "HORIZONTAL") ||
        (obj.type === "TEXT" && obj.textAutoResize === "WIDTH_AND_HEIGHT"),
      isHeightAuto:
        (obj.type === "FRAME" && obj.layoutMode === "VERTICAL") ||
        (obj.type === "TEXT" &&
          ["HEIGHT", "WIDTH_AND_HEIGHT"].includes(obj.textAutoResize)),
      constraintsHorizontal:
        fixedPositionNode && fixedPositionNode.fillContainer
          ? "STRETCH"
          : obj.constraints.horizontal,
      constraintsVertical: obj.constraints.vertical,
      layoutAlign: obj.layoutAlign,
      layoutGrow: obj.layoutGrow,
      isFixedPosition: !!fixedPositionNode,
      border:
        obj.type !== "LINE" &&
        strokes.length !== 0 &&
        strokes[0].type === "SOLID"
          ? {
              color: {
                r: Math.round(strokes[0].color.r * 255),
                g: Math.round(strokes[0].color.g * 255),
                b: Math.round(strokes[0].color.b * 255),
                a: strokes[0].opacity || 1,
              },
              width: obj.strokeWeight,
              inside: obj.strokeAlign === "INSIDE",
            }
          : undefined,
      shadows: shadows.map((shadow: any) => {
        return {
          color: {
            r: Math.round(shadow.color.r * 255),
            g: Math.round(shadow.color.g * 255),
            b: Math.round(shadow.color.b * 255),
            a: shadow.color.a,
          },
          x: shadow.offset.x,
          y: shadow.offset.y,
          blur: shadow.radius,
          spread: shadow.spread || 0,
          inner: shadow.type === "INNER_SHADOW",
        };
      }),
      layerBlur: layerBlur
        ? {
            radius: layerBlur.radius,
          }
        : undefined,
      backgroundBlur: backgroundBlur
        ? {
            radius: backgroundBlur.radius,
          }
        : undefined,
    };
  }

  private shapeStyle(obj: any, fills: any[]): ShapeStyle {
    return {
      backgroundColor:
        fills.length !== 0 && fills[0].type === "SOLID"
          ? {
              r: Math.round(fills[0].color.r * 255),
              g: Math.round(fills[0].color.g * 255),
              b: Math.round(fills[0].color.b * 255),
              a: fills[0].opacity * obj.opacity,
            }
          : undefined,
      backgroundImage:
        fills.length !== 0 && fills[0].type === "IMAGE"
          ? {
              scaleMode: fills[0].scaleMode,
            }
          : undefined,
      backgroundGradient:
        fills.length !== 0 &&
        [
          "GRADIENT_LINEAR",
          "GRADIENT_RADIAL",
          "GRADIENT_ANGULAR",
          "GRADIENT_DIAMOND",
        ].includes(fills[0].type)
          ? {
              type:
                fills[0].type === "GRADIENT_DIAMOND"
                  ? "GRADIENT_RADIAL"
                  : fills[0].type,
              gradientStops: fills[0].gradientStops.map((stop: any) => {
                return {
                  color: {
                    r: Math.round(stop.color.r * 255),
                    g: Math.round(stop.color.g * 255),
                    b: Math.round(stop.color.b * 255),
                    a: stop.color.a * obj.opacity,
                  },
                  position: stop.position,
                };
              }),
            }
          : undefined,
      radius: {
        topLeft: obj.topLeftRadius || 0,
        topRight: obj.topRightRadius || 0,
        bottomRight: obj.bottomRightRadius || 0,
        bottomLeft: obj.bottomLeftRadius || 0,
        isEllipse: obj.type === "ELLIPSE",
      },
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
