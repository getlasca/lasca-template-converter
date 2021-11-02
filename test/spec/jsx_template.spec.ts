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
      links: [],
    },
  ]);
  const template =
    `<div>` +
    `<div className="breakpoint-1">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
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
      links: [],
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
      links: [],
    },
  ]);
  const template =
    `<div>` +
    `<div className="breakpoint-1">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `<div className="breakpoint-2">` +
    `<div className="class-1">` +
    `<div className="class-2"></div>` +
    `<span className="class-3">sampleText</span>` +
    `</div>` +
    `</div>` +
    `</div>`;
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
      links: [],
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
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [],
      conditions: [{ nodeId: "1:7", conditionSet: { expression: "valid" } }],
      loops: [],
      events: [],
      links: [],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `{ valid && <div className="class-2"></div> }` +
      `<span className="class-3">sampleText</span>` +
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
      loops: [
        {
          nodeId: "1:7",
          loopSet: { expression: "items", key: "item", itemVariable: "item" },
        },
      ],
      events: [],
      links: [],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `{ items.map((item) => <div className="class-2" key={item}></div> )}` +
      `<span className="class-3">sampleText</span>` +
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
      variables: [
        {
          nodeId: "1:8",
          variableSet: { expression: "this.state.count" },
        },
      ],
      conditions: [],
      loops: [],
      events: [],
      links: [],
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
      events: [
        {
          nodeId: "1:7",
          eventType: "click",
          eventSet: { expression: "this.handle" },
        },
      ],
      links: [],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div className="breakpoint-1">` +
      `<div className="class-1">` +
      `<div className="class-2" onClick={this.handle}></div>` +
      `<span className="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});

test("link", () => {
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
      links: [
        {
          nodeId: "1:7",
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
      `<span className="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
