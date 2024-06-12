import Card from "@frontend/components/Card/Card";
import Layout from "@frontend/components/Layout/Layout";
import SessionControls from "@frontend/components/SessionControls/SessionControls";
import { SpinnerLayout } from "@frontend/components/Spinner/Spinner";
import { Text, Title } from "@frontend/components/Text/Text";
import LobbyStep from "@frontend/components/steps/LobbyStep/LobbyStep";
import RoundsStep from "@frontend/components/steps/RoundsStep/RoundsStep";
import SwipingStep from "@frontend/components/steps/SwipingStep/SwipingStep";
import { SessionProvider, useSession } from "@frontend/context/SessionContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

const SessionSteps: FC = () => {
  const { session } = useSession();

  if (!session) {
    return (
      <Layout>
        <Card>
          <Title>Can&apos;t join session</Title>
          <Text>The session you tried to present does not seem to exist.</Text>
        </Card>
      </Layout>
    );
  }

  const state = session.state;

  switch (state) {
    case "LOBBY":
      return <LobbyStep isPresenting={true} />;
    case "ROUNDS":
      return <RoundsStep isPresenting={true} />;
    case "SWIPING":
      return <SwipingStep isPresenting={true} />;
    default:
      return null;
  }
};

const PresentPage: NextPage = () => {
  const router = useRouter();
  const sessionId = router.query.sessionId as string;

  if (!sessionId) {
    return <SpinnerLayout />;
  }

  return (
    <SessionProvider sessionId={sessionId}>
      <SessionSteps />
      <SessionControls />
    </SessionProvider>
  );
};

export default PresentPage;
