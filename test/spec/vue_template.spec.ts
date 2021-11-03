import convert from "../../src/index";
import {
  defaultConvertParams,
  simpleFigmaFixture,
  nestedFigmaFixture,
} from "../fixture";

test("simple", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
    },
  ]);
  const template =
    `<div>` +
    `<div class="breakpoint-1">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.vueTemplate).toBe(template);
});

test("breakpoints", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      max: 349,
    },
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      min: 350,
    },
  ]);
  const template =
    `<div>` +
    `<div class="breakpoint-1">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `<div class="breakpoint-2">` +
    `<div class="class-1">` +
    `<div class="class-2"></div>` +
    `<span class="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.vueTemplate).toBe(template);
});

test("nested", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: nestedFigmaFixture,
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
});

test("condition", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      conditions: [{ nodeId: "10:1", conditionSet: { expression: "valid" } }],
    },
  ]);

  expect(output.vueTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-if="valid"></div>` +
      `<span class="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("loop without index", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      loops: [
        {
          nodeId: "10:1",
          loopSet: { expression: "items", key: "item", itemVariable: "item" },
        },
      ],
    },
  ]);
  expect(output.vueTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-for="item in items" :key="item"></div>` +
      `<span class="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("loop with index", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      loops: [
        {
          nodeId: "10:1",
          loopSet: {
            expression: "items",
            key: "item",
            itemVariable: "item",
            indexVariable: "i",
          },
        },
      ],
    },
  ]);
  expect(output.vueTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-for="(item, i) in items" :key="item"></div>` +
      `<span class="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("variable", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      variables: [{ nodeId: "10:2", variableSet: { expression: "count" } }],
    },
  ]);
  expect(output.vueTemplate).toBe(
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

test("event", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      events: [
        {
          nodeId: "10:1",
          eventType: "click",
          eventSet: { expression: "handle" },
        },
      ],
    },
  ]);
  expect(output.vueTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" v-on:click="handle"></div>` +
      `<span class="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("link", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      links: [
        {
          nodeId: "10:1",
          isTargetBlank: false,
          variableSet: { expression: "link" },
        },
      ],
    },
  ]);
  expect(output.vueTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<a class="class-2" :href="link"></a>` +
      `<span class="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
