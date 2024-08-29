import { Round, Session } from "@backend/domain/entities/session";
import { User } from "@backend/domain/entities/user";
import { SessionState } from "@backend/domain/enums/sessionState";
import { UserState } from "@backend/domain/enums/userState";
import { UserLikesMap } from "@backend/domain/valueObjects/userLikesMap";

export interface ISessionRepository {
  createSession(
    sessionId: string,
    name: string,
    mapImageUrl?: string
  ): Promise<Session>;
  getSessions(): Promise<Session[]>;
  getSession(sessionId: string): Promise<Session>;
  deleteSession(sessionId: string): Promise<void>;
  getSessionUsers(sessionId: string): Promise<User[]>;
  getSessionUser(sessionId: string): Promise<User>;
  createSessionUser(
    sessionId: string,
    userId: string,
    name: string,
    imageUrl: string,
    state: UserState
  ): Promise<User>;
  deleteSessionUser(sessionId: string, userId: string): Promise<void>;
  getSessionUsersLikes(sessionId: string): Promise<UserLikesMap>;
  createSessionUserLikes(
    sessionId: string,
    userId: string,
    likedUserIds: string[]
  ): Promise<void>;
  createRound(sessionId: string, round: Round): Promise<void>;
  setSessionState(sessionId: string, state: SessionState): Promise<void>;
}
