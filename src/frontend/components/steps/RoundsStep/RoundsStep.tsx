import { User } from "@backend/domain/entities/user";
import { useListUsersQuery } from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import CountDownCard from "@frontend/components/CountDownCard/CountDownCard";
import DeleteUserCard from "@frontend/components/DeleteUserCard/DeleteUserCard";
import Layout from "@frontend/components/Layout/Layout";
import Match from "@frontend/components/Match/Match";
import QRCard from "@frontend/components/QRCard/QRCard";
import Questions from "@frontend/components/Questions/Questions";
import { Text, Title } from "@frontend/components/Text/Text";
import { useSession } from "@frontend/context/SessionContext";
import Image from "next/image";
import { FC } from "react";
import { SpinnerLayout } from "../../Spinner/Spinner";
import styles from "./RoundsStep.module.scss";

const TIME_PER_ROUND = 5 * 60;

const getUserById = (users: User[], userId: string) =>
  users.find((user) => user.userId === userId)!;

const RoundsStep: FC<{ isPresenting: boolean }> = ({ isPresenting }) => {
  if (isPresenting) {
    return <PresentRoundsStep />;
  }
  return <PlayRoundsStep />;
};

const SessionEnded: FC = () => {
  return (
    <Layout>
      <Card>
        <Title>Session ended</Title>
        <Text>That was the last round, thank you for participating!</Text>
      </Card>
    </Layout>
  );
};

const PresentRoundsStep: FC = () => {
  const { session } = useSession();
  const listUsersQuery = useListUsersQuery(session!.sessionId);

  if (!session) {
    return null;
  }

  const users = listUsersQuery.data;
  const currentRound = session.rounds[session.rounds.length - 1];

  if (!users || !currentRound) {
    return <SpinnerLayout />;
  }

  if (currentRound.length === 0) {
    return <SessionEnded />;
  }

  return (
    <Layout className={styles.roundsStep} isWide>
      <div className={styles.matches}>
        {currentRound.map(([userOneId, userTwoId], index) => {
          const key = `${userOneId}:${userTwoId}:${index}`;
          const userOne = getUserById(users, userOneId);
          const userTwo = getUserById(users, userTwoId);
          if (!userOne || !userTwo) {
            return null;
          }

          return (
            <Match
              key={key}
              userOne={userOne}
              userTwo={userTwo}
              tableNumber={index + 1}
            />
          );
        })}
      </div>
      <div>
        <Card className={styles.map}>
          <Title>Round {session.rounds.length}</Title>
          <Text>Meet your match at the right number.</Text>
          {session.mapImageUrl && (
            <Image
              className={styles.mapImage}
              src={session.mapImageUrl}
              alt={session.name}
              width={512}
              height={512}
            />
          )}
        </Card>
        <div className={styles.footerContainer}>
          <QRCard showText={false} />
          <CountDownCard
            refreshOn={session.rounds.length}
            className={styles.countDown}
            seconds={TIME_PER_ROUND}
          />
        </div>
      </div>
    </Layout>
  );
};

const PlayRoundsStep: FC = () => {
  const { session, user } = useSession();
  const listUsersQuery = useListUsersQuery(session!.sessionId);

  if (!session || !user) {
    return null;
  }

  const users = listUsersQuery.data;
  const currentRound = session.rounds[session.rounds.length - 1];

  if (!users || !currentRound) {
    return <SpinnerLayout />;
  }

  if (currentRound.length === 0) {
    return <SessionEnded />;
  }

  if (
    currentRound.every(
      (match) =>
        !match.includes(user.userId) ||
        !match.every((user) => getUserById(users, user))
    )
  ) {
    return (
      <Layout>
        <Card>
          <Title>A short break</Title>
          <Text>
            You don&apos;t have a match this round. This can be due to your
            match stopped playing or because of an odd number of people. No
            worries: next round you will match with someone!
          </Text>
        </Card>
        <DeleteUserCard />
      </Layout>
    );
  }

  return (
    <Layout className={styles.roundsStep} isWide>
      <div className={styles.matches}>
        {currentRound.map(([userOneId, userTwoId], index) => {
          if (user.userId !== userOneId && user.userId !== userTwoId) {
            return null;
          }
          const key = `${userOneId}:${userTwoId}:${index}`;
          const userOne = getUserById(users, userOneId);
          const userTwo = getUserById(users, userTwoId);
          if (!userOne || !userTwo) {
            return null;
          }

          return (
            <Match
              key={key}
              userOne={userOne}
              userTwo={userTwo}
              tableNumber={index + 1}
            />
          );
        })}
      </div>
      <div>
        <Card className={styles.map}>
          <Title>Round {session.rounds.length}</Title>
          <Text>Meet your match at the right number.</Text>
          {session.mapImageUrl && (
            <Image
              className={styles.mapImage}
              src={session.mapImageUrl}
              alt={session.name}
              width={512}
              height={512}
            />
          )}
        </Card>
      </div>
      <Questions refreshOn={session.rounds.length} />
      <DeleteUserCard />
    </Layout>
  );
};

export default RoundsStep;
