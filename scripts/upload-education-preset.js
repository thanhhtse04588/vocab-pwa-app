// Script to upload Education vocabulary preset to Firebase
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

// Education vocabulary preset data
const educationPreset = {
  id: 'education-oxford-018',
  name: '[The3000Oxford]-18.Education',
  description: 'Essential vocabulary for education and learning',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'education',
      translation: 'giáo dục',
      pronunciation: '/ˌedʒəˈkeɪʃən/',
      example: '',
    },
    {
      word: 'school',
      translation: 'trường học',
      pronunciation: '/skuːl/',
      example: '',
    },
    {
      word: 'university',
      translation: 'đại học',
      pronunciation: '/ˌjuːnəˈvɜːrsəti/',
      example: '',
    },
    {
      word: 'college',
      translation: 'cao đẳng',
      pronunciation: '/ˈkɑːlɪdʒ/',
      example: '',
    },
    {
      word: 'student',
      translation: 'học sinh',
      pronunciation: '/ˈstuːdənt/',
      example: '',
    },
    {
      word: 'teacher',
      translation: 'giáo viên',
      pronunciation: '/ˈtiːtʃər/',
      example: '',
    },
    {
      word: 'professor',
      translation: 'giáo sư',
      pronunciation: '/prəˈfesər/',
      example: '',
    },
    {
      word: 'class',
      translation: 'lớp học',
      pronunciation: '/klæs/',
      example: '',
    },
    {
      word: 'classroom',
      translation: 'phòng học',
      pronunciation: '/ˈklæsruːm/',
      example: '',
    },
    {
      word: 'lesson',
      translation: 'bài học',
      pronunciation: '/ˈlesən/',
      example: '',
    },
    {
      word: 'subject',
      translation: 'môn học',
      pronunciation: '/ˈsʌbdʒekt/',
      example: '',
    },
    {
      word: 'homework',
      translation: 'bài tập về nhà',
      pronunciation: '/ˈhoʊmwɜːrk/',
      example: '',
    },
    {
      word: 'exam',
      translation: 'kỳ thi',
      pronunciation: '/ɪɡˈzæm/',
      example: '',
    },
    {
      word: 'test',
      translation: 'bài kiểm tra',
      pronunciation: '/test/',
      example: '',
    },
    {
      word: 'grade',
      translation: 'điểm',
      pronunciation: '/ɡreɪd/',
      example: '',
    },
    {
      word: 'mark',
      translation: 'điểm',
      pronunciation: '/mɑːrk/',
      example: '',
    },
    {
      word: 'degree',
      translation: 'bằng cấp',
      pronunciation: '/dɪˈɡriː/',
      example: '',
    },
    {
      word: 'diploma',
      translation: 'bằng tốt nghiệp',
      pronunciation: '/dɪˈploʊmə/',
      example: '',
    },
    {
      word: 'certificate',
      translation: 'chứng chỉ',
      pronunciation: '/sərˈtɪfəkət/',
      example: '',
    },
    {
      word: 'library',
      translation: 'thư viện',
      pronunciation: '/ˈlaɪbreri/',
      example: '',
    },
    {
      word: 'laboratory',
      translation: 'phòng thí nghiệm',
      pronunciation: '/ˈlæbrətɔːri/',
      example: '',
    },
    {
      word: 'research',
      translation: 'nghiên cứu',
      pronunciation: '/rɪˈsɜːrtʃ/',
      example: '',
    },
    {
      word: 'study',
      translation: 'học',
      pronunciation: '/ˈstʌdi/',
      example: '',
    },
    {
      word: 'learn',
      translation: 'học',
      pronunciation: '/lɜːrn/',
      example: '',
    },
    {
      word: 'teach',
      translation: 'dạy',
      pronunciation: '/tiːtʃ/',
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

async function uploadEducationPreset() {
  try {
    console.log('Starting to upload Education preset to Firebase...');

    const setMeta = convertToPublicVocabularySetMeta(educationPreset);
    const words = educationPreset.words.map(convertToPublicVocabularyWord);

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

uploadEducationPreset();

