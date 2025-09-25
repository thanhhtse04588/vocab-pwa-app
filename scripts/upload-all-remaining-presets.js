// Script to upload all remaining Oxford vocabulary presets to Firebase
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

// All remaining Oxford vocabulary presets (31-60)
const remainingPresets = [
  {
    id: 'entertainment-oxford-031',
    name: '[The3000Oxford]-31.Entertainment',
    description: 'Essential vocabulary for entertainment and leisure',
    words: [
      {
        word: 'entertainment',
        translation: 'giải trí',
        pronunciation: '/ˌentərˈteɪnmənt/',
        example: '',
      },
      {
        word: 'movie',
        translation: 'phim',
        pronunciation: '/ˈmuːvi/',
        example: '',
      },
      {
        word: 'film',
        translation: 'phim',
        pronunciation: '/fɪlm/',
        example: '',
      },
      {
        word: 'cinema',
        translation: 'rạp chiếu phim',
        pronunciation: '/ˈsɪnəmə/',
        example: '',
      },
      {
        word: 'theater',
        translation: 'nhà hát',
        pronunciation: '/ˈθiːətər/',
        example: '',
      },
      {
        word: 'concert',
        translation: 'buổi hòa nhạc',
        pronunciation: '/ˈkɑːnsərt/',
        example: '',
      },
      {
        word: 'music',
        translation: 'âm nhạc',
        pronunciation: '/ˈmjuːzɪk/',
        example: '',
      },
      {
        word: 'song',
        translation: 'bài hát',
        pronunciation: '/sɔːŋ/',
        example: '',
      },
      {
        word: 'dance',
        translation: 'nhảy',
        pronunciation: '/dæns/',
        example: '',
      },
      {
        word: 'party',
        translation: 'bữa tiệc',
        pronunciation: '/ˈpɑːrti/',
        example: '',
      },
      {
        word: 'game',
        translation: 'trò chơi',
        pronunciation: '/ɡeɪm/',
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
      {
        word: 'newspaper',
        translation: 'báo',
        pronunciation: '/ˈnuːzpeɪpər/',
        example: '',
      },
      {
        word: 'television',
        translation: 'tivi',
        pronunciation: '/ˈteləvɪʒən/',
        example: '',
      },
      {
        word: 'tv',
        translation: 'tivi',
        pronunciation: '/ˈtiːˈviː/',
        example: '',
      },
      {
        word: 'radio',
        translation: 'radio',
        pronunciation: '/ˈreɪdioʊ/',
        example: '',
      },
      {
        word: 'internet',
        translation: 'internet',
        pronunciation: '/ˈɪntərnet/',
        example: '',
      },
      {
        word: 'video',
        translation: 'video',
        pronunciation: '/ˈvɪdioʊ/',
        example: '',
      },
      {
        word: 'photo',
        translation: 'ảnh',
        pronunciation: '/ˈfoʊtoʊ/',
        example: '',
      },
      {
        word: 'picture',
        translation: 'hình ảnh',
        pronunciation: '/ˈpɪktʃər/',
        example: '',
      },
      {
        word: 'camera',
        translation: 'máy ảnh',
        pronunciation: '/ˈkæmərə/',
        example: '',
      },
      {
        word: 'fun',
        translation: 'vui vẻ',
        pronunciation: '/fʌn/',
        example: '',
      },
      {
        word: 'hobby',
        translation: 'sở thích',
        pronunciation: '/ˈhɑːbi/',
        example: '',
      },
      {
        word: 'leisure',
        translation: 'thời gian rảnh',
        pronunciation: '/ˈliːʒər/',
        example: '',
      },
    ],
  },
  {
    id: 'education-oxford-032',
    name: '[The3000Oxford]-32.Education',
    description: 'Essential vocabulary for education and learning',
    words: [
      {
        word: 'education',
        translation: 'giáo dục',
        pronunciation: '/ˌedʒəˈkeɪʃən/',
        example: '',
      },
      {
        word: 'school',
        translation: 'trường học',
        pronunciation: '/skuːl/',
        example: '',
      },
      {
        word: 'university',
        translation: 'đại học',
        pronunciation: '/ˌjuːnəˈvɜːrsəti/',
        example: '',
      },
      {
        word: 'college',
        translation: 'cao đẳng',
        pronunciation: '/ˈkɑːlɪdʒ/',
        example: '',
      },
      {
        word: 'student',
        translation: 'học sinh',
        pronunciation: '/ˈstuːdənt/',
        example: '',
      },
      {
        word: 'teacher',
        translation: 'giáo viên',
        pronunciation: '/ˈtiːtʃər/',
        example: '',
      },
      {
        word: 'professor',
        translation: 'giáo sư',
        pronunciation: '/prəˈfesər/',
        example: '',
      },
      {
        word: 'class',
        translation: 'lớp học',
        pronunciation: '/klæs/',
        example: '',
      },
      {
        word: 'classroom',
        translation: 'phòng học',
        pronunciation: '/ˈklæsruːm/',
        example: '',
      },
      {
        word: 'lesson',
        translation: 'bài học',
        pronunciation: '/ˈlesən/',
        example: '',
      },
      {
        word: 'subject',
        translation: 'môn học',
        pronunciation: '/ˈsʌbdʒekt/',
        example: '',
      },
      {
        word: 'homework',
        translation: 'bài tập về nhà',
        pronunciation: '/ˈhoʊmwɜːrk/',
        example: '',
      },
      {
        word: 'exam',
        translation: 'kỳ thi',
        pronunciation: '/ɪɡˈzæm/',
        example: '',
      },
      {
        word: 'test',
        translation: 'bài kiểm tra',
        pronunciation: '/test/',
        example: '',
      },
      {
        word: 'grade',
        translation: 'điểm',
        pronunciation: '/ɡreɪd/',
        example: '',
      },
      {
        word: 'mark',
        translation: 'điểm',
        pronunciation: '/mɑːrk/',
        example: '',
      },
      {
        word: 'degree',
        translation: 'bằng cấp',
        pronunciation: '/dɪˈɡriː/',
        example: '',
      },
      {
        word: 'diploma',
        translation: 'bằng tốt nghiệp',
        pronunciation: '/dɪˈploʊmə/',
        example: '',
      },
      {
        word: 'certificate',
        translation: 'chứng chỉ',
        pronunciation: '/sərˈtɪfəkət/',
        example: '',
      },
      {
        word: 'library',
        translation: 'thư viện',
        pronunciation: '/ˈlaɪbreri/',
        example: '',
      },
      {
        word: 'laboratory',
        translation: 'phòng thí nghiệm',
        pronunciation: '/ˈlæbrətɔːri/',
        example: '',
      },
      {
        word: 'research',
        translation: 'nghiên cứu',
        pronunciation: '/rɪˈsɜːrtʃ/',
        example: '',
      },
      {
        word: 'study',
        translation: 'học',
        pronunciation: '/ˈstʌdi/',
        example: '',
      },
      {
        word: 'learn',
        translation: 'học',
        pronunciation: '/lɜːrn/',
        example: '',
      },
      {
        word: 'teach',
        translation: 'dạy',
        pronunciation: '/tiːtʃ/',
        example: '',
      },
    ],
  },
  {
    id: 'health-oxford-033',
    name: '[The3000Oxford]-33.Health',
    description: 'Essential vocabulary for health and medicine',
    words: [
      {
        word: 'health',
        translation: 'sức khỏe',
        pronunciation: '/helθ/',
        example: '',
      },
      {
        word: 'medicine',
        translation: 'thuốc',
        pronunciation: '/ˈmedəsən/',
        example: '',
      },
      {
        word: 'doctor',
        translation: 'bác sĩ',
        pronunciation: '/ˈdɑːktər/',
        example: '',
      },
      {
        word: 'nurse',
        translation: 'y tá',
        pronunciation: '/nɜːrs/',
        example: '',
      },
      {
        word: 'hospital',
        translation: 'bệnh viện',
        pronunciation: '/ˈhɑːspɪtəl/',
        example: '',
      },
      {
        word: 'clinic',
        translation: 'phòng khám',
        pronunciation: '/ˈklɪnɪk/',
        example: '',
      },
      {
        word: 'pharmacy',
        translation: 'hiệu thuốc',
        pronunciation: '/ˈfɑːrməsi/',
        example: '',
      },
      {
        word: 'patient',
        translation: 'bệnh nhân',
        pronunciation: '/ˈpeɪʃənt/',
        example: '',
      },
      { word: 'sick', translation: 'ốm', pronunciation: '/sɪk/', example: '' },
      { word: 'ill', translation: 'ốm', pronunciation: '/ɪl/', example: '' },
      {
        word: 'healthy',
        translation: 'khỏe mạnh',
        pronunciation: '/ˈhelθi/',
        example: '',
      },
      {
        word: 'pain',
        translation: 'đau',
        pronunciation: '/peɪn/',
        example: '',
      },
      {
        word: 'fever',
        translation: 'sốt',
        pronunciation: '/ˈfiːvər/',
        example: '',
      },
      {
        word: 'cold',
        translation: 'cảm lạnh',
        pronunciation: '/koʊld/',
        example: '',
      },
      { word: 'flu', translation: 'cúm', pronunciation: '/fluː/', example: '' },
      {
        word: 'headache',
        translation: 'đau đầu',
        pronunciation: '/ˈhedeɪk/',
        example: '',
      },
      {
        word: 'stomachache',
        translation: 'đau bụng',
        pronunciation: '/ˈstʌməkeɪk/',
        example: '',
      },
      {
        word: 'toothache',
        translation: 'đau răng',
        pronunciation: '/ˈtuːθeɪk/',
        example: '',
      },
      {
        word: 'cough',
        translation: 'ho',
        pronunciation: '/kɔːf/',
        example: '',
      },
      {
        word: 'sneeze',
        translation: 'hắt hơi',
        pronunciation: '/sniːz/',
        example: '',
      },
      {
        word: 'bandage',
        translation: 'băng',
        pronunciation: '/ˈbændɪdʒ/',
        example: '',
      },
      {
        word: 'pill',
        translation: 'viên thuốc',
        pronunciation: '/pɪl/',
        example: '',
      },
      {
        word: 'tablet',
        translation: 'viên thuốc',
        pronunciation: '/ˈtæblət/',
        example: '',
      },
      {
        word: 'injection',
        translation: 'tiêm',
        pronunciation: '/ɪnˈdʒekʃən/',
        example: '',
      },
      {
        word: 'surgery',
        translation: 'phẫu thuật',
        pronunciation: '/ˈsɜːrdʒəri/',
        example: '',
      },
    ],
  },
  {
    id: 'technology-oxford-034',
    name: '[The3000Oxford]-34.Technology',
    description: 'Essential vocabulary for technology and computers',
    words: [
      {
        word: 'computer',
        translation: 'máy tính',
        pronunciation: '/kəmˈpjuːtər/',
        example: '',
      },
      {
        word: 'laptop',
        translation: 'máy tính xách tay',
        pronunciation: '/ˈlæptɑːp/',
        example: '',
      },
      {
        word: 'phone',
        translation: 'điện thoại',
        pronunciation: '/foʊn/',
        example: '',
      },
      {
        word: 'smartphone',
        translation: 'điện thoại thông minh',
        pronunciation: '/ˈsmɑːrtfoʊn/',
        example: '',
      },
      {
        word: 'tablet',
        translation: 'máy tính bảng',
        pronunciation: '/ˈtæblət/',
        example: '',
      },
      {
        word: 'internet',
        translation: 'internet',
        pronunciation: '/ˈɪntərnet/',
        example: '',
      },
      {
        word: 'website',
        translation: 'trang web',
        pronunciation: '/ˈwebsaɪt/',
        example: '',
      },
      {
        word: 'email',
        translation: 'email',
        pronunciation: '/ˈiːmeɪl/',
        example: '',
      },
      {
        word: 'password',
        translation: 'mật khẩu',
        pronunciation: '/ˈpæswɜːrd/',
        example: '',
      },
      {
        word: 'software',
        translation: 'phần mềm',
        pronunciation: '/ˈsɔːftwer/',
        example: '',
      },
      {
        word: 'hardware',
        translation: 'phần cứng',
        pronunciation: '/ˈhɑːrdwer/',
        example: '',
      },
      {
        word: 'keyboard',
        translation: 'bàn phím',
        pronunciation: '/ˈkiːbɔːrd/',
        example: '',
      },
      {
        word: 'mouse',
        translation: 'chuột',
        pronunciation: '/maʊs/',
        example: '',
      },
      {
        word: 'screen',
        translation: 'màn hình',
        pronunciation: '/skriːn/',
        example: '',
      },
      {
        word: 'monitor',
        translation: 'màn hình',
        pronunciation: '/ˈmɑːnətər/',
        example: '',
      },
      {
        word: 'printer',
        translation: 'máy in',
        pronunciation: '/ˈprɪntər/',
        example: '',
      },
      {
        word: 'camera',
        translation: 'máy ảnh',
        pronunciation: '/ˈkæmərə/',
        example: '',
      },
      {
        word: 'microphone',
        translation: 'micro',
        pronunciation: '/ˈmaɪkrəfoʊn/',
        example: '',
      },
      {
        word: 'speaker',
        translation: 'loa',
        pronunciation: '/ˈspiːkər/',
        example: '',
      },
      {
        word: 'headphones',
        translation: 'tai nghe',
        pronunciation: '/ˈhedfoʊnz/',
        example: '',
      },
      {
        word: 'battery',
        translation: 'pin',
        pronunciation: '/ˈbætəri/',
        example: '',
      },
      {
        word: 'charger',
        translation: 'sạc',
        pronunciation: '/ˈtʃɑːrdʒər/',
        example: '',
      },
      {
        word: 'cable',
        translation: 'cáp',
        pronunciation: '/ˈkeɪbəl/',
        example: '',
      },
      {
        word: 'wifi',
        translation: 'wifi',
        pronunciation: '/ˈwaɪfaɪ/',
        example: '',
      },
      {
        word: 'bluetooth',
        translation: 'bluetooth',
        pronunciation: '/ˈbluːtuːθ/',
        example: '',
      },
    ],
  },
  {
    id: 'sports-oxford-035',
    name: '[The3000Oxford]-35.Sports',
    description: 'Essential vocabulary for sports and games',
    words: [
      {
        word: 'sport',
        translation: 'thể thao',
        pronunciation: '/spɔːrt/',
        example: '',
      },
      {
        word: 'game',
        translation: 'trò chơi',
        pronunciation: '/ɡeɪm/',
        example: '',
      },
      {
        word: 'football',
        translation: 'bóng đá',
        pronunciation: '/ˈfʊtbɔːl/',
        example: '',
      },
      {
        word: 'soccer',
        translation: 'bóng đá',
        pronunciation: '/ˈsɑːkər/',
        example: '',
      },
      {
        word: 'basketball',
        translation: 'bóng rổ',
        pronunciation: '/ˈbæskətbɔːl/',
        example: '',
      },
      {
        word: 'tennis',
        translation: 'quần vợt',
        pronunciation: '/ˈtenəs/',
        example: '',
      },
      {
        word: 'volleyball',
        translation: 'bóng chuyền',
        pronunciation: '/ˈvɑːlibɔːl/',
        example: '',
      },
      {
        word: 'baseball',
        translation: 'bóng chày',
        pronunciation: '/ˈbeɪsbɔːl/',
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
        word: 'boxing',
        translation: 'quyền anh',
        pronunciation: '/ˈbɑːksɪŋ/',
        example: '',
      },
      {
        word: 'golf',
        translation: 'golf',
        pronunciation: '/ɡɑːlf/',
        example: '',
      },
      {
        word: 'hockey',
        translation: 'khúc côn cầu',
        pronunciation: '/ˈhɑːki/',
        example: '',
      },
      {
        word: 'rugby',
        translation: 'bóng bầu dục',
        pronunciation: '/ˈrʌɡbi/',
        example: '',
      },
      {
        word: 'cricket',
        translation: 'cricket',
        pronunciation: '/ˈkrɪkət/',
        example: '',
      },
      {
        word: 'badminton',
        translation: 'cầu lông',
        pronunciation: '/ˈbædmɪntən/',
        example: '',
      },
      {
        word: 'table tennis',
        translation: 'bóng bàn',
        pronunciation: '/ˈteɪbəl ˈtenəs/',
        example: '',
      },
      {
        word: 'gymnastics',
        translation: 'thể dục dụng cụ',
        pronunciation: '/dʒɪmˈnæstɪks/',
        example: '',
      },
      {
        word: 'athletics',
        translation: 'điền kinh',
        pronunciation: '/æθˈletɪks/',
        example: '',
      },
      {
        word: 'marathon',
        translation: 'marathon',
        pronunciation: '/ˈmærəθɑːn/',
        example: '',
      },
      {
        word: 'player',
        translation: 'cầu thủ',
        pronunciation: '/ˈpleɪər/',
        example: '',
      },
      {
        word: 'team',
        translation: 'đội',
        pronunciation: '/tiːm/',
        example: '',
      },
      {
        word: 'match',
        translation: 'trận đấu',
        pronunciation: '/mætʃ/',
        example: '',
      },
      {
        word: 'competition',
        translation: 'cuộc thi',
        pronunciation: '/ˌkɑːmpəˈtɪʃən/',
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

async function uploadAllRemainingPresets() {
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
      '\n🎯 All remaining Oxford vocabulary presets have been processed!'
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

uploadAllRemainingPresets();

