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
    const session = await this.sessionRepository.getSession(sessionId);

    if (session.mapImageUrl) {
      await this.fileRepository.deleteFile(session.mapImageUrl);
    }

    await this.sessionRepository.deleteSession(sessionId);
  }
}
