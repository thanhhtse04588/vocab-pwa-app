// Script to upload Animals vocabulary preset to Firebase
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

// Animals vocabulary preset data
const animalsPreset = {
  id: 'animals-oxford-004',
  name: '[The3000Oxford]-4.Animals',
  description:
    'Essential vocabulary for animals and pets based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'animal',
      translation: 'động vật',
      pronunciation: '/ˈænɪməl/',
      example: 'I love all kinds of animals.',
      exampleTranslation: 'Tôi yêu tất cả các loài động vật.',
    },
    {
      word: 'dog',
      translation: 'chó',
      pronunciation: '/dɔːɡ/',
      example: 'My dog is very friendly.',
      exampleTranslation: 'Con chó của tôi rất thân thiện.',
    },
    {
      word: 'cat',
      translation: 'mèo',
      pronunciation: '/kæt/',
      example: 'Cats are independent animals.',
      exampleTranslation: 'Mèo là động vật độc lập.',
    },
    {
      word: 'bird',
      translation: 'chim',
      pronunciation: '/bɜːrd/',
      example: 'Birds can fly in the sky.',
      exampleTranslation: 'Chim có thể bay trên trời.',
    },
    {
      word: 'fish',
      translation: 'cá',
      pronunciation: '/fɪʃ/',
      example: 'Fish live in water.',
      exampleTranslation: 'Cá sống trong nước.',
    },
    {
      word: 'horse',
      translation: 'ngựa',
      pronunciation: '/hɔːrs/',
      example: 'Horses are strong animals.',
      exampleTranslation: 'Ngựa là động vật mạnh mẽ.',
    },
    {
      word: 'cow',
      translation: 'bò',
      pronunciation: '/kaʊ/',
      example: 'Cows give us milk.',
      exampleTranslation: 'Bò cho chúng ta sữa.',
    },
    {
      word: 'pig',
      translation: 'lợn',
      pronunciation: '/pɪɡ/',
      example: 'Pigs are very intelligent.',
      exampleTranslation: 'Lợn rất thông minh.',
    },
    {
      word: 'sheep',
      translation: 'cừu',
      pronunciation: '/ʃiːp/',
      example: 'Sheep provide wool.',
      exampleTranslation: 'Cừu cung cấp len.',
    },
    {
      word: 'chicken',
      translation: 'gà',
      pronunciation: '/ˈtʃɪkən/',
      example: 'Chickens lay eggs.',
      exampleTranslation: 'Gà đẻ trứng.',
    },
    {
      word: 'duck',
      translation: 'vịt',
      pronunciation: '/dʌk/',
      example: 'Ducks can swim.',
      exampleTranslation: 'Vịt có thể bơi.',
    },
    {
      word: 'elephant',
      translation: 'voi',
      pronunciation: '/ˈeləfənt/',
      example: 'Elephants have long trunks.',
      exampleTranslation: 'Voi có vòi dài.',
    },
    {
      word: 'lion',
      translation: 'sư tử',
      pronunciation: '/ˈlaɪən/',
      example: 'Lions are the king of animals.',
      exampleTranslation: 'Sư tử là vua của các loài động vật.',
    },
    {
      word: 'tiger',
      translation: 'hổ',
      pronunciation: '/ˈtaɪɡər/',
      example: 'Tigers have stripes.',
      exampleTranslation: 'Hổ có sọc.',
    },
    {
      word: 'bear',
      translation: 'gấu',
      pronunciation: '/ber/',
      example: 'Bears hibernate in winter.',
      exampleTranslation: 'Gấu ngủ đông vào mùa đông.',
    },
    {
      word: 'wolf',
      translation: 'sói',
      pronunciation: '/wʊlf/',
      example: 'Wolves live in packs.',
      exampleTranslation: 'Sói sống theo bầy.',
    },
    {
      word: 'rabbit',
      translation: 'thỏ',
      pronunciation: '/ˈræbɪt/',
      example: 'Rabbits hop quickly.',
      exampleTranslation: 'Thỏ nhảy nhanh.',
    },
    {
      word: 'mouse',
      translation: 'chuột',
      pronunciation: '/maʊs/',
      example: 'Mice are small animals.',
      exampleTranslation: 'Chuột là động vật nhỏ.',
    },
    {
      word: 'snake',
      translation: 'rắn',
      pronunciation: '/sneɪk/',
      example: 'Some snakes are poisonous.',
      exampleTranslation: 'Một số loài rắn có độc.',
    },
    {
      word: 'frog',
      translation: 'ếch',
      pronunciation: '/frɔːɡ/',
      example: 'Frogs can jump high.',
      exampleTranslation: 'Ếch có thể nhảy cao.',
    },
    {
      word: 'spider',
      translation: 'nhện',
      pronunciation: '/ˈspaɪdər/',
      example: 'Spiders spin webs.',
      exampleTranslation: 'Nhện giăng tơ.',
    },
    {
      word: 'butterfly',
      translation: 'bướm',
      pronunciation: '/ˈbʌtərflaɪ/',
      example: 'Butterflies are beautiful insects.',
      exampleTranslation: 'Bướm là côn trùng đẹp.',
    },
    {
      word: 'bee',
      translation: 'ong',
      pronunciation: '/biː/',
      example: 'Bees make honey.',
      exampleTranslation: 'Ong làm mật.',
    },
    {
      word: 'ant',
      translation: 'kiến',
      pronunciation: '/ænt/',
      example: 'Ants work together.',
      exampleTranslation: 'Kiến làm việc cùng nhau.',
    },
    {
      word: 'pet',
      translation: 'thú cưng',
      pronunciation: '/pet/',
      example: 'Many people have pets.',
      exampleTranslation: 'Nhiều người có thú cưng.',
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

async function uploadAnimalsPreset() {
  try {
    console.log('Starting to upload Animals preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(animalsPreset);

    // Convert words to PublicVocabularySetData format
    const words = animalsPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${animalsPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Animals preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadAnimalsPreset();

