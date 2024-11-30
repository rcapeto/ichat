import { ModalProps } from "@/components/modal";

export type ModalContextValues = {
  showModal: (params: ShowModalParams) => void;
  closeModal: () => void;
};

export type ShowModalParams = ModalProps;
