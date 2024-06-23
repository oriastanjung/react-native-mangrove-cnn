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
    const response = await api.post(`${ENDPOINT.MANGROVE}/upload-image`, { image: base64Image });
    return response.data;
  } catch (error) {
    throw error;
  }
};
