import axios from "axios";
import {getToken} from "./SessionHelper";

// Shared axios instance used by every ApiServices/*.js file.
// A request interceptor stamps the CURRENT token onto every request,
// which fixes the earlier bug where "AxiosHeader" objects captured the
// token once at module-load time (before login) and never refreshed it.
const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {
    const token = getToken();
    config.headers = config.headers || {};
    if (token) {
        config.headers.token = token;
    }
    return config;
});

export default axiosClient;
