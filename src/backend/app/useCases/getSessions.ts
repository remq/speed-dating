import { SessionDTO } from "@backend/domain/dtos/session";
import { ISessionRepository } from "../repositories/session";

export interface IGetSessionsUseCase {
  execute(): Promise<SessionDTO[]>;
}

export class GetSessionsUseCase implements IGetSessionsUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(): Promise<SessionDTO[]> {
    return this.sessionRepository.getSessions();
  }
}
