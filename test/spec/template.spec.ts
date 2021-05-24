import convert from "../../src/index";

import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert(
    { breakpoints: [{ figma: figma }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div class="class-dummy"></div><p class="class-dummy">sampleText</p></div></div></div>`
  );
});

test("two breakpoints", () => {
  const figma = loadFixture("simple");
  const output = convert(
    {
      breakpoints: [
        { figma: figma, max: 349 },
        { figma: figma, min: 350 },
      ],
    },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div class="class-dummy"></div><p class="class-dummy">sampleText</p></div></div><div class="breakpoint-dummy"><div class="class-dummy"><div class="class-dummy"></div><p class="class-dummy">sampleText</p></div></div></div>`
  );
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert(
    { breakpoints: [{ figma: figma }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.template).toBe(
    `<div><div class="breakpoint-dummy"><div class="class-dummy"><div class="class-dummy"><div class="class-dummy"></div></div></div></div></div>`
  );
});
