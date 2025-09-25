// Script to upload Technology vocabulary preset to Firebase
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

// Technology vocabulary preset data
const technologyPreset = {
  id: 'technology-oxford-017',
  name: '[The3000Oxford]-17.Technology',
  description: 'Essential vocabulary for technology and computers',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'computer',
      translation: 'máy tính',
      pronunciation: '/kəmˈpjuːtər/',
      example: '',
    },
    {
      word: 'laptop',
      translation: 'máy tính xách tay',
      pronunciation: '/ˈlæptɑːp/',
      example: '',
    },
    {
      word: 'phone',
      translation: 'điện thoại',
      pronunciation: '/foʊn/',
      example: '',
    },
    {
      word: 'smartphone',
      translation: 'điện thoại thông minh',
      pronunciation: '/ˈsmɑːrtfoʊn/',
      example: '',
    },
    {
      word: 'tablet',
      translation: 'máy tính bảng',
      pronunciation: '/ˈtæblət/',
      example: '',
    },
    {
      word: 'internet',
      translation: 'internet',
      pronunciation: '/ˈɪntərnet/',
      example: '',
    },
    {
      word: 'website',
      translation: 'trang web',
      pronunciation: '/ˈwebsaɪt/',
      example: '',
    },
    {
      word: 'email',
      translation: 'email',
      pronunciation: '/ˈiːmeɪl/',
      example: '',
    },
    {
      word: 'password',
      translation: 'mật khẩu',
      pronunciation: '/ˈpæswɜːrd/',
      example: '',
    },
    {
      word: 'software',
      translation: 'phần mềm',
      pronunciation: '/ˈsɔːftwer/',
      example: '',
    },
    {
      word: 'hardware',
      translation: 'phần cứng',
      pronunciation: '/ˈhɑːrdwer/',
      example: '',
    },
    {
      word: 'keyboard',
      translation: 'bàn phím',
      pronunciation: '/ˈkiːbɔːrd/',
      example: '',
    },
    {
      word: 'mouse',
      translation: 'chuột',
      pronunciation: '/maʊs/',
      example: '',
    },
    {
      word: 'screen',
      translation: 'màn hình',
      pronunciation: '/skriːn/',
      example: '',
    },
    {
      word: 'monitor',
      translation: 'màn hình',
      pronunciation: '/ˈmɑːnətər/',
      example: '',
    },
    {
      word: 'printer',
      translation: 'máy in',
      pronunciation: '/ˈprɪntər/',
      example: '',
    },
    {
      word: 'camera',
      translation: 'máy ảnh',
      pronunciation: '/ˈkæmərə/',
      example: '',
    },
    {
      word: 'microphone',
      translation: 'micro',
      pronunciation: '/ˈmaɪkrəfoʊn/',
      example: '',
    },
    {
      word: 'speaker',
      translation: 'loa',
      pronunciation: '/ˈspiːkər/',
      example: '',
    },
    {
      word: 'headphones',
      translation: 'tai nghe',
      pronunciation: '/ˈhedfoʊnz/',
      example: '',
    },
    {
      word: 'battery',
      translation: 'pin',
      pronunciation: '/ˈbætəri/',
      example: '',
    },
    {
      word: 'charger',
      translation: 'sạc',
      pronunciation: '/ˈtʃɑːrdʒər/',
      example: '',
    },
    {
      word: 'cable',
      translation: 'cáp',
      pronunciation: '/ˈkeɪbəl/',
      example: '',
    },
    {
      word: 'wifi',
      translation: 'wifi',
      pronunciation: '/ˈwaɪfaɪ/',
      example: '',
    },
    {
      word: 'bluetooth',
      translation: 'bluetooth',
      pronunciation: '/ˈbluːtuːθ/',
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

async function uploadTechnologyPreset() {
  try {
    console.log('Starting to upload Technology preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(technologyPreset);
    const words = technologyPreset.words.map(convertToPublicVocabularyWord);

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

uploadTechnologyPreset();

