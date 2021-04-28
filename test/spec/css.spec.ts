import convert from "../../src/index";
import { loadFixture } from "../helper";
import * as util from "../../src/util";

test("simple", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("simple");
  const output = convert(
    { breakpoints: [{ figmaObj: fidmaObj }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.css).toBe(
    ".class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; }"
  );
});

test("two breakpoints", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("simple");
  const output = convert(
    {
      breakpoints: [
        { figmaObj: fidmaObj, range: { max: 349 } },
        { figmaObj: fidmaObj, range: { min: 350 } },
      ],
    },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.css).toBe(
    "@media screen and (max-width: 349px) { .class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; } } @media screen and (min-width: 350px) { .breakpoint-dummy { display: none; } } @media screen and (min-width: 350px) { .class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }.class-dummy { color: rgba(255,255,255,1); font-size: 14px; font-weight: 700; font-family: Noto Sans JP; } } @media screen and (max-width: 349px) { .breakpoint-dummy { display: none; } }"
  );
});

test("nested", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy");

  const fidmaObj = loadFixture("nested");
  const output = convert(
    { breakpoints: [{ figmaObj: fidmaObj }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.css).toBe(
    ".class-dummy { background-color: rgba(255,255,255,1); } .class-dummy { background-color: rgba(0,0,0,1); } .class-dummy { background-color: rgba(255,255,255,1); border-radius: 80px; }"
  );
});
