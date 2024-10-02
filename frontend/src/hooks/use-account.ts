import { useAppSelector } from "./use-selector";

export function useAccount() {
  const { auth, session } = useAppSelector((state) => state.auth);

  return {
    isLoading: auth.loading || session.loading,
    isError: auth.error || session.error,
    session: session.payload,
  };
}
