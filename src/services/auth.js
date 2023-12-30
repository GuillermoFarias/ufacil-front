import { useUser } from "@/stores/user";
import { fetcher } from "./fetcher";

export const login = async (email, password) => {
    const userStore = useUser();

    return fetcher.post('/auth/login', {
        email,
        password
    },).then((response) => {
        userStore.setToken(response.data.token);
        userStore.setUser(response.data.user);
        userStore.setTokenExpiration(response.data.expires_at);

        return true;
    }).catch((error) => {
        console.log(error);
    });
}

export const logout = async () => {
    const userStore = useUser();

    return fetcher.post('/auth/logout').then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(response);
        userStore.$reset();

        return true;
    });
}