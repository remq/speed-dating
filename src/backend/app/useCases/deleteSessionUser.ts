import { IFileRepository } from "../repositories/file";
import { ISessionRepository } from "../repositories/session";

export interface IDeleteSessionUserUseCase {
  execute(sessionId: string, userId: string): Promise<void>;
}

export class DeleteSessionUserUseCase implements IDeleteSessionUserUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private fileRepository: IFileRepository
  ) {}

  async execute(sessionId: string, userId: string): Promise<void> {
    await Promise.all([
      this.sessionRepository.deleteSessionUser(sessionId, userId),
      this.fileRepository.deleteFile(userId),
    ]);
  }
}
