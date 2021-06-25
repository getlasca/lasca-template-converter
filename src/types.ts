export interface Breakpoint {
  min?: number;
  max?: number;
  figma: any;
  variables: Variable[];
  conditions: Condition[];
  loops: Loop[];
  events: Event[];
}

export interface Variable {
  nodeId: string;
  expression: string;
}

export interface Condition {
  nodeId: string;
  expression: string;
}

export interface Loop {
  nodeId: string;
  variable: string;
  itemVariable: string;
}

export interface Event {
  nodeId: string;
  name: string;
  eventType: string;
}

export interface Output {
  template: string;
  css: string;
}

export interface BaseStyle {
  x: number;
  xFromCenter: number;
  xFromRight: number;
  y: number;
  width: number;
  height: number;
  constraintsHorizontal: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  constraintsVertical: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  layoutAlign: "STRETCH" | "INHERIT";
  border?: Border;
  shadow?: Shadow;
}

export interface FrameStyle extends BaseStyle {
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  counterAxisAlignItems: "MIN" | "CENTER" | "MAX";
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
  background?: Color;
  radius: Radius;
  clipsContent: boolean;
}

export interface TextStyle extends BaseStyle {
  color: Color;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  letterSpacing: number;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textDecoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
}

export interface RectangleStyle extends BaseStyle {
  background?: Color;
  radius: Radius;
}

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Border {
  color: Color;
  width: number;
  inside: boolean;
}

interface Shadow {
  color: Color;
  x: number;
  y: number;
  blur: number;
  spread: number;
  inner: boolean;
}

interface Radius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}
