import convert from "../../../src/index";
import { defaultConvertParams } from "../../fixture";
import { buildFigmaFixture } from "../../helper";

test("left", () => {
  const leftConstraintFigmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    width: 1000,
    x: 100,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        width: 150,
        x: 200,
        constraints: { horizontal: "MIN", vertical: "MIN" },
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: leftConstraintFigmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 200px; width: 150px; }"
  );
});

test("right", () => {
  const rightConstraintFigmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    width: 1000,
    x: 100,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        width: 150,
        x: 200,
        constraints: { horizontal: "MAX", vertical: "MIN" },
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: rightConstraintFigmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; right: 650px; width: 150px; }"
  );
});

test("left & right", () => {
  const rightConstraintFigmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    width: 1000,
    x: 100,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        width: 150,
        x: 200,
        constraints: { horizontal: "STRETCH", vertical: "MIN" },
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: rightConstraintFigmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 200px; right: 650px; }"
  );
});

test("center", () => {
  const rightConstraintFigmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    width: 1000,
    x: 100,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        width: 150,
        x: 200,
        constraints: { horizontal: "CENTER", vertical: "MIN" },
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: rightConstraintFigmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: calc(50% - 300px); width: 150px; }"
  );
});
