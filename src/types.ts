export interface Page {
  breakpoint?: Breakpoint
  figmaObj: any
}

export interface Breakpoint {
  min?: number
  max?: number
}

export interface Condition {
  nodeId: string
  variable: string
}

export interface Loop {
  nodeId: string
  variable: string
}

export interface Event {
  nodeId: string
  name: string
}

export interface Output {
  template: string
  css: string
}