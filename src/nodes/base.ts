import IdGenerator from "../helper/idGenerator";
import {
  BaseStyle,
  FrameStyle,
  RectangleStyle,
  MixedText,
  NodeImage,
  Variable,
  Condition,
  Loop,
  Event,
} from "../types";

const LOOP_ITEM_SUFFIX = "__lascaItem";
const LOOP_INDEX_SUFFIX = "__lascaIndex";

export default abstract class BaseNode {
  nodeId: string;
  className: string;
  layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL";
  mixedTexts: MixedText[];
  nodeImages: NodeImage[];
  variables: Variable[];
  conditions: Condition[];
  loops: Loop[];
  events: Event[];
  parentLoopVariables: string[];

  constructor(
    nodeId: string,
    idGenerator: IdGenerator,
    layoutModeAsChild: "NONE" | "HORIZONTAL" | "VERTICAL" = "NONE",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = [],
    parentLoopVariables: string[] = []
  ) {
    this.nodeId = nodeId;
    this.className = idGenerator.getId() + "";
    this.layoutModeAsChild = layoutModeAsChild;
    this.mixedTexts = mixedTexts;
    this.nodeImages = nodeImages;
    this.variables = variables;
    this.conditions = conditions;
    this.loops = loops;
    this.events = events;
    this.parentLoopVariables = parentLoopVariables;
  }

  abstract buildTemplate(): string;
  abstract buildCss(): string;

  protected buildVariable(): string {
    const variable = this.variables.find((variable) => {
      return this.nodeId === variable.nodeId;
    });
    return variable
      ? `{{ ${
          variable.loopId === 0
            ? variable.expression
            : variable.expression + LOOP_ITEM_SUFFIX
        } }}`
      : "";
  }

  protected buildCondition(): string {
    const condition = this.conditions.find((condition) => {
      return this.nodeId === condition.nodeId;
    });
    return condition
      ? ` v-if="${
          condition.loopId === 0
            ? condition.expression
            : condition.expression + LOOP_ITEM_SUFFIX
        }"`
      : "";
  }

  protected buildLoop(): string {
    const loop = this.loops.find((loop) => {
      return this.nodeId === loop.nodeId;
    });
    if (!loop) {
      return "";
    }
    const itemName = loop.variableSet.name + LOOP_ITEM_SUFFIX;
    const indexName = loop.variableSet.name + LOOP_INDEX_SUFFIX;
    return ` v-for="(${itemName}, ${indexName}) in ${loop.variableSet.name}" :key="${itemName}"`;
  }

  protected buildEvent(): string {
    const event = this.events.find((event) => {
      return this.nodeId === event.nodeId;
    });
    const indexParams = this.parentLoopVariables
      .map((v) => {
        return v + LOOP_INDEX_SUFFIX;
      })
      .join(",");
    return event
      ? ` v-on:${event.eventType}="${event.eventSet.name}(${indexParams})"`
      : "";
  }

  protected buildBaseLayoutCss(input: BaseStyle, isRoot = false): string {
    if (isRoot) {
      return "";
    }

    let css = "";
    const baseWidth = input.isWidthAuto ? "auto" : input.width + "px";
    const baseHeight = input.isHeightAuto ? "auto" : input.height + "px";

    if (this.layoutModeAsChild !== "NONE") {
      css += ` width: ${
        this.layoutModeAsChild === "VERTICAL" && input.layoutAlign === "STRETCH"
          ? "100%"
          : baseWidth
      };`;
      css += ` height: ${
        this.layoutModeAsChild === "HORIZONTAL" &&
        input.layoutAlign === "STRETCH"
          ? "100%"
          : baseHeight
      };`;
      css += ` flex: ${
        input.layoutGrow === 1
          ? "1"
          : `0 0 ${
              this.layoutModeAsChild === "HORIZONTAL"
                ? input.width
                : input.height
            }px`
      };`;
      css += ` position: ${input.isFixedPosition ? "fixed" : "relative"};`;
      return css;
    }

    css += ` position: ${input.isFixedPosition ? "fixed" : "absolute"};`;
    css += ` top: ${input.y}px;`;
    css += ` height: ${baseHeight};`;

    switch (input.constraintsHorizontal) {
      case "MIN":
      case "SCALE": {
        css += ` left: ${input.x}px;`;
        css += ` width: ${baseWidth};`;
        break;
      }
      case "MAX": {
        css += ` right: ${input.xFromRight}px;`;
        css += ` width: ${baseWidth};`;
        break;
      }
      case "STRETCH": {
        css += ` left: ${input.x}px;`;
        css += ` right: ${input.xFromRight}px;`;
        break;
      }
      case "CENTER": {
        css += ` left: calc(50%${
          input.xFromCenter > 0
            ? " - " + input.xFromCenter
            : " + " + -1 * input.xFromCenter
        }px);`;
        css += ` width: ${baseWidth};`;
        break;
      }
    }
    return css;
  }

  protected buildBaseShapeCss(style: FrameStyle | RectangleStyle): string {
    let css = "";
    if (style.backgroundColor) {
      css += `background-color: rgba(${style.backgroundColor.r},${style.backgroundColor.g},${style.backgroundColor.b},${style.backgroundColor.a});`;
    } else if (style.backgroundImage) {
      const image = this.nodeImages.find(
        (image) => this.nodeId === image.nodeId
      );
      if (image) {
        css += `background: no-repeat center center url(${
          process.env.LASCA_ASSETS_URL || "https://assets.lasca.app"
        }/node_images/node-${image.imageId}.png);`;

        switch (style.backgroundImage?.scaleMode) {
          case "FILL": {
            css += `background-size: cover;`;
            break;
          }
          case "FIT": {
            css += `background-size: contain;`;
            break;
          }
        }
      }
    } else if (style.backgroundGradient) {
      let type = "";
      let position = ""; // TODO: position should be calculated from transform matrix by affin transformation
      switch (style.backgroundGradient.type) {
        case "GRADIENT_LINEAR": {
          type = "linear";
          position = "180deg";
          break;
        }
        case "GRADIENT_RADIAL": {
          type = "radial";
          position = "50% 50% at 50% 50%";
          break;
        }
        case "GRADIENT_ANGULAR": {
          type = "conic";
          position = "from 180deg at 50% 50%";
          break;
        }
      }
      const gradientStops = style.backgroundGradient.gradientStops
        .map((stop) => {
          return ` rgba(${stop.color.r},${stop.color.g},${stop.color.b},${
            stop.color.a
          }) ${
            style.backgroundGradient &&
            style.backgroundGradient.type === "GRADIENT_ANGULAR"
              ? Math.round(stop.position * 360 * 100) / 100 + "deg"
              : Math.round(stop.position * 100 * 100) / 100 + "%"
          }`;
        })
        .join(",");
      css += `background: ${type}-gradient(${position},${gradientStops});`;
    }
    if (style.border) {
      css += ` border: ${style.border.width}px solid rgba(${style.border.color.r},${style.border.color.g},${style.border.color.b},${style.border.color.a});`;
      if (style.border.inside) {
        css += ` box-sizing: border-box;`;
      }
    }
    if (style.shadows.length > 0) {
      const shadowsCss = style.shadows.map((shadow) => {
        return `${shadow.inner ? " inset" : ""} ${shadow.x}px ${shadow.y}px ${
          shadow.blur
        }px ${shadow.spread}px rgba(${shadow.color.r},${shadow.color.g},${
          shadow.color.b
        },${shadow.color.a})`;
      });
      css += ` box-shadow:${shadowsCss.join(",")};`;
    }
    if (style.layerBlur) {
      css += ` filter: blur(${style.layerBlur.radius}px);`;
    }
    if (style.backgroundBlur) {
      css += ` backdrop-filter: blur(${style.backgroundBlur.radius}px);`;
    }
    if (style.radius.isEllipse) {
      css += ` border-radius: 50%;`;
    } else if (
      style.radius.topLeft !== 0 ||
      style.radius.topRight !== 0 ||
      style.radius.bottomRight !== 0 ||
      style.radius.bottomLeft !== 0
    ) {
      css += ` border-radius: ${style.radius.topLeft}px ${style.radius.topRight}px ${style.radius.bottomRight}px ${style.radius.bottomLeft}px;`;
    }
    return css;
  }

  protected getParentLoopVariablesForChild(): string[] {
    const parentLoopVariblesForChild = this.parentLoopVariables.concat();
    const loop = this.loops.find((v) => {
      return v.nodeId === this.nodeId;
    });
    if (loop) {
      parentLoopVariblesForChild.push(loop.variableSet.name);
    }
    return parentLoopVariblesForChild;
  }
}
