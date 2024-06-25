"use server";

import { composeNextRoundUseCase } from "@backend/infra/services/composers";

export const handleNextRound = async (sessionId: string) => {
  const nextRoundUseCase = composeNextRoundUseCase();
  return nextRoundUseCase.execute(sessionId);
};
