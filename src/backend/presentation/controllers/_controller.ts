import { NextApiRequest, NextApiResponse } from "next";

export interface IController {
  handle(
    request: NextApiRequest,
    response: NextApiResponse
  ): void | Promise<void>;
}
