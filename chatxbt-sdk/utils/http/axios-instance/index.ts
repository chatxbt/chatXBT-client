import axios from "axios";
import Issue from "../../error-handler";
import { toolkit } from "../../../utils";

export const axiosInstance = ({
  baseURL,
  headers,
}: {
  baseURL: string;
  headers: object;
}) => {
  try {
    //new instance
    const axiosInstance = axios.create({
      baseURL,
      headers: { ...headers },
    });

    // interceptor
    axiosInstance.interceptors.response.use(
      (response) =>
        new Promise((resolve, reject) => {
          resolve(response);
        }),
      (error) => {
        if (!error.response) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        if (error.response.status === 401) {
          // localStorage.removeItem("token");
          // window.location = "/login" as any;
          return new Promise((resolve, reject) => {
            reject(error);
          });
        } else {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
      }
    );

    return axiosInstance;
  } catch (error: any) {
    if (error?.response?.status === 500 || error?.response?.status === 403)
      toolkit.slackNotify({
        message: JSON.stringify(error?.response?.message),
      });

    throw new Issue(500, error.message);
  }
};
