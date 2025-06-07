import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/commonFunctions/Toast";
import { SendPOSTRequest } from "../services/SendPOSTRequest";
import { useNavigate } from "react-router-dom";

const useMutateHook = (navigateUrl, customMessage = "Something went wrong!") => {
  const Navigation = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ url, input}) => SendPOSTRequest({ url, data : input}),
    onSuccess: () => {
      Toast({ type: "success", message: "Registration successful!" });
      Navigation(navigateUrl);
    },
    onError: (error) => {
      Toast({
        type: "error",
        message: error?.response?.data?.msg || customMessage,
      });
    },
  });

  return { mutate, isLoading };
};

export default useMutateHook;
