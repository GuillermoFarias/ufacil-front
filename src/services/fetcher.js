import axios from "axios";
import { useUser } from "@/stores/user";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL + '/api';

const createAxiosInstance = () => {
    const router = useRouter();

    const instance = axios.create();

    instance.defaults.baseURL = apiUrl;
    instance.interceptors.request.use(
        config => {
            const userStore = useUser();
            const token = userStore.token
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }

            return config;
        },
        error => {
            const userStore = useUser();
            if (error.response.status === 401) {
                userStore.$reset();
                router.push('/login');
            }
            return Promise.reject(error)
        });

    return instance;
}

export const fetcher = createAxiosInstance()