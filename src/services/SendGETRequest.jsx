import axios from "axios";

export const SendGETRequest = async (url,data, config = {}) => {
    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            ...config.headers
        },
        ...config
    })
    return response;    
}