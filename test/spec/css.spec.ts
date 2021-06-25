import convert from "../../src/index";
import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-1 { background-color: rgba(255,255,255,1); position: relative; height: 845px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { color: rgba(0,0,0,1); font-size: 12px; font-weight: 400; font-family: 'Roboto', sans-serif; text-align: left; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; }"
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
      ".class-1 { background-color: rgba(255,255,255,1); position: relative; height: 845px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { color: rgba(0,0,0,1); font-size: 12px; font-weight: 400; font-family: 'Roboto', sans-serif; text-align: left; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; } } " +
      "@media screen and (min-width: 350px) { .breakpoint-1 { display: none; } } " +
      "@media screen and (min-width: 350px) { " +
      ".class-1 { background-color: rgba(255,255,255,1); position: relative; height: 845px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 140px; height: 230px; left: 180px; width: 350px; }" +
      ".class-3 { color: rgba(0,0,0,1); font-size: 12px; font-weight: 400; font-family: 'Roboto', sans-serif; text-align: left; position: absolute; top: 550px; height: 90px; left: 110px; width: 310px; } } " +
      "@media screen and (max-width: 349px) { .breakpoint-2 { display: none; } }"
  );
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-1 { background-color: rgba(255,255,255,1); position: relative; height: 800px; }" +
      ".class-2 {  position: absolute; top: 100px; height: 500px; left: 50px; width: 600px; }" +
      ".class-3 { background-color: rgba(0,0,0,1); border-radius: 80px 80px 80px 80px; position: absolute; top: 120px; height: 200px; left: 30px; width: 380px; }"
  );
});
