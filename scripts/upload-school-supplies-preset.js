// Script to upload School Supplies vocabulary preset to Firebase
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

// School Supplies vocabulary preset data
const schoolSuppliesPreset = {
  id: 'school-supplies-oxford-001',
  name: 'Từ vựng về đồ dùng học tập - School Supplies',
  description:
    'Essential vocabulary for school supplies and learning materials based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'book',
      translation: 'sách',
      pronunciation: '/bʊk/',
      example: 'I need to buy a new book for my English class.',
      exampleTranslation: 'Tôi cần mua một cuốn sách mới cho lớp tiếng Anh.',
    },
    {
      word: 'pen',
      translation: 'bút bi',
      pronunciation: '/pen/',
      example: 'Can you lend me a pen?',
      exampleTranslation: 'Bạn có thể cho tôi mượn bút bi không?',
    },
    {
      word: 'pencil',
      translation: 'bút chì',
      pronunciation: '/ˈpensəl/',
      example: 'I prefer using a pencil for drawing.',
      exampleTranslation: 'Tôi thích dùng bút chì để vẽ.',
    },
    {
      word: 'paper',
      translation: 'giấy',
      pronunciation: '/ˈpeɪpər/',
      example: 'Please write your name on this paper.',
      exampleTranslation: 'Hãy viết tên bạn lên tờ giấy này.',
    },
    {
      word: 'notebook',
      translation: 'vở ghi chép',
      pronunciation: '/ˈnoʊtbʊk/',
      example: 'I write my homework in my notebook.',
      exampleTranslation: 'Tôi viết bài tập về nhà vào vở ghi chép.',
    },
    {
      word: 'ruler',
      translation: 'thước kẻ',
      pronunciation: '/ˈruːlər/',
      example: 'Use a ruler to draw straight lines.',
      exampleTranslation: 'Dùng thước kẻ để vẽ đường thẳng.',
    },
    {
      word: 'eraser',
      translation: 'cục tẩy',
      pronunciation: '/ɪˈreɪsər/',
      example: 'I need an eraser to fix my mistake.',
      exampleTranslation: 'Tôi cần cục tẩy để sửa lỗi.',
    },
    {
      word: 'backpack',
      translation: 'ba lô',
      pronunciation: '/ˈbækpæk/',
      example: 'My backpack is heavy with all my books.',
      exampleTranslation: 'Ba lô của tôi nặng vì có nhiều sách.',
    },
    {
      word: 'calculator',
      translation: 'máy tính',
      pronunciation: '/ˈkælkjəleɪtər/',
      example: 'You can use a calculator for this math problem.',
      exampleTranslation: 'Bạn có thể dùng máy tính cho bài toán này.',
    },
    {
      word: 'scissors',
      translation: 'kéo',
      pronunciation: '/ˈsɪzərz/',
      example: 'Be careful with the scissors!',
      exampleTranslation: 'Cẩn thận với cái kéo!',
    },
    {
      word: 'glue',
      translation: 'keo dán',
      pronunciation: '/ɡluː/',
      example: 'I need glue to stick these papers together.',
      exampleTranslation: 'Tôi cần keo dán để dán những tờ giấy này lại.',
    },
    {
      word: 'marker',
      translation: 'bút dạ',
      pronunciation: '/ˈmɑːrkər/',
      example: 'The teacher uses a red marker to correct mistakes.',
      exampleTranslation: 'Cô giáo dùng bút dạ đỏ để sửa lỗi.',
    },
    {
      word: 'highlighter',
      translation: 'bút đánh dấu',
      pronunciation: '/ˈhaɪlaɪtər/',
      example: 'Use a highlighter to mark important information.',
      exampleTranslation: 'Dùng bút đánh dấu để đánh dấu thông tin quan trọng.',
    },
    {
      word: 'stapler',
      translation: 'dập ghim',
      pronunciation: '/ˈsteɪplər/',
      example: 'I need a stapler to bind these pages.',
      exampleTranslation: 'Tôi cần dập ghim để đóng những trang này.',
    },
    {
      word: 'folder',
      translation: 'bìa hồ sơ',
      pronunciation: '/ˈfoʊldər/',
      example: 'Put your homework in the blue folder.',
      exampleTranslation: 'Đặt bài tập về nhà vào bìa hồ sơ màu xanh.',
    },
    {
      word: 'binder',
      translation: 'bìa đóng lỗ',
      pronunciation: '/ˈbaɪndər/',
      example: 'I organize my notes in a three-ring binder.',
      exampleTranslation: 'Tôi sắp xếp ghi chú trong bìa đóng lỗ ba vòng.',
    },
    {
      word: 'clipboard',
      translation: 'bảng kẹp giấy',
      pronunciation: '/ˈklɪpbɔːrd/',
      example: 'The teacher uses a clipboard to take attendance.',
      exampleTranslation: 'Cô giáo dùng bảng kẹp giấy để điểm danh.',
    },
    {
      word: 'compass',
      translation: 'com-pa',
      pronunciation: '/ˈkʌmpəs/',
      example: 'Use a compass to draw perfect circles.',
      exampleTranslation: 'Dùng com-pa để vẽ hình tròn hoàn hảo.',
    },
    {
      word: 'protractor',
      translation: 'thước đo góc',
      pronunciation: '/prəˈtræktər/',
      example: 'We need a protractor for geometry class.',
      exampleTranslation: 'Chúng ta cần thước đo góc cho lớp hình học.',
    },
    {
      word: 'textbook',
      translation: 'sách giáo khoa',
      pronunciation: '/ˈtekstbʊk/',
      example: 'Open your textbook to page 25.',
      exampleTranslation: 'Mở sách giáo khoa trang 25.',
    },
    {
      word: 'workbook',
      translation: 'sách bài tập',
      pronunciation: '/ˈwɜːrkbʊk/',
      example: 'Complete the exercises in your workbook.',
      exampleTranslation: 'Hoàn thành các bài tập trong sách bài tập.',
    },
    {
      word: 'dictionary',
      translation: 'từ điển',
      pronunciation: '/ˈdɪkʃəneri/',
      example: 'Look up the word in your dictionary.',
      exampleTranslation: 'Tra từ trong từ điển của bạn.',
    },
    {
      word: 'desk',
      translation: 'bàn học',
      pronunciation: '/desk/',
      example: 'Clean your desk before leaving.',
      exampleTranslation: 'Dọn dẹp bàn học trước khi rời đi.',
    },
    {
      word: 'chair',
      translation: 'ghế',
      pronunciation: '/tʃer/',
      example: 'Please sit in your chair.',
      exampleTranslation: 'Hãy ngồi vào ghế của bạn.',
    },
    {
      word: 'blackboard',
      translation: 'bảng đen',
      pronunciation: '/ˈblækbɔːrd/',
      example: 'The teacher writes on the blackboard.',
      exampleTranslation: 'Cô giáo viết trên bảng đen.',
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

async function uploadSchoolSuppliesPreset() {
  try {
    console.log('Starting to upload School Supplies preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(schoolSuppliesPreset);

    // Convert words to PublicVocabularySetData format
    const words = schoolSuppliesPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${schoolSuppliesPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 School Supplies preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadSchoolSuppliesPreset();
