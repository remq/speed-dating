import { User } from "@backend/domain/entities/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUserUseCase {
  execute(sessionId: string): Promise<User>;
}

export class GetSessionUserUseCase implements IGetSessionUserUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<User> {
    return this.sessionRepository.getSessionUser(sessionId);
  }
}
