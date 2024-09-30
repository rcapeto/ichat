import { AppDispatch } from "@/store/types";
import { useDispatch } from "react-redux";

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
