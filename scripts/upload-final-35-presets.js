// Script to upload final 35 Oxford vocabulary presets to Firebase
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

// Final 35 Oxford vocabulary presets (26-60)
const finalPresets = [
  {
    id: 'hobbies-oxford-026',
    name: '[The3000Oxford]-26.Hobbies',
    description: 'Essential vocabulary for hobbies and interests',
    words: [
      {
        word: 'hobby',
        translation: 'sở thích',
        pronunciation: '/ˈhɑːbi/',
        example: '',
      },
      {
        word: 'interest',
        translation: 'sở thích',
        pronunciation: '/ˈɪntrəst/',
        example: '',
      },
      {
        word: 'reading',
        translation: 'đọc sách',
        pronunciation: '/ˈriːdɪŋ/',
        example: '',
      },
      {
        word: 'writing',
        translation: 'viết',
        pronunciation: '/ˈraɪtɪŋ/',
        example: '',
      },
      {
        word: 'drawing',
        translation: 'vẽ',
        pronunciation: '/ˈdrɔːɪŋ/',
        example: '',
      },
      {
        word: 'painting',
        translation: 'vẽ tranh',
        pronunciation: '/ˈpeɪntɪŋ/',
        example: '',
      },
      {
        word: 'photography',
        translation: 'nhiếp ảnh',
        pronunciation: '/fəˈtɑːɡrəfi/',
        example: '',
      },
      {
        word: 'music',
        translation: 'âm nhạc',
        pronunciation: '/ˈmjuːzɪk/',
        example: '',
      },
      {
        word: 'singing',
        translation: 'hát',
        pronunciation: '/ˈsɪŋɪŋ/',
        example: '',
      },
      {
        word: 'dancing',
        translation: 'nhảy',
        pronunciation: '/ˈdænsɪŋ/',
        example: '',
      },
      {
        word: 'cooking',
        translation: 'nấu ăn',
        pronunciation: '/ˈkʊkɪŋ/',
        example: '',
      },
      {
        word: 'gardening',
        translation: 'làm vườn',
        pronunciation: '/ˈɡɑːrdənɪŋ/',
        example: '',
      },
      {
        word: 'fishing',
        translation: 'câu cá',
        pronunciation: '/ˈfɪʃɪŋ/',
        example: '',
      },
      {
        word: 'hiking',
        translation: 'đi bộ đường dài',
        pronunciation: '/ˈhaɪkɪŋ/',
        example: '',
      },
      {
        word: 'swimming',
        translation: 'bơi lội',
        pronunciation: '/ˈswɪmɪŋ/',
        example: '',
      },
      {
        word: 'running',
        translation: 'chạy bộ',
        pronunciation: '/ˈrʌnɪŋ/',
        example: '',
      },
      {
        word: 'cycling',
        translation: 'đạp xe',
        pronunciation: '/ˈsaɪklɪŋ/',
        example: '',
      },
      {
        word: 'yoga',
        translation: 'yoga',
        pronunciation: '/ˈjoʊɡə/',
        example: '',
      },
      {
        word: 'meditation',
        translation: 'thiền',
        pronunciation: '/ˌmedəˈteɪʃən/',
        example: '',
      },
      {
        word: 'collecting',
        translation: 'sưu tập',
        pronunciation: '/kəˈlektɪŋ/',
        example: '',
      },
      {
        word: 'puzzle',
        translation: 'câu đố',
        pronunciation: '/ˈpʌzəl/',
        example: '',
      },
      {
        word: 'game',
        translation: 'trò chơi',
        pronunciation: '/ɡeɪm/',
        example: '',
      },
      {
        word: 'movie',
        translation: 'phim',
        pronunciation: '/ˈmuːvi/',
        example: '',
      },
      {
        word: 'book',
        translation: 'sách',
        pronunciation: '/bʊk/',
        example: '',
      },
      {
        word: 'magazine',
        translation: 'tạp chí',
        pronunciation: '/ˌmæɡəˈziːn/',
        example: '',
      },
    ],
  },
  {
    id: 'appearance-oxford-027',
    name: '[The3000Oxford]-27.Appearance',
    description: 'Essential vocabulary for appearance and looks',
    words: [
      {
        word: 'appearance',
        translation: 'ngoại hình',
        pronunciation: '/əˈpɪrəns/',
        example: '',
      },
      {
        word: 'look',
        translation: 'vẻ ngoài',
        pronunciation: '/lʊk/',
        example: '',
      },
      {
        word: 'face',
        translation: 'khuôn mặt',
        pronunciation: '/feɪs/',
        example: '',
      },
      { word: 'eye', translation: 'mắt', pronunciation: '/aɪ/', example: '' },
      {
        word: 'nose',
        translation: 'mũi',
        pronunciation: '/noʊz/',
        example: '',
      },
      {
        word: 'mouth',
        translation: 'miệng',
        pronunciation: '/maʊθ/',
        example: '',
      },
      { word: 'ear', translation: 'tai', pronunciation: '/ɪr/', example: '' },
      { word: 'hair', translation: 'tóc', pronunciation: '/her/', example: '' },
      {
        word: 'beard',
        translation: 'râu',
        pronunciation: '/bɪrd/',
        example: '',
      },
      {
        word: 'mustache',
        translation: 'ria mép',
        pronunciation: '/ˈmʌstæʃ/',
        example: '',
      },
      { word: 'skin', translation: 'da', pronunciation: '/skɪn/', example: '' },
      {
        word: 'height',
        translation: 'chiều cao',
        pronunciation: '/haɪt/',
        example: '',
      },
      {
        word: 'weight',
        translation: 'cân nặng',
        pronunciation: '/weɪt/',
        example: '',
      },
      {
        word: 'tall',
        translation: 'cao',
        pronunciation: '/tɔːl/',
        example: '',
      },
      {
        word: 'short',
        translation: 'thấp',
        pronunciation: '/ʃɔːrt/',
        example: '',
      },
      { word: 'fat', translation: 'béo', pronunciation: '/fæt/', example: '' },
      { word: 'thin', translation: 'gầy', pronunciation: '/θɪn/', example: '' },
      {
        word: 'beautiful',
        translation: 'đẹp',
        pronunciation: '/ˈbjuːtəfəl/',
        example: '',
      },
      {
        word: 'handsome',
        translation: 'đẹp trai',
        pronunciation: '/ˈhænsəm/',
        example: '',
      },
      {
        word: 'ugly',
        translation: 'xấu',
        pronunciation: '/ˈʌɡli/',
        example: '',
      },
      {
        word: 'young',
        translation: 'trẻ',
        pronunciation: '/jʌŋ/',
        example: '',
      },
      { word: 'old', translation: 'già', pronunciation: '/oʊld/', example: '' },
      {
        word: 'age',
        translation: 'tuổi',
        pronunciation: '/eɪdʒ/',
        example: '',
      },
      {
        word: 'smile',
        translation: 'nụ cười',
        pronunciation: '/smaɪl/',
        example: '',
      },
      {
        word: 'expression',
        translation: 'biểu cảm',
        pronunciation: '/ɪkˈspreʃən/',
        example: '',
      },
    ],
  },
  {
    id: 'personality-oxford-028',
    name: '[The3000Oxford]-28.Personality',
    description: 'Essential vocabulary for personality traits',
    words: [
      {
        word: 'personality',
        translation: 'tính cách',
        pronunciation: '/ˌpɜːrsəˈnæləti/',
        example: '',
      },
      {
        word: 'character',
        translation: 'tính cách',
        pronunciation: '/ˈkærəktər/',
        example: '',
      },
      {
        word: 'kind',
        translation: 'tốt bụng',
        pronunciation: '/kaɪnd/',
        example: '',
      },
      {
        word: 'friendly',
        translation: 'thân thiện',
        pronunciation: '/ˈfrendli/',
        example: '',
      },
      {
        word: 'nice',
        translation: 'tốt',
        pronunciation: '/naɪs/',
        example: '',
      },
      {
        word: 'mean',
        translation: 'xấu tính',
        pronunciation: '/miːn/',
        example: '',
      },
      {
        word: 'rude',
        translation: 'thô lỗ',
        pronunciation: '/ruːd/',
        example: '',
      },
      {
        word: 'polite',
        translation: 'lịch sự',
        pronunciation: '/pəˈlaɪt/',
        example: '',
      },
      {
        word: 'honest',
        translation: 'thành thật',
        pronunciation: '/ˈɑːnəst/',
        example: '',
      },
      {
        word: 'dishonest',
        translation: 'không thành thật',
        pronunciation: '/dɪsˈɑːnəst/',
        example: '',
      },
      {
        word: 'brave',
        translation: 'dũng cảm',
        pronunciation: '/breɪv/',
        example: '',
      },
      {
        word: 'coward',
        translation: 'hèn nhát',
        pronunciation: '/ˈkaʊərd/',
        example: '',
      },
      {
        word: 'smart',
        translation: 'thông minh',
        pronunciation: '/smɑːrt/',
        example: '',
      },
      {
        word: 'stupid',
        translation: 'ngu ngốc',
        pronunciation: '/ˈstuːpəd/',
        example: '',
      },
      {
        word: 'clever',
        translation: 'thông minh',
        pronunciation: '/ˈklevər/',
        example: '',
      },
      {
        word: 'funny',
        translation: 'vui tính',
        pronunciation: '/ˈfʌni/',
        example: '',
      },
      {
        word: 'serious',
        translation: 'nghiêm túc',
        pronunciation: '/ˈsɪriəs/',
        example: '',
      },
      {
        word: 'shy',
        translation: 'nhút nhát',
        pronunciation: '/ʃaɪ/',
        example: '',
      },
      {
        word: 'confident',
        translation: 'tự tin',
        pronunciation: '/ˈkɑːnfədənt/',
        example: '',
      },
      {
        word: 'patient',
        translation: 'kiên nhẫn',
        pronunciation: '/ˈpeɪʃənt/',
        example: '',
      },
      {
        word: 'impatient',
        translation: 'thiếu kiên nhẫn',
        pronunciation: '/ɪmˈpeɪʃənt/',
        example: '',
      },
      {
        word: 'lazy',
        translation: 'lười biếng',
        pronunciation: '/ˈleɪzi/',
        example: '',
      },
      {
        word: 'hardworking',
        translation: 'chăm chỉ',
        pronunciation: '/ˈhɑːrdwɜːrkɪŋ/',
        example: '',
      },
      {
        word: 'creative',
        translation: 'sáng tạo',
        pronunciation: '/kriˈeɪtɪv/',
        example: '',
      },
      {
        word: 'artistic',
        translation: 'nghệ thuật',
        pronunciation: '/ɑːrˈtɪstɪk/',
        example: '',
      },
    ],
  },
  {
    id: 'money-oxford-029',
    name: '[The3000Oxford]-29.Money',
    description: 'Essential vocabulary for money and finance',
    words: [
      {
        word: 'money',
        translation: 'tiền',
        pronunciation: '/ˈmʌni/',
        example: '',
      },
      {
        word: 'cash',
        translation: 'tiền mặt',
        pronunciation: '/kæʃ/',
        example: '',
      },
      {
        word: 'coin',
        translation: 'tiền xu',
        pronunciation: '/kɔɪn/',
        example: '',
      },
      {
        word: 'bill',
        translation: 'tiền giấy',
        pronunciation: '/bɪl/',
        example: '',
      },
      {
        word: 'dollar',
        translation: 'đô la',
        pronunciation: '/ˈdɑːlər/',
        example: '',
      },
      {
        word: 'euro',
        translation: 'euro',
        pronunciation: '/ˈjʊroʊ/',
        example: '',
      },
      {
        word: 'pound',
        translation: 'bảng Anh',
        pronunciation: '/paʊnd/',
        example: '',
      },
      { word: 'yen', translation: 'yen', pronunciation: '/jen/', example: '' },
      {
        word: 'bank',
        translation: 'ngân hàng',
        pronunciation: '/bæŋk/',
        example: '',
      },
      {
        word: 'account',
        translation: 'tài khoản',
        pronunciation: '/əˈkaʊnt/',
        example: '',
      },
      {
        word: 'credit card',
        translation: 'thẻ tín dụng',
        pronunciation: '/ˈkredət kɑːrd/',
        example: '',
      },
      {
        word: 'debit card',
        translation: 'thẻ ghi nợ',
        pronunciation: '/ˈdebət kɑːrd/',
        example: '',
      },
      {
        word: 'check',
        translation: 'séc',
        pronunciation: '/tʃek/',
        example: '',
      },
      {
        word: 'loan',
        translation: 'khoản vay',
        pronunciation: '/loʊn/',
        example: '',
      },
      { word: 'debt', translation: 'nợ', pronunciation: '/det/', example: '' },
      {
        word: 'interest',
        translation: 'lãi suất',
        pronunciation: '/ˈɪntrəst/',
        example: '',
      },
      {
        word: 'salary',
        translation: 'lương',
        pronunciation: '/ˈsæləri/',
        example: '',
      },
      {
        word: 'wage',
        translation: 'tiền lương',
        pronunciation: '/weɪdʒ/',
        example: '',
      },
      {
        word: 'income',
        translation: 'thu nhập',
        pronunciation: '/ˈɪnkʌm/',
        example: '',
      },
      {
        word: 'expense',
        translation: 'chi phí',
        pronunciation: '/ɪkˈspens/',
        example: '',
      },
      {
        word: 'budget',
        translation: 'ngân sách',
        pronunciation: '/ˈbʌdʒət/',
        example: '',
      },
      {
        word: 'save',
        translation: 'tiết kiệm',
        pronunciation: '/seɪv/',
        example: '',
      },
      {
        word: 'spend',
        translation: 'chi tiêu',
        pronunciation: '/spend/',
        example: '',
      },
      { word: 'buy', translation: 'mua', pronunciation: '/baɪ/', example: '' },
      { word: 'sell', translation: 'bán', pronunciation: '/sel/', example: '' },
    ],
  },
  {
    id: 'shopping-oxford-030',
    name: '[The3000Oxford]-30.Shopping',
    description: 'Essential vocabulary for shopping and stores',
    words: [
      {
        word: 'shop',
        translation: 'cửa hàng',
        pronunciation: '/ʃɑːp/',
        example: '',
      },
      {
        word: 'store',
        translation: 'cửa hàng',
        pronunciation: '/stɔːr/',
        example: '',
      },
      {
        word: 'market',
        translation: 'chợ',
        pronunciation: '/ˈmɑːrkət/',
        example: '',
      },
      {
        word: 'mall',
        translation: 'trung tâm thương mại',
        pronunciation: '/mɔːl/',
        example: '',
      },
      {
        word: 'supermarket',
        translation: 'siêu thị',
        pronunciation: '/ˈsuːpərmɑːrkət/',
        example: '',
      },
      { word: 'buy', translation: 'mua', pronunciation: '/baɪ/', example: '' },
      { word: 'sell', translation: 'bán', pronunciation: '/sel/', example: '' },
      {
        word: 'price',
        translation: 'giá',
        pronunciation: '/praɪs/',
        example: '',
      },
      {
        word: 'cost',
        translation: 'chi phí',
        pronunciation: '/kɔːst/',
        example: '',
      },
      {
        word: 'expensive',
        translation: 'đắt',
        pronunciation: '/ɪkˈspensɪv/',
        example: '',
      },
      {
        word: 'cheap',
        translation: 'rẻ',
        pronunciation: '/tʃiːp/',
        example: '',
      },
      {
        word: 'money',
        translation: 'tiền',
        pronunciation: '/ˈmʌni/',
        example: '',
      },
      {
        word: 'cash',
        translation: 'tiền mặt',
        pronunciation: '/kæʃ/',
        example: '',
      },
      {
        word: 'credit card',
        translation: 'thẻ tín dụng',
        pronunciation: '/ˈkredət kɑːrd/',
        example: '',
      },
      {
        word: 'receipt',
        translation: 'hóa đơn',
        pronunciation: '/rɪˈsiːt/',
        example: '',
      },
      {
        word: 'change',
        translation: 'tiền thừa',
        pronunciation: '/tʃeɪndʒ/',
        example: '',
      },
      {
        word: 'discount',
        translation: 'giảm giá',
        pronunciation: '/ˈdɪskaʊnt/',
        example: '',
      },
      {
        word: 'sale',
        translation: 'khuyến mãi',
        pronunciation: '/seɪl/',
        example: '',
      },
      {
        word: 'customer',
        translation: 'khách hàng',
        pronunciation: '/ˈkʌstəmər/',
        example: '',
      },
      {
        word: 'cashier',
        translation: 'thủ quỹ',
        pronunciation: '/kæˈʃɪr/',
        example: '',
      },
      {
        word: 'shopping cart',
        translation: 'xe đẩy hàng',
        pronunciation: '/ˈʃɑːpɪŋ kɑːrt/',
        example: '',
      },
      {
        word: 'basket',
        translation: 'giỏ hàng',
        pronunciation: '/ˈbæskət/',
        example: '',
      },
      {
        word: 'size',
        translation: 'kích cỡ',
        pronunciation: '/saɪz/',
        example: '',
      },
      {
        word: 'color',
        translation: 'màu sắc',
        pronunciation: '/ˈkʌlər/',
        example: '',
      },
      {
        word: 'brand',
        translation: 'thương hiệu',
        pronunciation: '/brænd/',
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

