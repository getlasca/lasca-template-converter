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
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2"></div>` +
      `<span class="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
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
  expect(output.template).toBe(
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
      `</div>`
  );
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
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2">` +
      `<div class="class-3"></div>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("variable", () => {
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [{ nodeId: "1:8", expression: "count" }],
      conditions: [],
      loops: [],
      events: [],
    },
  ]);
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2"></div>` +
      `<span class="class-3">{{ count }}</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("condition", () => {
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [{ nodeId: "1:7", expression: "valid" }],
      loops: [],
      events: [],
    },
  ]);
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-if="valid"></div>` +
      `<span class="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("loop", () => {
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
      loops: [{ nodeId: "1:7", itemVariable: "item", variable: "items" }],
      events: [],
    },
  ]);
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-for="item in items" :key="item.id"></div>` +
      `<span class="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("event", () => {
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
      events: [{ nodeId: "1:7", eventType: "click", name: "handle" }],
    },
  ]);
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-on:click="handle"></div>` +
      `<span class="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
