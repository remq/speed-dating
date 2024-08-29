import {
  useListUsersQuery,
  useSubmitLikesMutation,
} from "@frontend/api/endpoints";
import Card from "@frontend/components/Card/Card";
import Button from "@frontend/components/Form/Button/Button";
import Layout from "@frontend/components/Layout/Layout";
import QRCard from "@frontend/components/QRCard/QRCard";
import { Text, Title } from "@frontend/components/Text/Text";
import UserSwipingCard from "@frontend/components/UserSwipingCard/UserSwipingCard";
import { useSession } from "@frontend/context/SessionContext";
import { FC, createRef, useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { SpinnerLayout } from "../../Spinner/Spinner";
import styles from "./SwipingStep.module.scss";

type TinderCardRef = {
  swipe(dir: "left" | "right"): Promise<void>;
  restoreCard(): Promise<void>;
};

const SwipingStep: FC<{ isPresenting: boolean }> = ({ isPresenting }) => {
  if (isPresenting) {
    return <PresentSwipingStep />;
  }
  return <PlaySwipingStep />;
};

const PresentSwipingStep: FC = () => {
  return (
    <Layout>
      <Card>
        <Title>Time to match</Title>
        <Text>
          Use your phone to swipe. Swipe left if you know that colleague
          already. Swipe right if you don&apos;t.
        </Text>
      </Card>
      <QRCard showText={true} />
    </Layout>
  );
};

const PlaySwipingStep: FC = () => {
  const { user, session, invalidateSession } = useSession();
  const listUsersQuery = useListUsersQuery(session!.sessionId);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [swipeCount, setSwipeCount] = useState(0);
  const submitLikesMutation = useSubmitLikesMutation();

  const users = listUsersQuery.data?.filter((u) => u.userId !== user!.userId);
  const [swipeUser, backgroundUser] = users?.slice(swipeCount) ?? [];
  const swipeUserRef = createRef<TinderCardRef>();

  useEffect(() => {
    (async () => {
      if (
        !users ||
        swipeCount !== users.length ||
        !submitLikesMutation.isIdle
      ) {
        return;
      }
      await submitLikesMutation.mutateAsync({
        userId: user!.userId,
        sessionId: session!.sessionId,
        userIds: likedIds,
      });
      await invalidateSession();
    })();
  }, [
    swipeCount,
    likedIds,
    users,
    submitLikesMutation,
    invalidateSession,
    user,
    session,
  ]);

  if (listUsersQuery.isLoading || submitLikesMutation.isLoading) {
    return <SpinnerLayout />;
  }

  const handleSwipe = async (direction: "left" | "right", userId: string) => {
    setSwipeCount(swipeCount + 1);
    if (direction === "right") {
      setLikedIds([...likedIds, userId]);
    }
  };

  const canSwipe = swipeCount < users!.length;

  const swipe = async (dir: "left" | "right") => {
    if (canSwipe && swipeUserRef.current) {
      swipeUserRef.current.swipe(dir);
    }
  };

  return (
    <div className={styles.swipingStep}>
      <div className={styles.tinderCardsContainer}>
        {backgroundUser && (
          <div className={styles.tinderCard}>
            <UserSwipingCard user={backgroundUser} />
          </div>
        )}
        {swipeUser && (
          <TinderCard
            ref={swipeUserRef}
            key={swipeUser.userId}
            preventSwipe={["up", "down"]}
            className={styles.tinderCard}
            onSwipe={(direction) => {
              switch (direction) {
                case "left":
                case "right":
                  handleSwipe(direction, swipeUser.userId);
                  break;
                default:
                  return;
              }
            }}
          >
            <UserSwipingCard user={swipeUser} />
          </TinderCard>
        )}
      </div>
      <div className={styles.controls}>
        <Button
          onClick={() => {
            swipe("left");
          }}
          className={styles.knowButton}
        >
          Already know, pass
        </Button>
        <Button
          onClick={() => {
            swipe("right");
          }}
          className={styles.dontKnowButton}
        >
          New face? Match!
        </Button>
      </div>
    </div>
  );
};

export default SwipingStep;
