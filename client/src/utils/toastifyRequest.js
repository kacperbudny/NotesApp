import { toast } from "react-toastify";

const toastifyRequest = async (fn) => {
  return toast.promise(fn, {
    pending: "Synchronizing notes...",
    success: "Notes synchronized successfully!",
  });
};

export default toastifyRequest;
