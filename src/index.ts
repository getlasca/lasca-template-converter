import { Page, Embed, Condition, Loop, Event, Output } from "./types";
import Builder from "./builder";

export default function convert(
  page: Page,
  variables: string[],
  embeds: Embed[],
  conditions: Condition[],
  loops: Loop[],
  events: Event[]
): Output {
  const output = new Builder(
    page,
    variables,
    embeds,
    conditions,
    loops,
    events
  ).build();
  console.log("template: " + output.template);
  console.log("css: " + output.css);
  return output;
}
