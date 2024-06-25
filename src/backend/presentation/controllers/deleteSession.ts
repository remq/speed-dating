"use server";

import { composeDeleteSessionUseCase } from "@backend/infra/services/composers";

export const handleDeleteSession = async (sessionId: string) => {
  const deleteSessionUseCase = composeDeleteSessionUseCase();
  return deleteSessionUseCase.execute(sessionId);
};
