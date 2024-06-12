import { IGetSessionUseCase } from "@backend/app/useCases/getSession";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class GetSessionController implements IController {
  constructor(private getSessionUseCase: IGetSessionUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;
    const sessionId = pathParts[3];

    const session = await this.getSessionUseCase.execute(sessionId);
    response.status(200).json(session);
  }
}
