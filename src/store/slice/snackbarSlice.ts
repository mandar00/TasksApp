import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type snackbarState = {
  show: boolean;
  message: string;
  severity: string;
  autoHide?: number;
};

const initialState = {
  show: false,
  message: "",
  severity: "info",
  autoHide: 5000,
} satisfies snackbarState as snackbarState;

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state: snackbarState,
      action: PayloadAction<snackbarState>
    ) => {
      const { show, severity, message, autoHide } = action.payload
      state.show = show
      state.severity = severity
      state.message = message
      if (autoHide) {
        state.autoHide = autoHide
      }
    },
  },
});
export const snackbarData = (state: { snackbars: snackbarState }) => state.snackbars;
export default snackbarSlice.reducer;
export const { showSnackbar } = snackbarSlice.actions;
