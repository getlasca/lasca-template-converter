import convert from "../../src/index";
import { loadFixture } from "../helper";

test("simple", () => {
  const figma = loadFixture("simple");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; }"
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
    "@media screen and (max-width: 349px) { .class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; } } @media screen and (min-width: 350px) { .breakpoint-dummy { display: none; } } @media screen and (min-width: 350px) { .class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; } } @media screen and (max-width: 349px) { .breakpoint-dummy { display: none; } }"
  );
});

test("nested", () => {
  const figma = loadFixture("nested");
  const output = convert([
    { figma: figma, variables: [], conditions: [], loops: [], events: [] },
  ]);
  expect(output.css).toBe(
    ".class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(0,0,0,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }"
  );
});
