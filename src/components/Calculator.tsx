import { useState } from 'react';
import { BarChart, PiggyBank, TrendingUp, Target } from 'lucide-react';

export default function Calculator() {
  const [investment, setInvestment] = useState<number>(10000000);
  const [goalAmount, setGoalAmount] = useState<number>(3000000);

  const monthlyDividend = (investment * 0.04) / 12;
  const freedomPercentage = goalAmount > 0 ? Math.min((monthlyDividend / goalAmount) * 100, 100) : 0;

  const getChickenCount = () => {
    return (monthlyDividend / 20000).toFixed(1);
  };

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto my-12 text-white">
      <div className="flex items-center gap-4 mb-6">
        <PiggyBank size={40} className="text-violet-400" />
        <h2 className="text-3xl font-bold">나의 경제적 자유 계산기</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="investment" className="block text-sm font-medium text-gray-300 mb-2">
            총 투자금 (원)
          </label>
          <input
            type="number"
            id="investment"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 text-xl text-white focus:ring-violet-500 focus:border-violet-500 transition"
            step={1000000}
          />
        </div>

         <div>
          <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-300 mb-2">
            월 목표 배당금 (원)
          </label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 text-xl text-white focus:ring-violet-500 focus:border-violet-500 transition"
            step={100000}
          />
        </div>

        <div className="bg-slate-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <BarChart className="text-green-400" />
            월 예상 배당금 (연 4% 배당률 가정)
          </h3>
          <p className="text-4xl font-extrabold text-green-300">₩{Math.round(monthlyDividend).toLocaleString()}</p>
          <p className="text-lg mt-2 text-gray-300">
            이 돈이면... <span className="font-bold text-yellow-300">치킨을 매월 {getChickenCount()}마리</span> 먹을 수 있어요! 🍗
          </p>
        </div>

        <div className="bg-slate-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Target className="text-blue-400" />
            경제적 자유 달성률
          </h3>
          <div className="w-full bg-slate-600 rounded-full h-4 overflow-hidden mt-3 mb-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-violet-500 h-4 transition-all duration-500"
              style={{ width: `${freedomPercentage}%` }}
            ></div>
          </div>
           <p className="text-sm text-right text-gray-400">
             목표: {goalAmount.toLocaleString()}원 / 월
          </p>
          <p className="text-2xl font-bold text-center mt-1">{freedomPercentage.toFixed(1)}%</p>
        </div>
      </div>

      <button className="mt-8 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg active:scale-95">
        진행시켜!
      </button>
    </div>
  );
}
