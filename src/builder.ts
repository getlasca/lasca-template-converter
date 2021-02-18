import { Page, Embed, Condition, Loop, Event, Output } from './types'
import FrameNode from './nodes/frame'

export default class Builder {
  rootNode: FrameNode

  constructor(
    page: Page,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ) {
    this.rootNode = this.parse(page, variables, embeds, conditions, loops, events)
  }

  build(): Output {
    return {
      template: this.buildTemplate(),
      css: this.buildCss(),
    }
  }

  private parse(
    page: Page,
    variables: string[],
    embeds: Embed[],
    conditions: Condition[],
    loops: Loop[],
    events: Event[]
  ): any {
    // set rootNode from input
  }

  private buildTemplate(): string {
    // buildTemplate 
    // use children's each BaseNode.buildTemplate() method
    return '<div>hoge</div>'
  }

  private buildCss(): string {
    return ""
  }

}