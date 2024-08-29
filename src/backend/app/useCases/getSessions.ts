import { Session } from "@backend/domain/entities/session";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionsUseCase {
  execute(): Promise<Session[]>;
}

export class GetSessionsUseCase implements IGetSessionsUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(): Promise<Session[]> {
    return this.sessionRepository.getSessions();
  }
}
