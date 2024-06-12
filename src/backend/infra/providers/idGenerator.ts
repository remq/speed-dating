import { IIDGenerator } from "@backend/app/providers/idGenerator";
import { randomUUID } from "crypto";

export class IDGenerator implements IIDGenerator {
  generateID(): string {
    return randomUUID();
  }
}
