import { IGetSessionUserUseCase } from "@backend/app/useCases/getSessionUser";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class GetSessionUserController implements IController {
  constructor(private getSessionUserUseCase: IGetSessionUserUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const id = request.url?.split("/").pop()!;
    const user = await this.getSessionUserUseCase.execute(id);

    if (!user) {
      response.status(404).end();
    }

    response.status(200).json(user);
  }
}
