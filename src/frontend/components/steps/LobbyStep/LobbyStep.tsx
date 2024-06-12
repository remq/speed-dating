import { useListUsersQuery } from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import DeleteUserCard from "@frontend/components/DeleteUserCard/DeleteUserCard";
import Layout from "@frontend/components/Layout/Layout";
import QRCard from "@frontend/components/QRCard/QRCard";
import { Text, Title } from "@frontend/components/Text/Text";
import UserCard from "@frontend/components/UserCard/UserCard";
import { useSession } from "@frontend/context/SessionContext";
import { FC } from "react";
import styles from "./LobbyStep.module.scss";

const LobbyStep: FC<{ isPresenting: boolean }> = ({ isPresenting }) => {
  if (isPresenting) {
    return <PresentLobbyStep />;
  }
  return <PlayLobbyStep />;
};

const HeaderCard: FC = () => {
  return (
    <Card>
      <Title>Speed dating</Title>
      <Text>Come and have a chat with these people.</Text>
    </Card>
  );
};

const PresentLobbyStep: FC = () => {
  const { session } = useSession();
  const { data } = useListUsersQuery(session?.sessionId!!, {
    refetchInterval: 3000,
  });

  return (
    <Layout className={styles.lobbyStep} isWide>
      <div>
        <HeaderCard />
        <div className={styles.userList}>
          {data?.map((user) => <UserCard key={user.userId} user={user} />)}
        </div>
      </div>
      <QRCard showText={true} />
    </Layout>
  );
};

const PlayLobbyStep: FC = () => {
  const { session } = useSession();
  const { data } = useListUsersQuery(session?.sessionId!!, {
    refetchInterval: 3000,
  });

  return (
    <Layout className={styles.lobbyStep} isWide>
      <div>
        <HeaderCard />
        <div className={styles.userList}>
          {data?.map((user) => <UserCard key={user.userId} user={user} />)}
        </div>
      </div>
      <DeleteUserCard />
    </Layout>
  );
};

export default LobbyStep;
