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
import { IController } from "@backend/presentation/controllers/_controller";
import { CreateSessionController } from "@backend/presentation/controllers/createSession";
import { CreateSessionUserController } from "@backend/presentation/controllers/createSessionUser";
import { DeleteSessionController } from "@backend/presentation/controllers/deleteSession";
import { DeleteSessionUserController } from "@backend/presentation/controllers/deleteSessionUser";
import { GetSessionController } from "@backend/presentation/controllers/getSession";
import { GetSessionUserController } from "@backend/presentation/controllers/getSessionUser";
import { GetSessionUsersController } from "@backend/presentation/controllers/getSessionUsers";
import { GetSessionsController } from "@backend/presentation/controllers/getSessions";
import { GetUserSessionController } from "@backend/presentation/controllers/getUserSession";
import { NextRoundController } from "@backend/presentation/controllers/nextRound";
import { StartSwipingController } from "@backend/presentation/controllers/startSwiping";
import { SubmitSessionUserLikesController } from "@backend/presentation/controllers/submitSessionUserLikes";
import { IDGenerator } from "../providers/idGenerator";
import { RoundsGenerator } from "../providers/roundsGenerator";
import { FileRepository } from "../repositories/file";
import { SessionRepository } from "../repositories/session";

type Composer = () => IController;

export const submitSessionUserLikesComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const roundsGenerator = new RoundsGenerator();
  const submitSessionUserLikesUseCase = new SubmitSessionUserLikesUseCase(
    sessionsRepository,
    roundsGenerator
  );
  const controller = new SubmitSessionUserLikesController(
    submitSessionUserLikesUseCase
  );
  return controller;
};

export const deleteSessionUserComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const createSessionUserUseCase = new DeleteSessionUserUseCase(
    sessionsRepository,
    fileRepository
  );
  const controller = new DeleteSessionUserController(createSessionUserUseCase);
  return controller;
};

export const getSessionUserComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const createSessionUserUseCase = new GetSessionUserUseCase(
    sessionsRepository
  );
  const controller = new GetSessionUserController(createSessionUserUseCase);
  return controller;
};

export const createSessionUserComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const idGenerator = new IDGenerator();
  const createSessionUserUseCase = new CreateSessionUserUseCase(
    sessionsRepository,
    fileRepository,
    idGenerator
  );
  const controller = new CreateSessionUserController(createSessionUserUseCase);
  return controller;
};

export const getSessionUsersComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionUsersUseCase = new GetSessionUsersUseCase(sessionsRepository);
  const controller = new GetSessionUsersController(getSessionUsersUseCase);
  return controller;
};

export const getUserSessionComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const getUserSessionUseCase = new GetUserSessionUseCase(sessionsRepository);
  const controller = new GetUserSessionController(getUserSessionUseCase);
  return controller;
};

export const startSwipingComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionUseCase = new GetSessionUseCase(sessionsRepository);
  const startSwipingUseCase = new StartSwipingUseCase(sessionsRepository);
  const controller = new StartSwipingController(
    getSessionUseCase,
    startSwipingUseCase
  );
  return controller;
};

export const nextRoundComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const roundsGenerator = new RoundsGenerator();
  const getSessionUseCase = new GetSessionUseCase(sessionsRepository);
  const nextRoundUseCase = new NextRoundUseCase(
    sessionsRepository,
    roundsGenerator
  );
  const controller = new NextRoundController(
    getSessionUseCase,
    nextRoundUseCase
  );
  return controller;
};

export const getSessionsComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionsUseCase = new GetSessionsUseCase(sessionsRepository);
  const controller = new GetSessionsController(getSessionsUseCase);
  return controller;
};

export const getSessionComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const getSessionUseCase = new GetSessionUseCase(sessionsRepository);
  const controller = new GetSessionController(getSessionUseCase);
  return controller;
};

export const deleteSessionComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const deleteSessionUseCase = new DeleteSessionUseCase(
    sessionsRepository,
    fileRepository
  );
  const controller = new DeleteSessionController(deleteSessionUseCase);
  return controller;
};

export const createSessionComposer: Composer = () => {
  const sessionsRepository = new SessionRepository();
  const fileRepository = new FileRepository();
  const idGenerator = new IDGenerator();
  const createSessionUseCase = new CreateSessionUseCase(
    sessionsRepository,
    fileRepository,
    idGenerator
  );
  const controller = new CreateSessionController(createSessionUseCase);
  return controller;
};
