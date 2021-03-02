import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export default abstract class BaseNode {
  nodeId: string;
  className: string;
  conditionVariable?: string;
  loopVariable?: string;
  eventType?: string;
  eventName?: string;

  constructor(
    nodeId: string,
    conditionVariable?: string,
    loopVariable?: string,
    eventType?: string,
    eventName?: string
  ) {
    this.nodeId = nodeId;
    this.conditionVariable = conditionVariable;
    this.loopVariable = loopVariable;
    this.eventType = eventType;
    this.eventName = eventName;
    this.className = crypto
      .createHash("sha256")
      .update(uuidv4(), "utf8")
      .digest("hex");
  }

  abstract buildTemplate(): string;
  abstract buildCss(): string;
}
