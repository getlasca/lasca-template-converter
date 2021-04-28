import { BaseStyle, FrameStyle, TextStyle, RectangleStyle } from "./types";

export default class Parser {
  baseX: number;
  baseY: number;

  constructor(baseX: number, baseY: number) {
    this.baseX = baseX;
    this.baseY = baseY;
  }

  frameStyle(obj: any): FrameStyle {
    return Object.assign(this.baseStyle(obj), {
      background: {
        r: obj.fills[0].color.r * 255,
        g: obj.fills[0].color.g * 255,
        b: obj.fills[0].color.b * 255,
        a: obj.fills[0].color.a,
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
        a: obj.fills[0].color.a,
      },
      radius: obj.cornerRadius || 0,
    });
  }

  textStyle(obj: any): TextStyle {
    return Object.assign(this.baseStyle(obj), {
      background: "a",
      color: "a",
      fontSize: "a",
      fontWeight: "a",
      fontFamily: "a",
    });
  }

  private baseStyle(obj: any): BaseStyle {
    return {
      x: 1,
      y: 1,
      width: obj.absoluteBoundingBox.width,
      height: obj.absoluteBoundingBox.height,
      border:
        obj.strokes.length !== 0
          ? {
              color: {
                r: obj.strokes[0].color.r * 255,
                g: obj.strokes[0].color.g * 255,
                b: obj.strokes[0].color.b * 255,
                a: obj.strokes[0].color.a,
              },
              width: obj.strokeWeight,
              inside: obj.strokeAlign === "INSIDE",
            }
          : undefined,
      constraintsHorizontal: obj.constraints.horizontal,
      constraintsVertical: obj.constraints.vertical,
    };
  }
}
