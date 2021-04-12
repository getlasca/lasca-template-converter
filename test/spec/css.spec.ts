import convert from "../../src/index";
import { loadFixture } from "../helper";

test("simple", () => {
  const fidmaObj = loadFixture("simple");
  const output = convert(
    { breakpoints: [{ figmaObj: fidmaObj }] },
    [],
    [],
    [],
    [],
    []
  );
  expect(output.css).toBe("p{color:red;}");
});

test("two breakpoints", () => {
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
    "@media screen and (max-width: 349px) { p{color:red;} } @media screen and (min-width: 350px) { p{color:red;} }"
  );
});
