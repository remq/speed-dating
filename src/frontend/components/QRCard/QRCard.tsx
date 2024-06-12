import { useSession } from "@frontend/context/SessionContext";
import { FC, useEffect, useState } from "react";

import QRCode from "react-qr-code";

import Card from "../Card/Card";
import { Text, Title } from "../Text/Text";
import styles from "./QRCard.module.scss";

const QRCard: FC<{ showText: boolean }> = ({ showText }) => {
  const { session } = useSession();
  const [registerUrl, setRegisterUrl] = useState<string>();

  useEffect(() => {
    setRegisterUrl(
      `${window.location.origin}/sessions/${session?.sessionId}/play`
    );
  }, [session?.sessionId]);

  if (!session) {
    return null;
  }

  return (
    <Card className={styles.qrcard}>
      {showText && (
        <>
          <Title>Scan and join</Title>
          <Text>
            Grab your phone and scan to join the Speed Dating session.
          </Text>
        </>
      )}
      {registerUrl && (
        <a href={`/sessions/${session.sessionId}/play`} target="_blank">
          <QRCode value={registerUrl} bgColor="transparent" fgColor="#000000" />
        </a>
      )}
    </Card>
  );
};

export default QRCard;
