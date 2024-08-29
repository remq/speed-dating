import { ISessionRepository } from "@backend/app/repositories/session";
import { Round, Session } from "@backend/domain/entities/session";
import { User } from "@backend/domain/entities/user";
import { SessionState } from "@backend/domain/enums/sessionState";
import { UserState } from "@backend/domain/enums/userState";
import { UserLikesMap } from "@backend/domain/valueObjects/userLikesMap";
import { createClient } from "redis";
import {
  generateSessionKey,
  generateSessionUsersKey,
  generateSessionsKey,
  generateUserKey,
  generateUserLikesKey,
  parseSession,
  parseUser,
} from "../utils/redis";

export class SessionRepository implements ISessionRepository {
  private redisClient = createClient({
    url: process.env.KV_URL as string,
    socket: { tls: true },
  });

  constructor() {
    this.redisClient.connect();
  }

  async setSessionState(sessionId: string, state: SessionState): Promise<void> {
    const userIds = await this.redisClient.lRange(
      generateSessionUsersKey(sessionId),
      0,
      -1
    );

    await Promise.all([
      ...userIds.map((userId) =>
        this.redisClient.hSet(generateUserKey(userId), "state", state)
      ),
      this.redisClient.hSet(generateSessionKey(sessionId), "state", state),
    ]);
  }

  async createSessionUserLikes(
    sessionId: string,
    userId: string,
    likedUserIds: string[]
  ): Promise<void> {
    if (likedUserIds.length) {
      await this.redisClient.lPush(generateUserLikesKey(userId), likedUserIds);
    }
    const session = await this.getSession(sessionId);
    const userState: UserState =
      session.state === "SWIPING" ? "WAITING" : "ROUNDS";
    await this.redisClient.hSet(generateUserKey(userId), "state", userState);
  }

  async getSessionUsersLikes(sessionId: string): Promise<UserLikesMap> {
    const userIds = await this.redisClient.lRange(
      generateSessionUsersKey(sessionId),
      0,
      -1
    );
    const usersLikes = await Promise.all(
      userIds.map((userId) =>
        this.redisClient.lRange(generateUserLikesKey(userId), 0, -1)
      )
    );
    return userIds.reduce<UserLikesMap>((map, userId, index) => {
      map[userId] = usersLikes[index].filter((likedUserId) =>
        userIds.includes(likedUserId)
      );
      return map;
    }, {});
  }

  async deleteSessionUser(sessionId: string, userId: string): Promise<void> {
    await Promise.all([
      this.redisClient.lRem(generateSessionUsersKey(sessionId), 0, userId),
      this.redisClient.del([
        generateUserKey(userId),
        generateUserLikesKey(userId),
      ]),
    ]);
  }

  async getSessionUser(sessionId: string): Promise<User> {
    const data = await this.redisClient.hGetAll(generateUserKey(sessionId));
    return parseUser(data);
  }

  async createSessionUser(
    sessionId: string,
    userId: string,
    name: string,
    imageUrl: string,
    state: UserState
  ): Promise<User> {
    const userData = {
      userId,
      name,
      imageUrl,
      state,
    };
    await Promise.all([
      this.redisClient.hSet(generateUserKey(userId), userData),
      this.redisClient.lPush(generateSessionUsersKey(sessionId), userId),
    ]);
    return parseUser(userData);
  }

  async getSessionUsers(sessionId: string): Promise<User[]> {
    const userIds = await this.redisClient.lRange(
      generateSessionUsersKey(sessionId),
      0,
      -1
    );
    const data = await Promise.all(
      userIds.map((userId) => this.redisClient.hGetAll(generateUserKey(userId)))
    );
    return data.map((userData) => parseUser(userData));
  }

  async createRound(sessionId: string, round: Round): Promise<void> {
    const session = await this.getSession(sessionId);
    const sessionKey = generateSessionKey(sessionId);
    await this.redisClient.hSet(
      sessionKey,
      "rounds",
      JSON.stringify([...session.rounds, round])
    );
  }

  async deleteSession(sessionId: string): Promise<void> {
    const sessionUsersKey = generateSessionUsersKey(sessionId);

    const userIds = await this.redisClient.lRange(sessionUsersKey, 0, -1);
    if (userIds.length) {
      const userKeys = userIds.map(generateUserKey);
      const userLikesKeys = userIds.map(generateUserLikesKey);
      await this.redisClient.del([...userKeys, ...userLikesKeys]);
    }
    await Promise.all([
      this.redisClient.lRem(generateSessionsKey(), 0, sessionId),
      this.redisClient.del([generateSessionKey(sessionId), sessionUsersKey]),
    ]);
  }

  async getSession(sessionId: string): Promise<Session> {
    const data = await this.redisClient.hGetAll(generateSessionKey(sessionId));
    return parseSession(data);
  }

  async createSession(
    sessionId: string,
    name: string,
    mapImageUrl?: string
  ): Promise<Session> {
    const sessionData = {
      sessionId,
      name,
      state: "LOBBY",
      rounds: "[]",
      mapImageUrl: mapImageUrl ?? "",
    };
    await Promise.all([
      this.redisClient.hSet(generateSessionKey(sessionId), sessionData),
      this.redisClient.lPush(generateSessionsKey(), sessionId),
    ]);
    return parseSession(sessionData);
  }

  async getSessions(): Promise<Session[]> {
    const sessionIds = await this.redisClient.lRange(
      generateSessionsKey(),
      0,
      -1
    );
    const data = await Promise.all(
      sessionIds.map((sessionId) =>
        this.redisClient.hGetAll(generateSessionKey(sessionId))
      )
    );
    return data.map((sessionData) => parseSession(sessionData));
  }
}
