"use server";

import { composeGetUserSessionUseCase } from "@backend/infra/services/composers";

export const handleGetUserSession = async (
  sessionId: string,
  userId: string
) => {
  const getUserSessionUseCase = composeGetUserSessionUseCase();
  return getUserSessionUseCase.execute(sessionId, userId);
};
