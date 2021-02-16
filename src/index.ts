import { Page, Condition, Loop, Event, Output } from './types'

export default function convert(
  page: Page,
  variables: string[],
  conditions: Condition[],
  loops: Loop[],
  events: Event[]
): Output {
  console.log("test")
  return { template: '', css: '' }
}