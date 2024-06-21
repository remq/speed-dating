import { SessionState } from "../enums/sessionState";
import { RoundDTO } from "./round";

export interface SessionDTO {
  name: string;
  state: SessionState;
  sessionId: string;
  mapImageUrl?: string;
  rounds: RoundDTO[];
}
