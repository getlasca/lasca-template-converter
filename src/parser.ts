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
      background: "a",
      x: 1,
      y: 1,
      width: 1,
      height: 1,
      opacity: 1,
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
      opacity: 1,
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
      opacity: 1,
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
      opacity: 1,
      constraintsHorizontal: "a",
      constraintsVertical: "a",
    };
  }
}
