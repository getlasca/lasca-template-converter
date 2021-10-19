export interface Breakpoint {
  min: number;
  max: number;
  figma: any;
  mixedTexts: MixedText[];
  nodeImages: NodeImage[];
  variables: Variable[];
  conditions: Condition[];
  loops: Loop[];
  events: Event[];
}

export interface MixedText {
  nodeId: string;
  style: MixedTextStyle;
}

export interface MixedTextStyle {
  characterStyleMixed: number[];
  styleMixedTable: MixedTextStyleTable[];
}

export interface MixedTextStyleTable {
  id: number;
  fontSize?: number;
  fontName?: any;
  textCase?: string;
  textDecoration?: string;
  letterSpacing?: any;
  lineHeight?: any;
  fills?: any[];
  textListOptions?: string;
}

export interface NodeImage {
  nodeId: string;
  imageId: string;
}

export interface Variable {
  nodeId: string;
  expression: string;
  loopId: number;
}

export interface Condition {
  nodeId: string;
  expression: string;
  loopId: number;
}

export interface Loop {
  nodeId: string;
  variableSet: VariableSet;
}

export interface VariableSet {
  name: string;
}

export interface Event {
  nodeId: string;
  eventType: string;
  eventSet: EventSet;
}

export interface EventSet {
  name: string;
}

export interface Output {
  jsxTemplate: string;
  vueTemplate: string;
  css: string;
}

export interface BaseStyle {
  x: number;
  xFromCenter: number;
  xFromRight: number;
  y: number;
  width: number;
  height: number;
  isWidthAuto: boolean;
  isHeightAuto: boolean;
  constraintsHorizontal: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  constraintsVertical: "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE";
  layoutAlign: "STRETCH" | "INHERIT";
  layoutGrow: number;
  isFixedPosition: boolean;
  border?: Border;
  shadows: Shadow[];
  layerBlur?: Blur;
  backgroundBlur?: Blur;
}

export interface ShapeStyle {
  backgroundColor?: Color;
  backgroundImage?: BackgroundImage;
  backgroundGradient?: BackgroundGradient;
  radius: Radius;
}

export interface FrameStyle extends BaseStyle, ShapeStyle {
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
  clipsContent: boolean;
}

export interface RectangleStyle extends BaseStyle, ShapeStyle {}

export interface TextRangeStyle {
  color?: Color;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  letterSpacing?: string;
  textCase?: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE";
  textDecoration?: "NONE" | "UNDERLINE" | "STRIKETHROUGH";
  lineHeight?: string;
}

export interface TextRangeStyleMapping {
  styleId: number;
  style: TextRangeStyle;
}

export interface TextStyle extends BaseStyle, TextRangeStyle {
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
  wrapped: boolean;
  textIndent: number;
}

export interface GroupStyle {
  width: number;
  height: number;
}

export type VectorStyle = BaseStyle;

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface BackgroundImage {
  scaleMode: "FILL" | "FIT" | "CROP" | "TILE";
}

interface BackgroundGradient {
  type: "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR";
  gradientStops: GradientStop[];
}

interface GradientStop {
  color: Color;
  position: number;
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

interface Blur {
  radius: number;
}

interface Radius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  isEllipse: boolean;
}
