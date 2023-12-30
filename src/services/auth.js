import { useUser } from "@/stores/user";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL + '/api';

export const login = async (email, password) => {
    const userStore = useUser();

    return axios.post(`${apiUrl}/auth/login`,
        {
            email,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }).then((response) => {
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

    return fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + userStore.token,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(response);
        userStore.$reset();

        return true;
    });
}