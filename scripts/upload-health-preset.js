// Script to upload Health & Medicine vocabulary preset to Firebase
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

// Health & Medicine vocabulary preset data
const healthPreset = {
  id: 'health-oxford-016',
  name: '[The3000Oxford]-16.Health & Medicine',
  description: 'Essential vocabulary for health and medicine',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'health',
      translation: 'sức khỏe',
      pronunciation: '/helθ/',
      example: '',
    },
    {
      word: 'medicine',
      translation: 'thuốc',
      pronunciation: '/ˈmedəsən/',
      example: '',
    },
    {
      word: 'doctor',
      translation: 'bác sĩ',
      pronunciation: '/ˈdɑːktər/',
      example: '',
    },
    {
      word: 'nurse',
      translation: 'y tá',
      pronunciation: '/nɜːrs/',
      example: '',
    },
    {
      word: 'hospital',
      translation: 'bệnh viện',
      pronunciation: '/ˈhɑːspɪtəl/',
      example: '',
    },
    {
      word: 'clinic',
      translation: 'phòng khám',
      pronunciation: '/ˈklɪnɪk/',
      example: '',
    },
    {
      word: 'pharmacy',
      translation: 'hiệu thuốc',
      pronunciation: '/ˈfɑːrməsi/',
      example: '',
    },
    {
      word: 'patient',
      translation: 'bệnh nhân',
      pronunciation: '/ˈpeɪʃənt/',
      example: '',
    },
    { word: 'sick', translation: 'ốm', pronunciation: '/sɪk/', example: '' },
    { word: 'ill', translation: 'ốm', pronunciation: '/ɪl/', example: '' },
    {
      word: 'healthy',
      translation: 'khỏe mạnh',
      pronunciation: '/ˈhelθi/',
      example: '',
    },
    { word: 'pain', translation: 'đau', pronunciation: '/peɪn/', example: '' },
    {
      word: 'fever',
      translation: 'sốt',
      pronunciation: '/ˈfiːvər/',
      example: '',
    },
    {
      word: 'cold',
      translation: 'cảm lạnh',
      pronunciation: '/koʊld/',
      example: '',
    },
    { word: 'flu', translation: 'cúm', pronunciation: '/fluː/', example: '' },
    {
      word: 'headache',
      translation: 'đau đầu',
      pronunciation: '/ˈhedeɪk/',
      example: '',
    },
    {
      word: 'stomachache',
      translation: 'đau bụng',
      pronunciation: '/ˈstʌməkeɪk/',
      example: '',
    },
    {
      word: 'toothache',
      translation: 'đau răng',
      pronunciation: '/ˈtuːθeɪk/',
      example: '',
    },
    { word: 'cough', translation: 'ho', pronunciation: '/kɔːf/', example: '' },
    {
      word: 'sneeze',
      translation: 'hắt hơi',
      pronunciation: '/sniːz/',
      example: '',
    },
    {
      word: 'bandage',
      translation: 'băng',
      pronunciation: '/ˈbændɪdʒ/',
      example: '',
    },
    {
      word: 'pill',
      translation: 'viên thuốc',
      pronunciation: '/pɪl/',
      example: '',
    },
    {
      word: 'tablet',
      translation: 'viên thuốc',
      pronunciation: '/ˈtæblət/',
      example: '',
    },
    {
      word: 'injection',
      translation: 'tiêm',
      pronunciation: '/ɪnˈdʒekʃən/',
      example: '',
    },
    {
      word: 'surgery',
      translation: 'phẫu thuật',
      pronunciation: '/ˈsɜːrdʒəri/',
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

async function uploadHealthPreset() {
  try {
    console.log('Starting to upload Health & Medicine preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(healthPreset);
    const words = healthPreset.words.map(convertToPublicVocabularyWord);

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

uploadHealthPreset();

