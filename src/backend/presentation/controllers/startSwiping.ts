import { IGetSessionUseCase } from "@backend/app/useCases/getSession";
import { IStartSwipingUseCase } from "@backend/app/useCases/startSwiping";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class StartSwipingController implements IController {
  constructor(
    private getSessionUseCase: IGetSessionUseCase,
    private startSwipingUseCase: IStartSwipingUseCase
  ) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;
    const sessionId = pathParts[3];

    const session = await this.getSessionUseCase.execute(sessionId);

    if (session?.state !== "LOBBY") {
      response.status(400).end();
    }

    await this.startSwipingUseCase.execute(sessionId);

    response.status(200).end();
  }
}
