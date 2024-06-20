import { getUserSessionComposer } from "@backend/infra/services/composers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const controller = getUserSessionComposer();
  await controller.handle(request, response);
};

export default handler;
