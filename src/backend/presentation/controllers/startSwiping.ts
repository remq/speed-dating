"use server";

import { composeStartSwipingUseCase } from "@backend/infra/services/composers";

export const handleStartSwiping = async (sessionId: string) => {
  const startSwipingUseCase = composeStartSwipingUseCase();
  return startSwipingUseCase.execute(sessionId);
};
