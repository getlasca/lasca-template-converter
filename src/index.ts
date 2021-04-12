import { Component, Embed, Condition, Loop, Event, Output } from "./types";
import Builder from "./builder";

export default function convert(
  component: Component,
  variables: string[],
  embeds: Embed[],
  conditions: Condition[],
  loops: Loop[],
  events: Event[]
): Output {
  const output = new Builder(
    component,
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
