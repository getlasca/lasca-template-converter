import convert from "../../../../src/index";
import { defaultConvertParams } from "../../../fixture";
import { buildFigmaFixture } from "../../../helper";

test("vertical left top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "MIN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-start; }" +
      " .class-1 > *:not(:last-child) { margin-bottom: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("vertical right top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MAX",
    primaryAxisAlignItems: "MIN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-end; }" +
      " .class-1 > *:not(:last-child) { margin-bottom: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("vertical center top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "CENTER",
    primaryAxisAlignItems: "MIN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: center; }" +
      " .class-1 > *:not(:last-child) { margin-bottom: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("vertical left bottom", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "MAX",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-end; align-items: flex-start; }" +
      " .class-1 > *:not(:first-child) { margin-top: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("vertical left center", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "CENTER",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: center; align-items: flex-start; }" +
      " .class-1 > *:not(:first-child) { margin-top: 10px; } .class-1 > *:not(:last-child) { margin-bottom: 10px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal left space between", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "SPACE_BETWEEN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: space-between; align-items: flex-start; }" +
      " .class-1 > *:only-child { margin: auto 0; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("vertical fill container vertically", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "MIN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        layoutGrow: 1,
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-start; }" +
      " .class-1 > *:not(:last-child) { margin-bottom: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 1; position: relative; }"
  );
});

test("vertical fill container horizontally", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "VERTICAL",
    counterAxisAlignItems: "MIN",
    primaryAxisAlignItems: "MIN",
    itemSpacing: 20,
    paddingTop: 40,
    paddingLeft: 50,
    paddingBottom: 40,
    paddingRight: 50,
    children: [
      {
        type: "RECTANGLE",
        id: "10:1",
        layoutAlign: "STRETCH",
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-start; }" +
      " .class-1 > *:not(:last-child) { margin-bottom: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 100%; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});
