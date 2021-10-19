import convert from "../../src/index";
import { loadFixture } from "../helper";

test("variable", () => {
  const figma = loadFixture("simple");
  const output = convert([
    {
      figma: figma,
      min: 0,
      max: 0,
      mixedTexts: [],
      nodeImages: [],
      variables: [{ nodeId: "1:8", expression: "this.state.count", loopId: 0 }],
      conditions: [],
      loops: [],
      events: [],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2"></div>` +
      `<span class="class-3">{ this.state.count }</span>` +
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
          eventSet: { name: "this.handle" },
        },
      ],
    },
  ]);
  expect(output.jsxTemplate).toBe(
    `<div>` +
      `<div class="breakpoint-1">` +
      `<div class="class-1">` +
      `<div class="class-2" onClick={this.handle()}></div>` +
      `<span class="class-3">sampleText</span>` +
      `</div>` +
      `</div>` +
      `</div>`
  );
});
