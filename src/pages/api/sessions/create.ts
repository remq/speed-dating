import { createSessionComposer } from "@backend/infra/services/composers";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const controller = createSessionComposer();
  await controller.handle(request, response);
};

export default handler;
