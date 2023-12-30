import { useUser } from "@/stores/user";
import { useRouter } from "vue-router";

const apiUrl = import.meta.env.VITE_API_URL + '/api';

export const converter = async (date, amount) => {
    const userStore = useUser();

    return fetch(`${apiUrl}/converter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + userStore.token,
        },
        body: JSON.stringify({ date, amount }),
    }).then(async (response) => {
        // if code is 401, logout and redirect to login
        if (response.status === 401) {
            const router = useRouter();
            userStore.$reset();
            router.push('/login');
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseJson = await response.json();
        return responseJson.conversion
    })
}

export const getHistory = async () => {
    const userStore = useUser();

    return fetch(`${apiUrl}/history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': 'Bearer ' + userStore.token,
        },
    }).then(async (response) => {
        // if code is 401, logout and redirect to login
        if (response.status === 401) {
            const router = useRouter();
            userStore.$reset();
            router.push('/login');
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseJson = await response.json();

        return responseJson.conversions
    })
}