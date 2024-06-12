import { UserDTO } from "@backend/domain/dtos/user";
import { IIDGenerator } from "../providers/idGenerator";
import { IFileRepository } from "../repositories/file";
import { ISessionRepository } from "../repositories/session";

export interface ICreateSessionUserUseCase {
  execute(
    sessionId: string,
    name: string,
    localImagePath: string
  ): Promise<UserDTO>;
}

export class CreateSessionUserUseCase implements ICreateSessionUserUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private fileRepository: IFileRepository,
    private idGenerator: IIDGenerator
  ) {}

  async execute(
    sessionId: string,
    name: string,
    localImagePath: string
  ): Promise<UserDTO> {
    const userId = this.idGenerator.generateID();
    const remoteImagePath = await this.fileRepository.uploadFile(
      userId,
      localImagePath
    );
    return this.sessionRepository.createSessionUser(
      sessionId,
      userId,
      name,
      remoteImagePath
    );
  }
}
