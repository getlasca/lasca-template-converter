import convert from "../../src/index";
import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [],
      loops: [],
      events: [],
    },
  ]);
  const template =
    `<div>` +
    `<div class="breakpoint-1">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.vueTemplate).toBe(template);
  expect(output.jsxTemplate).toBe(template);
});

test("breakpoints", () => {
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 349,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [],
      loops: [],
      events: [],
    },
    {
      figma: figma,
      min: 350,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [],
      loops: [],
      events: [],
    },
  ]);
  const template =
    `<div>` +
    `<div class="breakpoint-1">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `<div class="breakpoint-2">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.vueTemplate).toBe(template);
  expect(output.jsxTemplate).toBe(template);
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [],
      loops: [],
      events: [],
    },
  ]);
  const template =
    `<div>` +
    `<div class="breakpoint-1">` +
    `<div class="class-1">` +
    `<div class="class-2">` +
    `<div class="class-3"></div>` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.vueTemplate).toBe(template);
  expect(output.jsxTemplate).toBe(template);
});
