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
    const users = await this.sessionRepository.getSessionUsers(sessionId);

    const fileUrls = users.map((user) => user.imageUrl);
    if (session.mapImageUrl) {
      fileUrls.push(session.mapImageUrl);
    }
    await this.fileRepository.deleteFile(...fileUrls);

    await this.sessionRepository.deleteSession(sessionId);
  }
}
