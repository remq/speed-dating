import {
  useNextRoundMutation,
  useStartSwipingMutation,
} from "@frontend/api/endpoints";
import { useSession } from "@frontend/context/SessionContext";
import { FC, useEffect } from "react";
import ExpandIcon from "../SVGs/ExpandIcon";
import styles from "./SessionControls.module.scss";

const SessionControls: FC = () => {
  const { session, invalidateSession } = useSession();

  const { mutate: startSwiping } = useStartSwipingMutation();
  const { mutate: nextRound } = useNextRoundMutation();

  const state = session?.state;

  if (!session) {
    return null;
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const eventListener = async (event: KeyboardEvent) => {
      if (event.code != "Space") {
        return;
      }

      switch (state) {
        case "LOBBY":
          await startSwiping({ sessionId: session.sessionId });
          await invalidateSession();
          break;
        case "ROUNDS":
          await nextRound({ sessionId: session.sessionId });
          await invalidateSession();
          break;
        default:
          return;
      }

      event.preventDefault();
    };

    document.addEventListener("keypress", eventListener);

    return () => {
      document.removeEventListener("keypress", eventListener);
    };
  }, [startSwiping, nextRound, invalidateSession, state]);

  return (
    <div className={styles.sessionControls} onClick={toggleFullScreen}>
      <ExpandIcon />
    </div>
  );
};

export default SessionControls;
