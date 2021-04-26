import { FrameStyle, GroupStyle, TextStyle, RectangleStyle } from "./types";

export default class Parser {
  baseX: number;
  baseY: number;

  constructor(baseX: number, baseY: number) {
    this.baseX = baseX;
    this.baseY = baseY;
  }

  frameStyle(obj: any): FrameStyle {
    return {
      background: {
        r: obj.fills[0].color.r * 255,
        g: obj.fills[0].color.g * 255,
        b: obj.fills[0].color.b * 255,
        a: obj.fills[0].color.a,
      },
      x: 1,
      y: 1,
      width: 1,
      height: 1,
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
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
  }

  groupStyle(obj: any): GroupStyle {
    return {
      background: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
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
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
  }

  rectangleStyle(obj: any): RectangleStyle {
    return {
      background: "a",
      radius: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
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
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
  }

  textStyle(obj: any): TextStyle {
    return {
      background: "a",
      color: "a",
      fontSize: "a",
      fontWeight: "a",
      fontFamily: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
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
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
  }
}
