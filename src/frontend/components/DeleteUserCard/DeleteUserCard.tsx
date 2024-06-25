import { useDeleteUserMutation } from "@frontend/api/endpoints";
import { useSession } from "@frontend/context/SessionContext";
import { FC, useCallback, useState } from "react";
import Card from "../Card/Card";
import Button from "../Form/Button/Button";
import Modal from "../Modal/Modal";
import { Text } from "../Text/Text";

const DeleteUserCard: FC = () => {
  const { user, session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isLoading } = useDeleteUserMutation();

  const closeModal = useCallback(
    () => setIsModalOpen(() => false),
    [setIsModalOpen]
  );

  const openModal = useCallback(
    () => setIsModalOpen(() => true),
    [setIsModalOpen]
  );

  const deleteUser = useCallback(async () => {
    await mutate({ userId: user!.userId, sessionId: session!.sessionId });
    closeModal();
  }, [user?.userId, mutate, closeModal]);

  if (!user || !session) {
    return null;
  }

  return (
    <>
      <Card isHorizontal>
        <Text>Done speed dating?</Text>
        <Button onClick={openModal}>Leave</Button>
      </Card>
      {isModalOpen && (
        <Modal onRequestClose={closeModal}>
          <Card>
            <Text>Are you sure?</Text>
            <Button onClick={deleteUser} disabled={isLoading}>
              Yes
            </Button>
            <Button onClick={closeModal}>No</Button>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default DeleteUserCard;
