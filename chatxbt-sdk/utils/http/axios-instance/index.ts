import axios from "axios";
import Issue from '../../error-handler'

export const axiosInstance = ({ 
    baseURL, headers 
}:{ baseURL: string, headers: object}) => {
    try {
        //new instance
        const axiosInstance = axios.create({
            baseURL,
            headers: { ...headers }
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
                    localStorage.removeItem("token");
                    window.location = "/login" as any;
                } else {
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                }
            }
        );

        return axiosInstance;
    } catch (error: any) {
        throw new Issue(500, error.message)
    }
}