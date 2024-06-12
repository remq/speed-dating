import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";

const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN as string;
const UPLOAD_URL = process.env.UPLOAD_URL as string;
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
      "imagePath" in data &&
      "name" in data &&
      "state" in data
    )
  ) {
    console.error("couldn't parse user", data);
    throw new Error("couldn't parse user");
  }

  const url = new URL(UPLOAD_URL);
  url.pathname = data.imagePath;
  url.searchParams.append("token", UPLOAD_TOKEN);

  const user: UserDTO = {
    userId: data.userId,
    name: data.name,
    imageUrl: url.toString(),
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
      "currentRound" in data &&
      "rounds" in data &&
      "mapImagePath" in data
    )
  ) {
    console.error("couldn't parse session", data);
    throw new Error("couldn't parse session");
  }

  const session: SessionDTO = {
    sessionId: data.sessionId,
    name: data.name,
    currentRound: parseInt(data.currentRound, 10),
    state: data.state,
    rounds: JSON.parse(data.rounds),
  };

  if (data.mapImagePath) {
    const url = new URL(UPLOAD_URL);
    url.pathname = data.mapImagePath;
    url.searchParams.append("token", UPLOAD_TOKEN);
    session.mapImageUrl = url.toString();
  }

  return session;
};
