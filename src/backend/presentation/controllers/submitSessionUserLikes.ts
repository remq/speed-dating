"use server";

import { composeSubmitSessionUserLikesUseCase } from "@backend/infra/services/composers";

export const handleSubmitSessionUserLikes = async (
  sessionId: string,
  userId: string,
  userIds: string[]
) => {
  const submitSessionUserLikesUseCase = composeSubmitSessionUserLikesUseCase();
  return submitSessionUserLikesUseCase.execute(sessionId, userId, userIds);
};
