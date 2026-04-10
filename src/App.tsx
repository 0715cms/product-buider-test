import { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { getETFExplanation } from './services/gemini';
import { getEtfPrice } from './services/finnhub';
import { ShieldCheck, TrendingUp, Zap, DollarSign } from 'lucide-react';

const etfList = [
  { ticker: 'SPY', name: 'S&P 500', description: '미국 500대 기업에 투자하는 세계 최대 ETF' },
  { ticker: 'QQQ', name: 'Nasdaq 100', description: '기술주 중심의 성장 ETF' },
  { ticker: 'VTI', name: 'Total Stock Market', description: '미국 전체 주식 시장에 분산 투자' },
  { ticker: 'SCHD', name: 'U.S. Dividend Equity', description: '미국의 고배당주에 집중 투자' },
  { ticker: 'JEPI', name: 'JPMorgan Equity Premium', description: '커버드콜 전략을 활용한 월배당 ETF' },
];

interface EtfData {
  explanation: string;
  price: number | null;
}

function App() {
  const [selectedEtf, setSelectedEtf] = useState<string | null>(null);
  const [etfDataCache, setEtfDataCache] = useState<Record<string, EtfData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEtfClick = async (etf: { name: string; ticker: string }) => {
    const { name, ticker } = etf;
    if (selectedEtf === name) {
      setSelectedEtf(null);
      return;
    }

    setSelectedEtf(name);

    if (!etfDataCache[name]) {
      setIsLoading(true);
      try {
        // Fetch explanation and price in parallel
        const [explanation, price] = await Promise.all([
          getETFExplanation(name),
          getEtfPrice(ticker),
        ]);

        setEtfDataCache(prevCache => ({
          ...prevCache,
          [name]: { explanation, price },
        }));

      } catch (error) {
        console.error("Error fetching ETF data:", error);
        setEtfDataCache(prevCache => ({
          ...prevCache,
          [name]: {
            explanation: '데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
            price: null,
          },
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <header className="text-center py-20 px-4 bg-gradient-to-b from-slate-900 to-violet-950">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
          E-경영: <span className="text-violet-400">ETF</span>로 경제적 자유를!
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          "진행시켜!" 당신의 자산을 스마트하게 성장시키는 가장 확실한 방법.
        </p>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">핵심 ETF 포트폴리오</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {etfList.map((etf) => (
              <div
                key={etf.ticker}
                className={`bg-slate-800 p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-violet-500/30 ${selectedEtf === etf.name ? 'ring-2 ring-violet-500' : ''}`}
                onClick={() => handleEtfClick(etf)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-violet-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">{etf.ticker}</span>
                    <h3 className="text-2xl font-bold">{etf.name}</h3>
                  </div>
                   {/* Icons can be kept or modified */}
                </div>
                <p className="text-gray-400 mt-2">{etf.description}</p>

                {selectedEtf === etf.name && (
                  <div className="mt-4 p-4 bg-slate-700 rounded-lg min-h-[120px]">
                    {isLoading && !etfDataCache[etf.name] ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
                        <p className="ml-3">실시간 정보 조회 중...</p>
                      </div>
                    ) : (
                      etfDataCache[etf.name] && (
                        <div>
                           <p className="text-violet-300 whitespace-pre-wrap font-medium mb-4">
                            {etfDataCache[etf.name].explanation}
                          </p>
                          <div className="border-t border-slate-600 pt-3">
                            <div className="flex items-center gap-2 text-lg font-semibold">
                               <DollarSign className="text-green-400" size={20}/>
                               <span>현재가:</span>
                               <span className="text-green-300 text-xl font-bold">
                                 {etfDataCache[etf.name].price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? 'N/A'}
                               </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-center mb-12">미래를 계산해 보세요</h2>
          <Calculator />
        </section>
      </main>

      <footer className="text-center py-8 mt-16 border-t border-slate-800">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} E-경영. All rights reserved. 진행시켜!</p>
      </footer>
    </div>
  );
}

export default App;
