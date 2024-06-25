"use server";

import { composeGetSessionUseCase } from "@backend/infra/services/composers";

export const handleGetSession = async (sessionId: string) => {
  const getSessionUseCase = composeGetSessionUseCase();
  return getSessionUseCase.execute(sessionId);
};
