"use server";

import { composeDeleteSessionUserUseCase } from "@backend/infra/services/composers";

export const handleDeleteSessionUser = async (
  sessionId: string,
  userId: string
) => {
  const deleteSessionUserUseCase = composeDeleteSessionUserUseCase();
  return deleteSessionUserUseCase.execute(sessionId, userId);
};
