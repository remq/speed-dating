"use server";

import { composeGetSessionUsersUseCase } from "@backend/infra/services/composers";

export const handleGetSessionUsers = async (sessionId: string) => {
  const getSessionUsersUseCase = composeGetSessionUsersUseCase();
  return getSessionUsersUseCase.execute(sessionId);
};
