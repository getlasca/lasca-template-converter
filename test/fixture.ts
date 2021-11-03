import { buildFigmaFixture } from "./helper";

export const defaultConvertParams = {
  min: 0,
  max: 0,
  mixedTexts: [],
  nodeImages: [],
  variables: [],
  conditions: [],
  loops: [],
  events: [],
  links: [],
};

export const simpleFigmaFixture = buildFigmaFixture({
  type: "FRAME",
  id: "10:0",
  children: [
    {
      type: "RECTANGLE",
      id: "10:1",
    },
    {
      type: "TEXT",
      id: "10:2",
      characters: "test_text",
    },
  ],
});

export const nestedFigmaFixture = buildFigmaFixture({
  type: "FRAME",
  id: "10:0",
  children: [
    {
      type: "FRAME",
      id: "10:1",
      children: [
        {
          type: "RECTANGLE",
          id: "10:2",
        },
      ],
    },
  ],
});
