import { IGetSessionUsersUseCase } from "@backend/app/useCases/getSessionUsers";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class GetSessionUsersController implements IController {
  constructor(private getSessionUsersUseCase: IGetSessionUsersUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;
    const sessionId = pathParts[3];
    const users = await this.getSessionUsersUseCase.execute(sessionId);
    response.status(200).json(users);
  }
}
