import convert from "../../../../src/index";
import { defaultConvertParams } from "../../../fixture";
import { buildFigmaFixture } from "../../../helper";

test("vertical left top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; row-gap: 20px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("vertical right top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; row-gap: 20px; align-items: flex-end; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("vertical center top", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; row-gap: 20px; align-items: center; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("vertical left bottom", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-end; row-gap: 20px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("vertical left center", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: center; row-gap: 20px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("horizontal left space between", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: space-between; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      " .class-2 > *:only-child { margin: auto 0; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; position: relative; }"
  );
});

test("vertical fill container vertically", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; row-gap: 20px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 500px; height: 500px; flex: 1; position: relative; }"
  );
});

test("vertical fill container horizontally", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
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
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 40px; padding-bottom: 40px; padding-left: 50px; padding-right: 50px; justify-content: flex-start; row-gap: 20px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 100%; height: 500px; position: relative; }"
  );
});

test("vertical flex wrap", () => {
  const figmaFixture = buildFigmaFixture({
    type: "FRAME",
    id: "0:0",
    children: [
      {
        type: "FRAME",
        id: "10:0",
        layoutMode: "VERTICAL",
        children: [
          {
            type: "RECTANGLE",
            id: "10:1",
            layoutAlign: "STRETCH",
          },
        ],
      },
    ],
  });
  const output = convert([
    {
      ...defaultConvertParams,
      figma: figmaFixture,
      flexWraps: [
        {
          nodeId: "10:0",
          gap: 50,
        },
      ],
    },
  ]);
  expect(output.css).toBe(
    ".breakpoint-1 { position: relative; } " +
      ".class-1 { background-color: rgba(255,255,255,1); }" +
      ".class-2 { background-color: rgba(255,255,255,1); box-sizing: border-box; display: flex; flex-direction: column; padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; flex-wrap: wrap; column-gap: 50px; justify-content: flex-start; row-gap: 0px; align-items: flex-start; position: absolute; top: 100px; left: 100px; width: 500px; }" +
      ".class-3 { background-color: rgba(255,255,255,1); width: 100%; height: 500px; position: relative; }"
  );
});
