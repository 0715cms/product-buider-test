import './App.css'

function App() {
  return (
    <div className="etf-app">
      {/* Hero Section */}
      <section id="hero">
        <div className="hero-content">
          <div className="badge">Economic Freedom</div>
          <h1>ETF로 경제적 자유를 이루자</h1>
          <p className="subtitle">
            스마트한 투자자들의 선택, 분산 투자와 저렴한 비용으로 <br />
            당신의 자산을 안전하게 성장시키세요.
          </p>
          <div className="hero-cta">
            <button className="cta-primary">시작하기</button>
            <button className="cta-secondary">더 알아보기</button>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Intro Section: What is an ETF? */}
      <section id="what-is-etf" className="content-section">
        <div className="section-header">
          <h2>ETF란 무엇인가요?</h2>
          <p>Exchange Traded Fund의 약자로, 거래소에서 주식처럼 편리하게 거래되는 펀드입니다.</p>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <div className="icon">📈</div>
            <h3>주식의 편리함</h3>
            <p>언제 어디서나 실시간으로 사고팔 수 있습니다.</p>
          </div>
          <div className="info-card">
            <div className="icon">🧺</div>
            <h3>펀드의 안정성</h3>
            <p>수십, 수백 개의 기업에 분산 투자하여 위험을 낮춥니다.</p>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Benefits Section */}
      <section id="benefits" className="content-section">
        <div className="section-header">
          <h2>ETF 투자의 장점</h2>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="check">✓</div>
            <div>
              <h3>저렴한 운용 보수</h3>
              <p>일반 펀드보다 훨씬 낮은 수수료로 장기 투자에 유리합니다.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="check">✓</div>
            <div>
              <h3>투명한 운용</h3>
              <p>매일매일 어떤 종목에 투자하고 있는지 실시간으로 공개됩니다.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="check">✓</div>
            <div>
              <h3>소액 분산 투자</h3>
              <p>적은 금액으로도 전 세계 시장에 투자할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      {/* Top ETFs Section */}
      <section id="top-etfs" className="content-section">
        <div className="section-header">
          <h2>주요 ETF 리스트</h2>
          <p>전 세계에서 가장 사랑받는 대표적인 ETF들입니다.</p>
        </div>
        <div className="etf-cards">
          <div className="etf-card highlighted">
            <span className="ticker">SPY</span>
            <h3>S&P 500</h3>
            <p>미국 500대 기업에 투자하는 세계 최대 ETF</p>
          </div>
          <div className="etf-card highlighted">
            <span className="ticker">QQQ</span>
            <h3>Nasdaq 100</h3>
            <p>애플, 마이크로소프트 등 기술주 중심의 성장 ETF</p>
          </div>
          <div className="etf-card highlighted">
            <span className="ticker">VOO</span>
            <h3>Vanguard S&P 500</h3>
            <p>매우 저렴한 보수로 S&P 500 지수를 추종</p>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      {/* CTA Section */}
      <section id="cta">
        <div className="cta-container">
          <h2>경제적 자유를 향한 첫 걸음</h2>
          <p>지금 바로 ETF와 함께 미래를 준비하세요.</p>
          <button className="cta-large">투자 시작하기</button>
        </div>
      </section>

      <footer id="spacer">
        <p>&copy; 2026 ETF Guide. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
