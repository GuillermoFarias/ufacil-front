import { useUser } from "@/stores/user";

const apiUrl = import.meta.env.VITE_API_URL + '/api';

export const login = async (email, password) => {
    const userStore = useUser();

    return fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ email, password }),
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseJson = await response.json();
        userStore.setToken(responseJson.token);
        userStore.setUser(responseJson.user);
        userStore.setTokenExpiration(responseJson.expires_at);

        return true;
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