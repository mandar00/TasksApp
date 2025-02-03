/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar, snackbarData } from "../store/slice/snackbarSlice";
import { useEffect } from "react";
import { cn } from "../utils/tailwindUtils";

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const SnackbarData = useSelector(snackbarData);
  const { show, message, autoHide,severity } = SnackbarData;

  const closeSnackbar = () => {
    //clear the message and reset everything to default
    dispatch(
      showSnackbar({
        show: false,
        severity: "info",
        message: "",
      })
    );
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      closeSnackbar();
    }, autoHide);

    return () => clearTimeout(timerId);
  }, [show]);

  
  return (
    <>
      {show && (
        <div className="toast ">
          <div className={cn(`alert alert-${severity} text-white`)}>
            <span>{message}</span>
          <div onClick={closeSnackbar} className="cursor-pointer">x</div>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomSnackbar;
