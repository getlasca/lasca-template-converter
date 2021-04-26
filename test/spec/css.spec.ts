import convert from "../../src/index";
import { loadFixture } from "../helper";
import * as util from "../../src/util";

test("simple", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy-hash");

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
    ".class-dummy-hash { background-color: rgba(255,255,255,1); } p{color:red;}"
  );
});

test("two breakpoints", () => {
  jest.spyOn(util, "genHash").mockReturnValue("dummy-hash");

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
    "@media screen and (max-width: 349px) { .class-dummy-hash { background-color: rgba(255,255,255,1); } p{color:red;} } @media screen and (min-width: 350px) { .breakpoint-dummy-hash { display: none; } } @media screen and (min-width: 350px) { .class-dummy-hash { background-color: rgba(255,255,255,1); } p{color:red;} } @media screen and (max-width: 349px) { .breakpoint-dummy-hash { display: none; } }"
  );
});
