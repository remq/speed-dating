import { User } from "@backend/domain/entities/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUsersUseCase {
  execute(sessionId: string): Promise<User[]>;
}

export class GetSessionUsersUseCase implements IGetSessionUsersUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<User[]> {
    return this.sessionRepository.getSessionUsers(sessionId);
  }
}
