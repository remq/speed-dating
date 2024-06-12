import { SessionState } from "../enums/sessionState";
import { RoundDTO } from "./round";

export interface SessionDTO {
  name: string;
  state: SessionState;
  currentRound: number;
  sessionId: string;
  mapImageUrl?: string;
  rounds: RoundDTO[];
}
