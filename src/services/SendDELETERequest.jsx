import axios from "axios";

export const SendDELETERequest = async (url, config = {}) => {
  const response = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  });
  return response;
};
