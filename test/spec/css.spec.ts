import convert from "../../src/index";
import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-1 { background-color: rgba(255,255,255,1); position: relative; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 20px; height: 40px; }" +
      ".class-3 { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; position: absolute; top: 60px; height: 24px; }"
  );
});

test("two breakpoints", () => {
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
  expect(output.css).toBe(
    "@media screen and (max-width: 349px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); position: relative; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 20px; height: 40px; }" +
      ".class-3 { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; position: absolute; top: 60px; height: 24px; } } " +
      "@media screen and (min-width: 350px) { .breakpoint-1 { display: none; } } " +
      "@media screen and (min-width: 350px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); position: relative; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 20px; height: 40px; }" +
      ".class-3 { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; position: absolute; top: 60px; height: 24px; } } " +
      "@media screen and (max-width: 349px) { .breakpoint-2 { display: none; } }"
  );
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-1 { background-color: rgba(255,255,255,1); position: relative; }" +
      ".class-2 { background-color: rgba(0,0,0,1); position: absolute; top: 60px; height: 200px; left: 0px; width: 800px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: -40px; height: 40px; }"
  );
});
