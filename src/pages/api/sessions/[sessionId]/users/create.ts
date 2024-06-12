import { createSessionUserComposer } from "@backend/infra/services/composers";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const controller = createSessionUserComposer();
  await controller.handle(request, response);
};

export default handler;
