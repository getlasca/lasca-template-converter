import { Breakpoint, Output } from "./types";
import Builder from "./builder";

export default function convert(breakpoints: Breakpoint[]): Output {
  const output = new Builder(breakpoints).build();
  console.log("converter template: " + output.template);
  console.log("converter css: " + output.css);
  return output;
}
