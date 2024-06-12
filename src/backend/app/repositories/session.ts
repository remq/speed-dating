import { RoundDTO } from "@backend/domain/dtos/round";
import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";
import { UserLikesMapDTO } from "@backend/domain/dtos/userLikesMap";

export interface ISessionRepository {
  createSession(
    sessionId: string,
    name: string,
    remoteMapImagePath?: string
  ): Promise<SessionDTO>;
  getSessions(): Promise<SessionDTO[]>;
  getSession(sessionId: string): Promise<SessionDTO>;
  deleteSession(sessionId: string): Promise<void>;
  nextRound(sessionId: string, round: RoundDTO): Promise<void>;
  getSessionUsers(sessionId: string): Promise<UserDTO[]>;
  getSessionUser(sessionId: string): Promise<UserDTO>;
  createSessionUser(
    sessionId: string,
    userId: string,
    name: string,
    remoteImagePath: string
  ): Promise<UserDTO>;
  deleteSessionUser(sessionId: string, userId: string): Promise<void>;
  submitSessionUserLikes(
    sessionId: string,
    userId: string,
    likedUserIds: string[]
  ): Promise<void>;
  getSessionUsersLikes(sessionId: string): Promise<UserLikesMapDTO>;

  startSwiping(sessionId: string): Promise<void>;
  startRounds(sessionId: string): Promise<void>;
}
