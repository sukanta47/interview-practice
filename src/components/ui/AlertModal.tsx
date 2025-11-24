import React from "react";
import { createPortal } from "react-dom";
import ModalSkeleton from "./ModalSkeleton";
export interface AlertModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
const AlertModal: React.FC<AlertModalProps> = ({ onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return createPortal(
    <ModalSkeleton onClose={onClose}>{children}</ModalSkeleton>,
    modalRoot
  );
};

export default AlertModal;
