# VocabPWA - Vocabulary Learning PWA

A Progressive Web App for vocabulary learning with spaced repetition algorithm, built with React, TypeScript, Evergreen UI, and Redux.

## 🚀 Features

### Core Features
- **Mobile-first UI** with bottom navigation bar
- **Dark / Light mode** with auto theme detection
- **English interface** with internationalization support
- **Offline support** (PWA) with IndexedDB storage
- **Redux** state management with persistence (no React Router)
- **Spaced Repetition System** with 8 memory levels

### Spaced Repetition Schedule
- Level 0: 10 minutes
- Level 1: 15 minutes  
- Level 2: 1 day
- Level 3: 3 days
- Level 4: 1 week
- Level 5: 2 weeks
- Level 6: 1 month
- Level 7: 3 months

### Pages & Functionality

#### 1. Home Page
- Review button showing words to review
- Memory levels distribution chart
- Quick statistics and recent activity

#### 2. Vocabulary Page
- Manage vocabulary sets (create, edit, delete)
- View set details and statistics
- Import/export functionality
- Reset progress for individual sets

#### 3. Learn Page
- Start study sessions with configurable batch sizes
- Interactive learning with immediate feedback
- Progress tracking and session statistics

#### 4. Settings Page
- Batch size configuration
- Notification settings
- Theme selection (light/dark/auto)
- Sound and vibration controls
- Backup and restore data

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: Evergreen UI v7.1.9 (modern React components)
- **State Management**: Redux Toolkit + Redux Persist
- **Database**: Dexie (IndexedDB wrapper)
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin
- **Date Handling**: Day.js

## 🎨 Evergreen UI Setup

The app is built using Evergreen UI components following the official documentation:

### Installation
```bash
npm install evergreen-ui@latest
```

### Configuration
- **Component Import**: Evergreen UI components are imported as needed
- **App Structure**: Clean React component hierarchy with Redux navigation
- **Theming**: Custom theme colors and auto theme detection
- **Mobile Features**: Responsive design and mobile-optimized UI

### Key Features
- Modern React component library
- Consistent design system
- Accessible components
- TypeScript support
- Mobile-responsive design

## 📱 PWA Features

- **Offline Support**: Full functionality without internet
- **Installable**: Can be installed on mobile devices
- **Push Notifications**: Study reminders
- **Background Sync**: Data synchronization
- **Responsive Design**: Works on all screen sizes

## 🗂️ Data Structure

### Core Entities
- **VocabularySet**: Collection of vocabulary words
- **VocabularyWord**: Individual word with memory level
- **StudySession**: Learning session tracking
- **UserProgress**: Overall learning progress
- **UserSettings**: App configuration

### Memory Levels
Each word has a memory level (0-7) that determines review frequency:
- Higher levels = longer intervals between reviews
- Correct answers increase memory level
- Incorrect answers reset to level 0

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vocab-pwa-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Bottom navigation
│   ├── MemoryLevelChart.tsx
│   └── StudySession.tsx
├── pages/              # Main application pages
│   ├── HomePage.tsx
│   ├── VocabularyPage.tsx
│   ├── LearnPage.tsx
│   └── SettingsPage.tsx
├── store/              # Redux store configuration
│   ├── index.ts
│   └── slices/         # Redux slices
├── services/           # External services
│   ├── database.ts     # Dexie database
│   ├── pwaService.ts   # PWA features
│   └── backupService.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── App.tsx             # Main app component
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### PWA Configuration
PWA settings are configured in `vite.config.ts`:
- Service worker registration
- Offline caching strategies
- App manifest settings

## 📊 Data Management

### Database Schema
The app uses Dexie (IndexedDB wrapper) with the following schema:
- **vocabularySets**: Complete vocabulary set information with all required fields
- **vocabularyWords**: Individual words with memory levels and review scheduling
- **studySessions**: Learning session tracking and statistics
- **userProgress**: Overall learning progress and statistics
- **userSettings**: App configuration and preferences

### Database Migration
- Automatic schema migration from version 1 to 2
- Backward compatibility with existing data
- Default values for new fields during migration

### Backup & Restore
- Export all data as JSON
- Import from backup files
- Data validation and error handling

### Offline Storage
- All data stored in IndexedDB
- Automatic synchronization
- Conflict resolution

## 🎨 Theming

The app supports three theme modes managed by Redux:
- **Light**: Traditional light theme with improved contrast
- **Dark**: Enhanced dark theme with user-friendly colors and better readability
- **Auto**: Follows system preference

### Dark Mode Improvements
- **Better Color Palette**: More comfortable dark colors (slate-based) instead of harsh grays
- **Enhanced Contrast**: Improved text readability with proper contrast ratios
- **Smooth Transitions**: Animated theme switching with CSS transitions
- **Interactive Elements**: Custom styled range sliders, buttons, and form elements
- **Theme Toggle**: Beautiful toggle component with icons and animations

### Theme Features
- CSS custom properties for consistent theming
- Automatic theme detection and application
- Smooth transitions between themes
- Mobile-optimized dark mode experience
- Enhanced accessibility in both light and dark modes

Theme state is managed in the navigation slice and automatically applied to the document.

## 🔄 Progress Management

### Reset Progress Feature
The app includes a comprehensive progress reset functionality:

- **Individual Set Reset**: Reset progress for specific vocabulary sets
- **Complete Data Reset**: Resets all learning progress including:
  - Memory levels (all words back to level 0)
  - Study statistics (correct/incorrect counts)
  - Review schedules (next review times reset to 10 minutes)
  - Study session history
- **Confirmation Dialog**: Safety confirmation before reset
- **Immediate Effect**: Changes are applied instantly and reflected in the UI

### What Gets Reset
When you reset progress for a vocabulary set:
- All words return to memory level 0
- Correct and incorrect answer counts are cleared
- Next review times are reset to 10 minutes from now
- All study sessions for that set are deleted
- User progress statistics are removed

### When to Use Reset Progress
- Starting over with a vocabulary set
- Clearing incorrect learning patterns
- Preparing for a fresh study approach
- Testing the spaced repetition system

## 🔔 Notifications

- Daily study reminders
- Configurable notification time
- Action buttons for quick access
- Respects user preferences

## 📱 Mobile Features

- Touch-optimized interface
- Swipe gestures
- Haptic feedback
- Responsive design
- App-like experience
- **iPhone/Safari Compatibility**: Fixed issues with older Safari versions
  - Fallback UUID generation for Safari < 15.4
  - Enhanced error handling and debugging
  - Improved touch targets and mobile UI
  - Better dialog sizing for mobile screens

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ using modern web technologies for an optimal learning experience.