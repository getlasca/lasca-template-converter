import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export function genHash(): string {
  return crypto.createHash("sha256").update(uuidv4(), "utf8").digest("hex");
}
