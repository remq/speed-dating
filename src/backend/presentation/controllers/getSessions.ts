"use server";

import { composeGetSessionsUseCase } from "@backend/infra/services/composers";

export const handleGetSessions = async () => {
  const getSessionsUseCase = composeGetSessionsUseCase();
  return getSessionsUseCase.execute();
};
