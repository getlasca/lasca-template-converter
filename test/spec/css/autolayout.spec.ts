import convert from "../../../src/index";
import { defaultConvertParams } from "../../fixture";
import { buildFigmaFixture } from "../../helper";

test("horizontal left top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-start; }" +
      " .class-1 > *:not(:last-child) { margin-right: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal left bottom", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: flex-end; }" +
      " .class-1 > *:not(:last-child) { margin-right: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal left center", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; align-items: center; }" +
      " .class-1 > *:not(:last-child) { margin-right: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal right top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-end; align-items: flex-start; }" +
      " .class-1 > *:not(:first-child) { margin-left: 20px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal center top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: center; align-items: flex-start; }" +
      " .class-1 > *:not(:first-child) { margin-left: 10px; } .class-1 > *:not(:last-child) { margin-right: 10px; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});

test("horizontal space between top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "10:0",
    layoutMode: "HORIZONTAL",
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
      ".class-1 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: row; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: space-between; align-items: flex-start; }" +
      " .class-1 > *:only-child { margin: 0 auto; }" +
      ".class-2 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 0 0 500px; position: relative; }"
  );
});
