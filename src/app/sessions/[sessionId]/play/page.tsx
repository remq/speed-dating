"use client";

import Card from "@frontend/components/Card/Card";
import Layout from "@frontend/components/Layout/Layout";
import { Text, Title } from "@frontend/components/Text/Text";
import LobbyStep from "@frontend/components/steps/LobbyStep/LobbyStep";
import RegisterStep from "@frontend/components/steps/RegisterStep/RegisterStep";
import RoundsStep from "@frontend/components/steps/RoundsStep/RoundsStep";
import SwipingStep from "@frontend/components/steps/SwipingStep/SwipingStep";
import WaitingStep from "@frontend/components/steps/WaitingStep/WaitingStep";
import { SessionProvider, useSession } from "@frontend/context/SessionContext";
import { FC } from "react";

const SessionSteps: FC = () => {
  const { user, session } = useSession();

  if (!session) {
    return (
      <Layout>
        <Card>
          <Title>Can&apos;t join session</Title>
          <Text>The session you tried to join does not seem to exist.</Text>
        </Card>
      </Layout>
    );
  }

  switch (user?.state ?? "REGISTER") {
    case "LOBBY":
      return <LobbyStep isPresenting={false} />;
    case "REGISTER":
      return <RegisterStep />;
    case "SWIPING":
      return <SwipingStep isPresenting={false} />;
    case "ROUNDS":
      return <RoundsStep isPresenting={false} />;
    case "WAITING":
      return <WaitingStep />;
  }
};

const PlayPage = ({
  params: { sessionId },
}: {
  params: { sessionId: string };
}) => {
  return (
    <SessionProvider sessionId={sessionId}>
      <SessionSteps />
    </SessionProvider>
  );
};

export default PlayPage;
