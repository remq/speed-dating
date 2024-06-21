import { RoundDTO } from "@backend/domain/dtos/round";
import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";
import { UserLikesMapDTO } from "@backend/domain/dtos/userLikesMap";
import { SessionState } from "@backend/domain/enums/sessionState";
import { UserState } from "@backend/domain/enums/userState";

export interface ISessionRepository {
  createSession(
    sessionId: string,
    name: string,
    mapImageUrl?: string
  ): Promise<SessionDTO>;
  getSessions(): Promise<SessionDTO[]>;
  getSession(sessionId: string): Promise<SessionDTO>;
  deleteSession(sessionId: string): Promise<void>;
  getSessionUsers(sessionId: string): Promise<UserDTO[]>;
  getSessionUser(sessionId: string): Promise<UserDTO>;
  createSessionUser(
    sessionId: string,
    userId: string,
    name: string,
    imageUrl: string,
    state: UserState
  ): Promise<UserDTO>;
  deleteSessionUser(sessionId: string, userId: string): Promise<void>;
  getSessionUsersLikes(sessionId: string): Promise<UserLikesMapDTO>;
  createSessionUserLikes(
    sessionId: string,
    userId: string,
    likedUserIds: string[]
  ): Promise<void>;
  createRound(sessionId: string, round: RoundDTO): Promise<void>;
  setSessionState(sessionId: string, state: SessionState): Promise<void>;
}
