import { IRoundsGenerator } from "../providers/roundsGenerator";
import { ISessionRepository } from "../repositories/session";

export interface ISubmitSessionUserLikesUseCase {
  execute(sessionId: string, userId: string, userIds: string[]): Promise<void>;
}

export class SubmitSessionUserLikesUseCase
  implements ISubmitSessionUserLikesUseCase
{
  constructor(
    private sessionRepository: ISessionRepository,
    private roundsGenerator: IRoundsGenerator
  ) {}

  async execute(
    sessionId: string,
    userId: string,
    userIds: string[]
  ): Promise<void> {
    await this.sessionRepository.createSessionUserLikes(
      sessionId,
      userId,
      userIds
    );

    const users = await this.sessionRepository.getSessionUsers(sessionId);

    if (users.every((user) => user.state === "WAITING")) {
      const userLikesMap =
        await this.sessionRepository.getSessionUsersLikes(sessionId);
      const round = this.roundsGenerator.generateNextRound([], userLikesMap);
      await Promise.all([
        this.sessionRepository.createRound(sessionId, round),
        this.sessionRepository.setSessionState(sessionId, "ROUNDS"),
      ]);
    }
  }
}
