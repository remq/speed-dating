export type UserState = "LOBBY" | "REGISTER" | "SWIPING" | "WAITING" | "ROUNDS";

export interface User {
  userId: string;
  name: string;
  imageUrl: string;
  state: UserState;
}

export type SessionState = "LOBBY" | "SWIPING" | "ROUNDS";

export interface Session {
  name: string;
  state: SessionState;
  currentRound: number;
  mapImageUrl?: string;
  sessionId: string;
  rounds: [string, string][][];
}
