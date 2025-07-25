import { useMutation } from "@tanstack/react-query";
import { Toast } from "../components/commonFunctions/Toast";
import { SendPOSTRequest } from "../services/SendPOSTRequest";
import { useNavigate } from "react-router-dom";

const useMutateHook = (navigateUrl, customSuccessMessage , customErrorMessage = "Something went wrong!") => {
  const Navigation = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ url, input}) => SendPOSTRequest(url, input),
    onSuccess: (data) => {
      Toast({ type: "success", message: customSuccessMessage ? customSuccessMessage : data?.response?.data?.msg });
      navigateUrl && Navigation(navigateUrl);
    },
    onError: (error) => {
      Toast({
        type: "error",
        message: error?.response?.data?.msg || customErrorMessage,
      });
    },
  });

  return { mutate: mutateAsync, isLoading };
};    
export default useMutateHook;
