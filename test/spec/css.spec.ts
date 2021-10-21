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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; }"
  );
});

test("two breakpoints", () => {
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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      "@media screen and (max-width: 349px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; } } " +
      "@media screen and (min-width: 350px) { .breakpoint-1 { display: none; } } " +
      ".breakpoint-2 { position: relative; } " +
      "@media screen and (min-width: 350px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; } } " +
      "@media screen and (max-width: 349px) { .breakpoint-2 { display: none; } }"
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
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 {  position: absolute; top: 100px; height: 500px; left: 50px; width: 600px; }" +
      ".class-3 { background-color: rgba(0,0,0,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 120px; height: 200px; left: 30px; width: 380px; }"
  );
});

test("event cursor", () => {
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
          eventSet: { expression: "handle" },
        },
      ],
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; cursor: pointer; }" +
      ".class-3 { text-align: left; white-space: pre-wrap; overflow-wrap: break-word; font-size: 12px; color: rgba(0,0,0,1); font-weight: 400; font-family: 'Roboto', sans-serif; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; }"
  );
});
