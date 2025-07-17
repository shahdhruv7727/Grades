import axios from "axios";

export const SendPOSTRequest = async (url, data, config = {}) => {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    });
    return response.data;
};