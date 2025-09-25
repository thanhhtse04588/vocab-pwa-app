// Script to upload Entertainment vocabulary preset to Firebase
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

// Entertainment vocabulary preset data
const entertainmentPreset = {
  id: 'entertainment-oxford-020',
  name: '[The3000Oxford]-20.Entertainment',
  description: 'Essential vocabulary for entertainment and leisure',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'entertainment',
      translation: 'giải trí',
      pronunciation: '/ˌentərˈteɪnmənt/',
      example: '',
    },
    {
      word: 'movie',
      translation: 'phim',
      pronunciation: '/ˈmuːvi/',
      example: '',
    },
    { word: 'film', translation: 'phim', pronunciation: '/fɪlm/', example: '' },
    {
      word: 'cinema',
      translation: 'rạp chiếu phim',
      pronunciation: '/ˈsɪnəmə/',
      example: '',
    },
    {
      word: 'theater',
      translation: 'nhà hát',
      pronunciation: '/ˈθiːətər/',
      example: '',
    },
    {
      word: 'concert',
      translation: 'buổi hòa nhạc',
      pronunciation: '/ˈkɑːnsərt/',
      example: '',
    },
    {
      word: 'music',
      translation: 'âm nhạc',
      pronunciation: '/ˈmjuːzɪk/',
      example: '',
    },
    {
      word: 'song',
      translation: 'bài hát',
      pronunciation: '/sɔːŋ/',
      example: '',
    },
    {
      word: 'dance',
      translation: 'nhảy',
      pronunciation: '/dæns/',
      example: '',
    },
    {
      word: 'party',
      translation: 'bữa tiệc',
      pronunciation: '/ˈpɑːrti/',
      example: '',
    },
    {
      word: 'game',
      translation: 'trò chơi',
      pronunciation: '/ɡeɪm/',
      example: '',
    },
    { word: 'book', translation: 'sách', pronunciation: '/bʊk/', example: '' },
    {
      word: 'magazine',
      translation: 'tạp chí',
      pronunciation: '/ˌmæɡəˈziːn/',
      example: '',
    },
    {
      word: 'newspaper',
      translation: 'báo',
      pronunciation: '/ˈnuːzpeɪpər/',
      example: '',
    },
    {
      word: 'television',
      translation: 'tivi',
      pronunciation: '/ˈteləvɪʒən/',
      example: '',
    },
    {
      word: 'tv',
      translation: 'tivi',
      pronunciation: '/ˈtiːˈviː/',
      example: '',
    },
    {
      word: 'radio',
      translation: 'radio',
      pronunciation: '/ˈreɪdioʊ/',
      example: '',
    },
    {
      word: 'internet',
      translation: 'internet',
      pronunciation: '/ˈɪntərnet/',
      example: '',
    },
    {
      word: 'video',
      translation: 'video',
      pronunciation: '/ˈvɪdioʊ/',
      example: '',
    },
    {
      word: 'photo',
      translation: 'ảnh',
      pronunciation: '/ˈfoʊtoʊ/',
      example: '',
    },
    {
      word: 'picture',
      translation: 'hình ảnh',
      pronunciation: '/ˈpɪktʃər/',
      example: '',
    },
    {
      word: 'camera',
      translation: 'máy ảnh',
      pronunciation: '/ˈkæmərə/',
      example: '',
    },
    { word: 'fun', translation: 'vui vẻ', pronunciation: '/fʌn/', example: '' },
    {
      word: 'hobby',
      translation: 'sở thích',
      pronunciation: '/ˈhɑːbi/',
      example: '',
    },
    {
      word: 'leisure',
      translation: 'thời gian rảnh',
      pronunciation: '/ˈliːʒər/',
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

async function uploadEntertainmentPreset() {
  try {
    console.log('Starting to upload Entertainment preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(entertainmentPreset);
    const words = entertainmentPreset.words.map(convertToPublicVocabularyWord);

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

uploadEntertainmentPreset();

