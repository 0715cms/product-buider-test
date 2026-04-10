import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getETFExplanation(etfName: string): Promise<string> {
    if (!API_KEY) {
        console.error("VITE_GEMINI_API_KEY is not set. Returning placeholder message.");
        return "AI 설명을 위한 API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.";
    }
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Tell me about the ${etfName} ETF in 3-4 simple sentences, in Korean.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error fetching ETF explanation from Gemini:", error);
        return "AI 설명 로딩 중 오류가 발생했습니다.";
    }
}
