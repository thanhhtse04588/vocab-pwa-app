// Script to upload remaining 40 Oxford vocabulary presets to Firebase
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

// Remaining 40 Oxford vocabulary presets (21-60)
const remainingPresets = [
  {
    id: 'nature-oxford-021',
    name: '[The3000Oxford]-21.Nature',
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
  {
    id: 'travel-oxford-022',
    name: '[The3000Oxford]-22.Travel',
    description: 'Essential vocabulary for travel and tourism',
    words: [
      {
        word: 'travel',
        translation: 'du lịch',
        pronunciation: '/ˈtrævəl/',
        example: '',
      },
      {
        word: 'trip',
        translation: 'chuyến đi',
        pronunciation: '/trɪp/',
        example: '',
      },
      {
        word: 'journey',
        translation: 'hành trình',
        pronunciation: '/ˈdʒɜːrni/',
        example: '',
      },
      {
        word: 'vacation',
        translation: 'kỳ nghỉ',
        pronunciation: '/vəˈkeɪʃən/',
        example: '',
      },
      {
        word: 'holiday',
        translation: 'ngày lễ',
        pronunciation: '/ˈhɑːlədeɪ/',
        example: '',
      },
      {
        word: 'passport',
        translation: 'hộ chiếu',
        pronunciation: '/ˈpæspɔːrt/',
        example: '',
      },
      {
        word: 'visa',
        translation: 'thị thực',
        pronunciation: '/ˈviːzə/',
        example: '',
      },
      {
        word: 'ticket',
        translation: 'vé',
        pronunciation: '/ˈtɪkət/',
        example: '',
      },
      {
        word: 'hotel',
        translation: 'khách sạn',
        pronunciation: '/hoʊˈtel/',
        example: '',
      },
      {
        word: 'restaurant',
        translation: 'nhà hàng',
        pronunciation: '/ˈrestərɑːnt/',
        example: '',
      },
      {
        word: 'tourist',
        translation: 'khách du lịch',
        pronunciation: '/ˈtʊrɪst/',
        example: '',
      },
      {
        word: 'guide',
        translation: 'hướng dẫn viên',
        pronunciation: '/ɡaɪd/',
        example: '',
      },
      {
        word: 'map',
        translation: 'bản đồ',
        pronunciation: '/mæp/',
        example: '',
      },
      {
        word: 'luggage',
        translation: 'hành lý',
        pronunciation: '/ˈlʌɡɪdʒ/',
        example: '',
      },
      {
        word: 'suitcase',
        translation: 'vali',
        pronunciation: '/ˈsuːtkeɪs/',
        example: '',
      },
      {
        word: 'backpack',
        translation: 'ba lô',
        pronunciation: '/ˈbækpæk/',
        example: '',
      },
      {
        word: 'camera',
        translation: 'máy ảnh',
        pronunciation: '/ˈkæmərə/',
        example: '',
      },
      {
        word: 'souvenir',
        translation: 'quà lưu niệm',
        pronunciation: '/ˌsuːvəˈnɪr/',
        example: '',
      },
      {
        word: 'adventure',
        translation: 'cuộc phiêu lưu',
        pronunciation: '/ədˈventʃər/',
        example: '',
      },
      {
        word: 'explore',
        translation: 'khám phá',
        pronunciation: '/ɪkˈsplɔːr/',
        example: '',
      },
      {
        word: 'visit',
        translation: 'thăm',
        pronunciation: '/ˈvɪzət/',
        example: '',
      },
      {
        word: 'sightseeing',
        translation: 'ngắm cảnh',
        pronunciation: '/ˈsaɪtsiːɪŋ/',
        example: '',
      },
      {
        word: 'destination',
        translation: 'điểm đến',
        pronunciation: '/ˌdestəˈneɪʃən/',
        example: '',
      },
      {
        word: 'route',
        translation: 'tuyến đường',
        pronunciation: '/ruːt/',
        example: '',
      },
      {
        word: 'distance',
        translation: 'khoảng cách',
        pronunciation: '/ˈdɪstəns/',
        example: '',
      },
    ],
  },
  {
    id: 'business-oxford-023',
    name: '[The3000Oxford]-23.Business',
    description: 'Essential vocabulary for business and commerce',
    words: [
      {
        word: 'business',
        translation: 'kinh doanh',
        pronunciation: '/ˈbɪznəs/',
        example: '',
      },
      {
        word: 'company',
        translation: 'công ty',
        pronunciation: '/ˈkʌmpəni/',
        example: '',
      },
      {
        word: 'office',
        translation: 'văn phòng',
        pronunciation: '/ˈɔːfəs/',
        example: '',
      },
      {
        word: 'meeting',
        translation: 'cuộc họp',
        pronunciation: '/ˈmiːtɪŋ/',
        example: '',
      },
      {
        word: 'conference',
        translation: 'hội nghị',
        pronunciation: '/ˈkɑːnfərəns/',
        example: '',
      },
      {
        word: 'presentation',
        translation: 'thuyết trình',
        pronunciation: '/ˌprezənˈteɪʃən/',
        example: '',
      },
      {
        word: 'project',
        translation: 'dự án',
        pronunciation: '/ˈprɑːdʒekt/',
        example: '',
      },
      {
        word: 'plan',
        translation: 'kế hoạch',
        pronunciation: '/plæn/',
        example: '',
      },
      {
        word: 'budget',
        translation: 'ngân sách',
        pronunciation: '/ˈbʌdʒət/',
        example: '',
      },
      {
        word: 'profit',
        translation: 'lợi nhuận',
        pronunciation: '/ˈprɑːfət/',
        example: '',
      },
      {
        word: 'loss',
        translation: 'thua lỗ',
        pronunciation: '/lɔːs/',
        example: '',
      },
      {
        word: 'investment',
        translation: 'đầu tư',
        pronunciation: '/ɪnˈvestmənt/',
        example: '',
      },
      {
        word: 'market',
        translation: 'thị trường',
        pronunciation: '/ˈmɑːrkət/',
        example: '',
      },
      {
        word: 'customer',
        translation: 'khách hàng',
        pronunciation: '/ˈkʌstəmər/',
        example: '',
      },
      {
        word: 'client',
        translation: 'khách hàng',
        pronunciation: '/ˈklaɪənt/',
        example: '',
      },
      {
        word: 'contract',
        translation: 'hợp đồng',
        pronunciation: '/ˈkɑːntrækt/',
        example: '',
      },
      {
        word: 'agreement',
        translation: 'thỏa thuận',
        pronunciation: '/əˈɡriːmənt/',
        example: '',
      },
      {
        word: 'deal',
        translation: 'thỏa thuận',
        pronunciation: '/diːl/',
        example: '',
      },
      {
        word: 'negotiation',
        translation: 'đàm phán',
        pronunciation: '/nɪˌɡoʊʃiˈeɪʃən/',
        example: '',
      },
      {
        word: 'partnership',
        translation: 'đối tác',
        pronunciation: '/ˈpɑːrtnərʃɪp/',
        example: '',
      },
      {
        word: 'competition',
        translation: 'cạnh tranh',
        pronunciation: '/ˌkɑːmpəˈtɪʃən/',
        example: '',
      },
      {
        word: 'advertisement',
        translation: 'quảng cáo',
        pronunciation: '/ˈædvərtaɪzmənt/',
        example: '',
      },
      {
        word: 'marketing',
        translation: 'marketing',
        pronunciation: '/ˈmɑːrkətɪŋ/',
        example: '',
      },
      {
        word: 'sales',
        translation: 'bán hàng',
        pronunciation: '/seɪlz/',
        example: '',
      },
      {
        word: 'revenue',
        translation: 'doanh thu',
        pronunciation: '/ˈrevənuː/',
        example: '',
      },
    ],
  },
  {
    id: 'communication-oxford-024',
    name: '[The3000Oxford]-24.Communication',
    description: 'Essential vocabulary for communication',
    words: [
      {
        word: 'communication',
        translation: 'giao tiếp',
        pronunciation: '/kəˌmjuːnəˈkeɪʃən/',
        example: '',
      },
      {
        word: 'talk',
        translation: 'nói chuyện',
        pronunciation: '/tɔːk/',
        example: '',
      },
      {
        word: 'speak',
        translation: 'nói',
        pronunciation: '/spiːk/',
        example: '',
      },
      { word: 'say', translation: 'nói', pronunciation: '/seɪ/', example: '' },
      { word: 'tell', translation: 'kể', pronunciation: '/tel/', example: '' },
      {
        word: 'listen',
        translation: 'nghe',
        pronunciation: '/ˈlɪsən/',
        example: '',
      },
      {
        word: 'hear',
        translation: 'nghe',
        pronunciation: '/hɪr/',
        example: '',
      },
      {
        word: 'read',
        translation: 'đọc',
        pronunciation: '/riːd/',
        example: '',
      },
      {
        word: 'write',
        translation: 'viết',
        pronunciation: '/raɪt/',
        example: '',
      },
      {
        word: 'message',
        translation: 'tin nhắn',
        pronunciation: '/ˈmesɪdʒ/',
        example: '',
      },
      {
        word: 'email',
        translation: 'email',
        pronunciation: '/ˈiːmeɪl/',
        example: '',
      },
      {
        word: 'phone',
        translation: 'điện thoại',
        pronunciation: '/foʊn/',
        example: '',
      },
      {
        word: 'call',
        translation: 'gọi',
        pronunciation: '/kɔːl/',
        example: '',
      },
      {
        word: 'text',
        translation: 'nhắn tin',
        pronunciation: '/tekst/',
        example: '',
      },
      {
        word: 'chat',
        translation: 'trò chuyện',
        pronunciation: '/tʃæt/',
        example: '',
      },
      {
        word: 'conversation',
        translation: 'cuộc trò chuyện',
        pronunciation: '/ˌkɑːnvərˈseɪʃən/',
        example: '',
      },
      {
        word: 'discussion',
        translation: 'thảo luận',
        pronunciation: '/dɪˈskʌʃən/',
        example: '',
      },
      {
        word: 'argument',
        translation: 'tranh luận',
        pronunciation: '/ˈɑːrɡjumənt/',
        example: '',
      },
      {
        word: 'question',
        translation: 'câu hỏi',
        pronunciation: '/ˈkwestʃən/',
        example: '',
      },
      {
        word: 'answer',
        translation: 'câu trả lời',
        pronunciation: '/ˈænsər/',
        example: '',
      },
      {
        word: 'explain',
        translation: 'giải thích',
        pronunciation: '/ɪkˈspleɪn/',
        example: '',
      },
      {
        word: 'understand',
        translation: 'hiểu',
        pronunciation: '/ˌʌndərˈstænd/',
        example: '',
      },
      {
        word: 'misunderstand',
        translation: 'hiểu nhầm',
        pronunciation: '/ˌmɪsʌndərˈstænd/',
        example: '',
      },
      {
        word: 'translate',
        translation: 'dịch',
        pronunciation: '/trænsˈleɪt/',
        example: '',
      },
      {
        word: 'language',
        translation: 'ngôn ngữ',
        pronunciation: '/ˈlæŋɡwɪdʒ/',
        example: '',
      },
    ],
  },
  {
    id: 'relationships-oxford-025',
    name: '[The3000Oxford]-25.Relationships',
    description: 'Essential vocabulary for relationships',
    words: [
      {
        word: 'relationship',
        translation: 'mối quan hệ',
        pronunciation: '/rɪˈleɪʃənʃɪp/',
        example: '',
      },
      {
        word: 'friend',
        translation: 'bạn',
        pronunciation: '/frend/',
        example: '',
      },
      {
        word: 'friendship',
        translation: 'tình bạn',
        pronunciation: '/ˈfrendʃɪp/',
        example: '',
      },
      {
        word: 'neighbor',
        translation: 'hàng xóm',
        pronunciation: '/ˈneɪbər/',
        example: '',
      },
      {
        word: 'colleague',
        translation: 'đồng nghiệp',
        pronunciation: '/ˈkɑːliːɡ/',
        example: '',
      },
      {
        word: 'partner',
        translation: 'đối tác',
        pronunciation: '/ˈpɑːrtnər/',
        example: '',
      },
      {
        word: 'boyfriend',
        translation: 'bạn trai',
        pronunciation: '/ˈbɔɪfrend/',
        example: '',
      },
      {
        word: 'girlfriend',
        translation: 'bạn gái',
        pronunciation: '/ˈɡɜːrlfrend/',
        example: '',
      },
      { word: 'love', translation: 'yêu', pronunciation: '/lʌv/', example: '' },
      {
        word: 'marriage',
        translation: 'hôn nhân',
        pronunciation: '/ˈmærɪdʒ/',
        example: '',
      },
      {
        word: 'wedding',
        translation: 'đám cưới',
        pronunciation: '/ˈwedɪŋ/',
        example: '',
      },
      {
        word: 'divorce',
        translation: 'ly hôn',
        pronunciation: '/dɪˈvɔːrs/',
        example: '',
      },
      {
        word: 'trust',
        translation: 'tin tưởng',
        pronunciation: '/trʌst/',
        example: '',
      },
      {
        word: 'respect',
        translation: 'tôn trọng',
        pronunciation: '/rɪˈspekt/',
        example: '',
      },
      {
        word: 'support',
        translation: 'ủng hộ',
        pronunciation: '/səˈpɔːrt/',
        example: '',
      },
      {
        word: 'help',
        translation: 'giúp đỡ',
        pronunciation: '/help/',
        example: '',
      },
      {
        word: 'care',
        translation: 'quan tâm',
        pronunciation: '/ker/',
        example: '',
      },
      {
        word: 'share',
        translation: 'chia sẻ',
        pronunciation: '/ʃer/',
        example: '',
      },
      {
        word: 'together',
        translation: 'cùng nhau',
        pronunciation: '/təˈɡeðər/',
        example: '',
      },
      {
        word: 'alone',
        translation: 'một mình',
        pronunciation: '/əˈloʊn/',
        example: '',
      },
      {
        word: 'lonely',
        translation: 'cô đơn',
        pronunciation: '/ˈloʊnli/',
        example: '',
      },
      {
        word: 'social',
        translation: 'xã hội',
        pronunciation: '/ˈsoʊʃəl/',
        example: '',
      },
      {
        word: 'community',
        translation: 'cộng đồng',
        pronunciation: '/kəˈmjuːnəti/',
        example: '',
      },
      {
        word: 'society',
        translation: 'xã hội',
        pronunciation: '/səˈsaɪəti/',
        example: '',
      },
      {
        word: 'culture',
        translation: 'văn hóa',
        pronunciation: '/ˈkʌltʃər/',
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

async function uploadRemainingPresets() {
  try {
    console.log(
      `🚀 Starting to upload ${remainingPresets.length} remaining Oxford vocabulary presets to Firebase...`
    );

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < remainingPresets.length; i++) {
      const preset = remainingPresets[i];

      try {
        console.log(
          `\n📝 Uploading preset ${i + 1}/${remainingPresets.length}: ${
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

    console.log(
      '\n🎯 Remaining Oxford vocabulary presets have been processed!'
    );
    console.log(
      'Users can now import these presets from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error uploading presets:', error);
    process.exit(1);
  }
}

uploadRemainingPresets();

