import convert from "../../../src/index";
import {
  defaultConvertParams,
  simpleFigmaFixture,
  nestedFigmaFixture,
} from "../../fixture";

test("simple", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
    },
  ]);
  const template =
    `<div>` +
    `<div className="breakpoint-1">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.jsxTemplate).toBe(template);
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
    `<div className="breakpoint-1">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `<div className="breakpoint-2">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">test_text</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.jsxTemplate).toBe(template);
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
    `<div className="breakpoint-1">` +
    `<div className="class-1">` +
    `<div className="class-2">` +
    `<div className="class-3"></div>` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</div>`;
  expect(output.jsxTemplate).toBe(template);
});

test("condition", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: simpleFigmaFixture,
      conditions: [{ nodeId: "10:1", conditionSet: { expression: "valid" } }],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `{ valid && <div className="class-2"></div> }` +
      `<span className="class-3">test_text</span>` +
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
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `{ items.map((item) => <div className="class-2" key={item}></div> )}` +
      `<span className="class-3">test_text</span>` +
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
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `{ items.map((item, i) => <div className="class-2" key={item}></div> )}` +
      `<span className="class-3">test_text</span>` +
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
      variables: [
        { nodeId: "10:2", variableSet: { expression: "this.state.count" } },
      ],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `<div className="class-2"></div>` +
      `<span className="class-3">{ this.state.count }</span>` +
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
          eventSet: { expression: "this.handle" },
        },
      ],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `<div className="class-2" onClick={this.handle}></div>` +
      `<span className="class-3">test_text</span>` +
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
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `<a className="class-2" href={link}></a>` +
      `<span className="class-3">test_text</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
