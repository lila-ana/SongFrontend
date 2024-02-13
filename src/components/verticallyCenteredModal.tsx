import React, { useState } from "react";
import { Button, Modal } from "antd";

interface ModalState {
  modalOpen: boolean;
  modalTitle: string;
  modalContent: React.ReactNode;
  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}
const verticallyCenteredModal = (): ModalState => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          openModal(
            "Vertically centered modal dialog",
            <>
              <p>Some contents...</p>
            </>
          )
        }
      >
        Vertically centered modal dialog
      </Button>
      <Modal
        title={modalTitle}
        centered
        open={modalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default verticallyCenteredModal;
