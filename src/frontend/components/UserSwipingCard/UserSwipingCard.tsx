import { User } from "@frontend/models";
import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import { Text } from "../Text/Text";
import styles from "./UserSwipingCard.module.scss";

const UserSwipingCard: FC<{ user: User; className?: string }> = ({
  user,
  className,
}) => {
  return (
    <div className={classNames(styles.userSwipingCard, className)}>
      <Image
        alt={user.name}
        src={user.imageUrl}
        width={256}
        height={256}
        className={styles.profileImage}
        draggable={false}
      />
      <div className={styles.footer}>
        <Text className={styles.name}>{user.name}</Text>
      </div>
    </div>
  );
};

export default UserSwipingCard;
