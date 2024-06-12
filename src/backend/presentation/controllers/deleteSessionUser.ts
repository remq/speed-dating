import { IDeleteSessionUserUseCase } from "@backend/app/useCases/deleteSessionUser";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class DeleteSessionUserController implements IController {
  constructor(private deleteSessionUserUseCase: IDeleteSessionUserUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    // api/sessions/sessionId/users/userId/delete
    const [, , , sessionId, , userId] = request.url?.split("/")!;

    const user = await this.deleteSessionUserUseCase.execute(sessionId, userId);

    response.status(200).json(user);
  }
}
