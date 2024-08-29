"use client";

import {
  useDeleteUserMutation,
  useGetSessionQuery,
  useListUsersQuery,
} from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import Layout from "@frontend/components/Layout/Layout";
import { SpinnerCard } from "@frontend/components/Spinner/Spinner";
import { Text, Title } from "@frontend/components/Text/Text";
import Link from "next/link";

const SessionPage = ({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) => {
  const listUsersQuery = useListUsersQuery(sessionId);
  const getSessionQuery = useGetSessionQuery(sessionId);
  const deleteUserMutation = useDeleteUserMutation();

  const deleteUser = async (userId: string) => {
    await deleteUserMutation.mutateAsync({ userId, sessionId });
    await listUsersQuery.refetch();
  };

  return (
    <Layout>
      <Card>
        <Title>Session {getSessionQuery.data?.name ?? "..."}</Title>
        <Text>
          <Link href={"/"}>Back to overview</Link>
        </Text>
        <Link href={`/sessions/${sessionId}/present`}>
          <Button>Present view</Button>
        </Link>
        <Link href={`/sessions/${sessionId}/play`}>
          <Button>Play view</Button>
        </Link>
      </Card>
      {listUsersQuery.data?.map((user) => (
        <Card key={user.userId} isHorizontal>
          <Text>{`${user.name} (${user.state})`}</Text>
          <Button
            onClick={() => {
              deleteUser(user.userId);
            }}
          >
            Remove
          </Button>
        </Card>
      )) ?? <SpinnerCard />}
    </Layout>
  );
};

export default SessionPage;
