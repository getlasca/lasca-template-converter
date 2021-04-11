import convert from "../../src/index";
import { loadFixture } from "../helper";

test("convert", () => {
  const fidmaObj = loadFixture("simple");
  const output = convert({ figmaObj: fidmaObj }, [], [], [], [], []);
  expect(output.css).toBe("p{color:red;}");
});
