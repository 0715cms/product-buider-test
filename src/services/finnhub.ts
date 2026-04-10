const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function getEtfPrice(ticker: string): Promise<number | null> {
    if (!API_KEY) {
        console.error("VITE_FINNHUB_API_KEY is not set. Returning null.");
        return null;
    }
    try {
        const response = await fetch(`${BASE_URL}/quote?symbol=${ticker}&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Finnhub API request failed with status ${response.status}`);
        }
        const data = await response.json();
        // c: current price
        return data.c ?? null;
    } catch (error) {
        console.error(`Error fetching price for ${ticker}:`, error);
        return null;
    }
}
