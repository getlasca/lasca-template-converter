import convert from "../../src/index";
import * as util from "../../src/util";

import { loadFixture } from "../helper";

test("convert", () => {
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
  expect(output.template).toBe(
    `<div><div></div><p class="class-dummy-hash">sampleText</p></div>`
  );
});
