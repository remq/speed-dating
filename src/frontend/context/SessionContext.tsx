import { useGetSessionQuery, useGetUserQuery } from "@frontend/api/endpoints";
import Spinner from "@frontend/components/Spinner/Spinner";
import { Session, User } from "@frontend/models";
import { parseCookieString } from "@frontend/utils/cookies";
import {
  FC,
  PropsWithChildren,
  createContext,
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
  const [invalidationCount, setInvalidationCount] = useState(0);
  const getSessionQuery = useGetSessionQuery(sessionId, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    const cookies = parseCookieString(document.cookie);
    if (!cookies[sessionId]) {
      setUserId(undefined);
      return;
    }

    setUserId(cookies[sessionId]);
  }, [invalidationCount, sessionId]);

  if (getSessionQuery.isLoading || getSessionQuery.isError) {
    return <Spinner />;
  }
  const session = getSessionQuery.data;

  const invalidateSession = () => {
    setInvalidationCount(invalidationCount + 1);
    getSessionQuery.refetch();
  };

  const unsetUser = () => {
    setUserId(undefined);
  };

  if (session && userId) {
    return (
      <UserSessionProvider
        unsetUser={unsetUser}
        userId={userId}
        session={session}
        invalidateSession={invalidateSession}
      >
        {children}
      </UserSessionProvider>
    );
  }

  return (
    <SessionContext.Provider value={{ session, invalidateSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const UserSessionProvider: FC<
  PropsWithChildren & {
    session: Session;
    userId: string;
    unsetUser: () => void;
    invalidateSession: () => void;
  }
> = ({
  invalidateSession: baseInvalidateSession,
  unsetUser,
  children,
  session,
  userId,
}) => {
  const getUserQuery = useGetUserQuery(session.sessionId, userId, {
    refetchInterval: 5000,
  });

  if (getUserQuery.isLoading) {
    return <Spinner />;
  }

  const user = getUserQuery.data;
  if (!user) {
    unsetUser();
    return <Spinner />;
  }

  const invalidateSession = () => {
    baseInvalidateSession();
    getUserQuery.refetch();
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        user,
        invalidateSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);

  return session;
};
