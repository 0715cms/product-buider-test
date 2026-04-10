import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function getETFExplanation(etfName: string): Promise<string> {
  const prompt = `ETF "${etfName}"에 대해 초등학생도 이해할 수 있도록, 어려운 용어 없이 비유를 들어 3줄로 설명해줘.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error fetching ETF explanation:', error);
    return ' 설명을 가져오는 데 실패했습니다. 다시 시도해주세요.';
  }
}
