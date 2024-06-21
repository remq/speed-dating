import { UserDTO } from "@backend/domain/dtos/user";
import variables from "@frontend/styles/exports.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import Card from "../Card/Card";
import { Text, Title } from "../Text/Text";
import styles from "./Match.module.scss";

const Match: FC<{
  className?: string;
  userOne: UserDTO;
  userTwo: UserDTO;
  tableNumber: number;
}> = ({ className, userOne, userTwo, tableNumber }) => {
  return (
    <Card className={classNames(styles.match, className)}>
      <div className={styles.users}>
        {[userOne, userTwo].map((user) => (
          <div key={user.userId} className={styles.user}>
            <Image
              src={user.imageUrl}
              alt={user.name}
              className={styles.image}
              width={parseInt(variables.sizeL, 10)}
              height={parseInt(variables.sizeL, 10)}
            />
            <Text className={styles.name}>{user.name}</Text>
          </div>
        ))}
      </div>
      <div className={styles.table}>
        <Text className={styles.tableLabel}>Table</Text>
        <Title className={styles.tableNumber}>{tableNumber}</Title>
      </div>
    </Card>
  );
};

export default Match;
