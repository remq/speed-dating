import { IGetSessionsUseCase } from "@backend/app/useCases/getSessions";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class GetSessionsController implements IController {
  constructor(private getSessionsUseCase: IGetSessionsUseCase) {}

  async handle(
    _request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const sessions = await this.getSessionsUseCase.execute();
    response.status(200).json(sessions);
  }
}
