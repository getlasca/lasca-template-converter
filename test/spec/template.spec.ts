import convert from "../../src/index";
import * as util from "../../src/util";

import { loadFixture } from "../helper";

test("convert", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("simple");
  const output = convert(
    { breakpoints: [{ figmaObj: fidmaObj }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div></div><p class="class-dummy">sampleText</p></div></div></div>`
  );
});

test("convert", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("nested");
  const output = convert(
    { breakpoints: [{ figmaObj: fidmaObj }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div class="class-dummy"><div></div></div></div></div></div>`
  );
});
