import { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { getETFExplanation } from './services/gemini';
import { ShieldCheck, TrendingUp, Zap } from 'lucide-react';

const etfList = [
  { ticker: 'SPY', name: 'S&P 500', description: '미국 500대 기업에 투자하는 세계 최대 ETF' },
  { ticker: 'QQQ', name: 'Nasdaq 100', description: '기술주 중심의 성장 ETF' },
  { ticker: 'VTI', name: 'Total Stock Market', description: '미국 전체 주식 시장에 분산 투자' },
  { ticker: 'SCHD', name: 'U.S. Dividend Equity', description: '미국의 고배당주에 집중 투자' },
  { ticker: 'JEPI', name: 'JPMorgan Equity Premium', description: '커버드콜 전략을 활용한 월배당 ETF' },
];

function App() {
  const [selectedEtf, setSelectedEtf] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEtfClick = async (etfName: string) => {
    if (selectedEtf === etfName) {
      setSelectedEtf(null);
      setExplanation('');
      return;
    }

    setSelectedEtf(etfName);
    setIsLoading(true);
    try {
      const result = await getETFExplanation(etfName);
      setExplanation(result);
    } catch (error) {
      setExplanation('설명을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {/* Hero Section */}
      <header className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          E-경영: <span className="text-purple-400">ETF</span>로 경제적 자유를!
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          "진행시켜!" 당신의 자산을 스마트하게 성장시키는 가장 확실한 방법.
        </p>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* ETF List Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">핵심 ETF 포트폴리오</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {etfList.map((etf) => (
              <div
                key={etf.ticker}
                className={`bg-gray-800 p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-purple-500/30 ${selectedEtf === etf.name ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => handleEtfClick(etf.name)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">{etf.ticker}</span>
                    <h3 className="text-2xl font-bold">{etf.name}</h3>
                  </div>
                  {etf.ticker === 'SCHD' && <ShieldCheck className="text-blue-400" size={28} />}
                  {etf.ticker === 'QQQ' && <TrendingUp className="text-green-400" size={28} />}
                  {etf.ticker === 'JEPI' && <Zap className="text-yellow-400" size={28} />}
                </div>
                <p className="text-gray-400 mt-2">{etf.description}</p>
                {selectedEtf === etf.name && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                        <p className="ml-3">똑똑하게 설명 만드는 중...</p>
                      </div>
                    ) : (
                      <p className="text-purple-300 whitespace-pre-wrap font-medium">{explanation}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Calculator Section */}
        <section>
           <h2 className="text-4xl font-bold text-center mb-12">미래를 계산해 보세요</h2>
          <Calculator />
        </section>
      </main>

      <footer className="text-center py-8 mt-16 border-t border-gray-800">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} E-경영. All rights reserved. 진행시켜!</p>
      </footer>
    </div>
  );
}

export default App;
