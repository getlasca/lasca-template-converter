import fs from "fs";

export function loadFixture(name: string): any {
  return JSON.parse(fs.readFileSync(`./test/fixture/${name}.json`, "utf8"));
}
