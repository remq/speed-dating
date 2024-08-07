import { SessionDTO } from "@backend/domain/dtos/session";
import { UserDTO } from "@backend/domain/dtos/user";
import {
  useGetSessionQuery,
  useGetUserSessionQuery,
} from "@frontend/api/endpoints";
import Spinner, { SpinnerLayout } from "@frontend/components/Spinner/Spinner";
import { parseCookieString } from "@frontend/utils/cookies";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type SessionContextProps = {
  session?: SessionDTO;
  user?: UserDTO;
  invalidateSession: () => void;
};

const SessionContext = createContext<SessionContextProps>({} as never);

export const SessionProvider: FC<
  PropsWithChildren & {
    sessionId: string;
  }
> = ({ children, sessionId }) => {
  const [userId, setUserId] = useState<string>();
  const [authStatus, setAuthStatus] = useState<
    "loading" | "authorised" | "unauthorised"
  >();
  const getSessionQuery = useGetSessionQuery(sessionId, {
    refetchInterval: 5000,
    enabled: authStatus === "unauthorised",
  });
  const getUserSessionQuery = useGetUserSessionQuery(sessionId, userId!, {
    refetchInterval: 5000,
    enabled: authStatus === "authorised",
  });

  const invalidateSession = useCallback(() => {
    const cookies = parseCookieString(document.cookie);
    if (!cookies[sessionId]) {
      setAuthStatus("unauthorised");
      getSessionQuery.refetch();
      return;
    }

    setUserId(cookies[sessionId]);
    setAuthStatus("authorised");
    getUserSessionQuery.refetch();
  }, [sessionId]);

  useEffect(invalidateSession, [sessionId]);

  switch (authStatus) {
    case "loading":
      return <SpinnerLayout />;
    case "unauthorised":
      if (getSessionQuery.isLoading) {
        return <SpinnerLayout />;
      }
      const session = getSessionQuery.data!;
      return (
        <SessionContext.Provider
          value={{
            session,
            invalidateSession,
          }}
        >
          {children}
        </SessionContext.Provider>
      );
    case "authorised":
      if (getUserSessionQuery.isLoading) {
        return <Spinner />;
      }
      const userSession = getUserSessionQuery.data;
      if (!userSession?.user) {
        setAuthStatus("unauthorised");
        return <SpinnerLayout />;
      }

      return (
        <SessionContext.Provider
          value={{
            session: userSession.session,
            user: userSession.user,
            invalidateSession,
          }}
        >
          {children}
        </SessionContext.Provider>
      );
  }
};

export const useSession = () => {
  const session = useContext(SessionContext);

  return session;
};
