import { UserDTO } from "@backend/domain/dtos/user";
import { UserState } from "@backend/domain/enums/userState";
import { IIDGenerator } from "../providers/idGenerator";
import { IFileRepository } from "../repositories/file";
import { ISessionRepository } from "../repositories/session";

export interface ICreateSessionUserUseCase {
  execute(sessionId: string, name: string, userImage: Blob): Promise<UserDTO>;
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
    userImage: Blob
  ): Promise<UserDTO> {
    const session = await this.sessionRepository.getSession(sessionId);
    const userId = this.idGenerator.generateID();

    const imageUrl = await this.fileRepository.uploadFile(userId, userImage);

    let state: UserState;
    switch (session.state) {
      case "ROUNDS":
        state = "SWIPING";
        break;
      default:
        state = session.state;
        break;
    }

    return this.sessionRepository.createSessionUser(
      sessionId,
      userId,
      name,
      imageUrl,
      state
    );
  }
}
