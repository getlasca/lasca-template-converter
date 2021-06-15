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
  constraintsHorizontal: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  constraintsVertical: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  border?: Border;
  shadow?: Shadow;
}

export interface FrameStyle extends BaseStyle {
  background?: Color;
  radius: Radius;
}

export interface TextStyle extends BaseStyle {
  color: Color;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  letterSpacing: number;
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
