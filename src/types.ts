export interface Component {
  breakpoints: BreakPoint[];
}

export interface BreakPoint {
  min?: number;
  max?: number;
  figma: any;
}

export interface Embed {
  nodeId: string;
  variables: string[];
  compound?: string; // e.g. "Room: {{ room }}"
}

export interface Condition {
  nodeId: string;
  variable: string;
}

export interface Loop {
  nodeId: string;
  variable: string;
}

export interface Event {
  nodeId: string;
  name: string;
  type: string;
}

export interface Output {
  template: string;
  css: string;
}

export interface BaseStyle {
  x: number;
  y: number;
  width: number;
  height: number;
  constraintsHorizontal: string;
  constraintsVertical: string;
  border?: Border;
}

export interface FrameStyle extends BaseStyle {
  background: Color;
  radius: number;
}

export interface TextStyle extends BaseStyle {
  color: Color;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
}

export interface RectangleStyle extends BaseStyle {
  background: Color;
  radius: number;
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
