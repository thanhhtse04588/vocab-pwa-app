// Script to upload Weather vocabulary preset to Firebase
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

// Weather vocabulary preset data
const weatherPreset = {
  id: 'weather-oxford-008',
  name: '[The3000Oxford]-8.Weather',
  description:
    'Essential vocabulary for weather and climate based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'weather',
      translation: 'thời tiết',
      pronunciation: '/ˈweðər/',
      example: 'The weather is nice today.',
      exampleTranslation: 'Thời tiết hôm nay đẹp.',
    },
    {
      word: 'sun',
      translation: 'mặt trời',
      pronunciation: '/sʌn/',
      example: 'The sun is shining.',
      exampleTranslation: 'Mặt trời đang chiếu sáng.',
    },
    {
      word: 'sunny',
      translation: 'nắng',
      pronunciation: '/ˈsʌni/',
      example: 'It is sunny today.',
      exampleTranslation: 'Hôm nay trời nắng.',
    },
    {
      word: 'cloud',
      translation: 'mây',
      pronunciation: '/klaʊd/',
      example: 'There are clouds in the sky.',
      exampleTranslation: 'Có mây trên bầu trời.',
    },
    {
      word: 'cloudy',
      translation: 'có mây',
      pronunciation: '/ˈklaʊdi/',
      example: 'It is cloudy today.',
      exampleTranslation: 'Hôm nay trời có mây.',
    },
    {
      word: 'rain',
      translation: 'mưa',
      pronunciation: '/reɪn/',
      example: 'It is raining.',
      exampleTranslation: 'Trời đang mưa.',
    },
    {
      word: 'rainy',
      translation: 'có mưa',
      pronunciation: '/ˈreɪni/',
      example: 'It is rainy today.',
      exampleTranslation: 'Hôm nay trời có mưa.',
    },
    {
      word: 'snow',
      translation: 'tuyết',
      pronunciation: '/snoʊ/',
      example: 'It is snowing.',
      exampleTranslation: 'Trời đang tuyết.',
    },
    {
      word: 'snowy',
      translation: 'có tuyết',
      pronunciation: '/ˈsnoʊi/',
      example: 'It is snowy today.',
      exampleTranslation: 'Hôm nay trời có tuyết.',
    },
    {
      word: 'wind',
      translation: 'gió',
      pronunciation: '/wɪnd/',
      example: 'The wind is strong.',
      exampleTranslation: 'Gió mạnh.',
    },
    {
      word: 'windy',
      translation: 'có gió',
      pronunciation: '/ˈwɪndi/',
      example: 'It is windy today.',
      exampleTranslation: 'Hôm nay trời có gió.',
    },
    {
      word: 'storm',
      translation: 'bão',
      pronunciation: '/stɔːrm/',
      example: 'There is a storm coming.',
      exampleTranslation: 'Có một cơn bão đang đến.',
    },
    {
      word: 'thunder',
      translation: 'sấm',
      pronunciation: '/ˈθʌndər/',
      example: 'I hear thunder.',
      exampleTranslation: 'Tôi nghe thấy sấm.',
    },
    {
      word: 'lightning',
      translation: 'sét',
      pronunciation: '/ˈlaɪtnɪŋ/',
      example: 'Lightning struck the tree.',
      exampleTranslation: 'Sét đánh vào cây.',
    },
    {
      word: 'hot',
      translation: 'nóng',
      pronunciation: '/hɑːt/',
      example: 'It is hot today.',
      exampleTranslation: 'Hôm nay trời nóng.',
    },
    {
      word: 'cold',
      translation: 'lạnh',
      pronunciation: '/koʊld/',
      example: 'It is cold today.',
      exampleTranslation: 'Hôm nay trời lạnh.',
    },
    {
      word: 'warm',
      translation: 'ấm',
      pronunciation: '/wɔːrm/',
      example: 'The weather is warm.',
      exampleTranslation: 'Thời tiết ấm.',
    },
    {
      word: 'cool',
      translation: 'mát',
      pronunciation: '/kuːl/',
      example: 'It is cool in the morning.',
      exampleTranslation: 'Buổi sáng trời mát.',
    },
    {
      word: 'temperature',
      translation: 'nhiệt độ',
      pronunciation: '/ˈtemprətʃər/',
      example: 'What is the temperature?',
      exampleTranslation: 'Nhiệt độ là bao nhiêu?',
    },
    {
      word: 'season',
      translation: 'mùa',
      pronunciation: '/ˈsiːzən/',
      example: 'Spring is my favorite season.',
      exampleTranslation: 'Mùa xuân là mùa yêu thích của tôi.',
    },
    {
      word: 'spring',
      translation: 'mùa xuân',
      pronunciation: '/sprɪŋ/',
      example: 'Flowers bloom in spring.',
      exampleTranslation: 'Hoa nở vào mùa xuân.',
    },
    {
      word: 'summer',
      translation: 'mùa hè',
      pronunciation: '/ˈsʌmər/',
      example: 'I love summer vacation.',
      exampleTranslation: 'Tôi yêu kỳ nghỉ hè.',
    },
    {
      word: 'autumn',
      translation: 'mùa thu',
      pronunciation: '/ˈɔːtəm/',
      example: 'Leaves fall in autumn.',
      exampleTranslation: 'Lá rụng vào mùa thu.',
    },
    {
      word: 'winter',
      translation: 'mùa đông',
      pronunciation: '/ˈwɪntər/',
      example: 'It snows in winter.',
      exampleTranslation: 'Tuyết rơi vào mùa đông.',
    },
    {
      word: 'climate',
      translation: 'khí hậu',
      pronunciation: '/ˈklaɪmət/',
      example: 'The climate is changing.',
      exampleTranslation: 'Khí hậu đang thay đổi.',
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

async function uploadWeatherPreset() {
  try {
    console.log('Starting to upload Weather preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(weatherPreset);

    // Convert words to PublicVocabularySetData format
    const words = weatherPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${weatherPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Weather preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadWeatherPreset();

