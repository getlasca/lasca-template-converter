import convert from "../src/index";

test('convert', () => {
  const output = convert({
    figmaObj: {
      "name": "API test",
      "thumbnailUrl": "https://s3-alpha-sig.figma.com/thumbnails/blank.png?Expires=1615161600&Signature=PPHjRpLStKUdr4ab6V6E~PgdIFANpFbygfQV7AeJ8BcL21UNXCnKEMMGLbLH8JAPVxucbvyu~l~dKTz06rE5O7ELmZFyArU~odYG6EZve94HggZjyWAwoxmuJdV0hJdlW8bQHl0f72v~uCIfocfY8cLrpmBKGlUMgpUmunmlU6Xf4utWrNM3T099OLFJSBpcZUqAh846vnAb3Ke9Lvh0Tik0IiEPczDteTg9Tee2G975iQ8p3C5OuzPMw~k03cC3sn8QiHl-XHLsEpxikr9UXoRzWvsrd~m3OGfUI1tuUhATogFpEySkAeGyvWX5c-6yMRN1IZPMOlBqleQPpwZTgQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      "version": "698942281",
      "role": "viewer",
      "nodes": {
        "1:6": {
          "document": {
            "id": "1:6",
            "name": "Button / Basic / Thirdly / Small / Default",
            "type": "FRAME",
            "blendMode": "PASS_THROUGH",
            "children": [
              {
                "id": "1:7",
                "name": "Background",
                "type": "RECTANGLE",
                "blendMode": "PASS_THROUGH",
                "absoluteBoundingBox": {
                  "x": -148.0,
                  "y": -21.0,
                  "width": 295.0,
                  "height": 40.0
                },
                "constraints": { "vertical": "SCALE", "horizontal": "SCALE" },
                "fills": [
                  {
                    "blendMode": "NORMAL",
                    "type": "SOLID",
                    "color": {
                      "r": 1.0,
                      "g": 0.7450980544090271,
                      "b": 0.0,
                      "a": 1.0
                    }
                  }
                ],
                "strokes": [],
                "strokeWeight": 1.0,
                "strokeAlign": "INSIDE",
                "styles": { "fill": "1:3" },
                "effects": [],
                "cornerRadius": 80.0,
                "rectangleCornerRadii": [80.0, 80.0, 80.0, 80.0]
              },
              {
                "id": "1:8",
                "name": "この事例を見る",
                "type": "TEXT",
                "blendMode": "PASS_THROUGH",
                "absoluteBoundingBox": {
                  "x": -49.987342834472656,
                  "y": -13.0,
                  "width": 98.0,
                  "height": 24.0
                },
                "constraints": { "vertical": "SCALE", "horizontal": "SCALE" },
                "fills": [
                  {
                    "blendMode": "NORMAL",
                    "type": "SOLID",
                    "color": { "r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0 }
                  }
                ],
                "strokes": [],
                "strokeWeight": 1.0,
                "strokeAlign": "OUTSIDE",
                "styles": { "fill": "1:4", "text": "1:5" },
                "effects": [],
                "characters": "この事例を見る",
                "style": {
                  "fontFamily": "Noto Sans JP",
                  "fontPostScriptName": "NotoSansJP-Bold",
                  "fontWeight": 700,
                  "textAutoResize": "WIDTH_AND_HEIGHT",
                  "fontSize": 14.0,
                  "textAlignHorizontal": "CENTER",
                  "textAlignVertical": "TOP",
                  "letterSpacing": 0.0,
                  "lineHeightPx": 24.0,
                  "lineHeightPercent": 146.28570556640625,
                  "lineHeightPercentFontSize": 171.42857360839844,
                  "lineHeightUnit": "PIXELS"
                },
                "characterStyleOverrides": [],
                "styleOverrideTable": {}
              },
              {
                "id": "1:8",
                "name": "この事例を見る",
                "type": "TEXT",
                "blendMode": "PASS_THROUGH",
                "absoluteBoundingBox": {
                  "x": -49.987342834472656,
                  "y": -13.0,
                  "width": 98.0,
                  "height": 24.0
                },
                "constraints": { "vertical": "SCALE", "horizontal": "SCALE" },
                "fills": [
                  {
                    "blendMode": "NORMAL",
                    "type": "SOLID",
                    "color": { "r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0 }
                  }
                ],
                "strokes": [],
                "strokeWeight": 1.0,
                "strokeAlign": "OUTSIDE",
                "styles": { "fill": "1:4", "text": "1:5" },
                "effects": [],
                "characters": "このボタンをクリックする",
                "style": {
                  "fontFamily": "Noto Sans JP",
                  "fontPostScriptName": "NotoSansJP-Bold",
                  "fontWeight": 700,
                  "textAutoResize": "WIDTH_AND_HEIGHT",
                  "fontSize": 14.0,
                  "textAlignHorizontal": "CENTER",
                  "textAlignVertical": "TOP",
                  "letterSpacing": 0.0,
                  "lineHeightPx": 24.0,
                  "lineHeightPercent": 146.28570556640625,
                  "lineHeightPercentFontSize": 171.42857360839844,
                  "lineHeightUnit": "PIXELS"
                },
                "characterStyleOverrides": [],
                "styleOverrideTable": {}
              }
            ],
            "absoluteBoundingBox": {
              "x": -148.0,
              "y": -21.0,
              "width": 295.0,
              "height": 40.0
            },
            "constraints": { "vertical": "SCALE", "horizontal": "SCALE" },
            "clipsContent": false,
            "background": [],
            "fills": [],
            "strokes": [],
            "strokeWeight": 1.0,
            "strokeAlign": "INSIDE",
            "backgroundColor": { "r": 0.0, "g": 0.0, "b": 0.0, "a": 0.0 },
            "effects": [
              {
                "type": "DROP_SHADOW",
                "visible": true,
                "color": {
                  "r": 0.34583333134651184,
                  "g": 0.34583333134651184,
                  "b": 0.34583333134651184,
                  "a": 0.25
                },
                "blendMode": "NORMAL",
                "offset": { "x": 0.0, "y": 0.0 },
                "radius": 8.0
              }
            ],
            "styles": { "effect": "1:2" }
          },
          "components": {},
          "schemaVersion": 0,
          "styles": {
            "1:3": {
              "key": "9edb78c1513e0459ba6737c3444d842e9669cd94",
              "name": "Primary",
              "styleType": "FILL",
              "description": ""
            },
            "1:4": {
              "key": "171fc6fcaafb050bacf7f4015ab3c60e13e6fd83",
              "name": "Background White",
              "styleType": "FILL",
              "description": ""
            },
            "1:5": {
              "key": "8a39209166fbbf8bc4dd552fb08e4036ff04edf9",
              "name": "Noto / 1.75lh / Bold / 14px",
              "styleType": "TEXT",
              "description": ""
            },
            "1:2": {
              "key": "639f6db6e0ee674cb98c4f9a2cc8a6c57fb1988b",
              "name": "Shadow Dark",
              "styleType": "EFFECT",
              "description": ""
            }
          }
        }
      }
    }
  }, [], [], [], [], []);
  expect(output.template).toBe('<div>hoge</div>')
})
