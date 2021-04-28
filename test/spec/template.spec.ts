import convert from "../../src/index";
import * as util from "../../src/util";

import { loadFixture } from "../helper";

test("simple", () => {
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

test("two breakpoints", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("simple");
  const output = convert(
    {
      breakpoints: [
        { figmaObj: fidmaObj, range: { max: 349 } },
        { figmaObj: fidmaObj, range: { min: 350 } },
      ],
    },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div></div><p class="class-dummy">sampleText</p></div></div><div class="breakpoint-dummy"><div class="class-dummy"><div></div><p class="class-dummy">sampleText</p></div></div></div>`
  );
});

test("nested", () => {
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
