import convert from "../../src/index";

import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.template).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2"></div>` +
      `<p class="class-3">sampleText</p>` +
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
      max: 349,
      variables: [],
      conditions: [],
      loops: [],
      events: [],
    },
    {
      figma: figma,
      min: 350,
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
      `<p class="class-3">sampleText</p>` +
      `</div>` +
      `</div>` +
      `<div class="breakpoint-2">` +
      `<div class="class-1">` +
      `<div class="class-2"></div>` +
      `<p class="class-3">sampleText</p>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
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
      `<p class="class-3">{{ count }}</p>` +
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
      `<p class="class-3">sampleText</p>` +
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
      `<p class="class-3">sampleText</p>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
