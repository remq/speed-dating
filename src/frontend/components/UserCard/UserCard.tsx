import { User } from "@backend/domain/entities/user";
import variables from "@frontend/styles/exports.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import Card from "../Card/Card";
import { Text } from "../Text/Text";
import styles from "./UserCard.module.scss";

const UserCard: FC<{ user: User; className?: string }> = ({
  user,
  className,
}) => {
  return (
    <Card className={classNames(styles.userCard, className)}>
      <Image
        src={user.imageUrl}
        alt={user.name}
        className={styles.image}
        width={parseInt(variables.sizeL, 10)}
        height={parseInt(variables.sizeL, 10)}
      />
      <Text className={styles.name}>{user.name}</Text>
    </Card>
  );
};

export default UserCard;
