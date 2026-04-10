
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

if (!API_KEY) {
  throw new Error('VITE_FINNHUB_API_KEY is not defined in your environment variables');
}

export async function getEtfPrice(ticker: string): Promise<number | null> {
  try {
    const response = await fetch(`${BASE_URL}/quote?symbol=${ticker}&token=${API_KEY}`);
    if (!response.ok) {
      console.error(`Error fetching price for ${ticker}: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    // c: current price
    return data.c ?? null;
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    return null;
  }
}
