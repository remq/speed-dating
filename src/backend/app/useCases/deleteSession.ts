import { IFileRepository } from "../repositories/file";
import { ISessionRepository } from "../repositories/session";

export interface IDeleteSessionUseCase {
  execute(sessionId: string): Promise<void>;
}

export class DeleteSessionUseCase implements IDeleteSessionUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute(sessionId: string): Promise<void> {
    await Promise.all([
      this.sessionRepository.deleteSession(sessionId),
      this.fileRepository.deleteFile(sessionId),
    ]);
  }
}
