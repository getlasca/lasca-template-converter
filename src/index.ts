import { Breakpoint, Output } from "./types";
import Builder from "./builder";

export default function convert(breakpoints: Breakpoint[]): Output {
  return new Builder(breakpoints).build();
}
