/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonProps } from "@/components/ui/button";
import { FunctionComponent } from "react";

export type ModalProps = {
  title?: string;
  description?: string;
  withCloseButton?: boolean;
  withOverlay?: boolean;
  footerButtons?: ButtonProps[];
  onCancel?: () => void;
  onActionClick?: () => void;
  cancelButtonText?: string;
  actionButtonText?: string;
  Component?: FunctionComponent<any>;
  passProps?: Record<string, any>;
};

export type ModalActions = {
  showModal: () => void;
  closeModal: () => void;
};
