import { fetcher } from "./fetcher";

export const converter = async (date, amount) => {
    return fetcher.post('/converter', {
        date, amount
    }).then(async (response) => {
        return response.data.conversion
    })
}

export const getHistory = async () => {
    return fetcher.get('/history').then(async (response) => {
        return response.data.conversions
    })
}