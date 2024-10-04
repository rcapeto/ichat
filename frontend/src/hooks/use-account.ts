import { applicationConfig } from "@/config/application";
import { Messages } from "@/messages";
import { LoginRequest } from "@/services/http/requests/auth/types";
import { authActions } from "@/store/auth";
import { handleLogin, handleSession } from "@/store/auth/requests";
import Cookies from "js-cookie";
import { useAlert } from "./use-alert";
import { useAppDispatch } from "./use-dispatch";
import { useAppSelector } from "./use-selector";

const cookieTokenKey = applicationConfig.cookies.userToken;

export function useAccount() {
  const dispatch = useAppDispatch();
  const { showToastError, showToast } = useAlert();
  const { auth, session } = useAppSelector((state) => state.auth);

  async function login(params: LoginRequest) {
    try {
      const response = await dispatch(handleLogin(params));
      const isSuccess = !handleLogin.rejected.match(response);

      if (!isSuccess) {
        throw new Error(response.error.message || Messages.EMAIL_OR_PASSWORD_IS_INVALID);
      }

      const { session } = response.payload;

      dispatch(authActions.setNewSession(session));

      showToast(Messages.WELCOME);
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || Messages.DEFAULT_ERROR_MESSAGE;

      showToastError(errorMessage);
    }
  }

  function logout() {
    dispatch(authActions.logout());
  }

  async function getMySession() {
    const token = Cookies.get(cookieTokenKey);

    if (token) {
      await dispatch(handleSession({ token }));
    }
  }

  return {
    isLoading: auth.loading || session.loading,
    isError: auth.error || session.error,
    session: session.payload,
    login,
    logout,
    getMySession,
  };
}
