import { ISessionRepository } from "../repositories/session";

export interface IStartSwipingUseCase {
  execute(sessionId: string): Promise<void>;
}

export class StartSwipingUseCase implements IStartSwipingUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  execute(sessionId: string): Promise<void> {
    return this.sessionRepository.startSwiping(sessionId);
  }
}
