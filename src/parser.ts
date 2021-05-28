import { BaseStyle, FrameStyle, TextStyle, RectangleStyle } from "./types";

export default class Parser {
  baseX: number;
  baseY: number;
  baseWidth: number;

  constructor(baseX: number, baseY: number, baseWidth: number) {
    this.baseX = baseX;
    this.baseY = baseY;
    this.baseWidth = baseWidth;
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
      radius: obj.cornerRadius || 0,
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
      radius: obj.cornerRadius || 0,
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
      fontSize: obj.style.fontSize,
      fontWeight: obj.style.fontWeight,
      fontFamily: obj.style.fontFamily,
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
      x: obj.absoluteBoundingBox.x - this.baseX,
      xFromRight:
        this.baseWidth -
        (obj.absoluteBoundingBox.x -
          this.baseX +
          obj.absoluteBoundingBox.width),
      y: obj.absoluteBoundingBox.y - this.baseY,
      width: obj.absoluteBoundingBox.width,
      height: obj.absoluteBoundingBox.height,
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
