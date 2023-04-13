import axios from "axios";
import { envConfig } from "..";


const { baseUrl } = envConfig.default;

const axiosConfig = () => {
    const axiosInstance = axios.create({
        baseURL: baseUrl
    });

    return axiosInstance;
};

export default axiosConfig;