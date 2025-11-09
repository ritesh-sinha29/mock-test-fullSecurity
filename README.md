# 🎯 Mock Test Platform - Next.js

A secure, AI-powered mock test platform with comprehensive anti-cheat features built with Next.js 16, React 19, TypeScript, and LangChain.

## ✨ Features

### 🧠 AI-Powered Question Generation
- Dynamic question generation using Groq LLM (Llama 3.1 8B)
- Career-specific questions tailored to selected path
- **10 questions total:** 4 Beginner → 3 Intermediate → 3 Advanced
- **Dynamic timer:** 30s (Beginner), 45s (Intermediate), 60s (Advanced)
- **Unique questions every time** - Session-based generation with seed variation
- Web-enhanced context via Tavily API

### 🛡️ Anti-Cheat System
1. **Fullscreen Enforcement** - Auto-enters fullscreen, 2 exit attempts = auto-submit
2. **Tab Switching Prevention** - Detects tab changes, immediate auto-submit
3. **Back Navigation Blocking** - Prevents browser back button during quiz
4. **Career Path Watermark** - Multi-layer background watermark
5. **Cursor Confinement** - Restricts cursor to test area
6. **Screenshot Detection** - Detects PrintScreen, Snipping Tool, etc.
7. **Clipboard Monitoring** - Blocks copy/paste, periodic clearing
8. **Browser Lockdown** - Disables DevTools, right-click, shortcuts, F5 refresh
9. **Safe Exam Browser** - Optional SEB requirement
10. **Mouse Tracking** - Monitors inactivity and edge camping
11. **Multiple Tab Prevention** - BroadcastChannel detection

### 🎨 UI/UX
- Beautiful gradient backgrounds
- Smooth animations with Framer Motion
- Responsive design (mobile-friendly)
- Real-time timer and progress tracking
- Detailed results page with question review

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create .env.local file and add:
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key  # Optional

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### Required: GROQ API Key
1. Visit [console.groq.com](https://console.groq.com/)
2. Sign up (free)
3. Create API key
4. Add to `.env.local`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   ```

### Optional: Tavily API Key
1. Visit [tavily.com](https://tavily.com/)
2. Get API key
3. Add to `.env.local`:
   ```env
   TAVILY_API_KEY=tvly_your_key_here
   ```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── generate-questions/  # Question generation endpoint
│   │   └── proctor/events/      # Proctoring event logging
│   ├── quiz/                    # Quiz page
│   └── results/                 # Results page
├── components/
│   ├── Watermark.tsx           # Background watermark
│   └── SEBBlockScreen.tsx      # SEB requirement screen
├── hooks/
│   └── useProctoring.ts        # Proctoring integration hook
├── lib/
│   ├── store.ts                # Zustand state management
│   ├── proctoring.ts           # Proctoring utilities
│   ├── questionPipeline.ts     # LLM question generation
│   └── searchService.ts        # Web search integration
└── .env.local                  # Environment variables (create this)
```

## 🎮 Usage

1. **Select Career Path** - Choose from available career options
2. **Start Quiz** - Enters fullscreen automatically
3. **Answer Questions** - 10 questions with progressive difficulty
4. **View Results** - Detailed score and question review

### Quiz Rules
- Fullscreen required throughout
- Timed questions (30s/45s/60s based on difficulty)
- No tab switching allowed (immediate auto-submit)
- No back navigation allowed during quiz
- Copy/paste disabled
- Browser refresh blocked
- 2 violation attempts before auto-submit (for most violations)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **State:** Zustand
- **AI:** LangChain, Groq (Llama 3.1 8B)
- **Search:** Tavily API
- **Icons:** Lucide React
- **Language:** TypeScript

## 📊 Proctoring Configuration

```typescript
// lib/store.ts - Default config
proctorConfig: {
  requireSEB: false,
  enableWatermark: true,
  enableScreenshotDetection: true,
  enableClipboardMonitoring: true,
  enableMouseTracking: true,
  enableMultiTabPrevention: true,
}
```

Customize via `setProctorConfig()` in your code.

## 🧪 Testing

```bash
# Build for production
pnpm build

# Run production server
pnpm start

# Lint code
pnpm lint
```

## 🔒 Security Features

### Best-Effort Approach
All anti-cheat measures acknowledge browser security restrictions:
- Cannot fully prevent screenshots (browser limitation)
- Cannot guarantee clipboard clearing (requires permissions)
- Cannot force SEB usage (user can modify user agent)
- Cannot prevent all DevTools access (browser menus remain)

### Multi-Layer Defense
1. Visual deterrents (watermark)
2. Audit trail (event logging)
3. Behavior monitoring (pattern detection)
4. Automatic enforcement (auto-submit on violations)

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Groq LLM API key for question generation |
| `TAVILY_API_KEY` | ⚠️ Optional | Web search API for enhanced context |

## 🚨 Troubleshooting

### Quiz Not Generating
- Check `GROQ_API_KEY` is set in `.env.local`
- Restart dev server after adding keys
- Check browser console for errors

### Fullscreen Issues
- Browser must support Fullscreen API
- User must interact with page first (security requirement)

### Watermark Not Visible
- Check `proctorConfig.enableWatermark` is `true`
- Verify career path is selected

## 📄 License

MIT License - Use at your own risk. Best-effort security only.

## 🤝 Contributing

Contributions welcome! Please ensure:
- TypeScript types are correct
- Code follows existing patterns
- Security features maintain best-effort approach

## 📞 Support

For issues or questions, please check:
1. This README
2. Browser console for errors
3. Terminal for API errors
4. Environment variables are set correctly

---

**Built with ❤️ using Next.js 16 + React 19 + TypeScript**
