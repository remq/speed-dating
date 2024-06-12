import { getSessionsComposer } from "@backend/infra/services/composers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const controller = getSessionsComposer();
  await controller.handle(request, response);
};

export default handler;
