/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/slice/snackbarSlice";

export function useToasts() {
  const dispatch = useDispatch();

  const addDangerToast = (message: string) => {
    dispatch(
      showSnackbar({
        show: true,
        severity: "error",
        message,
      })
    );
  };

  const addInfoToast = (message: string) => {
    dispatch(
      showSnackbar({
        show: true,
        severity: "info",
        message,
      })
    );
  };

  return useMemo(
    () => ({
      addDangerToast,
      addInfoToast,
    }),
    [dispatch]
  );

}
