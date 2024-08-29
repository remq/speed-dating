import { SessionState } from "../enums/sessionState";

export interface Session {
  name: string;
  state: SessionState;
  sessionId: string;
  mapImageUrl?: string;
  rounds: Round[];
}

export type Round = Match[];
export type Match = [string, string];
