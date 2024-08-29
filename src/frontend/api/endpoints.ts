"use client";

import { Session } from "@backend/domain/entities/session";
import { User } from "@backend/domain/entities/user";
import { handleCreateSession } from "@backend/presentation/controllers/createSession";
import { handleCreateSessionUser } from "@backend/presentation/controllers/createSessionUser";
import { handleDeleteSession } from "@backend/presentation/controllers/deleteSession";
import { handleDeleteSessionUser } from "@backend/presentation/controllers/deleteSessionUser";
import { handleGetSession } from "@backend/presentation/controllers/getSession";
import { handleGetSessionUser } from "@backend/presentation/controllers/getSessionUser";
import { handleGetSessionUsers } from "@backend/presentation/controllers/getSessionUsers";
import { handleGetSessions } from "@backend/presentation/controllers/getSessions";
import { handleGetUserSession } from "@backend/presentation/controllers/getUserSession";
import { handleNextRound } from "@backend/presentation/controllers/nextRound";
import { handleStartSwiping } from "@backend/presentation/controllers/startSwiping";
import { handleSubmitSessionUserLikes } from "@backend/presentation/controllers/submitSessionUserLikes";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";

type AppQueryOptions<T> = UseQueryOptions<T, unknown, T, string[]>;
type AppMutationOptions<T = unknown, V = unknown> = UseMutationOptions<
  T,
  unknown,
  V
>;

export const useListSessionsQuery = (options?: AppQueryOptions<Session[]>) =>
  useQuery(
    ["listSessions"],
    () => {
      return handleGetSessions();
    },
    options
  );

export const useGetSessionQuery = (
  sessionId: string,
  options?: AppQueryOptions<Session>
) =>
  useQuery(
    ["getSessionQuery", sessionId],
    () => {
      return handleGetSession(sessionId);
    },
    options
  );

export const useGetUserSessionQuery = (
  sessionId: string,
  userId: string,
  options?: AppQueryOptions<{ session: Session; user: User }>
) =>
  useQuery(
    ["getUserSession", sessionId, userId],
    () => {
      return handleGetUserSession(sessionId, userId);
    },
    options
  );

export const useCreateSessionMutation = (
  options?: AppMutationOptions<Session, FormData>
) =>
  useMutation(
    "createSession",
    (formData: FormData) => {
      return handleCreateSession(formData);
    },
    options
  );

export const useDeleteSessionMutation = (
  options?: AppMutationOptions<unknown, { sessionId: string }>
) =>
  useMutation(
    "deleteSessionMutation",
    ({ sessionId }) => {
      return handleDeleteSession(sessionId);
    },
    options
  );

export const useDeleteUserMutation = (
  options?: AppMutationOptions<unknown, { userId: string; sessionId: string }>
) =>
  useMutation(
    "deleteUserMutation",
    ({ sessionId, userId }) => {
      return handleDeleteSessionUser(sessionId, userId);
    },
    options
  );

export const useSubmitLikesMutation = (
  options?: AppMutationOptions<
    unknown,
    { sessionId: string; userId: string; userIds: string[] }
  >
) =>
  useMutation(
    "submitLikesMutation",
    async ({ sessionId, userId, userIds }) => {
      return handleSubmitSessionUserLikes(sessionId, userId, userIds);
    },
    options
  );

export const useStartSwipingMutation = (
  options?: AppMutationOptions<unknown, { sessionId: string }>
) =>
  useMutation(
    "startSwipingMutation",
    async ({ sessionId }) => {
      return handleStartSwiping(sessionId);
    },
    options
  );

export const useNextRoundMutation = (
  options?: AppMutationOptions<unknown, { sessionId: string }>
) =>
  useMutation(
    "nextRoundMutation",
    async ({ sessionId }) => {
      return handleNextRound(sessionId);
    },
    options
  );

export const useListUsersQuery = (
  sessionId: string,
  options?: AppQueryOptions<User[]>
) =>
  useQuery(
    ["listUsersQuery", sessionId],
    async () => {
      return handleGetSessionUsers(sessionId);
    },
    options
  );

export const useGetUserQuery = (
  userId: string,
  options?: AppQueryOptions<User>
) =>
  useQuery(
    ["getUserQuery", userId],
    async () => {
      return handleGetSessionUser(userId);
    },
    options
  );

export const useRegisterMutation = (
  options?: AppMutationOptions<
    User,
    { sessionId: string; name: string; userImage: Blob }
  >
) =>
  useMutation(
    "registerMutation",
    async ({ sessionId, name, userImage }) => {
      const formData = new FormData();
      formData.append("sessionId", sessionId);
      formData.append("name", name);
      formData.append("userImage", userImage);

      return handleCreateSessionUser(formData);
    },
    options
  );
