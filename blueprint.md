# **Project Blueprint: E-경영 (E-Management) ETF Dashboard**

This document serves as the single source of truth for the "E-경영" application. It details the project's overview, implemented features, design choices, and the plan for ongoing development.

## **1. Project Overview**

**Purpose:** "E-경영" is a sleek, modern web dashboard designed for aspiring investors. It provides detailed explanations and real-time price data for key Exchange-Traded Funds (ETFs), along with a calculator to project financial goals, empowering users to make informed investment decisions with the motto, "진행시켜!"

**Core Technologies:**
*   **Framework:** React (with Vite)
*   **Styling:** Tailwind CSS
*   **AI Integration:** Google Gemini API for generating dynamic ETF explanations.
*   **Financial Data:** Finnhub API for real-time stock/ETF price quoting.
*   **Icons:** `lucide-react` for clean and modern iconography.
*   **Deployment:** Cloudflare Pages (with automated Git integration).

## **2. Implemented Features & Design**

This section documents the current state of the application, reflecting all the features built.

### **UI & UX Design:**
*   **Overall Theme:** A sophisticated and modern dark theme utilizing a `slate` and `violet` color palette, ensuring a visually appealing and consistent experience across the entire application.
*   **Hero Section:** A prominent header with the title "E-경영: ETF로 경제적 자유를!" to clearly state the app's purpose.
*   **ETF Portfolio Section:** A curated list of key ETFs presented as interactive cards. Hover effects and a selection ring (`ring-2 ring-violet-500`) provide clear visual feedback.
*   **Economic Freedom Calculator:** A dedicated component for financial projection, seamlessly integrated with the main page's theme.

### **Core Functionality:**
*   **Dynamic ETF Information:**
    *   When a user clicks on an ETF card, the card expands to reveal detailed information.
    *   **AI-Powered Explanations:** A call is made to the **Google Gemini API** to fetch a rich, detailed explanation of the selected ETF.
    *   **Real-Time Pricing:** Simultaneously, a call is made to the **Finnhub API** to fetch the current market price of the ETF, which is displayed in USD format.
*   **Performance-Optimizing Caching:**
    *   To prevent API rate-limiting and enhance speed, a caching mechanism is implemented.
    *   The fetched ETF explanation and price are stored in the component's state (`etfDataCache`).
    *   Subsequent clicks on the same ETF load the data instantly from the cache, avoiding redundant network requests.
*   **Economic Freedom Calculator:**
    *   Allows users to input their total investment amount.
    *   Calculates and displays the estimated monthly dividend, assuming a 4% annual yield.
    *   Provides a fun, relatable metric: the number of fried chickens one could buy monthly with the dividend.
    *   Calculates and visually represents the "Economic Freedom" achievement rate against a pre-set monthly goal of 3 million KRW, using a progress bar.

### **Code & Architecture:**
*   **Component-Based Structure:** The application is broken down into logical components (`App.tsx`, `Calculator.tsx`).
*   **Service Abstraction:** API call logic is separated into dedicated service files (`src/services/gemini.ts`, `src/services/finnhub.ts`) for better maintainability.
*   **Asynchronous Operations:** `async/await` and `Promise.all` are used to handle API calls efficiently, fetching data in parallel to improve load times.
*   **Secure API Key Management:** API keys are stored in a `.env` file, which is excluded from version control via `.gitignore` to maintain security.
