
const apiUrl = import.meta.env.VITE_API_URL + '/api';

export const converter = async (date, amount) => {

    return fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ date, amount }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseJson = response.json();

        return responseJson;
    });
}