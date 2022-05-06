import { toast } from "react-toastify";

const toastifyRequest = async (fn) => {
  return toast.promise(fn, {
    pending: "Synchronizing notes...",
    success: "Notes synchronized successfully!",
    error: {
      render() {
        return "Couldn't synchronize notes. Try again.";
      },
      autoClose: false,
      closeOnClick: false,
    },
  });
};

export default toastifyRequest;
