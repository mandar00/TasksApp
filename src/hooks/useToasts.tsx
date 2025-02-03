/* eslint-disable react-hooks/exhaustive-deps */
import { bindActionCreators } from "@reduxjs/toolkit";
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

  const toasters = {
    addDangerToast,
    addInfoToast
  };
  return useMemo(() => bindActionCreators(toasters, dispatch), [dispatch]);
}
