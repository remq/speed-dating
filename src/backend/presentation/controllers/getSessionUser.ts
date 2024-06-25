"use server";

import { composeGetSessionUserUseCase } from "@backend/infra/services/composers";

export const handleGetSessionUser = async (userId: string) => {
  const getSessionUserUseCase = composeGetSessionUserUseCase();
  return getSessionUserUseCase.execute(userId);
};
