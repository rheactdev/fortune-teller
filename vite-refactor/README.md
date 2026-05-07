# 🔮 Audentus: The Mystical Crystal Ball

A modern, high-fidelity fortune-telling web application built with **Vite**, **Lottie animations**, and **tsParticles**. Audentus provides a premium, interactive experience for those seeking answers from the cosmos.

## ✨ Features

- **Interactive Mystical Orb**: A beautifully rendered SVG orb with dynamic gradients and Lottie-powered cloud/sparkle layers.
- **True Randomness**: Integrated with the **Random.org API** to fetch integers for truly unbiased destiny (falls back to browser `crypto` if needed).
- **Strict Mode**: A toggleable feature that filters out ambiguous "maybe" answers, providing only binary "Yes" or "No" outcomes.
- **Immersive Effects**:
  - **tsParticles**: A dynamic starfield background that reacts to hover.
  - **Lottie Animations**: High-quality vector animations for sparkles and cosmic mists.
  - **Dynamic Color States**: The orb's color and glow change dynamically based on the answer's category (Green for Yes, Red for No, Gold for Maybe).
- **Responsive Design**: A premium dark-mode interface that feels alive with micro-animations and smooth transitions.

## 🛠️ Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animations**: [Lottie-web](https://github.com/airbnb/lottie-web)
- **Particles**: [tsParticles](https://particles.js.org/)
- **Randomness**: [Random.org API](https://www.random.org/)
- **Styling**: Modern CSS with glassmorphism and custom gradients.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended)

### Installation

1. Clone the repository.
2. Navigate to the project directory:
   ```bash
   cd vite-refactor
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Configuration

Create a `.env` file in the `vite-refactor` directory and add your Random.org API key:

```env
VITE_RANDOM_ORG_API_KEY=your_api_key_here
```

*Note: If no API key is provided, the app will fall back to secure browser randomness.*

### Development

Start the development server:

```bash
pnpm dev
```

### Build

Create a production-ready bundle:

```bash
pnpm build
```

## 🌌 How it Works

1. **Ask a Question**: Type your question into the mystical input or simply tap the orb.
2. **Cosmic Calculation**: The app sends a request to Random.org (or uses `window.crypto` for fallback) to select an answer from the cosmic pool.
3. **The Reveal**: The orb shakes, colors shift, and your fate is displayed with a "question echo" to remind you of your query.

---

*“The stars incline, but do not bind.”*
