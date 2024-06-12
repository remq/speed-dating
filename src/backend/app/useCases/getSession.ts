import { SessionDTO } from "@backend/domain/dtos/session";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUseCase {
  execute(sessionId: string): Promise<SessionDTO>;
}

export class GetSessionUseCase implements IGetSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<SessionDTO> {
    return this.sessionRepository.getSession(sessionId);
  }
}
