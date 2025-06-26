# React Native AI Chat App Setup

This is the React Native version of the AI Chat web application.

## Prerequisites

- Node.js 18+ 
- React Native development environment set up
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

## Installation

1. **Install dependencies:**
```bash
cd ProvitApp
npm install
```

2. **Install iOS pods (iOS only):**
```bash
cd ios
pod install
cd ..
```

3. **Install additional native dependencies:**

For Android, you'll need to configure the following in `android/settings.gradle`:
```gradle
include ':react-native-linear-gradient'
project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
```

## Running the App

### Android
```bash
npm run android
# or
npx react-native run-android
```

### iOS
```bash
npm run ios  
# or
npx react-native run-ios
```

## Features

- 🤖 **Two Chat Modes**: Convince AI and Prove Human
- 💬 **Real-time Chat**: Interactive conversations with AI responses
- 📱 **Mobile Optimized**: Native mobile UI with smooth animations
- 💾 **Local Storage**: Chat history saved locally using AsyncStorage
- 🎨 **Beautiful UI**: Dark theme with gradient effects and animations
- 🔍 **Search & Filter**: Find specific chats easily
- 🗑️ **Chat Management**: Create, delete, and organize conversations

## App Structure

```
src/
├── components/           # React Native components
│   ├── Homepage.tsx      # Landing page with mode selection
│   ├── Header.tsx        # App header with navigation
│   ├── ChatContainer.tsx # Main chat interface
│   ├── ChatMessage.tsx   # Individual message component
│   ├── ChatInput.tsx     # Message input with animations
│   └── ChatSidebar.tsx   # Chat history sidebar (modal)
├── hooks/
│   └── useChat.ts        # Chat state management hook
├── services/
│   ├── chatStorage.ts    # AsyncStorage service
│   └── openai.ts         # Mock AI service (replace with real API)
└── types/
    └── chat.ts           # TypeScript type definitions
```

## Notes

- The app currently uses mock AI responses
- Replace the OpenAI service with real API calls to your backend
- All chat data is stored locally on the device
- The UI is optimized for mobile with touch-friendly interactions

## Troubleshooting

- If you encounter dependency issues, try `npm install --legacy-peer-deps`
- For iOS build issues, clean the build folder in Xcode
- For Android issues, clean the project with `cd android && ./gradlew clean`
