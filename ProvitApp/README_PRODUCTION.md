# 🤖 AI Chat App - Mobile

**The ultimate AI vs Human battle arena in your pocket!**

A React Native mobile app that brings the web-based AI Chat experience to iOS and Android devices. Challenge yourself in two epic modes: convince an AI or prove you're human, with adjustable roast levels from gentle to savage.

## ✨ Features

### 🎯 **Dual Game Modes**
- **🤖 Convince AI**: Try to convince the AI you're right about anything
- **👤 Prove Human**: Prove to the AI that you're actually human

### 🌶️ **Dynamic Roast Levels (1-10)**
- **1-3: Neural Tickle** ⚡ - Gentle cognitive stimulation
- **4-6: Synaptic Burn** 🔥 - Moderate psychological warfare  
- **7-8: Cortex Meltdown** 💀 - Advanced ego destruction
- **9-10: Quantum Annihilation** ☢️ - Reality-bending consciousness obliteration

### 📱 **Mobile-Optimized Features**
- **Responsive UI** - Perfectly adapted for mobile screens
- **Touch-friendly Controls** - Swipe, tap, and slide your way to victory
- **Native Sharing** - Export conversations in multiple formats
- **Offline Storage** - Chat history saved locally
- **Background Sync** - Seamless experience across sessions

### 📤 **Export Options**
- **TXT** - Plain text format for universal compatibility
- **JSON** - Structured data with full metadata
- **PDF** - Beautifully formatted documents
- **Native Share** - Quick sharing to any app

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **React Native development environment**
- **Android Studio** (for Android)
- **Xcode** (for iOS, macOS only)

### Installation

```bash
# Clone and navigate
git clone <repository-url>
cd ProvitApp

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 🏗️ Architecture

### 📁 **Project Structure**
```
ProvitApp/
├── src/
│   ├── components/     # UI components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API and storage services
│   ├── types/         # TypeScript type definitions
│   └── assets/        # Images and static files
├── android/           # Android-specific code
├── ios/              # iOS-specific code
└── package.json      # Dependencies and scripts
```

### 🔧 **Key Technologies**
- **React Native 0.80** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **AsyncStorage** - Local data persistence
- **React Native Slider** - Smooth roast level controls
- **Vector Icons** - Beautiful iconography

## 🎮 How to Play

1. **🏠 Homepage**: Choose your battle mode and set roast level
2. **🎚️ Adjust Intensity**: Use the slider to set how savage the AI should be
3. **💬 Start Chatting**: Engage in witty banter with advanced AI
4. **📊 Track Progress**: View your conversation history
5. **📤 Share Victories**: Export your best conversations

## 🔥 Battle Modes Explained

### 🤖 **Convince AI Mode**
- **Goal**: Convince the AI that your argument is correct
- **Strategy**: Use logic, evidence, and persuasion
- **AI Behavior**: Challenges your points with counterarguments
- **Victory**: AI acknowledges your superior reasoning

### 👤 **Prove Human Mode** 
- **Goal**: Convince the AI that you're a real human
- **Strategy**: Show creativity, emotion, and human quirks
- **AI Behavior**: Tests you with puzzles and human-like challenges
- **Victory**: AI accepts your humanity

## 🌶️ **Roast Level Guide**

| Level | Name | Description | AI Personality |
|-------|------|-------------|----------------|
| 1-2 | Neural Tickle ⚡ | Gentle and encouraging | Friendly teacher |
| 3-4 | Light Warmup 🔥 | Slightly challenging | Witty friend |
| 5-6 | Medium Heat 🌶️ | Balanced difficulty | Sharp debater |
| 7-8 | Spicy Burn 💀 | Aggressive challenges | Sarcastic critic |
| 9-10 | Nuclear Savage ☢️ | Merciless destruction | Ruthless opponent |

## 📱 **Production Features**

### 🔐 **Privacy & Security**
- All conversations stored locally on device
- No cloud storage of sensitive conversations
- Optional anonymous analytics only

### ⚡ **Performance**
- Optimized for smooth 60fps animations
- Minimal memory footprint
- Fast startup times
- Efficient battery usage

### 🌍 **Accessibility**
- Screen reader support
- High contrast mode
- Customizable font sizes
- Touch target optimization

## 🎨 **Customization**

### 🎨 **Theme System**
- Dark mode optimized interface
- Dynamic color schemes based on roast level
- Smooth gradient animations
- Neon glow effects for that cyberpunk vibe

### 🔧 **Settings**
- Adjustable roast level defaults
- Export format preferences
- Notification settings
- Advanced AI parameters

## 📊 **Technical Specs**

- **Minimum iOS**: 12.0+
- **Minimum Android**: API 24 (Android 7.0)
- **Bundle Size**: ~15MB
- **RAM Usage**: ~50MB average
- **Storage**: Conversations stored locally

## 🚀 **Build for Production**

```bash
# Android Release Build
cd android
./gradlew assembleRelease

# iOS Release Build (macOS only)
cd ios
xcodebuild -workspace AIChat.xcworkspace -scheme AIChat -configuration Release
```

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 **Acknowledgments**

- Built with ❤️ for AI enthusiasts
- Inspired by the endless human-AI dialogue
- Powered by cutting-edge language models

---

**Ready to prove your wit against artificial intelligence? Download and start your battle today!** 🤖⚔️👤
