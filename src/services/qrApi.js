import axios from "axios";
const apiKey = import.meta.env.API_KEY;
const BASE_URL = "https://api.dub.co/";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${apiKey}`
    }
});

const qrApi = {
    generateQR: async (url) => {
        try {
            const response = await api.get(`/qr?url=${url}`, {
                responseType: 'arraybuffer' // Important for binary data
            }); 
            console.log(response);
            return response; // Return full response, not just response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default qrApi;