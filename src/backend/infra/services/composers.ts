import { CreateSessionUseCase } from "@backend/app/useCases/createSession";
import { CreateSessionUserUseCase } from "@backend/app/useCases/createSessionUser";
import { DeleteSessionUseCase } from "@backend/app/useCases/deleteSession";
import { DeleteSessionUserUseCase } from "@backend/app/useCases/deleteSessionUser";
import { GetSessionUseCase } from "@backend/app/useCases/getSession";
import { GetSessionUserUseCase } from "@backend/app/useCases/getSessionUser";
import { GetSessionUsersUseCase } from "@backend/app/useCases/getSessionUsers";
import { GetSessionsUseCase } from "@backend/app/useCases/getSessions";
import { GetUserSessionUseCase } from "@backend/app/useCases/getUserSession";
import { NextRoundUseCase } from "@backend/app/useCases/nextRound";
import { StartSwipingUseCase } from "@backend/app/useCases/startSwiping";
import { SubmitSessionUserLikesUseCase } from "@backend/app/useCases/submitSessionUserLikes";
import { IDGenerator } from "../providers/idGenerator";
import { RoundsGenerator } from "../providers/roundsGenerator";
import { FileRepository } from "../repositories/file";
import { SessionRepository } from "../repositories/session";

export const composeSubmitSessionUserLikesUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const roundsGenerator = new RoundsGenerator();
  const submitSessionUserLikesUseCase = new SubmitSessionUserLikesUseCase(
    sessionsRepository,
    roundsGenerator
  );
  return submitSessionUserLikesUseCase;
};

export const composeDeleteSessionUserUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const createSessionUserUseCase = new DeleteSessionUserUseCase(
    sessionsRepository,
    fileRepository
  );
  return createSessionUserUseCase;
};

export const composeGetSessionUserUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const createSessionUserUseCase = new GetSessionUserUseCase(
    sessionsRepository
  );
  return createSessionUserUseCase;
};

export const composeCreateSessionUserUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const idGenerator = new IDGenerator();
  const createSessionUserUseCase = new CreateSessionUserUseCase(
    sessionsRepository,
    fileRepository,
    idGenerator
  );
  return createSessionUserUseCase;
};

export const composeGetSessionUsersUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionUsersUseCase = new GetSessionUsersUseCase(sessionsRepository);
  return getSessionUsersUseCase;
};

export const composeGetUserSessionUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const getUserSessionUseCase = new GetUserSessionUseCase(sessionsRepository);
  return getUserSessionUseCase;
};

export const composeStartSwipingUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const startSwipingUseCase = new StartSwipingUseCase(sessionsRepository);
  return startSwipingUseCase;
};

export const composeNextRoundUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const roundsGenerator = new RoundsGenerator();
  const nextRoundUseCase = new NextRoundUseCase(
    sessionsRepository,
    roundsGenerator
  );
  return nextRoundUseCase;
};

export const composeGetSessionsUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionsUseCase = new GetSessionsUseCase(sessionsRepository);
  return getSessionsUseCase;
};

export const composeGetSessionUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionUseCase = new GetSessionUseCase(sessionsRepository);
  return getSessionUseCase;
};

export const composeDeleteSessionUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const deleteSessionUseCase = new DeleteSessionUseCase(
    sessionsRepository,
    fileRepository
  );
  return deleteSessionUseCase;
};

export const composeCreateSessionUseCase = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const idGenerator = new IDGenerator();
  const createSessionUseCase = new CreateSessionUseCase(
    sessionsRepository,
    fileRepository,
    idGenerator
  );
  return createSessionUseCase;
};
