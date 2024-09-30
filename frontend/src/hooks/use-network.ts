import { NetworkContext } from "@/contexts/network";
import { useContext } from "react";

export function useNetwork() {
  return useContext(NetworkContext);
}
