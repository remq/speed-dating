import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";

const USER_PREFIX = "user";
const SESSION_USERS_PREFIX = "sessionusers";
const SESSION_PREFIX = "session";
const SESSIONS_PREFIX = "sessions";
const USER_LIKES_PREFIX = "userlikes";

export const generateSessionsKey = () => SESSIONS_PREFIX;
export const generateUserKey = (userId: string) => `${USER_PREFIX}:${userId}`;
export const generateSessionUsersKey = (sessionId: string) =>
  `${SESSION_USERS_PREFIX}:${sessionId}`;
export const generateSessionKey = (sessionId: string) =>
  `${SESSION_PREFIX}:${sessionId}`;
export const generateUserLikesKey = (userId: string) =>
  `${USER_LIKES_PREFIX}:${userId}`;

export const parseUser = (data: Record<string, any>): UserDTO => {
  if (
    !(
      "userId" in data &&
      "imageUrl" in data &&
      "name" in data &&
      "state" in data
    )
  ) {
    console.error("couldn't parse user", data);
    throw new Error("couldn't parse user");
  }

  const user: UserDTO = {
    userId: data.userId,
    name: data.name,
    imageUrl: data.imageUrl,
    state: data.state,
  };

  return user;
};

export const parseSession = (data: Record<string, any>): SessionDTO => {
  if (
    !(
      "sessionId" in data &&
      "name" in data &&
      "state" in data &&
      "rounds" in data
    )
  ) {
    console.error("couldn't parse session", data);
    throw new Error("couldn't parse session");
  }

  const session: SessionDTO = {
    sessionId: data.sessionId,
    name: data.name,
    state: data.state,
    rounds: JSON.parse(data.rounds),
    mapImageUrl: data.mapImageUrl,
  };

  return session;
};
