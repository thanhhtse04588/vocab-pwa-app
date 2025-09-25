// Script to upload Emotions vocabulary preset to Firebase
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

// Emotions vocabulary preset data
const emotionsPreset = {
  id: 'emotions-oxford-010',
  name: '[The3000Oxford]-10.Emotions',
  description:
    'Essential vocabulary for emotions and feelings based on Oxford English vocabulary list',
  wordLanguage: 'en',
  meaningLanguage: 'vi',
  createdAt: new Date().toISOString(),
  isActive: true,
  words: [
    {
      word: 'emotion',
      translation: 'cảm xúc',
      pronunciation: '/ɪˈmoʊʃən/',
      example: 'Emotions are important.',
      exampleTranslation: 'Cảm xúc rất quan trọng.',
    },
    {
      word: 'feeling',
      translation: 'cảm giác',
      pronunciation: '/ˈfiːlɪŋ/',
      example: 'I have mixed feelings.',
      exampleTranslation: 'Tôi có cảm giác lẫn lộn.',
    },
    {
      word: 'happy',
      translation: 'vui vẻ',
      pronunciation: '/ˈhæpi/',
      example: 'I am happy today.',
      exampleTranslation: 'Hôm nay tôi vui vẻ.',
    },
    {
      word: 'sad',
      translation: 'buồn',
      pronunciation: '/sæd/',
      example: 'Don\'t be sad.',
      exampleTranslation: 'Đừng buồn.',
    },
    {
      word: 'angry',
      translation: 'tức giận',
      pronunciation: '/ˈæŋɡri/',
      example: 'I am angry with you.',
      exampleTranslation: 'Tôi tức giận với bạn.',
    },
    {
      word: 'excited',
      translation: 'hào hứng',
      pronunciation: '/ɪkˈsaɪtəd/',
      example: 'I am excited about the trip.',
      exampleTranslation: 'Tôi hào hứng về chuyến đi.',
    },
    {
      word: 'nervous',
      translation: 'lo lắng',
      pronunciation: '/ˈnɜːrvəs/',
      example: 'I am nervous about the exam.',
      exampleTranslation: 'Tôi lo lắng về kỳ thi.',
    },
    {
      word: 'worried',
      translation: 'lo âu',
      pronunciation: '/ˈwɜːrid/',
      example: 'Don\'t worry.',
      exampleTranslation: 'Đừng lo âu.',
    },
    {
      word: 'afraid',
      translation: 'sợ hãi',
      pronunciation: '/əˈfreɪd/',
      example: 'I am afraid of spiders.',
      exampleTranslation: 'Tôi sợ nhện.',
    },
    {
      word: 'scared',
      translation: 'sợ',
      pronunciation: '/skerd/',
      example: 'I am scared of the dark.',
      exampleTranslation: 'Tôi sợ bóng tối.',
    },
    {
      word: 'surprised',
      translation: 'ngạc nhiên',
      pronunciation: '/sərˈpraɪzd/',
      example: 'I am surprised to see you.',
      exampleTranslation: 'Tôi ngạc nhiên khi gặp bạn.',
    },
    {
      word: 'confused',
      translation: 'bối rối',
      pronunciation: '/kənˈfjuːzd/',
      example: 'I am confused about this.',
      exampleTranslation: 'Tôi bối rối về điều này.',
    },
    {
      word: 'proud',
      translation: 'tự hào',
      pronunciation: '/praʊd/',
      example: 'I am proud of you.',
      exampleTranslation: 'Tôi tự hào về bạn.',
    },
    {
      word: 'ashamed',
      translation: 'xấu hổ',
      pronunciation: '/əˈʃeɪmd/',
      example: 'I am ashamed of my mistake.',
      exampleTranslation: 'Tôi xấu hổ về lỗi của mình.',
    },
    {
      word: 'jealous',
      translation: 'ghen tị',
      pronunciation: '/ˈdʒeləs/',
      example: 'I am jealous of your success.',
      exampleTranslation: 'Tôi ghen tị với thành công của bạn.',
    },
    {
      word: 'lonely',
      translation: 'cô đơn',
      pronunciation: '/ˈloʊnli/',
      example: 'I feel lonely sometimes.',
      exampleTranslation: 'Đôi khi tôi cảm thấy cô đơn.',
    },
    {
      word: 'bored',
      translation: 'chán',
      pronunciation: '/bɔːrd/',
      example: 'I am bored with this movie.',
      exampleTranslation: 'Tôi chán bộ phim này.',
    },
    {
      word: 'tired',
      translation: 'mệt mỏi',
      pronunciation: '/ˈtaɪərd/',
      example: 'I am tired after work.',
      exampleTranslation: 'Tôi mệt mỏi sau khi làm việc.',
    },
    {
      word: 'relaxed',
      translation: 'thư giãn',
      pronunciation: '/rɪˈlækst/',
      example: 'I feel relaxed on vacation.',
      exampleTranslation: 'Tôi cảm thấy thư giãn trong kỳ nghỉ.',
    },
    {
      word: 'stressed',
      translation: 'căng thẳng',
      pronunciation: '/strest/',
      example: 'I am stressed about work.',
      exampleTranslation: 'Tôi căng thẳng về công việc.',
    },
    {
      word: 'calm',
      translation: 'bình tĩnh',
      pronunciation: '/kɑːm/',
      example: 'Stay calm.',
      exampleTranslation: 'Hãy bình tĩnh.',
    },
    {
      word: 'confident',
      translation: 'tự tin',
      pronunciation: '/ˈkɑːnfədənt/',
      example: 'I am confident in my abilities.',
      exampleTranslation: 'Tôi tự tin vào khả năng của mình.',
    },
    {
      word: 'shy',
      translation: 'nhút nhát',
      pronunciation: '/ʃaɪ/',
      example: 'She is shy around strangers.',
      exampleTranslation: 'Cô ấy nhút nhát với người lạ.',
    },
    {
      word: 'brave',
      translation: 'dũng cảm',
      pronunciation: '/breɪv/',
      example: 'You are very brave.',
      exampleTranslation: 'Bạn rất dũng cảm.',
    },
    {
      word: 'love',
      translation: 'yêu',
      pronunciation: '/lʌv/',
      example: 'I love my family.',
      exampleTranslation: 'Tôi yêu gia đình của tôi.',
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

async function uploadEmotionsPreset() {
  try {
    console.log('Starting to upload Emotions preset to Firebase...');

    // Convert set data to PublicVocabularySetMeta format
    const setMeta = convertToPublicVocabularySetMeta(emotionsPreset);

    // Convert words to PublicVocabularySetData format
    const words = emotionsPreset.words.map(convertToPublicVocabularyWord);

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
    console.log(`   Description: ${emotionsPreset.description}`);
    console.log(`   Word Count: ${setMeta.wordCount}`);
    console.log(`   Created: ${setMeta.createdAt}`);
    console.log(`   Published: ${publicSetData.publishedAt}`);

    console.log('\n🎉 Emotions preset uploaded successfully!');
    console.log(
      'Users can now import this preset from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading preset to Firebase:', error);
    process.exit(1);
  }
}

uploadEmotionsPreset();

