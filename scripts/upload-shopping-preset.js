// Script to upload Shopping vocabulary preset to Firebase
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

// Shopping vocabulary preset data
const shoppingPreset = {
  id: 'shopping-oxford-019',
  name: '[The3000Oxford]-19.Shopping',
  description: 'Essential vocabulary for shopping and stores',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'shop',
      translation: 'cửa hàng',
      pronunciation: '/ʃɑːp/',
      example: '',
    },
    {
      word: 'store',
      translation: 'cửa hàng',
      pronunciation: '/stɔːr/',
      example: '',
    },
    {
      word: 'market',
      translation: 'chợ',
      pronunciation: '/ˈmɑːrkət/',
      example: '',
    },
    {
      word: 'mall',
      translation: 'trung tâm thương mại',
      pronunciation: '/mɔːl/',
      example: '',
    },
    {
      word: 'supermarket',
      translation: 'siêu thị',
      pronunciation: '/ˈsuːpərmɑːrkət/',
      example: '',
    },
    { word: 'buy', translation: 'mua', pronunciation: '/baɪ/', example: '' },
    { word: 'sell', translation: 'bán', pronunciation: '/sel/', example: '' },
    {
      word: 'price',
      translation: 'giá',
      pronunciation: '/praɪs/',
      example: '',
    },
    {
      word: 'cost',
      translation: 'chi phí',
      pronunciation: '/kɔːst/',
      example: '',
    },
    {
      word: 'expensive',
      translation: 'đắt',
      pronunciation: '/ɪkˈspensɪv/',
      example: '',
    },
    { word: 'cheap', translation: 'rẻ', pronunciation: '/tʃiːp/', example: '' },
    {
      word: 'money',
      translation: 'tiền',
      pronunciation: '/ˈmʌni/',
      example: '',
    },
    {
      word: 'cash',
      translation: 'tiền mặt',
      pronunciation: '/kæʃ/',
      example: '',
    },
    {
      word: 'credit card',
      translation: 'thẻ tín dụng',
      pronunciation: '/ˈkredət kɑːrd/',
      example: '',
    },
    {
      word: 'receipt',
      translation: 'hóa đơn',
      pronunciation: '/rɪˈsiːt/',
      example: '',
    },
    {
      word: 'change',
      translation: 'tiền thừa',
      pronunciation: '/tʃeɪndʒ/',
      example: '',
    },
    {
      word: 'discount',
      translation: 'giảm giá',
      pronunciation: '/ˈdɪskaʊnt/',
      example: '',
    },
    {
      word: 'sale',
      translation: 'khuyến mãi',
      pronunciation: '/seɪl/',
      example: '',
    },
    {
      word: 'customer',
      translation: 'khách hàng',
      pronunciation: '/ˈkʌstəmər/',
      example: '',
    },
    {
      word: 'cashier',
      translation: 'thủ quỹ',
      pronunciation: '/kæˈʃɪr/',
      example: '',
    },
    {
      word: 'shopping cart',
      translation: 'xe đẩy hàng',
      pronunciation: '/ˈʃɑːpɪŋ kɑːrt/',
      example: '',
    },
    {
      word: 'basket',
      translation: 'giỏ hàng',
      pronunciation: '/ˈbæskət/',
      example: '',
    },
    {
      word: 'size',
      translation: 'kích cỡ',
      pronunciation: '/saɪz/',
      example: '',
    },
    {
      word: 'color',
      translation: 'màu sắc',
      pronunciation: '/ˈkʌlər/',
      example: '',
    },
    {
      word: 'brand',
      translation: 'thương hiệu',
      pronunciation: '/brænd/',
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

async function uploadShoppingPreset() {
  try {
    console.log('Starting to upload Shopping preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(shoppingPreset);
    const words = shoppingPreset.words.map(convertToPublicVocabularyWord);

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

uploadShoppingPreset();

