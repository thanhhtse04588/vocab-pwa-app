// Script to upload Transportation vocabulary preset to Firebase
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

// Transportation vocabulary preset data
const transportationPreset = {
  id: 'transportation-oxford-013',
  name: '[The3000Oxford]-13.Transportation',
  description: 'Essential vocabulary for transportation and travel',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    { word: 'car', translation: 'ô tô', pronunciation: '/kɑːr/', example: '' },
    {
      word: 'bus',
      translation: 'xe buýt',
      pronunciation: '/bʌs/',
      example: '',
    },
    {
      word: 'train',
      translation: 'tàu hỏa',
      pronunciation: '/treɪn/',
      example: '',
    },
    {
      word: 'plane',
      translation: 'máy bay',
      pronunciation: '/pleɪn/',
      example: '',
    },
    {
      word: 'airplane',
      translation: 'máy bay',
      pronunciation: '/ˈerpleɪn/',
      example: '',
    },
    {
      word: 'ship',
      translation: 'tàu thủy',
      pronunciation: '/ʃɪp/',
      example: '',
    },
    {
      word: 'boat',
      translation: 'thuyền',
      pronunciation: '/boʊt/',
      example: '',
    },
    {
      word: 'bicycle',
      translation: 'xe đạp',
      pronunciation: '/ˈbaɪsəkəl/',
      example: '',
    },
    {
      word: 'bike',
      translation: 'xe đạp',
      pronunciation: '/baɪk/',
      example: '',
    },
    {
      word: 'motorcycle',
      translation: 'xe máy',
      pronunciation: '/ˈmoʊtərsaɪkəl/',
      example: '',
    },
    {
      word: 'taxi',
      translation: 'taxi',
      pronunciation: '/ˈtæksi/',
      example: '',
    },
    {
      word: 'truck',
      translation: 'xe tải',
      pronunciation: '/trʌk/',
      example: '',
    },
    {
      word: 'van',
      translation: 'xe tải nhỏ',
      pronunciation: '/væn/',
      example: '',
    },
    {
      word: 'subway',
      translation: 'tàu điện ngầm',
      pronunciation: '/ˈsʌbweɪ/',
      example: '',
    },
    {
      word: 'metro',
      translation: 'tàu điện ngầm',
      pronunciation: '/ˈmetroʊ/',
      example: '',
    },
    {
      word: 'helicopter',
      translation: 'trực thăng',
      pronunciation: '/ˈhelɪkɑːptər/',
      example: '',
    },
    {
      word: 'rocket',
      translation: 'tên lửa',
      pronunciation: '/ˈrɑːkət/',
      example: '',
    },
    {
      word: 'driver',
      translation: 'tài xế',
      pronunciation: '/ˈdraɪvər/',
      example: '',
    },
    {
      word: 'passenger',
      translation: 'hành khách',
      pronunciation: '/ˈpæsəndʒər/',
      example: '',
    },
    {
      word: 'ticket',
      translation: 'vé',
      pronunciation: '/ˈtɪkət/',
      example: '',
    },
    {
      word: 'station',
      translation: 'ga',
      pronunciation: '/ˈsteɪʃən/',
      example: '',
    },
    {
      word: 'airport',
      translation: 'sân bay',
      pronunciation: '/ˈerpɔːrt/',
      example: '',
    },
    {
      word: 'port',
      translation: 'cảng',
      pronunciation: '/pɔːrt/',
      example: '',
    },
    {
      word: 'road',
      translation: 'đường',
      pronunciation: '/roʊd/',
      example: '',
    },
    {
      word: 'street',
      translation: 'phố',
      pronunciation: '/striːt/',
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

async function uploadTransportationPreset() {
  try {
    console.log('Starting to upload Transportation preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(transportationPreset);
    const words = transportationPreset.words.map(convertToPublicVocabularyWord);

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

uploadTransportationPreset();

