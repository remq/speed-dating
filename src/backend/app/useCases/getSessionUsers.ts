import { UserDTO } from "@backend/domain/dtos/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUsersUseCase {
  execute(sessionId: string): Promise<UserDTO[]>;
}

export class GetSessionUsersUseCase implements IGetSessionUsersUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<UserDTO[]> {
    return this.sessionRepository.getSessionUsers(sessionId);
  }
}
