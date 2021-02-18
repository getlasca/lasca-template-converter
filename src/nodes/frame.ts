import BaseNode from './base'
import { FrameStyle } from '../types'

export default class FrameNode extends BaseNode {
  style: FrameStyle
  children: BaseNode[]

  constructor(
    nodeId: string,
    style: FrameStyle,
    children: BaseNode[],
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    super(nodeId, conditionVariable, loopVariable, eventType, eventName);
    this.style = style
    this.children = children
  }

  buildTemplate(): string {
    return ""
  }

  buildCss(): string {
    return ""
  }
}
