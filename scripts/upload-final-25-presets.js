// Script to upload final 25 Oxford vocabulary presets to Firebase
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

// Final 25 Oxford vocabulary presets (36-60)
const finalPresets = [
  {
    id: 'jobs-oxford-036',
    name: '[The3000Oxford]-36.Jobs',
    description: 'Essential vocabulary for jobs and work',
    words: [
      {
        word: 'job',
        translation: 'công việc',
        pronunciation: '/dʒɑːb/',
        example: '',
      },
      {
        word: 'work',
        translation: 'làm việc',
        pronunciation: '/wɜːrk/',
        example: '',
      },
      {
        word: 'doctor',
        translation: 'bác sĩ',
        pronunciation: '/ˈdɑːktər/',
        example: '',
      },
      {
        word: 'teacher',
        translation: 'giáo viên',
        pronunciation: '/ˈtiːtʃər/',
        example: '',
      },
      {
        word: 'nurse',
        translation: 'y tá',
        pronunciation: '/nɜːrs/',
        example: '',
      },
      {
        word: 'engineer',
        translation: 'kỹ sư',
        pronunciation: '/ˌendʒəˈnɪr/',
        example: '',
      },
      {
        word: 'lawyer',
        translation: 'luật sư',
        pronunciation: '/ˈlɔːjər/',
        example: '',
      },
      {
        word: 'police',
        translation: 'cảnh sát',
        pronunciation: '/pəˈliːs/',
        example: '',
      },
      {
        word: 'firefighter',
        translation: 'lính cứu hỏa',
        pronunciation: '/ˈfaɪərfaɪtər/',
        example: '',
      },
      {
        word: 'chef',
        translation: 'đầu bếp',
        pronunciation: '/ʃef/',
        example: '',
      },
      {
        word: 'cook',
        translation: 'đầu bếp',
        pronunciation: '/kʊk/',
        example: '',
      },
      {
        word: 'waiter',
        translation: 'bồi bàn',
        pronunciation: '/ˈweɪtər/',
        example: '',
      },
      {
        word: 'waitress',
        translation: 'bồi bàn nữ',
        pronunciation: '/ˈweɪtrəs/',
        example: '',
      },
      {
        word: 'driver',
        translation: 'tài xế',
        pronunciation: '/ˈdraɪvər/',
        example: '',
      },
      {
        word: 'pilot',
        translation: 'phi công',
        pronunciation: '/ˈpaɪlət/',
        example: '',
      },
      {
        word: 'soldier',
        translation: 'lính',
        pronunciation: '/ˈsoʊldʒər/',
        example: '',
      },
      {
        word: 'farmer',
        translation: 'nông dân',
        pronunciation: '/ˈfɑːrmər/',
        example: '',
      },
      {
        word: 'artist',
        translation: 'nghệ sĩ',
        pronunciation: '/ˈɑːrtɪst/',
        example: '',
      },
      {
        word: 'musician',
        translation: 'nhạc sĩ',
        pronunciation: '/mjuˈzɪʃən/',
        example: '',
      },
      {
        word: 'actor',
        translation: 'diễn viên',
        pronunciation: '/ˈæktər/',
        example: '',
      },
      {
        word: 'actress',
        translation: 'diễn viên nữ',
        pronunciation: '/ˈæktrəs/',
        example: '',
      },
      {
        word: 'writer',
        translation: 'nhà văn',
        pronunciation: '/ˈraɪtər/',
        example: '',
      },
      {
        word: 'journalist',
        translation: 'nhà báo',
        pronunciation: '/ˈdʒɜːrnəlɪst/',
        example: '',
      },
      {
        word: 'businessman',
        translation: 'doanh nhân',
        pronunciation: '/ˈbɪznəsmæn/',
        example: '',
      },
      {
        word: 'manager',
        translation: 'quản lý',
        pronunciation: '/ˈmænɪdʒər/',
        example: '',
      },
    ],
  },
  {
    id: 'transportation-oxford-037',
    name: '[The3000Oxford]-37.Transportation',
    description: 'Essential vocabulary for transportation and travel',
    words: [
      {
        word: 'car',
        translation: 'ô tô',
        pronunciation: '/kɑːr/',
        example: '',
      },
      {
        word: 'bus',
        translation: 'xe buýt',
        pronunciation: '/bʌs/',
        example: '',
      },
      {
        word: 'train',
        translation: 'tàu hỏa',
        pronunciation: '/treɪn/',
        example: '',
      },
      {
        word: 'plane',
        translation: 'máy bay',
        pronunciation: '/pleɪn/',
        example: '',
      },
      {
        word: 'airplane',
        translation: 'máy bay',
        pronunciation: '/ˈerpleɪn/',
        example: '',
      },
      {
        word: 'ship',
        translation: 'tàu thủy',
        pronunciation: '/ʃɪp/',
        example: '',
      },
      {
        word: 'boat',
        translation: 'thuyền',
        pronunciation: '/boʊt/',
        example: '',
      },
      {
        word: 'bicycle',
        translation: 'xe đạp',
        pronunciation: '/ˈbaɪsəkəl/',
        example: '',
      },
      {
        word: 'bike',
        translation: 'xe đạp',
        pronunciation: '/baɪk/',
        example: '',
      },
      {
        word: 'motorcycle',
        translation: 'xe máy',
        pronunciation: '/ˈmoʊtərsaɪkəl/',
        example: '',
      },
      {
        word: 'taxi',
        translation: 'taxi',
        pronunciation: '/ˈtæksi/',
        example: '',
      },
      {
        word: 'truck',
        translation: 'xe tải',
        pronunciation: '/trʌk/',
        example: '',
      },
      {
        word: 'van',
        translation: 'xe tải nhỏ',
        pronunciation: '/væn/',
        example: '',
      },
      {
        word: 'subway',
        translation: 'tàu điện ngầm',
        pronunciation: '/ˈsʌbweɪ/',
        example: '',
      },
      {
        word: 'metro',
        translation: 'tàu điện ngầm',
        pronunciation: '/ˈmetroʊ/',
        example: '',
      },
      {
        word: 'helicopter',
        translation: 'trực thăng',
        pronunciation: '/ˈhelɪkɑːptər/',
        example: '',
      },
      {
        word: 'rocket',
        translation: 'tên lửa',
        pronunciation: '/ˈrɑːkət/',
        example: '',
      },
      {
        word: 'driver',
        translation: 'tài xế',
        pronunciation: '/ˈdraɪvər/',
        example: '',
      },
      {
        word: 'passenger',
        translation: 'hành khách',
        pronunciation: '/ˈpæsəndʒər/',
        example: '',
      },
      {
        word: 'ticket',
        translation: 'vé',
        pronunciation: '/ˈtɪkət/',
        example: '',
      },
      {
        word: 'station',
        translation: 'ga',
        pronunciation: '/ˈsteɪʃən/',
        example: '',
      },
      {
        word: 'airport',
        translation: 'sân bay',
        pronunciation: '/ˈerpɔːrt/',
        example: '',
      },
      {
        word: 'port',
        translation: 'cảng',
        pronunciation: '/pɔːrt/',
        example: '',
      },
      {
        word: 'road',
        translation: 'đường',
        pronunciation: '/roʊd/',
        example: '',
      },
      {
        word: 'street',
        translation: 'phố',
        pronunciation: '/striːt/',
        example: '',
      },
    ],
  },
  {
    id: 'house-oxford-038',
    name: '[The3000Oxford]-38.House',
    description: 'Essential vocabulary for house and home',
    words: [
      {
        word: 'house',
        translation: 'nhà',
        pronunciation: '/haʊs/',
        example: '',
      },
      {
        word: 'home',
        translation: 'nhà',
        pronunciation: '/hoʊm/',
        example: '',
      },
      {
        word: 'room',
        translation: 'phòng',
        pronunciation: '/ruːm/',
        example: '',
      },
      {
        word: 'bedroom',
        translation: 'phòng ngủ',
        pronunciation: '/ˈbedruːm/',
        example: '',
      },
      {
        word: 'bathroom',
        translation: 'phòng tắm',
        pronunciation: '/ˈbæθruːm/',
        example: '',
      },
      {
        word: 'kitchen',
        translation: 'bếp',
        pronunciation: '/ˈkɪtʃən/',
        example: '',
      },
      {
        word: 'living room',
        translation: 'phòng khách',
        pronunciation: '/ˈlɪvɪŋ ruːm/',
        example: '',
      },
      {
        word: 'dining room',
        translation: 'phòng ăn',
        pronunciation: '/ˈdaɪnɪŋ ruːm/',
        example: '',
      },
      {
        word: 'garage',
        translation: 'nhà để xe',
        pronunciation: '/ɡəˈrɑːʒ/',
        example: '',
      },
      {
        word: 'garden',
        translation: 'vườn',
        pronunciation: '/ˈɡɑːrdən/',
        example: '',
      },
      {
        word: 'yard',
        translation: 'sân',
        pronunciation: '/jɑːrd/',
        example: '',
      },
      {
        word: 'door',
        translation: 'cửa',
        pronunciation: '/dɔːr/',
        example: '',
      },
      {
        word: 'window',
        translation: 'cửa sổ',
        pronunciation: '/ˈwɪndoʊ/',
        example: '',
      },
      {
        word: 'wall',
        translation: 'tường',
        pronunciation: '/wɔːl/',
        example: '',
      },
      {
        word: 'floor',
        translation: 'sàn nhà',
        pronunciation: '/flɔːr/',
        example: '',
      },
      {
        word: 'ceiling',
        translation: 'trần nhà',
        pronunciation: '/ˈsiːlɪŋ/',
        example: '',
      },
      {
        word: 'roof',
        translation: 'mái nhà',
        pronunciation: '/ruːf/',
        example: '',
      },
      {
        word: 'stairs',
        translation: 'cầu thang',
        pronunciation: '/sterz/',
        example: '',
      },
      {
        word: 'elevator',
        translation: 'thang máy',
        pronunciation: '/ˈeləveɪtər/',
        example: '',
      },
      {
        word: 'furniture',
        translation: 'đồ nội thất',
        pronunciation: '/ˈfɜːrnɪtʃər/',
        example: '',
      },
      {
        word: 'bed',
        translation: 'giường',
        pronunciation: '/bed/',
        example: '',
      },
      {
        word: 'table',
        translation: 'bàn',
        pronunciation: '/ˈteɪbəl/',
        example: '',
      },
      {
        word: 'chair',
        translation: 'ghế',
        pronunciation: '/tʃer/',
        example: '',
      },
      {
        word: 'sofa',
        translation: 'ghế sofa',
        pronunciation: '/ˈsoʊfə/',
        example: '',
      },
      {
        word: 'refrigerator',
        translation: 'tủ lạnh',
        pronunciation: '/rɪˈfrɪdʒəreɪtər/',
        example: '',
      },
    ],
  },
  {
    id: 'clothes-oxford-039',
    name: '[The3000Oxford]-39.Clothes',
    description: 'Essential vocabulary for clothing and fashion',
    words: [
      {
        word: 'clothes',
        translation: 'quần áo',
        pronunciation: '/kloʊðz/',
        example: '',
      },
      {
        word: 'shirt',
        translation: 'áo sơ mi',
        pronunciation: '/ʃɜːrt/',
        example: '',
      },
      {
        word: 'pants',
        translation: 'quần dài',
        pronunciation: '/pænts/',
        example: '',
      },
      {
        word: 'dress',
        translation: 'váy',
        pronunciation: '/dres/',
        example: '',
      },
      {
        word: 'skirt',
        translation: 'váy ngắn',
        pronunciation: '/skɜːrt/',
        example: '',
      },
      {
        word: 'jacket',
        translation: 'áo khoác',
        pronunciation: '/ˈdʒækət/',
        example: '',
      },
      {
        word: 'coat',
        translation: 'áo choàng',
        pronunciation: '/koʊt/',
        example: '',
      },
      {
        word: 'sweater',
        translation: 'áo len',
        pronunciation: '/ˈswetər/',
        example: '',
      },
      {
        word: 't-shirt',
        translation: 'áo phông',
        pronunciation: '/ˈtiː ʃɜːrt/',
        example: '',
      },
      {
        word: 'jeans',
        translation: 'quần jean',
        pronunciation: '/dʒiːnz/',
        example: '',
      },
      {
        word: 'shorts',
        translation: 'quần short',
        pronunciation: '/ʃɔːrts/',
        example: '',
      },
      {
        word: 'suit',
        translation: 'bộ vest',
        pronunciation: '/suːt/',
        example: '',
      },
      {
        word: 'tie',
        translation: 'cà vạt',
        pronunciation: '/taɪ/',
        example: '',
      },
      {
        word: 'belt',
        translation: 'thắt lưng',
        pronunciation: '/belt/',
        example: '',
      },
      { word: 'hat', translation: 'mũ', pronunciation: '/hæt/', example: '' },
      {
        word: 'cap',
        translation: 'mũ lưỡi trai',
        pronunciation: '/kæp/',
        example: '',
      },
      {
        word: 'shoes',
        translation: 'giày',
        pronunciation: '/ʃuːz/',
        example: '',
      },
      {
        word: 'sneakers',
        translation: 'giày thể thao',
        pronunciation: '/ˈsniːkərz/',
        example: '',
      },
      {
        word: 'boots',
        translation: 'ủng',
        pronunciation: '/buːts/',
        example: '',
      },
      {
        word: 'sandals',
        translation: 'dép xăng đan',
        pronunciation: '/ˈsændəlz/',
        example: '',
      },
      {
        word: 'socks',
        translation: 'tất',
        pronunciation: '/sɑːks/',
        example: '',
      },
      {
        word: 'underwear',
        translation: 'đồ lót',
        pronunciation: '/ˈʌndərwer/',
        example: '',
      },
      {
        word: 'bra',
        translation: 'áo ngực',
        pronunciation: '/brɑː/',
        example: '',
      },
      {
        word: 'pajamas',
        translation: 'đồ ngủ',
        pronunciation: '/pəˈdʒɑːməz/',
        example: '',
      },
      {
        word: 'uniform',
        translation: 'đồng phục',
        pronunciation: '/ˈjuːnəfɔːrm/',
        example: '',
      },
    ],
  },
  {
    id: 'weather-oxford-040',
    name: '[The3000Oxford]-40.Weather',
    description: 'Essential vocabulary for weather and climate',
    words: [
      {
        word: 'weather',
        translation: 'thời tiết',
        pronunciation: '/ˈweðər/',
        example: '',
      },
      {
        word: 'sun',
        translation: 'mặt trời',
        pronunciation: '/sʌn/',
        example: '',
      },
      {
        word: 'sunny',
        translation: 'nắng',
        pronunciation: '/ˈsʌni/',
        example: '',
      },
      {
        word: 'cloud',
        translation: 'mây',
        pronunciation: '/klaʊd/',
        example: '',
      },
      {
        word: 'cloudy',
        translation: 'có mây',
        pronunciation: '/ˈklaʊdi/',
        example: '',
      },
      {
        word: 'rain',
        translation: 'mưa',
        pronunciation: '/reɪn/',
        example: '',
      },
      {
        word: 'rainy',
        translation: 'có mưa',
        pronunciation: '/ˈreɪni/',
        example: '',
      },
      {
        word: 'snow',
        translation: 'tuyết',
        pronunciation: '/snoʊ/',
        example: '',
      },
      {
        word: 'snowy',
        translation: 'có tuyết',
        pronunciation: '/ˈsnoʊi/',
        example: '',
      },
      {
        word: 'wind',
        translation: 'gió',
        pronunciation: '/wɪnd/',
        example: '',
      },
      {
        word: 'windy',
        translation: 'có gió',
        pronunciation: '/ˈwɪndi/',
        example: '',
      },
      {
        word: 'storm',
        translation: 'bão',
        pronunciation: '/stɔːrm/',
        example: '',
      },
      {
        word: 'thunder',
        translation: 'sấm',
        pronunciation: '/ˈθʌndər/',
        example: '',
      },
      {
        word: 'lightning',
        translation: 'sét',
        pronunciation: '/ˈlaɪtnɪŋ/',
        example: '',
      },
      {
        word: 'hot',
        translation: 'nóng',
        pronunciation: '/hɑːt/',
        example: '',
      },
      {
        word: 'cold',
        translation: 'lạnh',
        pronunciation: '/koʊld/',
        example: '',
      },
      {
        word: 'warm',
        translation: 'ấm',
        pronunciation: '/wɔːrm/',
        example: '',
      },
      {
        word: 'cool',
        translation: 'mát',
        pronunciation: '/kuːl/',
        example: '',
      },
      {
        word: 'temperature',
        translation: 'nhiệt độ',
        pronunciation: '/ˈtemprətʃər/',
        example: '',
      },
      {
        word: 'season',
        translation: 'mùa',
        pronunciation: '/ˈsiːzən/',
        example: '',
      },
      {
        word: 'spring',
        translation: 'mùa xuân',
        pronunciation: '/sprɪŋ/',
        example: '',
      },
      {
        word: 'summer',
        translation: 'mùa hè',
        pronunciation: '/ˈsʌmər/',
        example: '',
      },
      {
        word: 'autumn',
        translation: 'mùa thu',
        pronunciation: '/ˈɔːtəm/',
        example: '',
      },
      {
        word: 'winter',
        translation: 'mùa đông',
        pronunciation: '/ˈwɪntər/',
        example: '',
      },
      {
        word: 'climate',
        translation: 'khí hậu',
        pronunciation: '/ˈklaɪmət/',
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

