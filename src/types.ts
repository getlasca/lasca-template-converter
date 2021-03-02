export interface Page {
  breakpoint?: Breakpoint;
  figmaObj: any;
}

export interface Breakpoint {
  min?: number;
  max?: number;
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
  opacity: number;
  constraintsHorizontal: string;
  constraintsVertical: string;
}

export interface FrameStyle extends BaseStyle {
  background: string;
}

export interface GroupStyle extends BaseStyle {
  background: string;
}

export interface TextStyle extends BaseStyle {
  background: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
}

export interface RectangleStyle extends BaseStyle {
  background: string;
  radius: string;
}
