import axios from "axios";

export const SendPUTRequest = async (url, data, config = {}) => {
  const response = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    ...config,
  });
  return response.data;
};
