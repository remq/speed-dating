import { ISessionRepository } from "@backend/app/repositories/session";
import { RoundDTO } from "@backend/domain/dtos/round";
import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";
import { SessionState } from "@backend/domain/enums/sessionState";
import { UserState } from "@backend/domain/enums/userState";
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

export type UserLikesMap = Record<string, string[]>;

export class SessionRepository implements ISessionRepository {
  private redisClient = createClient({
    url: process.env.KV_URL as string,
    socket: { tls: true },
  });

  constructor() {
    this.redisClient.connect();
  }

  async startRounds(sessionId: string): Promise<void> {
    const userIds = await this.redisClient.lRange(
      generateSessionUsersKey(sessionId),
      0,
      -1
    );
    await this.setSessionStateForUsers(sessionId, userIds, "ROUNDS");
  }

  async submitSessionUserLikes(
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

  async getSessionUser(sessionId: string): Promise<UserDTO> {
    const data = await this.redisClient.hGetAll(generateUserKey(sessionId));
    return parseUser(data);
  }

  async createSessionUser(
    sessionId: string,
    userId: string,
    name: string,
    remoteImagePath: string
  ): Promise<UserDTO> {
    const session = await this.getSession(sessionId);
    let state: UserState;
    switch (session.state) {
      case "ROUNDS":
        state = "SWIPING";
        break;
      default:
        state = session.state;
        break;
    }
    const userData = {
      userId,
      name,
      imagePath: remoteImagePath,
      state,
    };
    await Promise.all([
      this.redisClient.hSet(generateUserKey(userId), userData),
      this.redisClient.lPush(generateSessionUsersKey(sessionId), userId),
    ]);
    return parseUser(userData);
  }

  async getSessionUsers(sessionId: string): Promise<UserDTO[]> {
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

  async startSwiping(sessionId: string): Promise<void> {
    const userIds = await this.redisClient.lRange(
      generateSessionUsersKey(sessionId),
      0,
      -1
    );
    await this.setSessionStateForUsers(sessionId, userIds, "SWIPING");
  }

  async nextRound(sessionId: string, round: RoundDTO): Promise<void> {
    const session = await this.getSession(sessionId);
    const sessionKey = generateSessionKey(sessionId);
    await Promise.all([
      this.redisClient.hSet(sessionKey, "currentRound", session.rounds.length),
      this.redisClient.hSet(
        sessionKey,
        "rounds",
        JSON.stringify([...session.rounds, round])
      ),
    ]);
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

  async getSession(sessionId: string): Promise<SessionDTO> {
    const data = await this.redisClient.hGetAll(generateSessionKey(sessionId));
    return parseSession(data);
  }

  async createSession(
    sessionId: string,
    name: string,
    remoteMapImagePath?: string
  ): Promise<SessionDTO> {
    const sessionData = {
      sessionId,
      name,
      state: "LOBBY",
      currentRound: 0,
      rounds: "[]",
      mapImagePath: remoteMapImagePath ?? "",
    };
    await Promise.all([
      this.redisClient.hSet(generateSessionKey(sessionId), sessionData),
      this.redisClient.lPush(generateSessionsKey(), sessionId),
    ]);
    return parseSession(sessionData);
  }

  async getSessions(): Promise<SessionDTO[]> {
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

  private async setSessionStateForUsers(
    sessionId: string,
    userIds: string[],
    state: SessionState
  ) {
    await Promise.all([
      ...userIds.map((userId) =>
        this.redisClient.hSet(generateUserKey(userId), "state", state)
      ),
      this.redisClient.hSet(generateSessionKey(sessionId), "state", state),
    ]);
  }
}
