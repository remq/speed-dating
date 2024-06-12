import { UserDTO } from "@backend/domain/dtos/user";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUserUseCase {
  execute(sessionId: string): Promise<UserDTO>;
}

export class GetSessionUserUseCase implements IGetSessionUserUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<UserDTO> {
    return this.sessionRepository.getSessionUser(sessionId);
  }
}
