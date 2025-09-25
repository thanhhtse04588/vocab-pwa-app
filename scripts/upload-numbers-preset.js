// Script to upload Numbers vocabulary preset to Firebase
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

// Numbers vocabulary preset data
const numbersPreset = {
  id: 'numbers-oxford-006',
  name: '[The3000Oxford]-6.Numbers',
  description:
    'Essential vocabulary for numbers and counting based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'number',
      translation: 'số',
      pronunciation: '/ˈnʌmbər/',
      example: 'What is your phone number?',
      exampleTranslation: 'Số điện thoại của bạn là gì?',
    },
    {
      word: 'zero',
      translation: 'không',
      pronunciation: '/ˈziroʊ/',
      example: 'Zero is nothing.',
      exampleTranslation: 'Không là không có gì.',
    },
    {
      word: 'one',
      translation: 'một',
      pronunciation: '/wʌn/',
      example: 'I have one apple.',
      exampleTranslation: 'Tôi có một quả táo.',
    },
    {
      word: 'two',
      translation: 'hai',
      pronunciation: '/tuː/',
      example: 'Two plus two equals four.',
      exampleTranslation: 'Hai cộng hai bằng bốn.',
    },
    {
      word: 'three',
      translation: 'ba',
      pronunciation: '/θriː/',
      example: 'I have three cats.',
      exampleTranslation: 'Tôi có ba con mèo.',
    },
    {
      word: 'four',
      translation: 'bốn',
      pronunciation: '/fɔːr/',
      example: 'Four seasons in a year.',
      exampleTranslation: 'Bốn mùa trong một năm.',
    },
    {
      word: 'five',
      translation: 'năm',
      pronunciation: '/faɪv/',
      example: 'Five fingers on one hand.',
      exampleTranslation: 'Năm ngón tay trên một bàn tay.',
    },
    {
      word: 'six',
      translation: 'sáu',
      pronunciation: '/sɪks/',
      example: 'Six months make half a year.',
      exampleTranslation: 'Sáu tháng tạo thành nửa năm.',
    },
    {
      word: 'seven',
      translation: 'bảy',
      pronunciation: '/ˈsevən/',
      example: 'Seven days in a week.',
      exampleTranslation: 'Bảy ngày trong một tuần.',
    },
    {
      word: 'eight',
      translation: 'tám',
      pronunciation: '/eɪt/',
      example: 'Eight legs on a spider.',
      exampleTranslation: 'Tám chân trên một con nhện.',
    },
    {
      word: 'nine',
      translation: 'chín',
      pronunciation: '/naɪn/',
      example: 'Nine planets in our solar system.',
      exampleTranslation: 'Chín hành tinh trong hệ mặt trời.',
    },
    {
      word: 'ten',
      translation: 'mười',
      pronunciation: '/ten/',
      example: 'Ten is a round number.',
      exampleTranslation: 'Mười là một số tròn.',
    },
    {
      word: 'eleven',
      translation: 'mười một',
      pronunciation: '/ɪˈlevən/',
      example: 'Eleven players on a football team.',
      exampleTranslation: 'Mười một cầu thủ trong đội bóng đá.',
    },
    {
      word: 'twelve',
      translation: 'mười hai',
      pronunciation: '/twelv/',
      example: 'Twelve months in a year.',
      exampleTranslation: 'Mười hai tháng trong một năm.',
    },
    {
      word: 'thirteen',
      translation: 'mười ba',
      pronunciation: '/ˌθɜːrˈtiːn/',
      example: 'Thirteen is considered unlucky.',
      exampleTranslation: 'Mười ba được coi là không may mắn.',
    },
    {
      word: 'fourteen',
      translation: 'mười bốn',
      pronunciation: '/ˌfɔːrˈtiːn/',
      example: 'I am fourteen years old.',
      exampleTranslation: 'Tôi mười bốn tuổi.',
    },
    {
      word: 'fifteen',
      translation: 'mười lăm',
      pronunciation: '/ˌfɪfˈtiːn/',
      example: 'Fifteen minutes past the hour.',
      exampleTranslation: 'Mười lăm phút sau giờ.',
    },
    {
      word: 'sixteen',
      translation: 'mười sáu',
      pronunciation: '/ˌsɪksˈtiːn/',
      example: 'Sweet sixteen birthday.',
      exampleTranslation: 'Sinh nhật mười sáu tuổi ngọt ngào.',
    },
    {
      word: 'seventeen',
      translation: 'mười bảy',
      pronunciation: '/ˌsevənˈtiːn/',
      example: 'Seventeen is a prime number.',
      exampleTranslation: 'Mười bảy là số nguyên tố.',
    },
    {
      word: 'eighteen',
      translation: 'mười tám',
      pronunciation: '/ˌeɪˈtiːn/',
      example: 'Eighteen is the voting age.',
      exampleTranslation: 'Mười tám là tuổi bầu cử.',
    },
    {
      word: 'nineteen',
      translation: 'mười chín',
      pronunciation: '/ˌnaɪnˈtiːn/',
      example: 'Nineteen ninety-nine.',
      exampleTranslation: 'Mười chín chín mươi chín.',
    },
    {
      word: 'twenty',
      translation: 'hai mươi',
      pronunciation: '/ˈtwenti/',
      example: 'Twenty questions game.',
      exampleTranslation: 'Trò chơi hai mươi câu hỏi.',
    },
    {
      word: 'thirty',
      translation: 'ba mươi',
      pronunciation: '/ˈθɜːrti/',
      example: 'Thirty days hath September.',
      exampleTranslation: 'Tháng chín có ba mươi ngày.',
    },
    {
      word: 'forty',
      translation: 'bốn mươi',
      pronunciation: '/ˈfɔːrti/',
      example: 'Life begins at forty.',
      exampleTranslation: 'Cuộc sống bắt đầu ở tuổi bốn mươi.',
    },
    {
      word: 'fifty',
      translation: 'năm mươi',
      pronunciation: '/ˈfɪfti/',
      example: 'Fifty-fifty chance.',
      exampleTranslation: 'Cơ hội năm mươi-năm mươi.',
    },
    {
      word: 'hundred',
      translation: 'một trăm',
      pronunciation: '/ˈhʌndrəd/',
      example: 'One hundred percent sure.',
      exampleTranslation: 'Chắc chắn một trăm phần trăm.',
    },
    {
      word: 'thousand',
      translation: 'một nghìn',
      pronunciation: '/ˈθaʊzənd/',
      example: 'A thousand thanks.',
      exampleTranslation: 'Cảm ơn một nghìn lần.',
    },
    {
      word: 'million',
      translation: 'một triệu',
      pronunciation: '/ˈmɪljən/',
      example: 'One million dollars.',
      exampleTranslation: 'Một triệu đô la.',
    },
    {
      word: 'billion',
      translation: 'một tỷ',
      pronunciation: '/ˈbɪljən/',
      example: 'Seven billion people on Earth.',
      exampleTranslation: 'Bảy tỷ người trên Trái Đất.',
    },
    {
      word: 'count',
      translation: 'đếm',
      pronunciation: '/kaʊnt/',
      example: 'Count from one to ten.',
      exampleTranslation: 'Đếm từ một đến mười.',
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

async function uploadNumbersPreset() {
  try {
    console.log('Starting to upload Numbers preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(numbersPreset);

    // Convert words to PublicVocabularySetData format
    const words = numbersPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${numbersPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Numbers preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadNumbersPreset();

