import { toast, TypeOptions, ToastOptions } from "react-toastify";

const SnackBar = (type: TypeOptions, message: string) => {
  const options: ToastOptions = {
    autoClose: 4 * 1000,
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type,
  };

  toast(message, options);
  return true;
};

export default SnackBar;
