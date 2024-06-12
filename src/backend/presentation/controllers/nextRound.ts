import { IGetSessionUseCase } from "@backend/app/useCases/getSession";
import { INextRoundUseCase } from "@backend/app/useCases/nextRound";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class NextRoundController implements IController {
  constructor(
    private getSessionUseCase: IGetSessionUseCase,
    private nextRoundUseCase: INextRoundUseCase
  ) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;
    const sessionId = pathParts[3];

    const session = await this.getSessionUseCase.execute(sessionId);

    if (session?.state !== "ROUNDS") {
      response.status(400).end();
    }

    await this.nextRoundUseCase.execute(sessionId);

    response.status(200).end();
  }
}
