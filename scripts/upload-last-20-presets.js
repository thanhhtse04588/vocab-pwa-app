// Script to upload last 20 Oxford vocabulary presets to Firebase
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

// Last 20 Oxford vocabulary presets (41-60)
const lastPresets = [
  {
    id: 'time-oxford-041',
    name: '[The3000Oxford]-41.Time',
    description: 'Essential vocabulary for time, days, and months',
    words: [
      {
        word: 'time',
        translation: 'thời gian',
        pronunciation: '/taɪm/',
        example: '',
      },
      {
        word: 'hour',
        translation: 'giờ',
        pronunciation: '/ˈaʊər/',
        example: '',
      },
      {
        word: 'minute',
        translation: 'phút',
        pronunciation: '/ˈmɪnət/',
        example: '',
      },
      {
        word: 'second',
        translation: 'giây',
        pronunciation: '/ˈsekənd/',
        example: '',
      },
      { word: 'day', translation: 'ngày', pronunciation: '/deɪ/', example: '' },
      {
        word: 'week',
        translation: 'tuần',
        pronunciation: '/wiːk/',
        example: '',
      },
      {
        word: 'month',
        translation: 'tháng',
        pronunciation: '/mʌnθ/',
        example: '',
      },
      { word: 'year', translation: 'năm', pronunciation: '/jɪr/', example: '' },
      {
        word: 'morning',
        translation: 'buổi sáng',
        pronunciation: '/ˈmɔːrnɪŋ/',
        example: '',
      },
      {
        word: 'afternoon',
        translation: 'buổi chiều',
        pronunciation: '/ˌæftərˈnuːn/',
        example: '',
      },
      {
        word: 'evening',
        translation: 'buổi tối',
        pronunciation: '/ˈiːvnɪŋ/',
        example: '',
      },
      {
        word: 'night',
        translation: 'đêm',
        pronunciation: '/naɪt/',
        example: '',
      },
      {
        word: 'today',
        translation: 'hôm nay',
        pronunciation: '/təˈdeɪ/',
        example: '',
      },
      {
        word: 'yesterday',
        translation: 'hôm qua',
        pronunciation: '/ˈjestərdeɪ/',
        example: '',
      },
      {
        word: 'tomorrow',
        translation: 'ngày mai',
        pronunciation: '/təˈmɑːroʊ/',
        example: '',
      },
      {
        word: 'Monday',
        translation: 'thứ hai',
        pronunciation: '/ˈmʌndeɪ/',
        example: '',
      },
      {
        word: 'Tuesday',
        translation: 'thứ ba',
        pronunciation: '/ˈtuːzdeɪ/',
        example: '',
      },
      {
        word: 'Wednesday',
        translation: 'thứ tư',
        pronunciation: '/ˈwenzdeɪ/',
        example: '',
      },
      {
        word: 'Thursday',
        translation: 'thứ năm',
        pronunciation: '/ˈθɜːrzdeɪ/',
        example: '',
      },
      {
        word: 'Friday',
        translation: 'thứ sáu',
        pronunciation: '/ˈfraɪdeɪ/',
        example: '',
      },
      {
        word: 'Saturday',
        translation: 'thứ bảy',
        pronunciation: '/ˈsætərdeɪ/',
        example: '',
      },
      {
        word: 'Sunday',
        translation: 'chủ nhật',
        pronunciation: '/ˈsʌndeɪ/',
        example: '',
      },
      {
        word: 'weekend',
        translation: 'cuối tuần',
        pronunciation: '/ˈwiːkend/',
        example: '',
      },
      {
        word: 'weekday',
        translation: 'ngày trong tuần',
        pronunciation: '/ˈwiːkdeɪ/',
        example: '',
      },
      {
        word: 'calendar',
        translation: 'lịch',
        pronunciation: '/ˈkælɪndər/',
        example: '',
      },
    ],
  },
  {
    id: 'emotions-oxford-042',
    name: '[The3000Oxford]-42.Emotions',
    description: 'Essential vocabulary for emotions and feelings',
    words: [
      {
        word: 'emotion',
        translation: 'cảm xúc',
        pronunciation: '/ɪˈmoʊʃən/',
        example: '',
      },
      {
        word: 'feeling',
        translation: 'cảm giác',
        pronunciation: '/ˈfiːlɪŋ/',
        example: '',
      },
      {
        word: 'happy',
        translation: 'vui vẻ',
        pronunciation: '/ˈhæpi/',
        example: '',
      },
      { word: 'sad', translation: 'buồn', pronunciation: '/sæd/', example: '' },
      {
        word: 'angry',
        translation: 'tức giận',
        pronunciation: '/ˈæŋɡri/',
        example: '',
      },
      {
        word: 'excited',
        translation: 'hào hứng',
        pronunciation: '/ɪkˈsaɪtəd/',
        example: '',
      },
      {
        word: 'nervous',
        translation: 'lo lắng',
        pronunciation: '/ˈnɜːrvəs/',
        example: '',
      },
      {
        word: 'worried',
        translation: 'lo âu',
        pronunciation: '/ˈwɜːrid/',
        example: '',
      },
      {
        word: 'afraid',
        translation: 'sợ hãi',
        pronunciation: '/əˈfreɪd/',
        example: '',
      },
      {
        word: 'scared',
        translation: 'sợ',
        pronunciation: '/skerd/',
        example: '',
      },
      {
        word: 'surprised',
        translation: 'ngạc nhiên',
        pronunciation: '/sərˈpraɪzd/',
        example: '',
      },
      {
        word: 'confused',
        translation: 'bối rối',
        pronunciation: '/kənˈfjuːzd/',
        example: '',
      },
      {
        word: 'proud',
        translation: 'tự hào',
        pronunciation: '/praʊd/',
        example: '',
      },
      {
        word: 'ashamed',
        translation: 'xấu hổ',
        pronunciation: '/əˈʃeɪmd/',
        example: '',
      },
      {
        word: 'jealous',
        translation: 'ghen tị',
        pronunciation: '/ˈdʒeləs/',
        example: '',
      },
      {
        word: 'lonely',
        translation: 'cô đơn',
        pronunciation: '/ˈloʊnli/',
        example: '',
      },
      {
        word: 'bored',
        translation: 'chán',
        pronunciation: '/bɔːrd/',
        example: '',
      },
      {
        word: 'tired',
        translation: 'mệt mỏi',
        pronunciation: '/ˈtaɪərd/',
        example: '',
      },
      {
        word: 'relaxed',
        translation: 'thư giãn',
        pronunciation: '/rɪˈlækst/',
        example: '',
      },
      {
        word: 'stressed',
        translation: 'căng thẳng',
        pronunciation: '/strest/',
        example: '',
      },
      {
        word: 'calm',
        translation: 'bình tĩnh',
        pronunciation: '/kɑːm/',
        example: '',
      },
      {
        word: 'confident',
        translation: 'tự tin',
        pronunciation: '/ˈkɑːnfədənt/',
        example: '',
      },
      {
        word: 'shy',
        translation: 'nhút nhát',
        pronunciation: '/ʃaɪ/',
        example: '',
      },
      {
        word: 'brave',
        translation: 'dũng cảm',
        pronunciation: '/breɪv/',
        example: '',
      },
      { word: 'love', translation: 'yêu', pronunciation: '/lʌv/', example: '' },
    ],
  },
  {
    id: 'body-parts-oxford-043',
    name: '[The3000Oxford]-43.Body Parts',
    description: 'Essential vocabulary for human body parts',
    words: [
      {
        word: 'body',
        translation: 'cơ thể',
        pronunciation: '/ˈbɑːdi/',
        example: '',
      },
      { word: 'head', translation: 'đầu', pronunciation: '/hed/', example: '' },
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
      {
        word: 'tooth',
        translation: 'răng',
        pronunciation: '/tuːθ/',
        example: '',
      },
      { word: 'ear', translation: 'tai', pronunciation: '/ɪr/', example: '' },
      { word: 'hair', translation: 'tóc', pronunciation: '/her/', example: '' },
      { word: 'neck', translation: 'cổ', pronunciation: '/nek/', example: '' },
      {
        word: 'shoulder',
        translation: 'vai',
        pronunciation: '/ˈʃoʊldər/',
        example: '',
      },
      {
        word: 'arm',
        translation: 'cánh tay',
        pronunciation: '/ɑːrm/',
        example: '',
      },
      {
        word: 'hand',
        translation: 'bàn tay',
        pronunciation: '/hænd/',
        example: '',
      },
      {
        word: 'finger',
        translation: 'ngón tay',
        pronunciation: '/ˈfɪŋɡər/',
        example: '',
      },
      {
        word: 'chest',
        translation: 'ngực',
        pronunciation: '/tʃest/',
        example: '',
      },
      {
        word: 'back',
        translation: 'lưng',
        pronunciation: '/bæk/',
        example: '',
      },
      {
        word: 'stomach',
        translation: 'bụng',
        pronunciation: '/ˈstʌmək/',
        example: '',
      },
      { word: 'leg', translation: 'chân', pronunciation: '/leɡ/', example: '' },
      {
        word: 'foot',
        translation: 'bàn chân',
        pronunciation: '/fʊt/',
        example: '',
      },
      {
        word: 'knee',
        translation: 'đầu gối',
        pronunciation: '/niː/',
        example: '',
      },
      {
        word: 'ankle',
        translation: 'mắt cá chân',
        pronunciation: '/ˈæŋkəl/',
        example: '',
      },
      { word: 'skin', translation: 'da', pronunciation: '/skɪn/', example: '' },
      {
        word: 'heart',
        translation: 'tim',
        pronunciation: '/hɑːrt/',
        example: '',
      },
      {
        word: 'brain',
        translation: 'não',
        pronunciation: '/breɪn/',
        example: '',
      },
      {
        word: 'blood',
        translation: 'máu',
        pronunciation: '/blʌd/',
        example: '',
      },
    ],
  },
  {
    id: 'numbers-oxford-044',
    name: '[The3000Oxford]-44.Numbers',
    description: 'Essential vocabulary for numbers and counting',
    words: [
      {
        word: 'number',
        translation: 'số',
        pronunciation: '/ˈnʌmbər/',
        example: '',
      },
      {
        word: 'zero',
        translation: 'không',
        pronunciation: '/ˈziroʊ/',
        example: '',
      },
      { word: 'one', translation: 'một', pronunciation: '/wʌn/', example: '' },
      { word: 'two', translation: 'hai', pronunciation: '/tuː/', example: '' },
      {
        word: 'three',
        translation: 'ba',
        pronunciation: '/θriː/',
        example: '',
      },
      {
        word: 'four',
        translation: 'bốn',
        pronunciation: '/fɔːr/',
        example: '',
      },
      {
        word: 'five',
        translation: 'năm',
        pronunciation: '/faɪv/',
        example: '',
      },
      { word: 'six', translation: 'sáu', pronunciation: '/sɪks/', example: '' },
      {
        word: 'seven',
        translation: 'bảy',
        pronunciation: '/ˈsevən/',
        example: '',
      },
      {
        word: 'eight',
        translation: 'tám',
        pronunciation: '/eɪt/',
        example: '',
      },
      {
        word: 'nine',
        translation: 'chín',
        pronunciation: '/naɪn/',
        example: '',
      },
      { word: 'ten', translation: 'mười', pronunciation: '/ten/', example: '' },
      {
        word: 'eleven',
        translation: 'mười một',
        pronunciation: '/ɪˈlevən/',
        example: '',
      },
      {
        word: 'twelve',
        translation: 'mười hai',
        pronunciation: '/twelv/',
        example: '',
      },
      {
        word: 'thirteen',
        translation: 'mười ba',
        pronunciation: '/ˌθɜːrˈtiːn/',
        example: '',
      },
      {
        word: 'fourteen',
        translation: 'mười bốn',
        pronunciation: '/ˌfɔːrˈtiːn/',
        example: '',
      },
      {
        word: 'fifteen',
        translation: 'mười lăm',
        pronunciation: '/ˌfɪfˈtiːn/',
        example: '',
      },
      {
        word: 'sixteen',
        translation: 'mười sáu',
        pronunciation: '/ˌsɪksˈtiːn/',
        example: '',
      },
      {
        word: 'seventeen',
        translation: 'mười bảy',
        pronunciation: '/ˌsevənˈtiːn/',
        example: '',
      },
      {
        word: 'eighteen',
        translation: 'mười tám',
        pronunciation: '/ˌeɪˈtiːn/',
        example: '',
      },
      {
        word: 'nineteen',
        translation: 'mười chín',
        pronunciation: '/ˌnaɪnˈtiːn/',
        example: '',
      },
      {
        word: 'twenty',
        translation: 'hai mươi',
        pronunciation: '/ˈtwenti/',
        example: '',
      },
      {
        word: 'thirty',
        translation: 'ba mươi',
        pronunciation: '/ˈθɜːrti/',
        example: '',
      },
      {
        word: 'forty',
        translation: 'bốn mươi',
        pronunciation: '/ˈfɔːrti/',
        example: '',
      },
      {
        word: 'fifty',
        translation: 'năm mươi',
        pronunciation: '/ˈfɪfti/',
        example: '',
      },
    ],
  },
  {
    id: 'colors-oxford-045',
    name: '[The3000Oxford]-45.Colors',
    description: 'Essential vocabulary for colors and shades',
    words: [
      {
        word: 'color',
        translation: 'màu sắc',
        pronunciation: '/ˈkʌlər/',
        example: '',
      },
      { word: 'red', translation: 'đỏ', pronunciation: '/red/', example: '' },
      {
        word: 'blue',
        translation: 'xanh dương',
        pronunciation: '/bluː/',
        example: '',
      },
      {
        word: 'green',
        translation: 'xanh lá',
        pronunciation: '/ɡriːn/',
        example: '',
      },
      {
        word: 'yellow',
        translation: 'vàng',
        pronunciation: '/ˈjeloʊ/',
        example: '',
      },
      {
        word: 'orange',
        translation: 'cam',
        pronunciation: '/ˈɔːrɪndʒ/',
        example: '',
      },
      {
        word: 'purple',
        translation: 'tím',
        pronunciation: '/ˈpɜːrpəl/',
        example: '',
      },
      {
        word: 'pink',
        translation: 'hồng',
        pronunciation: '/pɪŋk/',
        example: '',
      },
      {
        word: 'brown',
        translation: 'nâu',
        pronunciation: '/braʊn/',
        example: '',
      },
      {
        word: 'black',
        translation: 'đen',
        pronunciation: '/blæk/',
        example: '',
      },
      {
        word: 'white',
        translation: 'trắng',
        pronunciation: '/waɪt/',
        example: '',
      },
      {
        word: 'gray',
        translation: 'xám',
        pronunciation: '/ɡreɪ/',
        example: '',
      },
      {
        word: 'silver',
        translation: 'bạc',
        pronunciation: '/ˈsɪlvər/',
        example: '',
      },
      {
        word: 'gold',
        translation: 'vàng',
        pronunciation: '/ɡoʊld/',
        example: '',
      },
      {
        word: 'dark',
        translation: 'tối',
        pronunciation: '/dɑːrk/',
        example: '',
      },
      {
        word: 'light',
        translation: 'sáng',
        pronunciation: '/laɪt/',
        example: '',
      },
      {
        word: 'bright',
        translation: 'sáng chói',
        pronunciation: '/braɪt/',
        example: '',
      },
      {
        word: 'pale',
        translation: 'nhạt',
        pronunciation: '/peɪl/',
        example: '',
      },
      {
        word: 'deep',
        translation: 'đậm',
        pronunciation: '/diːp/',
        example: '',
      },
      {
        word: 'shade',
        translation: 'sắc thái',
        pronunciation: '/ʃeɪd/',
        example: '',
      },
      {
        word: 'tone',
        translation: 'tông màu',
        pronunciation: '/toʊn/',
        example: '',
      },
      {
        word: 'rainbow',
        translation: 'cầu vồng',
        pronunciation: '/ˈreɪnboʊ/',
        example: '',
      },
      {
        word: 'multicolored',
        translation: 'nhiều màu',
        pronunciation: '/ˌmʌltiˈkʌlərd/',
        example: '',
      },
      {
        word: 'colorful',
        translation: 'đầy màu sắc',
        pronunciation: '/ˈkʌlərfəl/',
        example: '',
      },
      {
        word: 'monochrome',
        translation: 'đơn sắc',
        pronunciation: '/ˈmɑːnəkroʊm/',
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

