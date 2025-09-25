// Script to upload Jobs & Work vocabulary preset to Firebase
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

// Jobs & Work vocabulary preset data
const jobsPreset = {
  id: 'jobs-oxford-014',
  name: '[The3000Oxford]-14.Jobs & Work',
  description: 'Essential vocabulary for jobs and work',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'job',
      translation: 'công việc',
      pronunciation: '/dʒɑːb/',
      example: '',
    },
    {
      word: 'work',
      translation: 'làm việc',
      pronunciation: '/wɜːrk/',
      example: '',
    },
    {
      word: 'doctor',
      translation: 'bác sĩ',
      pronunciation: '/ˈdɑːktər/',
      example: '',
    },
    {
      word: 'teacher',
      translation: 'giáo viên',
      pronunciation: '/ˈtiːtʃər/',
      example: '',
    },
    {
      word: 'nurse',
      translation: 'y tá',
      pronunciation: '/nɜːrs/',
      example: '',
    },
    {
      word: 'engineer',
      translation: 'kỹ sư',
      pronunciation: '/ˌendʒəˈnɪr/',
      example: '',
    },
    {
      word: 'lawyer',
      translation: 'luật sư',
      pronunciation: '/ˈlɔːjər/',
      example: '',
    },
    {
      word: 'police',
      translation: 'cảnh sát',
      pronunciation: '/pəˈliːs/',
      example: '',
    },
    {
      word: 'firefighter',
      translation: 'lính cứu hỏa',
      pronunciation: '/ˈfaɪərfaɪtər/',
      example: '',
    },
    {
      word: 'chef',
      translation: 'đầu bếp',
      pronunciation: '/ʃef/',
      example: '',
    },
    {
      word: 'cook',
      translation: 'đầu bếp',
      pronunciation: '/kʊk/',
      example: '',
    },
    {
      word: 'waiter',
      translation: 'bồi bàn',
      pronunciation: '/ˈweɪtər/',
      example: '',
    },
    {
      word: 'waitress',
      translation: 'bồi bàn nữ',
      pronunciation: '/ˈweɪtrəs/',
      example: '',
    },
    {
      word: 'driver',
      translation: 'tài xế',
      pronunciation: '/ˈdraɪvər/',
      example: '',
    },
    {
      word: 'pilot',
      translation: 'phi công',
      pronunciation: '/ˈpaɪlət/',
      example: '',
    },
    {
      word: 'soldier',
      translation: 'lính',
      pronunciation: '/ˈsoʊldʒər/',
      example: '',
    },
    {
      word: 'farmer',
      translation: 'nông dân',
      pronunciation: '/ˈfɑːrmər/',
      example: '',
    },
    {
      word: 'artist',
      translation: 'nghệ sĩ',
      pronunciation: '/ˈɑːrtɪst/',
      example: '',
    },
    {
      word: 'musician',
      translation: 'nhạc sĩ',
      pronunciation: '/mjuˈzɪʃən/',
      example: '',
    },
    {
      word: 'actor',
      translation: 'diễn viên',
      pronunciation: '/ˈæktər/',
      example: '',
    },
    {
      word: 'actress',
      translation: 'diễn viên nữ',
      pronunciation: '/ˈæktrəs/',
      example: '',
    },
    {
      word: 'writer',
      translation: 'nhà văn',
      pronunciation: '/ˈraɪtər/',
      example: '',
    },
    {
      word: 'journalist',
      translation: 'nhà báo',
      pronunciation: '/ˈdʒɜːrnəlɪst/',
      example: '',
    },
    {
      word: 'businessman',
      translation: 'doanh nhân',
      pronunciation: '/ˈbɪznəsmæn/',
      example: '',
    },
    {
      word: 'manager',
      translation: 'quản lý',
      pronunciation: '/ˈmænɪdʒər/',
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

async function uploadJobsPreset() {
  try {
    console.log('Starting to upload Jobs & Work preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(jobsPreset);
    const words = jobsPreset.words.map(convertToPublicVocabularyWord);

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

uploadJobsPreset();

