import { Session, User } from "@frontend/models";
import { UseQueryOptions, useMutation, useQuery } from "react-query";

type AppQueryOptions<T> = Omit<
  UseQueryOptions<T, unknown, T, string>,
  "QueryKey" | "QueryFn"
>;

const parseResponse = <T = unknown>(response: Response) => {
  if (response.headers.get("content-type")?.startsWith("application/json")) {
    return response.json() as T;
  }
  return null as T;
};

const useAppQuery = <T = unknown>(path: string, options?: AppQueryOptions<T>) =>
  useQuery<T, unknown, T, string>(
    path,
    async () => {
      const response = await fetch(path);
      return parseResponse(response);
    },
    options
  );

const useAppMutation = <T = unknown, V = unknown>(path: string) =>
  useMutation<T, unknown, V, string>(path, async (variables) => {
    const response = await fetch(path, {
      method: "POST",
      body: variables && JSON.stringify(variables),
    });
    return parseResponse(response);
  });

export const useListSessionsQuery = (options?: AppQueryOptions<Session[]>) =>
  useAppQuery<Session[]>("/api/sessions", options);

export const useGetSessionQuery = (
  sessionId: string,
  options?: AppQueryOptions<Session>
) => useAppQuery<Session>(`/api/sessions/${sessionId}`, options);

export const useGetUserSessionQuery = (
  sessionId: string,
  userId: string,
  options?: AppQueryOptions<{ session: Session; user: User }>
) =>
  useAppQuery<{ session: Session; user: User }>(
    `/api/sessions/${sessionId}/users/${userId}/usersession`,
    options
  );

export const useCreateSessionMutation = () =>
  useMutation<Session, unknown, { name: string; mapImage?: Blob }, string>(
    async ({ name, mapImage }) => {
      const formData = new FormData();
      formData.append("name", name);
      if (mapImage) {
        formData.append("mapImage", mapImage);
      }

      const response = await fetch("/api/sessions/create", {
        method: "POST",
        body: formData,
      });
      return (await response.json()) as Session;
    }
  );

export const useDeleteSessionMutation = () =>
  useMutation<unknown, unknown, { sessionId: string }>(
    "/api/sessions/${sessionId}/delete",
    async ({ sessionId }) => {
      await fetch(`/api/sessions/${sessionId}/delete`, {
        method: "POST",
      });
    }
  );

export const useDeleteUserMutation = (sessionId: string) =>
  useMutation<unknown, unknown, { userId: string }>(
    "/api/sessions/${sessionId}/users/${userId}/delete",
    async ({ userId }) => {
      await fetch(`/api/sessions/${sessionId}/users/${userId}/delete`, {
        method: "POST",
      });
    }
  );

export const useSubmitLikesMutation = (sessionId: string, userId: string) =>
  useMutation<unknown, unknown, { userIds: string[] }>(
    "/api/sessions/${sessionId}/users/${userId}/likes/submit",
    async ({ userIds }) => {
      await fetch(`/api/sessions/${sessionId}/users/${userId}/likes/submit`, {
        method: "POST",
        body: JSON.stringify({ user_ids: userIds }),
      });
    }
  );

export const useStartSwipingMutation = (sessionId: string) =>
  useAppMutation(`/api/sessions/${sessionId}/swiping`);

export const useNextRoundMutation = (sessionId: string) =>
  useAppMutation(`/api/sessions/${sessionId}/nextround`);

export const useListUsersQuery = (
  sessionId: string,
  options?: AppQueryOptions<User[]>
) => useAppQuery<User[]>(`/api/sessions/${sessionId}/users`, options);

export const useGetUserQuery = (
  sessionId: string,
  userId: string,
  options?: AppQueryOptions<User>
) => useAppQuery(`/api/sessions/${sessionId}/users/${userId}`, options);

export const useRegisterMutation = () =>
  useMutation<
    User,
    unknown,
    { sessionId: string; name: string; image: Blob },
    string
  >(async ({ sessionId, name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    const response = await fetch(`/api/sessions/${sessionId}/users/create`, {
      method: "POST",
      body: formData,
    });
    return (await response.json()) as User;
  });
