// Script to upload Time vocabulary preset to Firebase
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

// Time vocabulary preset data
const timePreset = {
  id: 'time-oxford-009',
  name: '[The3000Oxford]-9.Time',
  description:
    'Essential vocabulary for time, days, and months based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'time',
      translation: 'thời gian',
      pronunciation: '/taɪm/',
      example: 'What time is it?',
      exampleTranslation: 'Mấy giờ rồi?',
    },
    {
      word: 'hour',
      translation: 'giờ',
      pronunciation: '/ˈaʊər/',
      example: 'I work eight hours a day.',
      exampleTranslation: 'Tôi làm việc tám giờ một ngày.',
    },
    {
      word: 'minute',
      translation: 'phút',
      pronunciation: '/ˈmɪnət/',
      example: 'Wait a minute.',
      exampleTranslation: 'Đợi một phút.',
    },
    {
      word: 'second',
      translation: 'giây',
      pronunciation: '/ˈsekənd/',
      example: 'I will be there in a second.',
      exampleTranslation: 'Tôi sẽ đến đó trong một giây.',
    },
    {
      word: 'day',
      translation: 'ngày',
      pronunciation: '/deɪ/',
      example: 'Have a nice day.',
      exampleTranslation: 'Chúc bạn một ngày tốt lành.',
    },
    {
      word: 'week',
      translation: 'tuần',
      pronunciation: '/wiːk/',
      example: 'I work five days a week.',
      exampleTranslation: 'Tôi làm việc năm ngày một tuần.',
    },
    {
      word: 'month',
      translation: 'tháng',
      pronunciation: '/mʌnθ/',
      example: 'There are twelve months in a year.',
      exampleTranslation: 'Có mười hai tháng trong một năm.',
    },
    {
      word: 'year',
      translation: 'năm',
      pronunciation: '/jɪr/',
      example: 'Happy New Year!',
      exampleTranslation: 'Chúc mừng năm mới!',
    },
    {
      word: 'morning',
      translation: 'buổi sáng',
      pronunciation: '/ˈmɔːrnɪŋ/',
      example: 'Good morning!',
      exampleTranslation: 'Chào buổi sáng!',
    },
    {
      word: 'afternoon',
      translation: 'buổi chiều',
      pronunciation: '/ˌæftərˈnuːn/',
      example: 'Good afternoon!',
      exampleTranslation: 'Chào buổi chiều!',
    },
    {
      word: 'evening',
      translation: 'buổi tối',
      pronunciation: '/ˈiːvnɪŋ/',
      example: 'Good evening!',
      exampleTranslation: 'Chào buổi tối!',
    },
    {
      word: 'night',
      translation: 'đêm',
      pronunciation: '/naɪt/',
      example: 'Good night!',
      exampleTranslation: 'Chúc ngủ ngon!',
    },
    {
      word: 'today',
      translation: 'hôm nay',
      pronunciation: '/təˈdeɪ/',
      example: 'What are you doing today?',
      exampleTranslation: 'Hôm nay bạn làm gì?',
    },
    {
      word: 'yesterday',
      translation: 'hôm qua',
      pronunciation: '/ˈjestərdeɪ/',
      example: 'I saw him yesterday.',
      exampleTranslation: 'Tôi gặp anh ấy hôm qua.',
    },
    {
      word: 'tomorrow',
      translation: 'ngày mai',
      pronunciation: '/təˈmɑːroʊ/',
      example: 'See you tomorrow.',
      exampleTranslation: 'Hẹn gặp lại ngày mai.',
    },
    {
      word: 'Monday',
      translation: 'thứ hai',
      pronunciation: '/ˈmʌndeɪ/',
      example: 'Monday is the first day of the week.',
      exampleTranslation: 'Thứ hai là ngày đầu tuần.',
    },
    {
      word: 'Tuesday',
      translation: 'thứ ba',
      pronunciation: '/ˈtuːzdeɪ/',
      example: 'I have a meeting on Tuesday.',
      exampleTranslation: 'Tôi có cuộc họp vào thứ ba.',
    },
    {
      word: 'Wednesday',
      translation: 'thứ tư',
      pronunciation: '/ˈwenzdeɪ/',
      example: 'Wednesday is the middle of the week.',
      exampleTranslation: 'Thứ tư là giữa tuần.',
    },
    {
      word: 'Thursday',
      translation: 'thứ năm',
      pronunciation: '/ˈθɜːrzdeɪ/',
      example: 'Thursday is almost Friday.',
      exampleTranslation: 'Thứ năm gần như thứ sáu.',
    },
    {
      word: 'Friday',
      translation: 'thứ sáu',
      pronunciation: '/ˈfraɪdeɪ/',
      example: 'Thank God it is Friday.',
      exampleTranslation: 'Cảm ơn Chúa, hôm nay là thứ sáu.',
    },
    {
      word: 'Saturday',
      translation: 'thứ bảy',
      pronunciation: '/ˈsætərdeɪ/',
      example: 'Saturday is my day off.',
      exampleTranslation: 'Thứ bảy là ngày nghỉ của tôi.',
    },
    {
      word: 'Sunday',
      translation: 'chủ nhật',
      pronunciation: '/ˈsʌndeɪ/',
      example: 'Sunday is a day of rest.',
      exampleTranslation: 'Chủ nhật là ngày nghỉ ngơi.',
    },
    {
      word: 'weekend',
      translation: 'cuối tuần',
      pronunciation: '/ˈwiːkend/',
      example: 'I love weekends.',
      exampleTranslation: 'Tôi yêu cuối tuần.',
    },
    {
      word: 'weekday',
      translation: 'ngày trong tuần',
      pronunciation: '/ˈwiːkdeɪ/',
      example: 'I work on weekdays.',
      exampleTranslation: 'Tôi làm việc vào ngày trong tuần.',
    },
    {
      word: 'calendar',
      translation: 'lịch',
      pronunciation: '/ˈkælɪndər/',
      example: 'Check your calendar.',
      exampleTranslation: 'Kiểm tra lịch của bạn.',
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

async function uploadTimePreset() {
  try {
    console.log('Starting to upload Time preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(timePreset);

    // Convert words to PublicVocabularySetData format
    const words = timePreset.words.map(convertToPublicVocabularyWord);

    // Create the complete PublicVocabularySetData structure
    const publicSetData = {
      set: setMeta,
      words: words,
      publisherId: 'system', // System-generated preset
      publisherName: 'BeeVocab Team',
      publishedAt: new Date().toISOString(),
    };

    // Add the complete set with words to Firestore
    const setDocRef = await addDoc(
      collection(db, 'publicVocabularySets'),
      publicSetData
    );

    console.log(`✅ Successfully uploaded preset "${setMeta.name}"`);
    console.log(`📝 Document ID: ${setDocRef.id}`);
    console.log(`📚 Total words: ${words.length}`);
    console.log(
      `🌐 Language: ${setMeta.wordLanguage} → ${setMeta.meaningLanguage}`
    );

    console.log('\n📋 Preset Details:');
    console.log(`   Name: ${setMeta.name}`);
    console.log(`   Description: ${timePreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Time preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadTimePreset();

