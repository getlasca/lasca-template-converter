export default abstract class BaseNode {
  nodeId: string
  children: BaseNode[]
  conditionVariable?: string
  loopVariable?: string
  eventType?: string
  eventName?: string

  constructor(
    nodeId: string,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    this.nodeId = nodeId
    this.conditionVariable = conditionVariable
    this.loopVariable = loopVariable
    this.eventType = eventType
    this.eventName = eventName
  }

  abstract buildTemplate(): string
  abstract buildCss(): string
}
