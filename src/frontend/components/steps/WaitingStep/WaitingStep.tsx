import Card from "@frontend/components/Card/Card";
import DeleteUserCard from "@frontend/components/DeleteUserCard/DeleteUserCard";
import Layout from "@frontend/components/Layout/Layout";
import { Text, Title } from "@frontend/components/Text/Text";
import { FC } from "react";

const WaitingStep: FC = () => {
  return (
    <Layout>
      <Card>
        <Title>You&apos;re done!</Title>
        <Text>Waiting for others to finish swiping...</Text>
      </Card>
      <DeleteUserCard />
    </Layout>
  );
};

export default WaitingStep;
