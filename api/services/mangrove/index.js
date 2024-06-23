import api, { ENDPOINT } from "../..";

export const getAllMangrove = async () => {
  try {
    const response = await api.get(`${ENDPOINT.MANGROVE}/get-data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const klasifikasiGambar = async (base64Image) => {
  try {
    // Function to check if a string is a valid Base64
    const isValidBase64 = (str) => {
      if (typeof str !== 'string') {
        return false;
      }

      const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
      return base64Regex.test(str);
    };

    // Check if the input is a valid Base64 string
    if (!isValidBase64(base64Image)) {
      throw new Error('Invalid Base64 string');
    }

    const response = await api.post(`${ENDPOINT.MANGROVE}/upload-image`, { image: base64Image });
    return response.data;
  } catch (error) {
    throw error;
  }
};
