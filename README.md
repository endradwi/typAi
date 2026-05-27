<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/keyboard.svg" width="60" height="60" alt="TypAI Logo">
  
  # TypAI
  
  **AI-Powered Interactive Typing Practice Application**
  
  TypAI is a modern, personalized "Study Buddy" that helps you master typing in over 180+ languages. Instead of typing the same old static texts, TypAI leverages Google's Gemini AI to dynamically generate fresh, context-aware practice paragraphs on the fly based on your selected language, difficulty, and mode.
</div>

## ✨ Features

- 🤖 **AI-Generated Content:** Practice texts are never repetitive. Using the Gemini API, TypAI generates unique content every time you click "Generate Text".
- 🌍 **Global Language Support:** Practice typing in over 180+ languages globally, powered by the ISO-639-1 standard.
- ⌨️ **Smart Mapping (Auto-Transliteration):** Want to practice Arabic, Russian, Korean, Kazakh, or Spanish but don't want to change your OS keyboard layout? TypAI features a built-in QWERTY keymapper that transliterates your physical keystrokes instantly!
- 🪟 **Premium Glassmorphism UI:** A sleek, modern, dark-themed UI featuring beautiful glassmorphism, dynamic gradients, and micro-animations designed for deep focus and visual pleasure.
- 📊 **Real-time Analytics:** Track your **WPM (Words Per Minute)**, **Accuracy**, and **Errors** in real-time as you type.
- 🎯 **Highly Configurable:** Customize your session length (15s, 30s, 60s, 2m), mode (Words, Quotes, Paragraph), and difficulty (Easy, Medium, Hard).
- 📱 **Interactive Virtual Keyboard:** Provides an on-screen visual guide for supported languages to help you build muscle memory faster.

## 🛠️ Technology Stack

- **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) with custom Glassmorphism utilities
- **AI Integration:** [Google Gemini API](https://deepmind.google/technologies/gemini/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Package Manager:** [Bun](https://bun.sh/)
- **UI Components:** Customized [shadcn-vue](https://www.shadcn-vue.com/)
- **Icons:** [Lucide Vue](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed on your machine. You will also need an API key from Google AI Studio.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/endradwi/typAi.git
   cd typAi
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up Environment Variables**
   Copy the example environment file and fill in your Gemini API Key.
   ```bash
   cp .env.example .env
   ```
   Add your API key inside `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   bun run dev
   ```
   The application will be available at `http://localhost:3000`.

## 💡 How it Works (Smart Mapping)
For specific languages (e.g., Arabic, Russian, Korean, Kazakh, Spanish), TypAI intercepts your physical QWERTY keystrokes and maps them directly into the target language's characters. 

If you select a language like Chinese or Japanese, the Smart Mapping automatically disables itself, as these languages require complex OS-level Input Method Editors (IMEs) to compose characters (e.g., Pinyin or Romaji to Kanji).

---
*Built with ❤️ using Nuxt 3 and Gemini AI.*
