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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; text-decoration: none; position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }"
  );
});

test("two breakpoints", () => {
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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      "@media screen and (max-width: 349px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; text-decoration: none; position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; } } " +
      "@media screen and (min-width: 350px) { .breakpoint-1 { display: none; } } " +
      ".breakpoint-2 { position: relative; } " +
      "@media screen and (min-width: 350px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; text-decoration: none; position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; } } " +
      "@media screen and (max-width: 349px) { .breakpoint-2 { display: none; } }"
  );
});

test("nested", () => {
  const output = convert([
    {
      ...defaultConvertParams,
      figma: nestedFigmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }"
  );
});

test("event cursor", () => {
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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; cursor: pointer; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; text-decoration: none; position: absolute; top: 100px; height: 500px; left: 100px; width: 500px; }"
  );
});
