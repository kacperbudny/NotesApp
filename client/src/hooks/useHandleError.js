import { RefreshTokenError } from "@utils/errors";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "@contexts/AuthContext";

const useHandleError = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  return useCallback(
    async (error) => {
      if (error instanceof RefreshTokenError) {
        await signOut();
        navigate("/login");
        return toast.info(
          "Your session expired and we had to log you out. Please log in again."
        );
      }
      return toast.error("Something went wrong. Please try again.", {
        autoClose: false,
        closeOnClick: false,
      });
    },
    [navigate, signOut]
  );
};

export default useHandleError;
