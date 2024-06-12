import { ICreateSessionUserUseCase } from "@backend/app/useCases/createSessionUser";
import { Fields, Files, Formidable } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class CreateSessionUserController implements IController {
  constructor(private createSessionUserUseCase: ICreateSessionUserUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
    const pathParts = request.url?.split("/")!;

    const sessionId = pathParts[3];

    const { error, fields, files } = await new Promise<{
      error: any;
      fields: Fields<string>;
      files: Files<string>;
    }>((resolve) =>
      new Formidable().parse(request, (error, fields, files) =>
        resolve({ error, fields, files })
      )
    );
    const name = fields.name?.[0];
    const imageFile = files.image?.[0];
    if (error || !name || !imageFile || imageFile.mimetype !== "image/jpeg") {
      response.status(400).end();
      return;
    }

    const user = await this.createSessionUserUseCase.execute(
      sessionId,
      name,
      imageFile.filepath
    );

    response.status(200).json(user);
  }
}
