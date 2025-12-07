import { useQuery } from "@tanstack/react-query";
import { Toast } from "../components/commonFunctions/Toast";
import { SendGETRequest } from "../services/SendGETRequest";
import { useNavigate } from "react-router-dom";

const useQueryHook = (queryKey, url, navigateUrl, customSuccessMessage, customErrorMessage = "Something went wrong!") => {
  const Navigation = useNavigate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKey, url],
    queryFn: () => SendGETRequest(url),
    enabled: !!url, // only run if url is provided
    onSuccess: (data) => {
      Toast({
        type: "success",
        message: customSuccessMessage ? customSuccessMessage : data?.response?.data?.msg,
      });
      navigateUrl && Navigation(navigateUrl);
    },
    onError: (error) => {
      Toast({
        type: "error",
        message: error?.response?.data?.msg || customErrorMessage,
      });
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useQueryHook;