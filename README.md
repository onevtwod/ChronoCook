# ChronoCook

A cross-platform mobile application that allows users to explore historical recipes, learn era-specific cooking techniques, and engage with a community of food history enthusiasts.

## Key Features

- 📜 Time-period categorized recipe library 
- 🕰️ Immersive era-specific UI themes ("Time-Travel Mode")
- 🔍 Modern ingredient substitution suggestions
- 👨‍🍳 Step-by-step cooking instructions with historical context
- ★ Dual-rating system (historical accuracy & flavor)
- 🗨️ Community discussion forums

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS/Android simulator or physical device

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ChronoCook.git

# Navigate to the project directory
cd ChronoCook

# Install dependencies
npm install

# Start the development server
npm start
```

## Project Structure

```
ChronoCook/
├── assets/               # Images, fonts, and other static assets
├── src/
│   ├── api/              # API services and endpoints
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── models/           # TypeScript interfaces and data models
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # App screens
│   ├── services/         # Business logic services
│   ├── theme/            # UI theme configurations
│   └── utils/            # Utility functions
├── App.tsx               # Entry point of the application
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Technologies Used

- React Native / Expo
- TypeScript
- Firebase (Authentication, Firestore)
- AWS S3 (Image Storage)
- Node.js/Express (Backend API)
- MongoDB (Database)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 