import { Session } from "@backend/domain/entities/session";
import { User } from "@backend/domain/entities/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetUserSessionUseCase {
  execute(
    sessionId: string,
    userId: string
  ): Promise<{ session: Session; user: User }>;
}

export class GetUserSessionUseCase implements IGetUserSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(
    sessionId: string,
    userId: string
  ): Promise<{ session: Session; user: User }> {
    const [session, user] = await Promise.all([
      this.sessionRepository.getSession(sessionId),
      this.sessionRepository.getSessionUser(userId),
    ]);
    return { session, user };
  }
}
