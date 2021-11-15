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
  Link,
} from "../types";

export default abstract class BaseNode {
  nodeId: string;
  className: string;
  layoutModeAsChild:
    | "NONE"
    | "HORIZONTAL"
    | "VERTICAL"
    | "AUTOLAYOUT_GROUP"
    | "HORIZONTAL_GROUP_FILL_CONTAINER";
  mixedTexts: MixedText[];
  nodeImages: NodeImage[];
  variables: Variable[];
  conditions: Condition[];
  loops: Loop[];
  events: Event[];
  links: Link[];

  constructor(
    nodeId: string,
    idGenerator: IdGenerator,
    layoutModeAsChild:
      | "NONE"
      | "HORIZONTAL"
      | "VERTICAL"
      | "AUTOLAYOUT_GROUP"
      | "HORIZONTAL_GROUP_FILL_CONTAINER" = "NONE",
    mixedTexts: MixedText[] = [],
    nodeImages: NodeImage[] = [],
    variables: Variable[] = [],
    conditions: Condition[] = [],
    loops: Loop[] = [],
    events: Event[] = [],
    links: Link[] = []
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
    this.links = links;
  }

  abstract buildTemplate(type: "jsx" | "vue"): string;
  abstract buildCss(): string;

  protected buildTag(
    type: "jsx" | "vue",
    tag: string,
    className: string,
    inner: string
  ): string {
    const condition = this.conditions.find((condition) => {
      return this.nodeId === condition.nodeId;
    });

    const loop = this.loops.find((loop) => {
      return this.nodeId === loop.nodeId;
    });

    const variable = this.variables.find((variable) => {
      return this.nodeId === variable.nodeId;
    });

    const event = this.events.find((event) => {
      return this.nodeId === event.nodeId;
    });

    const link = this.links.find((link) => {
      return this.nodeId === link.nodeId;
    });

    const image = this.nodeImages.find((image) => this.nodeId === image.nodeId);

    if (link) {
      tag = "a";
    }

    if (type === "jsx") {
      const styleAttr =
        variable && image
          ? ` style={{ backgroundImage: 'url(' + ${variable.variableSet.expression} + ')' }}`
          : "";

      const loopKeyAttr = loop ? ` key={${loop.loopSet.key}}` : "";

      const eventAttr = event
        ? ` on${event.eventType[0].toUpperCase() + event.eventType.slice(1)}={${
            event.eventSet.expression
          }}`
        : "";

      let linkAttr = "";
      if (link) {
        linkAttr = ` href={${link.variableSet.expression}}${
          link.isTargetBlank ? ` target="_blank"` : ""
        }`;
      }

      let outputTag = `<${tag} className="class-${className}"${linkAttr}${styleAttr}${loopKeyAttr}${eventAttr}>`;
      outputTag +=
        variable && !image ? `{ ${variable.variableSet.expression} }` : inner;
      outputTag += `</${tag}>`;

      if (!condition && !loop) {
        return outputTag;
      }

      const conditionExpression = condition
        ? `${condition.conditionSet.expression} && `
        : "";

      const loopExpression = loop
        ? loop.loopSet.indexVariable
          ? `${loop.loopSet.expression}.map((${loop.loopSet.itemVariable}, ${loop.loopSet.indexVariable}) => `
          : `${loop.loopSet.expression}.map((${loop.loopSet.itemVariable}) => `
        : "";

      let output = `{ ${conditionExpression}${loopExpression}`;
      output += outputTag;
      output += loop ? " )}" : " }";
      return output;
    } else {
      const styleAttr =
        variable && image
          ? ` :style="{ 'background-image': 'url(' + ${variable.variableSet.expression} + ')' }"`
          : "";

      const conditionAttr = condition
        ? ` v-if="${condition.conditionSet.expression}"`
        : "";

      const loopAttr = loop
        ? loop.loopSet.indexVariable
          ? ` v-for="(${loop.loopSet.itemVariable}, ${loop.loopSet.indexVariable}) in ${loop.loopSet.expression}" :key="${loop.loopSet.key}"`
          : ` v-for="${loop.loopSet.itemVariable} in ${loop.loopSet.expression}" :key="${loop.loopSet.key}"`
        : "";

      const eventAttr = event
        ? ` v-on:${event.eventType}="${event.eventSet.expression}"`
        : "";

      let linkAttr = "";
      if (link) {
        linkAttr = ` :href="${link.variableSet.expression}"${
          link.isTargetBlank ? ` target="_blank"` : ""
        }`;
      }

      let output = `<${tag} class="class-${className}"${linkAttr}${styleAttr}${conditionAttr}${loopAttr}${eventAttr}>`;
      output +=
        variable && !image ? `{{ ${variable.variableSet.expression} }}` : inner;
      output += `</${tag}>`;
      return output;
    }
  }

  protected buildCursorCss(): string {
    const event = this.events.find((event) => {
      return this.nodeId === event.nodeId;
    });
    return event ? " cursor: pointer;" : "";
  }

  protected buildBaseLayoutCss(input: BaseStyle, isRoot = false): string {
    if (isRoot) {
      return "";
    }

    if (["HORIZONTAL", "VERTICAL"].includes(this.layoutModeAsChild)) {
      return this.buildAutoLayoutChildCss(
        input.width,
        input.height,
        input.isWidthAuto,
        input.isHeightAuto,
        input.layoutAlign,
        input.layoutGrow
      );
    }

    let css = ` position: ${input.isFixedPosition ? "fixed" : "absolute"};`;

    switch (input.constraintsVertical) {
      case "MIN": {
        css += ` top: ${input.y}px;`;
        if (input.isHeightAuto) {
          css += ` min-height: ${input.height}px;`;
        } else {
          css += ` height: ${input.height}px;`;
        }
        break;
      }
      case "MAX": {
        css += ` bottom: ${input.yFromBottom}px;`;
        if (input.isHeightAuto) {
          css += ` min-height: ${input.height}px;`;
        } else {
          css += ` height: ${input.height}px;`;
        }
        break;
      }
      case "STRETCH": {
        css += ` top: ${input.y}px;`;
        css += ` bottom: ${input.yFromBottom}px;`;
        break;
      }
      case "CENTER": {
        css += ` top: calc(50%${
          input.yFromCenter > 0
            ? " - " + input.yFromCenter
            : " + " + -1 * input.yFromCenter
        }px);`;
        if (input.isHeightAuto) {
          css += ` min-height: ${input.height}px;`;
        } else {
          css += ` height: ${input.height}px;`;
        }
        break;
      }
      case "SCALE": {
        css += ` top: ${input.yPercent}%;`;
        css += ` bottom: ${input.yFromBottomPercent}%;`;
        break;
      }
    }

    let constraintsHorizontal = input.constraintsHorizontal;
    // nodes inside autolayout group are forced to be constrained.
    switch (this.layoutModeAsChild) {
      case "HORIZONTAL_GROUP_FILL_CONTAINER": {
        constraintsHorizontal = "SCALE";
        break;
      }
      case "AUTOLAYOUT_GROUP": {
        constraintsHorizontal = "MIN";
        break;
      }
    }
    switch (constraintsHorizontal) {
      case "MIN": {
        css += ` left: ${input.x}px;`;
        if (input.isWidthAuto) {
          css += ` min-width: ${input.width}px;`;
        } else {
          css += ` width: ${input.width}px;`;
        }
        break;
      }
      case "MAX": {
        css += ` right: ${input.xFromRight}px;`;
        if (input.isWidthAuto) {
          css += ` min-width: ${input.width}px;`;
        } else {
          css += ` width: ${input.width}px;`;
        }
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
        if (input.isWidthAuto) {
          css += ` min-width: ${input.width}px;`;
        } else {
          css += ` width: ${input.width}px;`;
        }
        break;
      }
      case "SCALE": {
        css += ` left: ${input.xPercent}%;`;
        css += ` right: ${input.xFromRightPercent}%;`;
        break;
      }
    }

    return css;
  }

  protected buildAutoLayoutChildCss(
    width: number,
    height: number,
    isWidthAuto: boolean,
    isHeightAuto: boolean,
    layoutAlign: "STRETCH" | "INHERIT",
    layoutGrow: number
  ): string {
    let css = "";
    if (this.layoutModeAsChild === "VERTICAL" && layoutAlign === "STRETCH") {
      css += ` width: 100%;`;
    } else if (isWidthAuto) {
      css += ` min-width: ${width}px;`;
    } else {
      css += ` width: ${width}px;`;
    }

    if (this.layoutModeAsChild === "HORIZONTAL" && layoutAlign === "STRETCH") {
      css += ` height: 100%;`;
    } else if (isHeightAuto) {
      css += ` min-height: ${height}px;`;
    } else {
      css += ` height: ${height}px;`;
    }

    if (layoutGrow === 1) {
      css += ` flex: 1;`;
    }

    css += ` position: relative;`;
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
}
