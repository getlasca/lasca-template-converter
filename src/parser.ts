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
    return Object.assign(this.baseStyle(obj), {
      background: {
        r: obj.fills[0].color.r * 255,
        g: obj.fills[0].color.g * 255,
        b: obj.fills[0].color.b * 255,
        a: obj.fills[0].opacity || 1,
      },
      radius: obj.cornerRadius || 0,
    });
  }

  rectangleStyle(obj: any): RectangleStyle {
    return Object.assign(this.baseStyle(obj), {
      background: {
        r: obj.fills[0].color.r * 255,
        g: obj.fills[0].color.g * 255,
        b: obj.fills[0].color.b * 255,
        a: obj.fills[0].opacity || 1,
      },
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
        obj.strokes.length !== 0
          ? {
              color: {
                r: obj.strokes[0].color.r * 255,
                g: obj.strokes[0].color.g * 255,
                b: obj.strokes[0].color.b * 255,
                a: obj.strokes[0].opacity || 1,
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
