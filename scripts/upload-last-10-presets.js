// Script to upload last 10 Oxford vocabulary presets to Firebase
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

// Last 10 Oxford vocabulary presets (51-60)
const lastPresets = [
  {
    id: 'travel-oxford-051',
    name: '[The3000Oxford]-51.Travel',
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
    id: 'business-oxford-052',
    name: '[The3000Oxford]-52.Business',
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
    id: 'communication-oxford-053',
    name: '[The3000Oxford]-53.Communication',
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
    id: 'relationships-oxford-054',
    name: '[The3000Oxford]-54.Relationships',
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
  {
    id: 'hobbies-oxford-055',
    name: '[The3000Oxford]-55.Hobbies',
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

async function uploadLastPresets() {
  try {
    console.log(
      `🚀 Starting to upload ${lastPresets.length} last Oxford vocabulary presets to Firebase...`
    );

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < lastPresets.length; i++) {
      const preset = lastPresets[i];

      try {
        console.log(
          `\n📝 Uploading preset ${i + 1}/${lastPresets.length}: ${preset.name}`
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

    console.log('\n🎯 Last Oxford vocabulary presets have been processed!');
    console.log(
      'Users can now import these presets from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error uploading presets:', error);
    process.exit(1);
  }
}

uploadLastPresets();

