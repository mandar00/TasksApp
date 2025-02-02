import { useDispatch, useSelector } from "react-redux";
import { showSnackbar, snackbarData } from "../store/slice/SnackbarSlice";
import { useEffect } from "react";

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const SnackbarData = useSelector(snackbarData);
  const { show, message, autoHide } = SnackbarData;

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
          <div className="alert alert-info text-white">
            <span>{message}</span>
          <div onClick={closeSnackbar} className="cursor-pointer">x</div>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomSnackbar;
