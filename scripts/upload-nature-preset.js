// Script to upload Nature vocabulary preset to Firebase
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

// Nature vocabulary preset data
const naturePreset = {
  id: 'nature-oxford-021',
  name: '[The3000Oxford]-21.Nature',
  description: 'Essential vocabulary for nature and environment',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'nature',
      translation: 'thiên nhiên',
      pronunciation: '/ˈneɪtʃər/',
      example: '',
    },
    { word: 'tree', translation: 'cây', pronunciation: '/triː/', example: '' },
    {
      word: 'flower',
      translation: 'hoa',
      pronunciation: '/ˈflaʊər/',
      example: '',
    },
    { word: 'grass', translation: 'cỏ', pronunciation: '/ɡræs/', example: '' },
    { word: 'leaf', translation: 'lá', pronunciation: '/liːf/', example: '' },
    {
      word: 'branch',
      translation: 'cành',
      pronunciation: '/bræntʃ/',
      example: '',
    },
    { word: 'root', translation: 'rễ', pronunciation: '/ruːt/', example: '' },
    {
      word: 'forest',
      translation: 'rừng',
      pronunciation: '/ˈfɔːrəst/',
      example: '',
    },
    {
      word: 'mountain',
      translation: 'núi',
      pronunciation: '/ˈmaʊntən/',
      example: '',
    },
    {
      word: 'river',
      translation: 'sông',
      pronunciation: '/ˈrɪvər/',
      example: '',
    },
    { word: 'lake', translation: 'hồ', pronunciation: '/leɪk/', example: '' },
    {
      word: 'ocean',
      translation: 'đại dương',
      pronunciation: '/ˈoʊʃən/',
      example: '',
    },
    { word: 'sea', translation: 'biển', pronunciation: '/siː/', example: '' },
    {
      word: 'beach',
      translation: 'bãi biển',
      pronunciation: '/biːtʃ/',
      example: '',
    },
    {
      word: 'desert',
      translation: 'sa mạc',
      pronunciation: '/ˈdezərt/',
      example: '',
    },
    {
      word: 'island',
      translation: 'đảo',
      pronunciation: '/ˈaɪlənd/',
      example: '',
    },
    {
      word: 'valley',
      translation: 'thung lũng',
      pronunciation: '/ˈvæli/',
      example: '',
    },
    { word: 'hill', translation: 'đồi', pronunciation: '/hɪl/', example: '' },
    { word: 'rock', translation: 'đá', pronunciation: '/rɑːk/', example: '' },
    { word: 'stone', translation: 'đá', pronunciation: '/stoʊn/', example: '' },
    { word: 'sand', translation: 'cát', pronunciation: '/sænd/', example: '' },
    { word: 'soil', translation: 'đất', pronunciation: '/sɔɪl/', example: '' },
    {
      word: 'earth',
      translation: 'trái đất',
      pronunciation: '/ɜːrθ/',
      example: '',
    },
    {
      word: 'sky',
      translation: 'bầu trời',
      pronunciation: '/skaɪ/',
      example: '',
    },
    {
      word: 'cloud',
      translation: 'mây',
      pronunciation: '/klaʊd/',
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

async function uploadNaturePreset() {
  try {
    console.log('Starting to upload Nature preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(naturePreset);
    const words = naturePreset.words.map(convertToPublicVocabularyWord);

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

uploadNaturePreset();

