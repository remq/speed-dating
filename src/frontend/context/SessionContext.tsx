import {
  useGetSessionQuery,
  useGetUserSessionQuery,
} from "@frontend/api/endpoints";
import Spinner from "@frontend/components/Spinner/Spinner";
import { Session, User } from "@frontend/models";
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
  session?: Session;
  user?: User;
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
  const getUserSessionQuery = useGetUserSessionQuery(sessionId, userId ?? "", {
    refetchInterval: 5000,
    enabled: authStatus === "authorised",
  });

  const invalidateSession = useCallback(() => {
    const cookies = parseCookieString(document.cookie);
    if (!cookies[sessionId]) {
      setAuthStatus("unauthorised");
      return;
    }

    setUserId(cookies[sessionId]);
    setAuthStatus("authorised");
  }, [sessionId]);

  useEffect(invalidateSession, [sessionId]);

  switch (authStatus) {
    case "loading":
      return <Spinner />;
    case "unauthorised":
      if (getSessionQuery.isLoading) {
        return <Spinner />;
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
        return <Spinner />;
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
