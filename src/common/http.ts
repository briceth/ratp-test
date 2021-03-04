import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.ratp.url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async <T, U = {}>(path: string, query?: U): Promise<T> => {
  const { data } = await axiosInstance.get(path, { params: query });

  return data;
};
