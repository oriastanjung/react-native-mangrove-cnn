import axios from "axios";
import { BACKEND_URL } from "../config";

export const ENDPOINT = {
  MANGROVE : "/mangrove"
};
const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
};

const api = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: headers,
});

export default api;