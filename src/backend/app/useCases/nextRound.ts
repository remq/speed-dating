import { IRoundsGenerator } from "../providers/roundsGenerator";
import { ISessionRepository } from "../repositories/session";

export interface INextRoundUseCase {
  execute(sessionId: string): Promise<void>;
}

export class NextRoundUseCase implements INextRoundUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private roundsGenerator: IRoundsGenerator
  ) {}

  async execute(sessionId: string): Promise<void> {
    const session = await this.sessionRepository.getSession(sessionId);
    const userLikesMap =
      await this.sessionRepository.getSessionUsersLikes(sessionId);
    const nextRound = await this.roundsGenerator.generateNextRound(
      session.rounds,
      userLikesMap
    );
    await this.sessionRepository.createRound(sessionId, nextRound);
  }
}
