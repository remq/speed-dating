import { IGetUserSessionUseCase } from "@backend/app/useCases/getUserSession";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class GetUserSessionController implements IController {
  constructor(private getUserSessionUseCase: IGetUserSessionUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    // api/sessions/sessionId/users/userId/usersession
    const [, , , sessionId, , userId] = request.url?.split("/")!;

    const userSession = await this.getUserSessionUseCase.execute(
      sessionId,
      userId
    );

    response.status(200).json(userSession);
  }
}
