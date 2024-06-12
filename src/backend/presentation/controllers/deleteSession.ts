import { IDeleteSessionUseCase } from "@backend/app/useCases/deleteSession";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class DeleteSessionController implements IController {
  constructor(private deleteSessionUseCase: IDeleteSessionUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;
    const sessionId = pathParts[3];

    await this.deleteSessionUseCase.execute(sessionId);

    response.status(200).end();
  }
}
