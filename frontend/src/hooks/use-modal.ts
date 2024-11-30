import { ModalContext } from "@/contexts/modal";
import { useContext } from "react";

export function useModal() {
  return useContext(ModalContext);
}
