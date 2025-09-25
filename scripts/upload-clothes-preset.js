// Script to upload Clothes vocabulary preset to Firebase
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

// Clothes vocabulary preset data
const clothesPreset = {
  id: 'clothes-oxford-011',
  name: '[The3000Oxford]-11.Clothes',
  description: 'Essential vocabulary for clothing and fashion',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'clothes',
      translation: 'quần áo',
      pronunciation: '/kloʊðz/',
      example: '',
    },
    {
      word: 'shirt',
      translation: 'áo sơ mi',
      pronunciation: '/ʃɜːrt/',
      example: '',
    },
    {
      word: 'pants',
      translation: 'quần dài',
      pronunciation: '/pænts/',
      example: '',
    },
    { word: 'dress', translation: 'váy', pronunciation: '/dres/', example: '' },
    {
      word: 'skirt',
      translation: 'váy ngắn',
      pronunciation: '/skɜːrt/',
      example: '',
    },
    {
      word: 'jacket',
      translation: 'áo khoác',
      pronunciation: '/ˈdʒækət/',
      example: '',
    },
    {
      word: 'coat',
      translation: 'áo choàng',
      pronunciation: '/koʊt/',
      example: '',
    },
    {
      word: 'sweater',
      translation: 'áo len',
      pronunciation: '/ˈswetər/',
      example: '',
    },
    {
      word: 't-shirt',
      translation: 'áo phông',
      pronunciation: '/ˈtiː ʃɜːrt/',
      example: '',
    },
    {
      word: 'jeans',
      translation: 'quần jean',
      pronunciation: '/dʒiːnz/',
      example: '',
    },
    {
      word: 'shorts',
      translation: 'quần short',
      pronunciation: '/ʃɔːrts/',
      example: '',
    },
    {
      word: 'suit',
      translation: 'bộ vest',
      pronunciation: '/suːt/',
      example: '',
    },
    { word: 'tie', translation: 'cà vạt', pronunciation: '/taɪ/', example: '' },
    {
      word: 'belt',
      translation: 'thắt lưng',
      pronunciation: '/belt/',
      example: '',
    },
    { word: 'hat', translation: 'mũ', pronunciation: '/hæt/', example: '' },
    {
      word: 'cap',
      translation: 'mũ lưỡi trai',
      pronunciation: '/kæp/',
      example: '',
    },
    {
      word: 'shoes',
      translation: 'giày',
      pronunciation: '/ʃuːz/',
      example: '',
    },
    {
      word: 'sneakers',
      translation: 'giày thể thao',
      pronunciation: '/ˈsniːkərz/',
      example: '',
    },
    {
      word: 'boots',
      translation: 'ủng',
      pronunciation: '/buːts/',
      example: '',
    },
    {
      word: 'sandals',
      translation: 'dép xăng đan',
      pronunciation: '/ˈsændəlz/',
      example: '',
    },
    {
      word: 'socks',
      translation: 'tất',
      pronunciation: '/sɑːks/',
      example: '',
    },
    {
      word: 'underwear',
      translation: 'đồ lót',
      pronunciation: '/ˈʌndərwer/',
      example: '',
    },
    {
      word: 'bra',
      translation: 'áo ngực',
      pronunciation: '/brɑː/',
      example: '',
    },
    {
      word: 'pajamas',
      translation: 'đồ ngủ',
      pronunciation: '/pəˈdʒɑːməz/',
      example: '',
    },
    {
      word: 'uniform',
      translation: 'đồng phục',
      pronunciation: '/ˈjuːnəfɔːrm/',
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

async function uploadClothesPreset() {
  try {
    console.log('Starting to upload Clothes preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(clothesPreset);
    const words = clothesPreset.words.map(convertToPublicVocabularyWord);

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

uploadClothesPreset();

