import axios, { AxiosError } from "axios";

export async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<any> {
    try {
        return await axios.get(url)
    } catch (err) {
        const error = err as AxiosError;

        if (retries > 0 && error.response?.status === 429) {
            await new Promise((res) => setTimeout(res, delay));
            return fetchWithRetry(url, retries - 1, delay * 2);
        } else {
            throw error;
        }
    }
}