// Script to upload House & Home vocabulary preset to Firebase
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

// House & Home vocabulary preset data
const housePreset = {
  id: 'house-oxford-012',
  name: '[The3000Oxford]-12.House & Home',
  description: 'Essential vocabulary for house and home',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    { word: 'house', translation: 'nhà', pronunciation: '/haʊs/', example: '' },
    { word: 'home', translation: 'nhà', pronunciation: '/hoʊm/', example: '' },
    {
      word: 'room',
      translation: 'phòng',
      pronunciation: '/ruːm/',
      example: '',
    },
    {
      word: 'bedroom',
      translation: 'phòng ngủ',
      pronunciation: '/ˈbedruːm/',
      example: '',
    },
    {
      word: 'bathroom',
      translation: 'phòng tắm',
      pronunciation: '/ˈbæθruːm/',
      example: '',
    },
    {
      word: 'kitchen',
      translation: 'bếp',
      pronunciation: '/ˈkɪtʃən/',
      example: '',
    },
    {
      word: 'living room',
      translation: 'phòng khách',
      pronunciation: '/ˈlɪvɪŋ ruːm/',
      example: '',
    },
    {
      word: 'dining room',
      translation: 'phòng ăn',
      pronunciation: '/ˈdaɪnɪŋ ruːm/',
      example: '',
    },
    {
      word: 'garage',
      translation: 'nhà để xe',
      pronunciation: '/ɡəˈrɑːʒ/',
      example: '',
    },
    {
      word: 'garden',
      translation: 'vườn',
      pronunciation: '/ˈɡɑːrdən/',
      example: '',
    },
    { word: 'yard', translation: 'sân', pronunciation: '/jɑːrd/', example: '' },
    { word: 'door', translation: 'cửa', pronunciation: '/dɔːr/', example: '' },
    {
      word: 'window',
      translation: 'cửa sổ',
      pronunciation: '/ˈwɪndoʊ/',
      example: '',
    },
    {
      word: 'wall',
      translation: 'tường',
      pronunciation: '/wɔːl/',
      example: '',
    },
    {
      word: 'floor',
      translation: 'sàn nhà',
      pronunciation: '/flɔːr/',
      example: '',
    },
    {
      word: 'ceiling',
      translation: 'trần nhà',
      pronunciation: '/ˈsiːlɪŋ/',
      example: '',
    },
    {
      word: 'roof',
      translation: 'mái nhà',
      pronunciation: '/ruːf/',
      example: '',
    },
    {
      word: 'stairs',
      translation: 'cầu thang',
      pronunciation: '/sterz/',
      example: '',
    },
    {
      word: 'elevator',
      translation: 'thang máy',
      pronunciation: '/ˈeləveɪtər/',
      example: '',
    },
    {
      word: 'furniture',
      translation: 'đồ nội thất',
      pronunciation: '/ˈfɜːrnɪtʃər/',
      example: '',
    },
    { word: 'bed', translation: 'giường', pronunciation: '/bed/', example: '' },
    {
      word: 'table',
      translation: 'bàn',
      pronunciation: '/ˈteɪbəl/',
      example: '',
    },
    { word: 'chair', translation: 'ghế', pronunciation: '/tʃer/', example: '' },
    {
      word: 'sofa',
      translation: 'ghế sofa',
      pronunciation: '/ˈsoʊfə/',
      example: '',
    },
    {
      word: 'refrigerator',
      translation: 'tủ lạnh',
      pronunciation: '/rɪˈfrɪdʒəreɪtər/',
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

async function uploadHousePreset() {
  try {
    console.log('Starting to upload House & Home preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(housePreset);
    const words = housePreset.words.map(convertToPublicVocabularyWord);

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

uploadHousePreset();

