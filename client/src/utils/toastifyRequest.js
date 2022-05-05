import { toast } from "react-toastify";

const toastifyRequest = async (fn) => {
  return toast.promise(fn, {
    pending: "Synchronizing notes...",
    success: "Notes synchronized successfully!",
    error: {
      render() {
        return "There was an error when synchronizing notes. Please try again.";
      },
      autoClose: false,
    },
  });
};

export default toastifyRequest;
