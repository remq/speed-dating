import { ICreateSessionUseCase } from "@backend/app/useCases/createSession";
import { Fields, Files, Formidable } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { IController } from "./_controller";

export class CreateSessionController implements IController {
  constructor(private createSessionUseCase: ICreateSessionUseCase) {}

  async handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): Promise<void> {
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
    const mapImageFile = files.mapImage?.[0];
    if (
      error ||
      !name ||
      (mapImageFile && mapImageFile.mimetype !== "image/jpeg")
    ) {
      response.status(400).end();
      return;
    }

    const session = await this.createSessionUseCase.execute(
      name,
      mapImageFile?.filepath
    );

    response.status(200).json(session);
  }
}
