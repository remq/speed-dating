import { Session } from "@backend/domain/dtos/session";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionUseCase {
  execute(sessionId: string): Promise<Session>;
}

export class GetSessionUseCase implements IGetSessionUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<Session> {
    return this.sessionRepository.getSession(sessionId);
  }
}
