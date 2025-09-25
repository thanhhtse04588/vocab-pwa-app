// Script to upload Food vocabulary preset to Firebase
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

// Food vocabulary preset data
const foodPreset = {
  id: 'food-oxford-003',
  name: '[The3000Oxford]-3.Food & Drinks',
  description:
    'Essential vocabulary for food, drinks and dining based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'food',
      translation: 'thức ăn',
      pronunciation: '/fuːd/',
      example: 'I love Vietnamese food.',
      exampleTranslation: 'Tôi thích thức ăn Việt Nam.',
    },
    {
      word: 'bread',
      translation: 'bánh mì',
      pronunciation: '/bred/',
      example: 'I eat bread for breakfast.',
      exampleTranslation: 'Tôi ăn bánh mì cho bữa sáng.',
    },
    {
      word: 'rice',
      translation: 'cơm',
      pronunciation: '/raɪs/',
      example: 'Rice is a staple food in Asia.',
      exampleTranslation: 'Cơm là lương thực chính ở châu Á.',
    },
    {
      word: 'meat',
      translation: 'thịt',
      pronunciation: '/miːt/',
      example: "I don't eat red meat.",
      exampleTranslation: 'Tôi không ăn thịt đỏ.',
    },
    {
      word: 'fish',
      translation: 'cá',
      pronunciation: '/fɪʃ/',
      example: 'Fish is good for your health.',
      exampleTranslation: 'Cá tốt cho sức khỏe của bạn.',
    },
    {
      word: 'chicken',
      translation: 'thịt gà',
      pronunciation: '/ˈtʃɪkən/',
      example: 'I like grilled chicken.',
      exampleTranslation: 'Tôi thích thịt gà nướng.',
    },
    {
      word: 'beef',
      translation: 'thịt bò',
      pronunciation: '/biːf/',
      example: 'Beef is expensive in Vietnam.',
      exampleTranslation: 'Thịt bò đắt ở Việt Nam.',
    },
    {
      word: 'pork',
      translation: 'thịt lợn',
      pronunciation: '/pɔːrk/',
      example: 'Pork is very popular in Vietnam.',
      exampleTranslation: 'Thịt lợn rất phổ biến ở Việt Nam.',
    },
    {
      word: 'vegetable',
      translation: 'rau củ',
      pronunciation: '/ˈvedʒtəbəl/',
      example: 'Eat more vegetables for good health.',
      exampleTranslation: 'Ăn nhiều rau củ để có sức khỏe tốt.',
    },
    {
      word: 'fruit',
      translation: 'trái cây',
      pronunciation: '/fruːt/',
      example: 'I eat fruit every day.',
      exampleTranslation: 'Tôi ăn trái cây mỗi ngày.',
    },
    {
      word: 'apple',
      translation: 'táo',
      pronunciation: '/ˈæpəl/',
      example: 'An apple a day keeps the doctor away.',
      exampleTranslation: 'Một quả táo mỗi ngày giúp tránh xa bác sĩ.',
    },
    {
      word: 'banana',
      translation: 'chuối',
      pronunciation: '/bəˈnɑːnə/',
      example: 'Bananas are rich in potassium.',
      exampleTranslation: 'Chuối giàu kali.',
    },
    {
      word: 'orange',
      translation: 'cam',
      pronunciation: '/ˈɔːrɪndʒ/',
      example: 'Orange juice is very refreshing.',
      exampleTranslation: 'Nước cam rất mát.',
    },
    {
      word: 'milk',
      translation: 'sữa',
      pronunciation: '/mɪlk/',
      example: 'I drink milk every morning.',
      exampleTranslation: 'Tôi uống sữa mỗi sáng.',
    },
    {
      word: 'water',
      translation: 'nước',
      pronunciation: '/ˈwɔːtər/',
      example: 'Drink plenty of water.',
      exampleTranslation: 'Uống nhiều nước.',
    },
    {
      word: 'coffee',
      translation: 'cà phê',
      pronunciation: '/ˈkɔːfi/',
      example: 'I need my morning coffee.',
      exampleTranslation: 'Tôi cần cà phê buổi sáng.',
    },
    {
      word: 'tea',
      translation: 'trà',
      pronunciation: '/tiː/',
      example: 'Green tea is healthy.',
      exampleTranslation: 'Trà xanh tốt cho sức khỏe.',
    },
    {
      word: 'juice',
      translation: 'nước ép',
      pronunciation: '/dʒuːs/',
      example: 'Fresh orange juice tastes great.',
      exampleTranslation: 'Nước cam tươi rất ngon.',
    },
    {
      word: 'soup',
      translation: 'súp',
      pronunciation: '/suːp/',
      example: 'Hot soup is perfect for winter.',
      exampleTranslation: 'Súp nóng hoàn hảo cho mùa đông.',
    },
    {
      word: 'salad',
      translation: 'salad',
      pronunciation: '/ˈsæləd/',
      example: 'I eat salad for lunch.',
      exampleTranslation: 'Tôi ăn salad cho bữa trưa.',
    },
    {
      word: 'pizza',
      translation: 'pizza',
      pronunciation: '/ˈpiːtsə/',
      example: 'Pizza is my favorite food.',
      exampleTranslation: 'Pizza là món ăn yêu thích của tôi.',
    },
    {
      word: 'cake',
      translation: 'bánh ngọt',
      pronunciation: '/keɪk/',
      example: 'Birthday cake is delicious.',
      exampleTranslation: 'Bánh sinh nhật rất ngon.',
    },
    {
      word: 'chocolate',
      translation: 'sô cô la',
      pronunciation: '/ˈtʃɔːklət/',
      example: 'Dark chocolate is healthy.',
      exampleTranslation: 'Sô cô la đen tốt cho sức khỏe.',
    },
    {
      word: 'sugar',
      translation: 'đường',
      pronunciation: '/ˈʃʊɡər/',
      example: 'Too much sugar is bad for health.',
      exampleTranslation: 'Quá nhiều đường có hại cho sức khỏe.',
    },
    {
      word: 'salt',
      translation: 'muối',
      pronunciation: '/sɔːlt/',
      example: 'Add some salt to taste.',
      exampleTranslation: 'Thêm một chút muối cho vừa miệng.',
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

async function uploadFoodPreset() {
  try {
    console.log('Starting to upload Food preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(foodPreset);

    // Convert words to PublicVocabularySetData format
    const words = foodPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${foodPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Food preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadFoodPreset();

