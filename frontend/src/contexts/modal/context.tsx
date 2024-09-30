import { Modal, ModalActions, ModalProps } from "@/components/modal";
import { createContext, PropsWithChildren, useRef, useState } from "react";
import { ModalContextValues, ShowModalParams } from "./types";

export const ModalContext = createContext({} as ModalContextValues);

export function ModalProvider(props: PropsWithChildren) {
  const [modalProps, setModalProps] = useState<ModalProps>({});

  const modalRef = useRef<ModalActions | null>(null);

  function showModal(params: ShowModalParams) {
    setModalProps(params);
    modalRef.current?.showModal();
  }

  function closeModal() {
    setModalProps({});
    modalRef.current?.closeModal();
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {props.children}
      <Modal ref={modalRef} {...modalProps} />
    </ModalContext.Provider>
  );
}
