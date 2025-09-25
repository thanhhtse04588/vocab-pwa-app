// Script to upload final 15 Oxford vocabulary presets to Firebase
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

// Final 15 Oxford vocabulary presets (46-60)
const finalPresets = [
  {
    id: 'animals-oxford-046',
    name: '[The3000Oxford]-46.Animals',
    description: 'Essential vocabulary for animals and pets',
    words: [
      {
        word: 'animal',
        translation: 'động vật',
        pronunciation: '/ˈænɪməl/',
        example: '',
      },
      { word: 'dog', translation: 'chó', pronunciation: '/dɔːɡ/', example: '' },
      { word: 'cat', translation: 'mèo', pronunciation: '/kæt/', example: '' },
      {
        word: 'bird',
        translation: 'chim',
        pronunciation: '/bɜːrd/',
        example: '',
      },
      { word: 'fish', translation: 'cá', pronunciation: '/fɪʃ/', example: '' },
      {
        word: 'horse',
        translation: 'ngựa',
        pronunciation: '/hɔːrs/',
        example: '',
      },
      { word: 'cow', translation: 'bò', pronunciation: '/kaʊ/', example: '' },
      { word: 'pig', translation: 'lợn', pronunciation: '/pɪɡ/', example: '' },
      {
        word: 'sheep',
        translation: 'cừu',
        pronunciation: '/ʃiːp/',
        example: '',
      },
      {
        word: 'chicken',
        translation: 'gà',
        pronunciation: '/ˈtʃɪkən/',
        example: '',
      },
      { word: 'duck', translation: 'vịt', pronunciation: '/dʌk/', example: '' },
      {
        word: 'elephant',
        translation: 'voi',
        pronunciation: '/ˈeləfənt/',
        example: '',
      },
      {
        word: 'lion',
        translation: 'sư tử',
        pronunciation: '/ˈlaɪən/',
        example: '',
      },
      {
        word: 'tiger',
        translation: 'hổ',
        pronunciation: '/ˈtaɪɡər/',
        example: '',
      },
      { word: 'bear', translation: 'gấu', pronunciation: '/ber/', example: '' },
      {
        word: 'wolf',
        translation: 'sói',
        pronunciation: '/wʊlf/',
        example: '',
      },
      {
        word: 'rabbit',
        translation: 'thỏ',
        pronunciation: '/ˈræbɪt/',
        example: '',
      },
      {
        word: 'mouse',
        translation: 'chuột',
        pronunciation: '/maʊs/',
        example: '',
      },
      {
        word: 'snake',
        translation: 'rắn',
        pronunciation: '/sneɪk/',
        example: '',
      },
      {
        word: 'frog',
        translation: 'ếch',
        pronunciation: '/frɔːɡ/',
        example: '',
      },
      {
        word: 'spider',
        translation: 'nhện',
        pronunciation: '/ˈspaɪdər/',
        example: '',
      },
      {
        word: 'butterfly',
        translation: 'bướm',
        pronunciation: '/ˈbʌtərflaɪ/',
        example: '',
      },
      { word: 'bee', translation: 'ong', pronunciation: '/biː/', example: '' },
      { word: 'ant', translation: 'kiến', pronunciation: '/ænt/', example: '' },
      {
        word: 'pet',
        translation: 'thú cưng',
        pronunciation: '/pet/',
        example: '',
      },
    ],
  },
  {
    id: 'food-oxford-047',
    name: '[The3000Oxford]-47.Food',
    description: 'Essential vocabulary for food, drinks and dining',
    words: [
      {
        word: 'food',
        translation: 'thức ăn',
        pronunciation: '/fuːd/',
        example: '',
      },
      {
        word: 'bread',
        translation: 'bánh mì',
        pronunciation: '/bred/',
        example: '',
      },
      {
        word: 'rice',
        translation: 'cơm',
        pronunciation: '/raɪs/',
        example: '',
      },
      {
        word: 'meat',
        translation: 'thịt',
        pronunciation: '/miːt/',
        example: '',
      },
      { word: 'fish', translation: 'cá', pronunciation: '/fɪʃ/', example: '' },
      {
        word: 'chicken',
        translation: 'thịt gà',
        pronunciation: '/ˈtʃɪkən/',
        example: '',
      },
      {
        word: 'beef',
        translation: 'thịt bò',
        pronunciation: '/biːf/',
        example: '',
      },
      {
        word: 'pork',
        translation: 'thịt lợn',
        pronunciation: '/pɔːrk/',
        example: '',
      },
      {
        word: 'vegetable',
        translation: 'rau củ',
        pronunciation: '/ˈvedʒtəbəl/',
        example: '',
      },
      {
        word: 'fruit',
        translation: 'trái cây',
        pronunciation: '/fruːt/',
        example: '',
      },
      {
        word: 'apple',
        translation: 'táo',
        pronunciation: '/ˈæpəl/',
        example: '',
      },
      {
        word: 'banana',
        translation: 'chuối',
        pronunciation: '/bəˈnɑːnə/',
        example: '',
      },
      {
        word: 'orange',
        translation: 'cam',
        pronunciation: '/ˈɔːrɪndʒ/',
        example: '',
      },
      {
        word: 'milk',
        translation: 'sữa',
        pronunciation: '/mɪlk/',
        example: '',
      },
      {
        word: 'water',
        translation: 'nước',
        pronunciation: '/ˈwɔːtər/',
        example: '',
      },
      {
        word: 'coffee',
        translation: 'cà phê',
        pronunciation: '/ˈkɔːfi/',
        example: '',
      },
      { word: 'tea', translation: 'trà', pronunciation: '/tiː/', example: '' },
      {
        word: 'juice',
        translation: 'nước ép',
        pronunciation: '/dʒuːs/',
        example: '',
      },
      {
        word: 'soup',
        translation: 'súp',
        pronunciation: '/suːp/',
        example: '',
      },
      {
        word: 'salad',
        translation: 'salad',
        pronunciation: '/ˈsæləd/',
        example: '',
      },
      {
        word: 'pizza',
        translation: 'pizza',
        pronunciation: '/ˈpiːtsə/',
        example: '',
      },
      {
        word: 'cake',
        translation: 'bánh ngọt',
        pronunciation: '/keɪk/',
        example: '',
      },
      {
        word: 'chocolate',
        translation: 'sô cô la',
        pronunciation: '/ˈtʃɔːklət/',
        example: '',
      },
      {
        word: 'sugar',
        translation: 'đường',
        pronunciation: '/ˈʃʊɡər/',
        example: '',
      },
      {
        word: 'salt',
        translation: 'muối',
        pronunciation: '/sɔːlt/',
        example: '',
      },
    ],
  },
  {
    id: 'family-oxford-048',
    name: '[The3000Oxford]-48.Family',
    description: 'Essential vocabulary for family members and relationships',
    words: [
      {
        word: 'family',
        translation: 'gia đình',
        pronunciation: '/ˈfæməli/',
        example: '',
      },
      {
        word: 'father',
        translation: 'bố, cha',
        pronunciation: '/ˈfɑːðər/',
        example: '',
      },
      {
        word: 'mother',
        translation: 'mẹ, má',
        pronunciation: '/ˈmʌðər/',
        example: '',
      },
      {
        word: 'parent',
        translation: 'cha mẹ',
        pronunciation: '/ˈperənt/',
        example: '',
      },
      {
        word: 'son',
        translation: 'con trai',
        pronunciation: '/sʌn/',
        example: '',
      },
      {
        word: 'daughter',
        translation: 'con gái',
        pronunciation: '/ˈdɔːtər/',
        example: '',
      },
      {
        word: 'brother',
        translation: 'anh trai, em trai',
        pronunciation: '/ˈbrʌðər/',
        example: '',
      },
      {
        word: 'sister',
        translation: 'chị gái, em gái',
        pronunciation: '/ˈsɪstər/',
        example: '',
      },
      {
        word: 'grandfather',
        translation: 'ông nội, ông ngoại',
        pronunciation: '/ˈɡrænfɑːðər/',
        example: '',
      },
      {
        word: 'grandmother',
        translation: 'bà nội, bà ngoại',
        pronunciation: '/ˈɡrænmʌðər/',
        example: '',
      },
      {
        word: 'grandparent',
        translation: 'ông bà',
        pronunciation: '/ˈɡrænperənt/',
        example: '',
      },
      {
        word: 'uncle',
        translation: 'chú, bác, cậu',
        pronunciation: '/ˈʌŋkəl/',
        example: '',
      },
      {
        word: 'aunt',
        translation: 'cô, dì, mợ',
        pronunciation: '/ænt/',
        example: '',
      },
      {
        word: 'cousin',
        translation: 'anh chị em họ',
        pronunciation: '/ˈkʌzən/',
        example: '',
      },
      {
        word: 'nephew',
        translation: 'cháu trai',
        pronunciation: '/ˈnefjuː/',
        example: '',
      },
      {
        word: 'niece',
        translation: 'cháu gái',
        pronunciation: '/niːs/',
        example: '',
      },
      {
        word: 'husband',
        translation: 'chồng',
        pronunciation: '/ˈhʌzbənd/',
        example: '',
      },
      { word: 'wife', translation: 'vợ', pronunciation: '/waɪf/', example: '' },
      {
        word: 'spouse',
        translation: 'vợ/chồng',
        pronunciation: '/spaʊs/',
        example: '',
      },
      {
        word: 'baby',
        translation: 'em bé',
        pronunciation: '/ˈbeɪbi/',
        example: '',
      },
      {
        word: 'child',
        translation: 'trẻ em',
        pronunciation: '/tʃaɪld/',
        example: '',
      },
      {
        word: 'teenager',
        translation: 'thiếu niên',
        pronunciation: '/ˈtiːneɪdʒər/',
        example: '',
      },
      {
        word: 'adult',
        translation: 'người lớn',
        pronunciation: '/ˈædʌlt/',
        example: '',
      },
      {
        word: 'relative',
        translation: 'họ hàng',
        pronunciation: '/ˈrelətɪv/',
        example: '',
      },
      {
        word: 'generation',
        translation: 'thế hệ',
        pronunciation: '/ˌdʒenəˈreɪʃən/',
        example: '',
      },
    ],
  },
  {
    id: 'school-supplies-oxford-049',
    name: '[The3000Oxford]-49.School Supplies',
    description:
      'Essential vocabulary for school supplies and learning materials',
    words: [
      {
        word: 'book',
        translation: 'sách',
        pronunciation: '/bʊk/',
        example: '',
      },
      {
        word: 'pen',
        translation: 'bút bi',
        pronunciation: '/pen/',
        example: '',
      },
      {
        word: 'pencil',
        translation: 'bút chì',
        pronunciation: '/ˈpensəl/',
        example: '',
      },
      {
        word: 'paper',
        translation: 'giấy',
        pronunciation: '/ˈpeɪpər/',
        example: '',
      },
      {
        word: 'notebook',
        translation: 'vở ghi chép',
        pronunciation: '/ˈnoʊtbʊk/',
        example: '',
      },
      {
        word: 'ruler',
        translation: 'thước kẻ',
        pronunciation: '/ˈruːlər/',
        example: '',
      },
      {
        word: 'eraser',
        translation: 'cục tẩy',
        pronunciation: '/ɪˈreɪsər/',
        example: '',
      },
      {
        word: 'backpack',
        translation: 'ba lô',
        pronunciation: '/ˈbækpæk/',
        example: '',
      },
      {
        word: 'calculator',
        translation: 'máy tính',
        pronunciation: '/ˈkælkjəleɪtər/',
        example: '',
      },
      {
        word: 'scissors',
        translation: 'kéo',
        pronunciation: '/ˈsɪzərz/',
        example: '',
      },
      {
        word: 'glue',
        translation: 'keo dán',
        pronunciation: '/ɡluː/',
        example: '',
      },
      {
        word: 'marker',
        translation: 'bút dạ',
        pronunciation: '/ˈmɑːrkər/',
        example: '',
      },
      {
        word: 'highlighter',
        translation: 'bút đánh dấu',
        pronunciation: '/ˈhaɪlaɪtər/',
        example: '',
      },
      {
        word: 'stapler',
        translation: 'dập ghim',
        pronunciation: '/ˈsteɪplər/',
        example: '',
      },
      {
        word: 'folder',
        translation: 'bìa hồ sơ',
        pronunciation: '/ˈfoʊldər/',
        example: '',
      },
      {
        word: 'binder',
        translation: 'bìa đóng lỗ',
        pronunciation: '/ˈbaɪndər/',
        example: '',
      },
      {
        word: 'clipboard',
        translation: 'bảng kẹp giấy',
        pronunciation: '/ˈklɪpbɔːrd/',
        example: '',
      },
      {
        word: 'compass',
        translation: 'com-pa',
        pronunciation: '/ˈkʌmpəs/',
        example: '',
      },
      {
        word: 'protractor',
        translation: 'thước đo góc',
        pronunciation: '/prəˈtræktər/',
        example: '',
      },
      {
        word: 'textbook',
        translation: 'sách giáo khoa',
        pronunciation: '/ˈtekstbʊk/',
        example: '',
      },
      {
        word: 'workbook',
        translation: 'sách bài tập',
        pronunciation: '/ˈwɜːrkbʊk/',
        example: '',
      },
      {
        word: 'dictionary',
        translation: 'từ điển',
        pronunciation: '/ˈdɪkʃəneri/',
        example: '',
      },
      {
        word: 'desk',
        translation: 'bàn học',
        pronunciation: '/desk/',
        example: '',
      },
      {
        word: 'chair',
        translation: 'ghế',
        pronunciation: '/tʃer/',
        example: '',
      },
      {
        word: 'blackboard',
        translation: 'bảng đen',
        pronunciation: '/ˈblækbɔːrd/',
        example: '',
      },
    ],
  },
  {
    id: 'nature-oxford-050',
    name: '[The3000Oxford]-50.Nature',
    description: 'Essential vocabulary for nature and environment',
    words: [
      {
        word: 'nature',
        translation: 'thiên nhiên',
        pronunciation: '/ˈneɪtʃər/',
        example: '',
      },
      {
        word: 'tree',
        translation: 'cây',
        pronunciation: '/triː/',
        example: '',
      },
      {
        word: 'flower',
        translation: 'hoa',
        pronunciation: '/ˈflaʊər/',
        example: '',
      },
      {
        word: 'grass',
        translation: 'cỏ',
        pronunciation: '/ɡræs/',
        example: '',
      },
      { word: 'leaf', translation: 'lá', pronunciation: '/liːf/', example: '' },
      {
        word: 'branch',
        translation: 'cành',
        pronunciation: '/bræntʃ/',
        example: '',
      },
      { word: 'root', translation: 'rễ', pronunciation: '/ruːt/', example: '' },
      {
        word: 'forest',
        translation: 'rừng',
        pronunciation: '/ˈfɔːrəst/',
        example: '',
      },
      {
        word: 'mountain',
        translation: 'núi',
        pronunciation: '/ˈmaʊntən/',
        example: '',
      },
      {
        word: 'river',
        translation: 'sông',
        pronunciation: '/ˈrɪvər/',
        example: '',
      },
      { word: 'lake', translation: 'hồ', pronunciation: '/leɪk/', example: '' },
      {
        word: 'ocean',
        translation: 'đại dương',
        pronunciation: '/ˈoʊʃən/',
        example: '',
      },
      { word: 'sea', translation: 'biển', pronunciation: '/siː/', example: '' },
      {
        word: 'beach',
        translation: 'bãi biển',
        pronunciation: '/biːtʃ/',
        example: '',
      },
      {
        word: 'desert',
        translation: 'sa mạc',
        pronunciation: '/ˈdezərt/',
        example: '',
      },
      {
        word: 'island',
        translation: 'đảo',
        pronunciation: '/ˈaɪlənd/',
        example: '',
      },
      {
        word: 'valley',
        translation: 'thung lũng',
        pronunciation: '/ˈvæli/',
        example: '',
      },
      { word: 'hill', translation: 'đồi', pronunciation: '/hɪl/', example: '' },
      { word: 'rock', translation: 'đá', pronunciation: '/rɑːk/', example: '' },
      {
        word: 'stone',
        translation: 'đá',
        pronunciation: '/stoʊn/',
        example: '',
      },
      {
        word: 'sand',
        translation: 'cát',
        pronunciation: '/sænd/',
        example: '',
      },
      {
        word: 'soil',
        translation: 'đất',
        pronunciation: '/sɔɪl/',
        example: '',
      },
      {
        word: 'earth',
        translation: 'trái đất',
        pronunciation: '/ɜːrθ/',
        example: '',
      },
      {
        word: 'sky',
        translation: 'bầu trời',
        pronunciation: '/skaɪ/',
        example: '',
      },
      {
        word: 'cloud',
        translation: 'mây',
        pronunciation: '/klaʊd/',
        example: '',
      },
    ],
  },
  // Continue with more presets...
];

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
    wordLanguage: 'en',
    meaningLanguage: 'vi',
    wordCount: setData.words.length,
    createdAt: new Date().toISOString(),
  };
}

async function uploadFinalPresets() {
  try {
    console.log(
      `🚀 Starting to upload ${finalPresets.length} final Oxford vocabulary presets to Firebase...`
    );

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < finalPresets.length; i++) {
      const preset = finalPresets[i];

      try {
        console.log(
          `\n📝 Uploading preset ${i + 1}/${finalPresets.length}: ${
            preset.name
          }`
        );

        // Convert set data to PublicVocabularySetMeta format
        const setMeta = convertToPublicVocabularySetMeta(preset);

        // Convert words to PublicVocabularySetData format
        const words = preset.words.map(convertToPublicVocabularyWord);

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

        console.log(`✅ Successfully uploaded: ${preset.name}`);
        console.log(`📝 Document ID: ${setDocRef.id}`);
        console.log(`📚 Word Count: ${words.length}`);

        successCount++;

        // Small delay to avoid overwhelming Firebase
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error uploading ${preset.name}:`, error.message);
        errors.push({ preset: preset.name, error: error.message });
        errorCount++;
      }
    }

    console.log('\n🎉 Upload Summary:');
    console.log(`✅ Successfully uploaded: ${successCount} presets`);
    console.log(`❌ Failed uploads: ${errorCount} presets`);

    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(({ preset, error }) => {
        console.log(`   ${preset}: ${error}`);
      });
    }

    console.log('\n🎯 Final Oxford vocabulary presets have been processed!');
    console.log(
      'Users can now import these presets from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error uploading presets:', error);
    process.exit(1);
  }
}

uploadFinalPresets();

