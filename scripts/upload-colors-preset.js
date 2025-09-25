// Script to upload Colors vocabulary preset to Firebase
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

// Colors vocabulary preset data
const colorsPreset = {
  id: 'colors-oxford-005',
  name: '[The3000Oxford]-5.Colors',
  description:
    'Essential vocabulary for colors and shades based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'color',
      translation: 'màu sắc',
      pronunciation: '/ˈkʌlər/',
      example: 'What is your favorite color?',
      exampleTranslation: 'Màu sắc yêu thích của bạn là gì?',
    },
    {
      word: 'red',
      translation: 'đỏ',
      pronunciation: '/red/',
      example: 'Red is the color of blood.',
      exampleTranslation: 'Đỏ là màu của máu.',
    },
    {
      word: 'blue',
      translation: 'xanh dương',
      pronunciation: '/bluː/',
      example: 'The sky is blue.',
      exampleTranslation: 'Bầu trời màu xanh dương.',
    },
    {
      word: 'green',
      translation: 'xanh lá',
      pronunciation: '/ɡriːn/',
      example: 'Grass is green.',
      exampleTranslation: 'Cỏ màu xanh lá.',
    },
    {
      word: 'yellow',
      translation: 'vàng',
      pronunciation: '/ˈjeloʊ/',
      example: 'The sun is yellow.',
      exampleTranslation: 'Mặt trời màu vàng.',
    },
    {
      word: 'orange',
      translation: 'cam',
      pronunciation: '/ˈɔːrɪndʒ/',
      example: 'Oranges are orange.',
      exampleTranslation: 'Quả cam có màu cam.',
    },
    {
      word: 'purple',
      translation: 'tím',
      pronunciation: '/ˈpɜːrpəl/',
      example: 'Purple is a royal color.',
      exampleTranslation: 'Tím là màu hoàng gia.',
    },
    {
      word: 'pink',
      translation: 'hồng',
      pronunciation: '/pɪŋk/',
      example: 'Pink flowers are beautiful.',
      exampleTranslation: 'Hoa hồng rất đẹp.',
    },
    {
      word: 'brown',
      translation: 'nâu',
      pronunciation: '/braʊn/',
      example: 'Tree trunks are brown.',
      exampleTranslation: 'Thân cây màu nâu.',
    },
    {
      word: 'black',
      translation: 'đen',
      pronunciation: '/blæk/',
      example: 'Night is black.',
      exampleTranslation: 'Đêm màu đen.',
    },
    {
      word: 'white',
      translation: 'trắng',
      pronunciation: '/waɪt/',
      example: 'Snow is white.',
      exampleTranslation: 'Tuyết màu trắng.',
    },
    {
      word: 'gray',
      translation: 'xám',
      pronunciation: '/ɡreɪ/',
      example: 'Clouds are often gray.',
      exampleTranslation: 'Mây thường màu xám.',
    },
    {
      word: 'silver',
      translation: 'bạc',
      pronunciation: '/ˈsɪlvər/',
      example: 'Silver is shiny.',
      exampleTranslation: 'Bạc rất sáng bóng.',
    },
    {
      word: 'gold',
      translation: 'vàng',
      pronunciation: '/ɡoʊld/',
      example: 'Gold is precious.',
      exampleTranslation: 'Vàng rất quý giá.',
    },
    {
      word: 'dark',
      translation: 'tối',
      pronunciation: '/dɑːrk/',
      example: "It's dark at night.",
      exampleTranslation: 'Trời tối vào ban đêm.',
    },
    {
      word: 'light',
      translation: 'sáng',
      pronunciation: '/laɪt/',
      example: 'The room is light.',
      exampleTranslation: 'Căn phòng sáng.',
    },
    {
      word: 'bright',
      translation: 'sáng chói',
      pronunciation: '/braɪt/',
      example: 'The sun is bright.',
      exampleTranslation: 'Mặt trời sáng chói.',
    },
    {
      word: 'pale',
      translation: 'nhạt',
      pronunciation: '/peɪl/',
      example: 'She has pale skin.',
      exampleTranslation: 'Cô ấy có làn da nhạt.',
    },
    {
      word: 'deep',
      translation: 'đậm',
      pronunciation: '/diːp/',
      example: 'Deep blue ocean.',
      exampleTranslation: 'Đại dương xanh đậm.',
    },
    {
      word: 'shade',
      translation: 'sắc thái',
      pronunciation: '/ʃeɪd/',
      example: 'Different shades of green.',
      exampleTranslation: 'Các sắc thái khác nhau của màu xanh.',
    },
    {
      word: 'tone',
      translation: 'tông màu',
      pronunciation: '/toʊn/',
      example: 'Warm tone colors.',
      exampleTranslation: 'Màu sắc tông ấm.',
    },
    {
      word: 'rainbow',
      translation: 'cầu vồng',
      pronunciation: '/ˈreɪnboʊ/',
      example: 'Rainbows have many colors.',
      exampleTranslation: 'Cầu vồng có nhiều màu sắc.',
    },
    {
      word: 'multicolored',
      translation: 'nhiều màu',
      pronunciation: '/ˌmʌltiˈkʌlərd/',
      example: 'A multicolored dress.',
      exampleTranslation: 'Một chiếc váy nhiều màu.',
    },
    {
      word: 'colorful',
      translation: 'đầy màu sắc',
      pronunciation: '/ˈkʌlərfəl/',
      example: 'Colorful flowers in the garden.',
      exampleTranslation: 'Những bông hoa đầy màu sắc trong vườn.',
    },
    {
      word: 'monochrome',
      translation: 'đơn sắc',
      pronunciation: '/ˈmɑːnəkroʊm/',
      example: 'A monochrome photograph.',
      exampleTranslation: 'Một bức ảnh đơn sắc.',
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

async function uploadColorsPreset() {
  try {
    console.log('Starting to upload Colors preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(colorsPreset);

    // Convert words to PublicVocabularySetData format
    const words = colorsPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${colorsPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Colors preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadColorsPreset();

