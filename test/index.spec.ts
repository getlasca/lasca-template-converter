import convert from "../src/index";

test("convert", () => {
  const output = convert({ figmaObj: { a: "" } }, [], [], [], [], []);
  expect(output.template).toBe("<div>hoge</div>");
});
