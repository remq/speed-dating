import { ISubmitSessionUserLikesUseCase } from "@backend/app/useCases/submitSessionUserLikes";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class SubmitSessionUserLikesController implements IController {
  constructor(
    private submitSessionUserLikesUseCase: ISubmitSessionUserLikesUseCase
  ) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    // api/sessions/sessionId/users/userId/likes/submit
    const [, , , sessionId, , userId] = request.url?.split("/")!;
    const body = JSON.parse(request.body);

    if (
      !(
        typeof body === "object" &&
        "user_ids" in body &&
        Array.isArray(body.user_ids)
      )
    ) {
      response.status(400).end();
      return;
    }

    const userIds = body.user_ids as string[];

    await this.submitSessionUserLikesUseCase.execute(
      sessionId,
      userId,
      userIds
    );

    response.status(200).end();
  }
}
