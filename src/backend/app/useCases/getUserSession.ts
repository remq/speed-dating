import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetUserSessionUseCase {
  execute(
    sessionId: string,
    userId: string
  ): Promise<{ session: SessionDTO; user: UserDTO }>;
}

export class GetUserSessionUseCase implements IGetUserSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(
    sessionId: string,
    userId: string
  ): Promise<{ session: SessionDTO; user: UserDTO }> {
    const [session, user] = await Promise.all([
      this.sessionRepository.getSession(sessionId),
      this.sessionRepository.getSessionUser(userId),
    ]);
    return { session, user };
  }
}
