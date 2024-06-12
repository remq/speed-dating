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

  const { mutate: startSwiping } = useStartSwipingMutation(
    session?.sessionId ?? ""
  );
  const { mutate: nextRound } = useNextRoundMutation(session?.sessionId ?? "");

  const state = session?.state;

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
          await startSwiping({});
          await invalidateSession();
          break;
        case "ROUNDS":
          await nextRound({});
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
