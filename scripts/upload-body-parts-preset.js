// Script to upload Body Parts vocabulary preset to Firebase
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

// Body Parts vocabulary preset data
const bodyPartsPreset = {
  id: 'body-parts-oxford-007',
  name: '[The3000Oxford]-7.Body Parts',
  description:
    'Essential vocabulary for human body parts based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'body',
      translation: 'cơ thể',
      pronunciation: '/ˈbɑːdi/',
      example: 'Take care of your body.',
      exampleTranslation: 'Hãy chăm sóc cơ thể của bạn.',
    },
    {
      word: 'head',
      translation: 'đầu',
      pronunciation: '/hed/',
      example: 'My head hurts.',
      exampleTranslation: 'Đầu tôi đau.',
    },
    {
      word: 'face',
      translation: 'khuôn mặt',
      pronunciation: '/feɪs/',
      example: 'She has a beautiful face.',
      exampleTranslation: 'Cô ấy có khuôn mặt đẹp.',
    },
    {
      word: 'eye',
      translation: 'mắt',
      pronunciation: '/aɪ/',
      example: 'I have blue eyes.',
      exampleTranslation: 'Tôi có mắt màu xanh.',
    },
    {
      word: 'nose',
      translation: 'mũi',
      pronunciation: '/noʊz/',
      example: 'My nose is running.',
      exampleTranslation: 'Mũi tôi đang chảy nước.',
    },
    {
      word: 'mouth',
      translation: 'miệng',
      pronunciation: '/maʊθ/',
      example: 'Open your mouth.',
      exampleTranslation: 'Mở miệng ra.',
    },
    {
      word: 'tooth',
      translation: 'răng',
      pronunciation: '/tuːθ/',
      example: 'Brush your teeth.',
      exampleTranslation: 'Đánh răng.',
    },
    {
      word: 'ear',
      translation: 'tai',
      pronunciation: '/ɪr/',
      example: 'I can hear with my ears.',
      exampleTranslation: 'Tôi có thể nghe bằng tai.',
    },
    {
      word: 'hair',
      translation: 'tóc',
      pronunciation: '/her/',
      example: 'She has long hair.',
      exampleTranslation: 'Cô ấy có mái tóc dài.',
    },
    {
      word: 'neck',
      translation: 'cổ',
      pronunciation: '/nek/',
      example: 'My neck is stiff.',
      exampleTranslation: 'Cổ tôi bị cứng.',
    },
    {
      word: 'shoulder',
      translation: 'vai',
      pronunciation: '/ˈʃoʊldər/',
      example: 'My shoulders are broad.',
      exampleTranslation: 'Vai tôi rộng.',
    },
    {
      word: 'arm',
      translation: 'cánh tay',
      pronunciation: '/ɑːrm/',
      example: 'Raise your arm.',
      exampleTranslation: 'Giơ cánh tay lên.',
    },
    {
      word: 'hand',
      translation: 'bàn tay',
      pronunciation: '/hænd/',
      example: 'Wash your hands.',
      exampleTranslation: 'Rửa tay.',
    },
    {
      word: 'finger',
      translation: 'ngón tay',
      pronunciation: '/ˈfɪŋɡər/',
      example: 'I have ten fingers.',
      exampleTranslation: 'Tôi có mười ngón tay.',
    },
    {
      word: 'chest',
      translation: 'ngực',
      pronunciation: '/tʃest/',
      example: 'My chest hurts.',
      exampleTranslation: 'Ngực tôi đau.',
    },
    {
      word: 'back',
      translation: 'lưng',
      pronunciation: '/bæk/',
      example: 'My back is sore.',
      exampleTranslation: 'Lưng tôi đau.',
    },
    {
      word: 'stomach',
      translation: 'bụng',
      pronunciation: '/ˈstʌmək/',
      example: 'My stomach is full.',
      exampleTranslation: 'Bụng tôi no.',
    },
    {
      word: 'leg',
      translation: 'chân',
      pronunciation: '/leɡ/',
      example: 'I have two legs.',
      exampleTranslation: 'Tôi có hai chân.',
    },
    {
      word: 'foot',
      translation: 'bàn chân',
      pronunciation: '/fʊt/',
      example: 'My feet are cold.',
      exampleTranslation: 'Bàn chân tôi lạnh.',
    },
    {
      word: 'knee',
      translation: 'đầu gối',
      pronunciation: '/niː/',
      example: 'Bend your knees.',
      exampleTranslation: 'Gập đầu gối.',
    },
    {
      word: 'ankle',
      translation: 'mắt cá chân',
      pronunciation: '/ˈæŋkəl/',
      example: 'I twisted my ankle.',
      exampleTranslation: 'Tôi bị trật mắt cá chân.',
    },
    {
      word: 'skin',
      translation: 'da',
      pronunciation: '/skɪn/',
      example: 'My skin is dry.',
      exampleTranslation: 'Da tôi khô.',
    },
    {
      word: 'heart',
      translation: 'tim',
      pronunciation: '/hɑːrt/',
      example: 'My heart is beating fast.',
      exampleTranslation: 'Tim tôi đập nhanh.',
    },
    {
      word: 'brain',
      translation: 'não',
      pronunciation: '/breɪn/',
      example: 'Use your brain.',
      exampleTranslation: 'Sử dụng não của bạn.',
    },
    {
      word: 'blood',
      translation: 'máu',
      pronunciation: '/blʌd/',
      example: 'Blood is red.',
      exampleTranslation: 'Máu có màu đỏ.',
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

async function uploadBodyPartsPreset() {
  try {
    console.log('Starting to upload Body Parts preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(bodyPartsPreset);

    // Convert words to PublicVocabularySetData format
    const words = bodyPartsPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${bodyPartsPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Body Parts preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadBodyPartsPreset();

