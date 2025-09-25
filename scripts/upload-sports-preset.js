// Script to upload Sports vocabulary preset to Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBua6fbO18kF-HlRADcuXwSPOz_OAQTLGg',
  authDomain: 'bee-vocab.firebaseapp.com',
  projectId: 'bee-vocab',
  storageBucket: 'bee-vocab.firebasestorage.app',
  messagingSenderId: '946342810871',
  appId: '1:946342810871:web:a8e12034bae521e05c6ff2',
  measurementId: 'G-9HG6TBJ8X8',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sports vocabulary preset data
const sportsPreset = {
  id: 'sports-oxford-015',
  name: '[The3000Oxford]-15.Sports',
  description: 'Essential vocabulary for sports and games',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'sport',
      translation: 'thể thao',
      pronunciation: '/spɔːrt/',
      example: '',
    },
    {
      word: 'game',
      translation: 'trò chơi',
      pronunciation: '/ɡeɪm/',
      example: '',
    },
    {
      word: 'football',
      translation: 'bóng đá',
      pronunciation: '/ˈfʊtbɔːl/',
      example: '',
    },
    {
      word: 'soccer',
      translation: 'bóng đá',
      pronunciation: '/ˈsɑːkər/',
      example: '',
    },
    {
      word: 'basketball',
      translation: 'bóng rổ',
      pronunciation: '/ˈbæskətbɔːl/',
      example: '',
    },
    {
      word: 'tennis',
      translation: 'quần vợt',
      pronunciation: '/ˈtenəs/',
      example: '',
    },
    {
      word: 'volleyball',
      translation: 'bóng chuyền',
      pronunciation: '/ˈvɑːlibɔːl/',
      example: '',
    },
    {
      word: 'baseball',
      translation: 'bóng chày',
      pronunciation: '/ˈbeɪsbɔːl/',
      example: '',
    },
    {
      word: 'swimming',
      translation: 'bơi lội',
      pronunciation: '/ˈswɪmɪŋ/',
      example: '',
    },
    {
      word: 'running',
      translation: 'chạy bộ',
      pronunciation: '/ˈrʌnɪŋ/',
      example: '',
    },
    {
      word: 'cycling',
      translation: 'đạp xe',
      pronunciation: '/ˈsaɪklɪŋ/',
      example: '',
    },
    {
      word: 'boxing',
      translation: 'quyền anh',
      pronunciation: '/ˈbɑːksɪŋ/',
      example: '',
    },
    {
      word: 'golf',
      translation: 'golf',
      pronunciation: '/ɡɑːlf/',
      example: '',
    },
    {
      word: 'hockey',
      translation: 'khúc côn cầu',
      pronunciation: '/ˈhɑːki/',
      example: '',
    },
    {
      word: 'rugby',
      translation: 'bóng bầu dục',
      pronunciation: '/ˈrʌɡbi/',
      example: '',
    },
    {
      word: 'cricket',
      translation: 'cricket',
      pronunciation: '/ˈkrɪkət/',
      example: '',
    },
    {
      word: 'badminton',
      translation: 'cầu lông',
      pronunciation: '/ˈbædmɪntən/',
      example: '',
    },
    {
      word: 'table tennis',
      translation: 'bóng bàn',
      pronunciation: '/ˈteɪbəl ˈtenəs/',
      example: '',
    },
    {
      word: 'gymnastics',
      translation: 'thể dục dụng cụ',
      pronunciation: '/dʒɪmˈnæstɪks/',
      example: '',
    },
    {
      word: 'athletics',
      translation: 'điền kinh',
      pronunciation: '/æθˈletɪks/',
      example: '',
    },
    {
      word: 'marathon',
      translation: 'marathon',
      pronunciation: '/ˈmærəθɑːn/',
      example: '',
    },
    {
      word: 'player',
      translation: 'cầu thủ',
      pronunciation: '/ˈpleɪər/',
      example: '',
    },
    { word: 'team', translation: 'đội', pronunciation: '/tiːm/', example: '' },
    {
      word: 'match',
      translation: 'trận đấu',
      pronunciation: '/mætʃ/',
      example: '',
    },
    {
      word: 'competition',
      translation: 'cuộc thi',
      pronunciation: '/ˌkɑːmpəˈtɪʃən/',
      example: '',
    },
  ],
};

// Function to convert word data to PublicVocabularySetData format
function convertToPublicVocabularyWord(wordData) {
  return {
    word: wordData.word,
    meaning: wordData.translation,
    pronunciation: wordData.pronunciation,
    example: wordData.example,
  };
}

// Function to convert set data to PublicVocabularySetMeta format
function convertToPublicVocabularySetMeta(setData) {
  return {
    name: setData.name,
    wordLanguage: setData.wordLanguage,
    meaningLanguage: setData.meaningLanguage,
    wordCount: setData.words.length,
    createdAt: setData.createdAt,
  };
}

async function uploadSportsPreset() {
  try {
    console.log('Starting to upload Sports preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(sportsPreset);
    const words = sportsPreset.words.map(convertToPublicVocabularyWord);

    const publicSetData = {
      set: setMeta,
      words: words,
      publisherId: 'system',
      publisherName: 'BeeVocab Team',
      publishedAt: new Date().toISOString(),
    };

    const setDocRef = await addDoc(
      collection(db, 'publicVocabularySets'),
      publicSetData
    );

    console.log(`✅ Successfully uploaded preset "${setMeta.name}"`);
    console.log(`📝 Document ID: ${setDocRef.id}`);
    console.log(`📚 Total words: ${words.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadSportsPreset();

