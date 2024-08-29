"use client";

import {
  useDeleteSessionMutation,
  useListSessionsQuery,
} from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import Layout from "@frontend/components/Layout/Layout";
import { SpinnerCard } from "@frontend/components/Spinner/Spinner";
import { Text, Title } from "@frontend/components/Text/Text";
import Link from "next/link";
import { notFound } from "next/navigation";

const Home = () => {
  return notFound();
  const { data, isLoading, refetch } = useListSessionsQuery();
  const deleteSessionMutation = useDeleteSessionMutation();

  const deleteSession = async (sessionId: string) => {
    await deleteSessionMutation.mutateAsync({ sessionId });
    await refetch();
  };

  return (
    <Layout>
      <Card>
        <Title>Speed dating</Title>
        <Link href="/sessions/create">
          <Button>Create session</Button>
        </Link>
      </Card>
      {isLoading && <SpinnerCard />}
      {data?.map((session) => (
        <Card key={session.sessionId} isHorizontal>
          <Text>{session.name}</Text>
          <div>
            <Link href={`/sessions/${session.sessionId}`}>
              <Button>Open</Button>
            </Link>
            <Button
              onClick={() => {
                deleteSession(session.sessionId);
              }}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Home;
