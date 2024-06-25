"use server";

import { composeCreateSessionUserUseCase } from "@backend/infra/services/composers";

export const handleCreateSessionUser = async (formData: FormData) => {
  const sessionId = formData.get("sessionId") as string;
  const name = formData.get("name") as string;
  const userImage = formData.get("userImage") as Blob;

  const createSessionUserUseCase = composeCreateSessionUserUseCase();
  return createSessionUserUseCase.execute(sessionId, name, userImage);
};
