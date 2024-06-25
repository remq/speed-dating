"use server";

import { composeCreateSessionUseCase } from "@backend/infra/services/composers";

export const handleCreateSession = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const mapImage = formData.get("mapImage") as Blob;

  const createSessionUseCase = composeCreateSessionUseCase();
  return createSessionUseCase.execute(name, mapImage);
};
