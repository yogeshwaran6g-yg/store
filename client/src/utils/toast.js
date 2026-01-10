import { toast } from "react-toastify";
export const notifySuccess = (msg) => toast.success(`Success: ${msg}`);
export const notifyError = (msg) => toast.error(`Error: ${msg}`);

