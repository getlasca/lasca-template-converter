import fs from "fs";

export function loadFixture(name: string): any {
  return JSON.parse(fs.readFileSync(`./test/fixture/${name}.json`, "utf8"));
}

interface FrameNode {
  type: "FRAME";
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  constraints?: Constraint;
  children?: (FrameNode | RectangleNode | TextNode)[];
}

interface RectangleNode {
  type: "RECTANGLE";
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  constraints?: Constraint;
}

interface TextNode {
  type: "TEXT";
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  constraints?: Constraint;
  characters?: string;
}

interface Constraint {
  horizontal: string;
  vertical: string;
}

export function buildFixture(frame: FrameNode): any {
  const build = (node: FrameNode | RectangleNode | TextNode): any => {
    if (node.type === "FRAME") {
      let children = [];
      if (node.children) {
        children = node.children.map(
          (v: FrameNode | RectangleNode | TextNode) => {
            return build(v);
          }
        );
      }
      return {
        ...frameDefault,
        ...node,
        children: children,
      };
    }
    if (node.type === "RECTANGLE") {
      return {
        ...rectangleDefault,
        ...node,
      };
    }
    if (node.type === "TEXT") {
      return {
        ...textDefault,
        ...node,
      };
    }
  };

  return build(frame);
}

const frameDefault = {
  id: "1:1",
  name: "Frame",
  type: "FRAME",
  x: 100,
  y: 100,
  width: 500,
  height: 500,
  children: [],
  constraints: { vertical: "MIN", horizontal: "MIN" },
  layoutMode: "NONE",
  counterAxisAlignItems: "MIN",
  counterAxisSizingMode: "FIXED",
  primaryAxisAlignItems: "MIN",
  primaryAxisSizingMode: "AUTO",
  itemSpacing: 0,
  layoutAlign: "INHERIT",
  layoutGrow: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  clipsContent: false,
  fills: [
    {
      type: "SOLID",
      color: { b: 1, g: 1, r: 1 },
      opacity: 1,
      visible: true,
      blendMode: "NORMAL",
    },
  ],
  backgrounds: [
    {
      type: "SOLID",
      color: { b: 1, g: 1, r: 1 },
      opacity: 1,
      visible: true,
      blendMode: "NORMAL",
    },
  ],
  guides: [],
  isMask: false,
  locked: false,
  parent: { id: "0:1" },
  effects: [],
  opacity: 1,
  removed: false,
  strokes: [],
  visible: true,
  expanded: true,
  rotation: 0,
  blendMode: "PASS_THROUGH",
  reactions: [],
  strokeCap: "NONE",
  strokeJoin: "MITER",
  dashPattern: [],
  fillStyleId: "",
  gridStyleId: "",
  layoutGrids: [],
  strokeAlign: "INSIDE",
  cornerRadius: 0,
  strokeWeight: 1,
  effectStyleId: "",
  strokeStyleId: "",
  topLeftRadius: 0,
  exportSettings: [],
  topRightRadius: 0,
  cornerSmoothing: 0,
  verticalPadding: 0,
  bottomLeftRadius: 0,
  strokeMiterLimit: 4,
  absoluteTransform: [
    [1, 0, 3014],
    [0, 1, -406],
  ],
  backgroundStyleId: "",
  bottomRightRadius: 0,
  horizontalPadding: 0,
  overflowDirection: "NONE",
  overlayBackground: { type: "NONE" },
  relativeTransform: [
    [1, 0, 3014],
    [0, 1, -406],
  ],
  overlayPositionType: "CENTER",
  constrainProportions: false,
  numberOfFixedChildren: 0,
  overlayBackgroundInteraction: "NONE",
};

const rectangleDefault = {
  id: "1:1",
  name: "Rectangle",
  type: "RECTANGLE",
  x: 100,
  y: 100,
  width: 500,
  height: 500,
  constraints: { vertical: "MIN", horizontal: "MIN" },
  layoutAlign: "INHERIT",
  layoutGrow: 0,
  fills: [
    {
      type: "SOLID",
      color: {
        b: 0.7686274647712708,
        g: 0.7686274647712708,
        r: 0.7686274647712708,
      },
      opacity: 1,
      visible: true,
      blendMode: "NORMAL",
    },
  ],
  isMask: false,
  locked: false,
  parent: { id: "0:1" },
  effects: [],
  opacity: 1,
  removed: false,
  strokes: [],
  visible: true,
  rotation: 0,
  blendMode: "PASS_THROUGH",
  reactions: [],
  strokeCap: "NONE",
  strokeJoin: "MITER",
  dashPattern: [],
  fillStyleId: "",
  strokeAlign: "INSIDE",
  cornerRadius: 0,
  strokeWeight: 1,
  effectStyleId: "",
  strokeStyleId: "",
  topLeftRadius: 0,
  exportSettings: [],
  topRightRadius: 0,
  cornerSmoothing: 0,
  bottomLeftRadius: 0,
  strokeMiterLimit: 4,
  absoluteTransform: [
    [1, 0, 5180],
    [0, 1, -386],
  ],
  bottomRightRadius: 0,
  relativeTransform: [
    [1, 0, 439],
    [0, 1, 20],
  ],
  constrainProportions: false,
};

const textDefault = {
  id: "1:1",
  name: "Text",
  type: "TEXT",
  x: 100,
  y: 100,
  width: 500,
  height: 500,
  constraints: { vertical: "MIN", horizontal: "MIN" },
  layoutAlign: "INHERIT",
  layoutGrow: 0,
  fills: [
    {
      type: "SOLID",
      color: { b: 0, g: 0, r: 0 },
      opacity: 1,
      visible: true,
      blendMode: "NORMAL",
    },
  ],
  isMask: false,
  locked: false,
  parent: { id: "0:1" },
  effects: [],
  opacity: 1,
  removed: false,
  strokes: [],
  visible: true,
  fontName: { style: "Regular", family: "Roboto" },
  fontSize: 12,
  rotation: 0,
  textCase: "ORIGINAL",
  blendMode: "PASS_THROUGH",
  hyperlink: null,
  reactions: [],
  strokeCap: "NONE",
  autoRename: true,
  characters: "DEFAULT_TEXT",
  lineHeight: { unit: "AUTO" },
  strokeJoin: "MITER",
  dashPattern: [],
  fillStyleId: "",
  strokeAlign: "OUTSIDE",
  textStyleId: "",
  strokeWeight: 1,
  effectStyleId: "",
  letterSpacing: { unit: "PERCENT", value: 0 },
  strokeStyleId: "",
  exportSettings: [],
  hasMissingFont: false,
  textAutoResize: "NONE",
  textDecoration: "NONE",
  paragraphIndent: 0,
  paragraphSpacing: 0,
  strokeMiterLimit: 4,
  absoluteTransform: [
    [1, 0, 3125],
    [0, 1, 149],
  ],
  relativeTransform: [
    [1, 0, 111],
    [0, 1, 555],
  ],
  textAlignVertical: "TOP",
  textAlignHorizontal: "LEFT",
  constrainProportions: false,
};
