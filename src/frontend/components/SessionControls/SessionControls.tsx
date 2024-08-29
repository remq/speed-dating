import {
  useNextRoundMutation,
  useStartSwipingMutation,
} from "@frontend/api/endpoints";
import { useSession } from "@frontend/context/SessionContext";
import { FC, useCallback, useEffect } from "react";
import ExpandIcon from "../SVGs/ExpandIcon";
import NextIcon from "../SVGs/NextIcon";
import styles from "./SessionControls.module.scss";

const SessionControls: FC = () => {
  const { session, invalidateSession } = useSession();

  const startSwipingMutation = useStartSwipingMutation();
  const nextRoundMutation = useNextRoundMutation();

  const state = session?.state;

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  const nextStep = useCallback(async () => {
    switch (state) {
      case "LOBBY":
        await startSwipingMutation.mutateAsync({
          sessionId: session!.sessionId,
        });
        await invalidateSession();
        break;
      case "ROUNDS":
        await nextRoundMutation.mutateAsync({ sessionId: session!.sessionId });
        await invalidateSession();
        break;
      default:
        return;
    }
  }, [
    invalidateSession,
    nextRoundMutation,
    session,
    startSwipingMutation,
    state,
  ]);

  useEffect(() => {
    const eventListener = async (event: KeyboardEvent) => {
      if (event.code != "Space") {
        return;
      }
      event.preventDefault();
      nextStep();
    };

    document.addEventListener("keypress", eventListener);

    return () => {
      document.removeEventListener("keypress", eventListener);
    };
  }, [nextStep, invalidateSession, state]);

  if (!session) {
    return null;
  }

  const nextStepDisabled =
    startSwipingMutation.isLoading ||
    nextRoundMutation.isLoading ||
    !["LOBBY", "ROUNDS"].includes(state!);

  return (
    <div className={styles.sessionControls}>
      <button disabled={nextStepDisabled} onClick={nextStep}>
        <NextIcon />
      </button>
      <button onClick={toggleFullScreen}>
        <ExpandIcon />
      </button>
    </div>
  );
};

export default SessionControls;
