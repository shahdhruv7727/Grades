import axios from "axios";

export const SendPATCHRequest = async (url, data, config = {}) => {
  const response = await axios.patch(url, data, {
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  });
  return response.data;
};
