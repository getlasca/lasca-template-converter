import { Page, Condition, Loop, Event, Output } from './types'

export default function convert(
  page: Page,
  variables: string[],
  conditions: Condition[],
  loops: Loop[],
  events: Event[]
): Output {
  const output = { template: '<div>hoge</div>', css: '' }
  console.log("template: " + output.template)
  console.log("css: " + output.css)
  return output
}