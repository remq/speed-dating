import { SessionDTO } from "@backend/domain/dtos/session";
import { IIDGenerator } from "../providers/idGenerator";
import { IFileRepository } from "../repositories/file";
import { ISessionRepository } from "../repositories/session";

export interface ICreateSessionUseCase {
  execute(name: string, localMapImagePath?: string): Promise<SessionDTO>;
}

export class CreateSessionUseCase implements ICreateSessionUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private fileRepository: IFileRepository,
    private idGenerator: IIDGenerator
  ) {}

  async execute(name: string, localMapImagePath?: string): Promise<SessionDTO> {
    const sessionId = this.idGenerator.generateID();

    let remoteImagePath: string | undefined = undefined;
    if (localMapImagePath) {
      remoteImagePath = await this.fileRepository.uploadFile(
        sessionId,
        localMapImagePath
      );
    }

    return this.sessionRepository.createSession(
      sessionId,
      name,
      remoteImagePath
    );
  }
}
