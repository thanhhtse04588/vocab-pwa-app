# BeeVocab - Vocabulary Learning PWA

A Progressive Web App for vocabulary learning with spaced repetition algorithm, built with React, TypeScript, Evergreen UI, and Redux.

## 🚀 Features

### Core Features
- **Mobile-first UI** with bottom navigation bar
- **Dark / Light mode** with auto theme detection
- **English interface** with internationalization support
- **Offline support** (PWA) with IndexedDB storage
- **Redux** state management with persistence (no React Router)
- **Spaced Repetition System** with 8 memory levels
 - **Storage usage warning**: App estimates IndexedDB usage via `navigator.storage.estimate()` and warns on Home when using ≥ 85% (shows MB used/total). Go to Settings → Data Management to backup and clean up data if needed.

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
- **Database**: Dexie (IndexedDB wrapper) + Firebase Firestore
- **Backend**: Firebase (Firestore, Hosting, Cloud Functions)
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
- Firebase CLI (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bee-vocab-app
```

2. Install dependencies:
```bash
npm install
```

3. **Setup Firebase** (Optional but recommended):
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init
```

4. **Configure environment variables**:
Create `.env.local` file with your Firebase configuration (see Firebase Setup section above).

5. **Add sample data to Firestore** (Optional):
```bash
# Run the seed script to add sample vocabulary sets
node scripts/seed-firestore.js
```

6. Start development server:
```bash
npm run dev
```

7. Build for production:
```bash
npm run build
```

8. Deploy to Firebase:
```bash
firebase deploy
```

9. Preview production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
bee-vocab-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.tsx   # Bottom navigation
│   │   ├── MemoryLevelChart.tsx
│   │   └── StudySession.tsx
│   ├── pages/              # Main application pages
│   │   ├── HomePage.tsx
│   │   ├── VocabularyPage.tsx
│   │   ├── LearnPage.tsx
│   │   └── SettingsPage.tsx
│   ├── store/              # Redux store configuration
│   │   ├── index.ts
│   │   └── slices/         # Redux slices
│   ├── services/           # External services
│   │   ├── database.ts     # Dexie database
│   │   ├── firebaseService.ts # Firebase integration
│   │   ├── pwaService.ts   # PWA features
│   │   └── backupService.ts
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── App.tsx             # Main app component
├── functions/              # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts        # Cloud Functions entry point
│   ├── package.json
│   └── tsconfig.json
├── scripts/                # Utility scripts
│   └── seed-firestore.js   # Firestore data seeding
├── public/                 # Static assets
├── dist/                   # Vite build output (Firebase hosting)
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
├── storage.rules           # Cloud Storage rules
├── .firebaserc             # Firebase project aliases
└── .env.local              # Environment variables (create this)
```

## 🔧 Configuration

## 🔥 Firebase Setup

### Prerequisites
- Node.js 18+
- Firebase CLI installed globally
- Firebase project created

### Installation & Setup

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase project**:
```bash
firebase init
```
Select the following features:
- Firestore: Configure security rules and indexes
- Functions: Configure Cloud Functions (TypeScript)
- Hosting: Configure files for Firebase Hosting
- Storage: Configure security rules for Cloud Storage

4. **Configure environment variables**:
Create a `.env.local` file in the project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. **Deploy Firestore rules**:
```bash
firebase deploy --only firestore:rules
```

### Firebase Features

#### Firestore Database
- **Collection**: `publicVocabularySets`
- **Purpose**: Store preset vocabulary sets for import
- **Security**: Public read access for preset sets

#### Cloud Functions
- **Language**: TypeScript
- **Purpose**: Backend logic and API endpoints
- **Deployment**: `firebase deploy --only functions`

#### Firebase Hosting
- **Public Directory**: `dist` (Vite build output)
- **SPA Configuration**: All routes redirect to `/index.html`
- **Deployment**: `firebase deploy --only hosting`

#### Cloud Storage
- **Purpose**: Store user data backups and media files
- **Security**: User-specific access rules

### Firestore Data Structure

```
publicVocabularySets (collection)
  └── <setId> (document)
        name: string
        description: string
        sourceLanguage: string
        targetLanguage: string
        wordCount: number
        createdAt: string (ISO)
        words: Array<{ 
          word: string
          meaning: string
          pronunciation?: string
          example?: string
        }>
```

### Deployment Commands

```bash
# Deploy everything
firebase deploy

# Deploy specific services
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only functions

# Build and deploy
npm run build && firebase deploy --only hosting
```

### Development Workflow

1. **Start development server**:
```bash
npm run dev
```

2. **Test Firebase connection**:
- Open http://localhost:5173
- Navigate to Vocabulary page
- Try importing preset sets

3. **Deploy to Firebase**:
```bash
npm run build
firebase deploy
```

### Firebase Console
Access your project at: https://console.firebase.google.com/project/bee-vocab-app

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

## 🔧 Troubleshooting

### Common Issues

#### Firebase Connection Issues
- **Problem**: "Missing or insufficient permissions" error
- **Solution**: Ensure Firestore rules are deployed: `firebase deploy --only firestore:rules`

#### Environment Variables Not Loading
- **Problem**: Firebase config not found
- **Solution**: 
  - Ensure `.env.local` file exists in project root
  - Restart development server after adding environment variables
  - Check that variable names start with `VITE_`

#### Build Issues
- **Problem**: Build fails with Firebase errors
- **Solution**: 
  - Ensure all environment variables are set
  - Check Firebase project configuration
  - Verify Firebase CLI is logged in: `firebase login`

#### PWA Not Working
- **Problem**: App doesn't install or work offline
- **Solution**:
  - Ensure HTTPS in production (Firebase Hosting provides this)
  - Check service worker registration
  - Clear browser cache and reload

### Development Tips

1. **Firebase Emulator**: Use Firebase emulators for local development:
```bash
firebase emulators:start
```

2. **Debug Firestore**: Use Firebase Console to monitor database changes

3. **Test PWA Features**: Use Chrome DevTools > Application tab to test PWA functionality

4. **Environment Variables**: Use `.env.local` for local development (not committed to git)

## 📞 Support

For support and questions, please open an issue in the repository.

## 🚀 Live Demo

The app is deployed on Firebase Hosting:
- **URL**: https://bee-vocab-app.web.app
- **Features**: Full PWA functionality with offline support
- **Data**: Sample vocabulary sets available for import

---

Built with ❤️ using modern web technologies for an optimal learning experience.