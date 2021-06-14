import { BaseStyle, FrameStyle, TextStyle, RectangleStyle } from "./types";

export default class Parser {
  baseWidth: number;
  baseHeight: number;

  constructor(baseWidth: number, baseHeight: number) {
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }

  frameStyle(obj: any): FrameStyle {
    const fills = obj.fills.filter((fill: any) => {
      return fill.visible !== false;
    });
    return Object.assign(this.baseStyle(obj), {
      background:
        fills.length !== 0
          ? {
              r: fills[0].color.r * 255,
              g: fills[0].color.g * 255,
              b: fills[0].color.b * 255,
              a: fills[0].opacity || 1,
            }
          : undefined,
      radius: {
        topLeft: obj.topLeftRadius,
        topRight: obj.topRightRadius,
        bottomRight: obj.bottomRightRadius,
        bottomLeft: obj.bottomLeftRadius,
      },
    });
  }

  rectangleStyle(obj: any): RectangleStyle {
    const fills = obj.fills.filter((fill: any) => {
      return fill.visible !== false;
    });
    return Object.assign(this.baseStyle(obj), {
      background:
        fills.length !== 0
          ? {
              r: fills[0].color.r * 255,
              g: fills[0].color.g * 255,
              b: fills[0].color.b * 255,
              a: fills[0].opacity || 1,
            }
          : undefined,
      radius: {
        topLeft: obj.topLeftRadius,
        topRight: obj.topRightRadius,
        bottomRight: obj.bottomRightRadius,
        bottomLeft: obj.bottomLeftRadius,
      },
    });
  }

  textStyle(obj: any): TextStyle {
    return Object.assign(this.baseStyle(obj), {
      color: {
        r: obj.fills[0].color.r * 255,
        g: obj.fills[0].color.g * 255,
        b: obj.fills[0].color.b * 255,
        a: obj.fills[0].opacity || 1,
      },
      fontSize: obj.fontSize,
      fontWeight: obj.fontName.style,
      fontFamily: obj.fontName.family,
      letterSpacing: obj.letterSpacing.value,
    });
  }

  private baseStyle(obj: any): BaseStyle {
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
      xFromRight: this.baseWidth - (obj.x + obj.width),
      y: obj.y,
      yFromBottom: this.baseHeight - (obj.y + obj.height),
      width: obj.width,
      height: obj.height,
      border:
        strokes.length !== 0
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
      constraintsHorizontal: obj.constraints.horizontal,
      constraintsVertical: obj.constraints.vertical,
    };
  }
}
