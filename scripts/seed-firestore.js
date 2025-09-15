// Script to seed Firestore with sample vocabulary sets
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
    id: setData.id,
    name: setData.name,
    description: setData.description,
    wordLanguage: setData.wordLanguage,
    meaningLanguage: setData.meaningLanguage,
    wordCount: setData.words ? setData.words.length : 0,
    createdAt: setData.createdAt,
  };
}

const sampleSets = [
  {
    id: 'daily-life-english-001',
    name: '100 Common Daily Life English Sentences',
    description:
      'Essential English sentences for daily conversations and everyday situations',
    wordLanguage: 'vi',
    meaningLanguage: 'en',
    createdAt: new Date().toISOString(),
    isActive: true,
    words: [
      {
        word: 'Good morning!',
        translation: 'Chào buổi sáng!',
        pronunciation: '/ɡʊd ˈmɔːrnɪŋ/',
        example: 'Good morning! How did you sleep?',
        exampleTranslation: 'Chào buổi sáng! Bạn ngủ thế nào?',
      },
      {
        word: 'How are you?',
        translation: 'Bạn khỏe không?',
        pronunciation: '/haʊ ɑːr juː/',
        example: 'How are you today?',
        exampleTranslation: 'Hôm nay bạn thế nào?',
      },
      {
        word: "I'm fine, thank you.",
        translation: 'Tôi khỏe, cảm ơn bạn.',
        pronunciation: '/aɪm faɪn θæŋk juː/',
        example: "I'm fine, thank you. And you?",
        exampleTranslation: 'Tôi khỏe, cảm ơn. Còn bạn thì sao?',
      },
      {
        word: "What's your name?",
        translation: 'Tên bạn là gì?',
        pronunciation: '/wʌts jʊr neɪm/',
        example: "What's your name? My name is John.",
        exampleTranslation: 'Tên bạn là gì? Tên tôi là John.',
      },
      {
        word: 'Nice to meet you.',
        translation: 'Rất vui được gặp bạn.',
        pronunciation: '/naɪs tuː miːt juː/',
        example: 'Nice to meet you, Sarah!',
        exampleTranslation: 'Rất vui được gặp bạn, Sarah!',
      },
      {
        word: 'Where are you from?',
        translation: 'Bạn đến từ đâu?',
        pronunciation: '/weər ɑːr juː frʌm/',
        example: "Where are you from? I'm from Vietnam.",
        exampleTranslation: 'Bạn đến từ đâu? Tôi đến từ Việt Nam.',
      },
      {
        word: 'How old are you?',
        translation: 'Bạn bao nhiêu tuổi?',
        pronunciation: '/haʊ oʊld ɑːr juː/',
        example: "How old are you? I'm 25 years old.",
        exampleTranslation: 'Bạn bao nhiêu tuổi? Tôi 25 tuổi.',
      },
      {
        word: 'What do you do?',
        translation: 'Bạn làm nghề gì?',
        pronunciation: '/wʌt duː juː duː/',
        example: "What do you do? I'm a teacher.",
        exampleTranslation: 'Bạn làm nghề gì? Tôi là giáo viên.',
      },
      {
        word: "I'm hungry.",
        translation: 'Tôi đói.',
        pronunciation: '/aɪm ˈhʌŋɡri/',
        example: "I'm hungry. Let's eat something.",
        exampleTranslation: 'Tôi đói. Hãy ăn gì đó đi.',
      },
      {
        word: "I'm thirsty.",
        translation: 'Tôi khát.',
        pronunciation: '/aɪm ˈθɜːrsti/',
        example: "I'm thirsty. Can I have some water?",
        exampleTranslation: 'Tôi khát. Tôi có thể uống chút nước không?',
      },
      {
        word: "I'm tired.",
        translation: 'Tôi mệt.',
        pronunciation: '/aɪm ˈtaɪərd/',
        example: "I'm tired. I need to rest.",
        exampleTranslation: 'Tôi mệt. Tôi cần nghỉ ngơi.',
      },
      {
        word: "I'm busy.",
        translation: 'Tôi bận.',
        pronunciation: '/aɪm ˈbɪzi/',
        example: "I'm busy right now. Can we talk later?",
        exampleTranslation:
          'Tôi đang bận. Chúng ta có thể nói chuyện sau được không?',
      },
      {
        word: "I'm sorry.",
        translation: 'Tôi xin lỗi.',
        pronunciation: '/aɪm ˈsɔːri/',
        example: "I'm sorry for being late.",
        exampleTranslation: 'Tôi xin lỗi vì đến muộn.',
      },
      {
        word: 'Excuse me.',
        translation: 'Xin lỗi.',
        pronunciation: '/ɪkˈskjuːz miː/',
        example: 'Excuse me, where is the bathroom?',
        exampleTranslation: 'Xin lỗi, nhà vệ sinh ở đâu?',
      },
      {
        word: 'Thank you very much.',
        translation: 'Cảm ơn bạn rất nhiều.',
        pronunciation: '/θæŋk juː ˈveri mʌtʃ/',
        example: 'Thank you very much for your help.',
        exampleTranslation: 'Cảm ơn bạn rất nhiều vì đã giúp đỡ.',
      },
      {
        word: "You're welcome.",
        translation: 'Không có gì.',
        pronunciation: '/jʊr ˈwelkəm/',
        example: "You're welcome. It was my pleasure.",
        exampleTranslation: 'Không có gì. Đó là niềm vui của tôi.',
      },
      {
        word: 'Please help me.',
        translation: 'Làm ơn giúp tôi.',
        pronunciation: '/pliːz help miː/',
        example: 'Please help me with this problem.',
        exampleTranslation: 'Làm ơn giúp tôi với vấn đề này.',
      },
      {
        word: 'Can you help me?',
        translation: 'Bạn có thể giúp tôi không?',
        pronunciation: '/kæn juː help miː/',
        example: 'Can you help me carry this?',
        exampleTranslation: 'Bạn có thể giúp tôi mang cái này không?',
      },
      {
        word: "I don't understand.",
        translation: 'Tôi không hiểu.',
        pronunciation: '/aɪ doʊnt ʌndərˈstænd/',
        example: "I don't understand what you mean.",
        exampleTranslation: 'Tôi không hiểu ý bạn là gì.',
      },
      {
        word: 'Can you repeat that?',
        translation: 'Bạn có thể nhắc lại không?',
        pronunciation: '/kæn juː rɪˈpiːt ðæt/',
        example: 'Can you repeat that slowly?',
        exampleTranslation: 'Bạn có thể nhắc lại chậm một chút không?',
      },
      {
        word: 'What time is it?',
        translation: 'Mấy giờ rồi?',
        pronunciation: '/wʌt taɪm ɪz ɪt/',
        example: "What time is it? It's 3 o'clock.",
        exampleTranslation: 'Mấy giờ rồi? 3 giờ rồi.',
      },
      {
        word: "What's the weather like?",
        translation: 'Thời tiết thế nào?',
        pronunciation: '/wʌts ðə ˈweðər laɪk/',
        example: "What's the weather like today?",
        exampleTranslation: 'Hôm nay thời tiết thế nào?',
      },
      {
        word: "It's sunny today.",
        translation: 'Hôm nay trời nắng.',
        pronunciation: '/ɪts ˈsʌni təˈdeɪ/',
        example: "It's sunny today. Perfect for a walk.",
        exampleTranslation: 'Hôm nay trời nắng. Hoàn hảo để đi dạo.',
      },
      {
        word: "It's raining.",
        translation: 'Trời đang mưa.',
        pronunciation: '/ɪts ˈreɪnɪŋ/',
        example: "It's raining. Don't forget your umbrella.",
        exampleTranslation: 'Trời đang mưa. Đừng quên mang ô.',
      },
      {
        word: 'I like it.',
        translation: 'Tôi thích nó.',
        pronunciation: '/aɪ laɪk ɪt/',
        example: 'I like it very much. Thank you!',
        exampleTranslation: 'Tôi thích nó lắm. Cảm ơn bạn!',
      },
      {
        word: "I don't like it.",
        translation: 'Tôi không thích nó.',
        pronunciation: '/aɪ doʊnt laɪk ɪt/',
        example: "I don't like spicy food.",
        exampleTranslation: 'Tôi không thích đồ cay.',
      },
      {
        word: 'I love you.',
        translation: 'Tôi yêu bạn.',
        pronunciation: '/aɪ lʌv juː/',
        example: 'I love you more than words can say.',
        exampleTranslation: 'Tôi yêu bạn hơn cả lời nói có thể diễn tả.',
      },
      {
        word: 'I miss you.',
        translation: 'Tôi nhớ bạn.',
        pronunciation: '/aɪ mɪs juː/',
        example: "I miss you so much when you're away.",
        exampleTranslation: 'Tôi nhớ bạn rất nhiều khi bạn đi xa.',
      },
      {
        word: 'See you later.',
        translation: 'Hẹn gặp lại sau.',
        pronunciation: '/siː juː ˈleɪtər/',
        example: 'See you later! Have a good day.',
        exampleTranslation: 'Hẹn gặp lại sau! Chúc bạn một ngày tốt lành.',
      },
      {
        word: 'Goodbye.',
        translation: 'Tạm biệt.',
        pronunciation: '/ɡʊdˈbaɪ/',
        example: 'Goodbye! See you tomorrow.',
        exampleTranslation: 'Tạm biệt! Hẹn gặp lại ngày mai.',
      },
      {
        word: 'Have a good day.',
        translation: 'Chúc bạn một ngày tốt lành.',
        pronunciation: '/hæv ə ɡʊd deɪ/',
        example: 'Have a good day at work!',
        exampleTranslation: 'Chúc bạn một ngày làm việc tốt lành!',
      },
      {
        word: 'Good night.',
        translation: 'Chúc ngủ ngon.',
        pronunciation: '/ɡʊd naɪt/',
        example: 'Good night! Sweet dreams.',
        exampleTranslation: 'Chúc ngủ ngon! Mơ đẹp nhé.',
      },
      {
        word: 'I need to go.',
        translation: 'Tôi cần đi.',
        pronunciation: '/aɪ niːd tuː ɡoʊ/',
        example: 'I need to go now. See you later.',
        exampleTranslation: 'Tôi cần đi bây giờ. Hẹn gặp lại sau.',
      },
      {
        word: "Let's go.",
        translation: 'Đi thôi.',
        pronunciation: '/lets ɡoʊ/',
        example: "Let's go to the movies.",
        exampleTranslation: 'Đi xem phim thôi.',
      },
      {
        word: 'Come here.',
        translation: 'Đến đây.',
        pronunciation: '/kʌm hɪər/',
        example: 'Come here, I want to show you something.',
        exampleTranslation: 'Đến đây, tôi muốn cho bạn xem cái gì đó.',
      },
      {
        word: 'Wait a minute.',
        translation: 'Đợi một chút.',
        pronunciation: '/weɪt ə ˈmɪnɪt/',
        example: "Wait a minute, I'll be right back.",
        exampleTranslation: 'Đợi một chút, tôi sẽ quay lại ngay.',
      },
      {
        word: 'Hurry up.',
        translation: 'Nhanh lên.',
        pronunciation: '/ˈhɜːri ʌp/',
        example: "Hurry up! We're going to be late.",
        exampleTranslation: 'Nhanh lên! Chúng ta sẽ muộn mất.',
      },
      {
        word: 'Take your time.',
        translation: 'Cứ từ từ.',
        pronunciation: '/teɪk jʊr taɪm/',
        example: "Take your time. There's no rush.",
        exampleTranslation: 'Cứ từ từ. Không cần vội.',
      },
      {
        word: 'Be careful.',
        translation: 'Cẩn thận.',
        pronunciation: '/biː ˈkeərfəl/',
        example: 'Be careful when crossing the street.',
        exampleTranslation: 'Cẩn thận khi băng qua đường.',
      },
      {
        word: "Don't worry.",
        translation: 'Đừng lo.',
        pronunciation: '/doʊnt ˈwɜːri/',
        example: "Don't worry, everything will be fine.",
        exampleTranslation: 'Đừng lo, mọi thứ sẽ ổn thôi.',
      },
      {
        word: "That's okay.",
        translation: 'Không sao.',
        pronunciation: '/ðæts oʊˈkeɪ/',
        example: "That's okay. Don't worry about it.",
        exampleTranslation: 'Không sao. Đừng lo về chuyện đó.',
      },
      {
        word: 'No problem.',
        translation: 'Không vấn đề gì.',
        pronunciation: '/noʊ ˈprɑːbləm/',
        example: 'No problem. I can help you with that.',
        exampleTranslation: 'Không vấn đề gì. Tôi có thể giúp bạn với việc đó.',
      },
      {
        word: 'Of course.',
        translation: 'Tất nhiên.',
        pronunciation: '/ʌv kɔːrs/',
        example: "Of course! I'd be happy to help.",
        exampleTranslation: 'Tất nhiên! Tôi rất vui được giúp đỡ.',
      },
      {
        word: 'Absolutely.',
        translation: 'Chắc chắn rồi.',
        pronunciation: '/ˈæbsəluːtli/',
        example: "Absolutely! That's a great idea.",
        exampleTranslation: 'Chắc chắn rồi! Đó là một ý tưởng tuyệt vời.',
      },
      {
        word: 'Definitely.',
        translation: 'Chắc chắn.',
        pronunciation: '/ˈdefɪnətli/',
        example: 'Definitely! I agree with you.',
        exampleTranslation: 'Chắc chắn! Tôi đồng ý với bạn.',
      },
      {
        word: 'Maybe.',
        translation: 'Có thể.',
        pronunciation: '/ˈmeɪbi/',
        example: 'Maybe we can go tomorrow instead.',
        exampleTranslation:
          'Có thể chúng ta có thể đi vào ngày mai thay vào đó.',
      },
      {
        word: 'I think so.',
        translation: 'Tôi nghĩ vậy.',
        pronunciation: '/aɪ θɪŋk soʊ/',
        example: "I think so, but I'm not sure.",
        exampleTranslation: 'Tôi nghĩ vậy, nhưng tôi không chắc.',
      },
      {
        word: "I don't think so.",
        translation: 'Tôi không nghĩ vậy.',
        pronunciation: '/aɪ doʊnt θɪŋk soʊ/',
        example: "I don't think so. That doesn't sound right.",
        exampleTranslation: 'Tôi không nghĩ vậy. Điều đó nghe không đúng.',
      },
      {
        word: 'What do you want to eat?',
        translation: 'Bạn muốn ăn gì?',
        pronunciation: '/wʌt duː juː wɑːnt tuː iːt/',
        example: 'What do you want to eat for dinner?',
        exampleTranslation: 'Bạn muốn ăn gì cho bữa tối?',
      },
      {
        word: 'I want to eat pizza.',
        translation: 'Tôi muốn ăn pizza.',
        pronunciation: '/aɪ wɑːnt tuː iːt ˈpiːtsə/',
        example: 'I want to eat pizza tonight.',
        exampleTranslation: 'Tôi muốn ăn pizza tối nay.',
      },
      {
        word: 'This is delicious.',
        translation: 'Cái này ngon.',
        pronunciation: '/ðɪs ɪz dɪˈlɪʃəs/',
        example: 'This is delicious! I love it.',
        exampleTranslation: 'Cái này ngon! Tôi thích nó.',
      },
      {
        word: "I'm full.",
        translation: 'Tôi no rồi.',
        pronunciation: '/aɪm fʊl/',
        example: "I'm full. I can't eat anymore.",
        exampleTranslation: 'Tôi no rồi. Tôi không thể ăn thêm nữa.',
      },
      {
        word: 'How much does it cost?',
        translation: 'Cái này giá bao nhiêu?',
        pronunciation: '/haʊ mʌtʃ dʌz ɪt kɔːst/',
        example: 'How much does this shirt cost?',
        exampleTranslation: 'Cái áo này giá bao nhiêu?',
      },
      {
        word: "It's too expensive.",
        translation: 'Nó quá đắt.',
        pronunciation: '/ɪts tuː ɪkˈspensɪv/',
        example: "It's too expensive for me.",
        exampleTranslation: 'Nó quá đắt đối với tôi.',
      },
      {
        word: "That's a good price.",
        translation: 'Đó là giá tốt.',
        pronunciation: '/ðæts ə ɡʊd praɪs/',
        example: "That's a good price. I'll take it.",
        exampleTranslation: 'Đó là giá tốt. Tôi sẽ lấy nó.',
      },
      {
        word: 'Can I try this on?',
        translation: 'Tôi có thể thử cái này không?',
        pronunciation: '/kæn aɪ traɪ ðɪs ɑːn/',
        example: 'Can I try this dress on?',
        exampleTranslation: 'Tôi có thể thử cái váy này không?',
      },
      {
        word: 'It fits perfectly.',
        translation: 'Nó vừa hoàn hảo.',
        pronunciation: '/ɪt fɪts ˈpɜːrfɪktli/',
        example: 'It fits perfectly! I love it.',
        exampleTranslation: 'Nó vừa hoàn hảo! Tôi thích nó.',
      },
      {
        word: "I'll take it.",
        translation: 'Tôi sẽ lấy nó.',
        pronunciation: '/aɪl teɪk ɪt/',
        example: "I'll take it. How much is it?",
        exampleTranslation: 'Tôi sẽ lấy nó. Giá bao nhiêu?',
      },
      {
        word: 'Do you have this in a different color?',
        translation: 'Bạn có cái này màu khác không?',
        pronunciation: '/duː juː hæv ðɪs ɪn ə ˈdɪfərənt ˈkʌlər/',
        example: 'Do you have this shirt in blue?',
        exampleTranslation: 'Bạn có cái áo này màu xanh không?',
      },
      {
        word: "I'm looking for something.",
        translation: 'Tôi đang tìm cái gì đó.',
        pronunciation: '/aɪm ˈlʊkɪŋ fɔːr ˈsʌmθɪŋ/',
        example: "I'm looking for a gift for my friend.",
        exampleTranslation: 'Tôi đang tìm quà cho bạn tôi.',
      },
      {
        word: 'Where is the bathroom?',
        translation: 'Nhà vệ sinh ở đâu?',
        pronunciation: '/weər ɪz ðə ˈbæθruːm/',
        example: 'Excuse me, where is the bathroom?',
        exampleTranslation: 'Xin lỗi, nhà vệ sinh ở đâu?',
      },
      {
        word: "I'm lost.",
        translation: 'Tôi bị lạc.',
        pronunciation: '/aɪm lɔːst/',
        example: "I'm lost. Can you help me?",
        exampleTranslation: 'Tôi bị lạc. Bạn có thể giúp tôi không?',
      },
      {
        word: 'How do I get to...?',
        translation: 'Làm sao để đến...?',
        pronunciation: '/haʊ duː aɪ ɡet tuː/',
        example: 'How do I get to the train station?',
        exampleTranslation: 'Làm sao để đến ga tàu?',
      },
      {
        word: 'Turn left.',
        translation: 'Rẽ trái.',
        pronunciation: '/tɜːrn left/',
        example: 'Turn left at the next intersection.',
        exampleTranslation: 'Rẽ trái ở ngã tư tiếp theo.',
      },
      {
        word: 'Turn right.',
        translation: 'Rẽ phải.',
        pronunciation: '/tɜːrn raɪt/',
        example: 'Turn right after the traffic light.',
        exampleTranslation: 'Rẽ phải sau đèn giao thông.',
      },
      {
        word: 'Go straight.',
        translation: 'Đi thẳng.',
        pronunciation: '/ɡoʊ streɪt/',
        example: 'Go straight for two blocks.',
        exampleTranslation: 'Đi thẳng hai dãy nhà.',
      },
      {
        word: "It's on the left.",
        translation: 'Nó ở bên trái.',
        pronunciation: '/ɪts ɑːn ðə left/',
        example: 'The bank is on the left side.',
        exampleTranslation: 'Ngân hàng ở bên trái.',
      },
      {
        word: "It's on the right.",
        translation: 'Nó ở bên phải.',
        pronunciation: '/ɪts ɑːn ðə raɪt/',
        example: 'The store is on the right.',
        exampleTranslation: 'Cửa hàng ở bên phải.',
      },
      {
        word: 'I have to work.',
        translation: 'Tôi phải làm việc.',
        pronunciation: '/aɪ hæv tuː wɜːrk/',
        example: 'I have to work tomorrow morning.',
        exampleTranslation: 'Tôi phải làm việc sáng mai.',
      },
      {
        word: "I'm off today.",
        translation: 'Hôm nay tôi nghỉ.',
        pronunciation: '/aɪm ɔːf təˈdeɪ/',
        example: "I'm off today. Let's do something fun.",
        exampleTranslation: 'Hôm nay tôi nghỉ. Hãy làm gì đó vui vẻ.',
      },
      {
        word: 'What time do you finish work?',
        translation: 'Mấy giờ bạn xong việc?',
        pronunciation: '/wʌt taɪm duː juː ˈfɪnɪʃ wɜːrk/',
        example: 'What time do you finish work today?',
        exampleTranslation: 'Hôm nay mấy giờ bạn xong việc?',
      },
      {
        word: 'I work from 9 to 5.',
        translation: 'Tôi làm việc từ 9 đến 5.',
        pronunciation: '/aɪ wɜːrk frʌm naɪn tuː faɪv/',
        example: 'I work from 9 to 5 every day.',
        exampleTranslation: 'Tôi làm việc từ 9 đến 5 mỗi ngày.',
      },
      {
        word: "I'm sick.",
        translation: 'Tôi bị ốm.',
        pronunciation: '/aɪm sɪk/',
        example: "I'm sick. I need to stay home.",
        exampleTranslation: 'Tôi bị ốm. Tôi cần ở nhà.',
      },
      {
        word: 'I have a headache.',
        translation: 'Tôi bị đau đầu.',
        pronunciation: '/aɪ hæv ə ˈhedeɪk/',
        example: 'I have a headache. I need some medicine.',
        exampleTranslation: 'Tôi bị đau đầu. Tôi cần thuốc.',
      },
      {
        word: 'I feel better now.',
        translation: 'Bây giờ tôi cảm thấy khỏe hơn.',
        pronunciation: '/aɪ fiːl ˈbetər naʊ/',
        example: 'I feel better now. Thank you for asking.',
        exampleTranslation:
          'Bây giờ tôi cảm thấy khỏe hơn. Cảm ơn bạn đã hỏi thăm.',
      },
      {
        word: 'I need to see a doctor.',
        translation: 'Tôi cần gặp bác sĩ.',
        pronunciation: '/aɪ niːd tuː siː ə ˈdɑːktər/',
        example: "I need to see a doctor. I'm not feeling well.",
        exampleTranslation: 'Tôi cần gặp bác sĩ. Tôi không cảm thấy khỏe.',
      },
      {
        word: 'Call an ambulance.',
        translation: 'Gọi xe cấp cứu.',
        pronunciation: '/kɔːl ən ˈæmbjələns/',
        example: "Call an ambulance! It's an emergency.",
        exampleTranslation: 'Gọi xe cấp cứu! Đây là trường hợp khẩn cấp.',
      },
      {
        word: "I'm learning English.",
        translation: 'Tôi đang học tiếng Anh.',
        pronunciation: '/aɪm ˈlɜːrnɪŋ ˈɪŋɡlɪʃ/',
        example: "I'm learning English to improve my career.",
        exampleTranslation: 'Tôi đang học tiếng Anh để cải thiện sự nghiệp.',
      },
      {
        word: 'Can you speak slowly?',
        translation: 'Bạn có thể nói chậm không?',
        pronunciation: '/kæn juː spiːk ˈsloʊli/',
        example: "Can you speak slowly? I'm still learning.",
        exampleTranslation: 'Bạn có thể nói chậm không? Tôi vẫn đang học.',
      },
      {
        word: "I don't speak English well.",
        translation: 'Tôi không nói tiếng Anh giỏi.',
        pronunciation: '/aɪ doʊnt spiːk ˈɪŋɡlɪʃ wel/',
        example: "I don't speak English well, but I'm trying.",
        exampleTranslation:
          'Tôi không nói tiếng Anh giỏi, nhưng tôi đang cố gắng.',
      },
      {
        word: 'Do you speak Vietnamese?',
        translation: 'Bạn có nói tiếng Việt không?',
        pronunciation: '/duː juː spiːk ˌvjetnəˈmiːz/',
        example: 'Do you speak Vietnamese? I need help.',
        exampleTranslation: 'Bạn có nói tiếng Việt không? Tôi cần giúp đỡ.',
      },
      {
        word: 'I need help.',
        translation: 'Tôi cần giúp đỡ.',
        pronunciation: '/aɪ niːd help/',
        example: 'I need help with this problem.',
        exampleTranslation: 'Tôi cần giúp đỡ với vấn đề này.',
      },
      {
        word: 'Can you help me?',
        translation: 'Bạn có thể giúp tôi không?',
        pronunciation: '/kæn juː help miː/',
        example: 'Can you help me with my homework?',
        exampleTranslation: 'Bạn có thể giúp tôi làm bài tập không?',
      },
      {
        word: 'I need to practice more.',
        translation: 'Tôi cần luyện tập thêm.',
        pronunciation: '/aɪ niːd tuː ˈpræktɪs mɔːr/',
        example: 'I need to practice more to improve.',
        exampleTranslation: 'Tôi cần luyện tập thêm để cải thiện.',
      },
      {
        word: 'This is difficult.',
        translation: 'Cái này khó.',
        pronunciation: '/ðɪs ɪz ˈdɪfɪkəlt/',
        example: 'This is difficult for me to understand.',
        exampleTranslation: 'Cái này khó đối với tôi để hiểu.',
      },
      {
        word: 'This is easy.',
        translation: 'Cái này dễ.',
        pronunciation: '/ðɪs ɪz ˈiːzi/',
        example: 'This is easy. I can do it quickly.',
        exampleTranslation: 'Cái này dễ. Tôi có thể làm nhanh.',
      },
      {
        word: 'I understand now.',
        translation: 'Bây giờ tôi hiểu rồi.',
        pronunciation: '/aɪ ʌndərˈstænd naʊ/',
        example: 'I understand now. Thank you for explaining.',
        exampleTranslation: 'Bây giờ tôi hiểu rồi. Cảm ơn bạn đã giải thích.',
      },
      {
        word: "I'm sorry, I'm late.",
        translation: 'Xin lỗi, tôi đến muộn.',
        pronunciation: '/aɪm ˈsɔːri aɪm leɪt/',
        example: "I'm sorry, I'm late. The traffic was bad.",
        exampleTranslation: 'Xin lỗi, tôi đến muộn. Giao thông tệ quá.',
      },
      {
        word: "That's fine.",
        translation: 'Không sao.',
        pronunciation: '/ðæts faɪn/',
        example: "That's fine. Don't worry about it.",
        exampleTranslation: 'Không sao. Đừng lo về chuyện đó.',
      },
      {
        word: "I'm ready.",
        translation: 'Tôi sẵn sàng.',
        pronunciation: '/aɪm ˈredi/',
        example: "I'm ready to go now.",
        exampleTranslation: 'Tôi sẵn sàng đi bây giờ.',
      },
      {
        word: 'Are you ready?',
        translation: 'Bạn sẵn sàng chưa?',
        pronunciation: '/ɑːr juː ˈredi/',
        example: 'Are you ready to leave?',
        exampleTranslation: 'Bạn sẵn sàng đi chưa?',
      },
      {
        word: 'Let me think about it.',
        translation: 'Để tôi suy nghĩ về việc này.',
        pronunciation: '/let miː θɪŋk əˈbaʊt ɪt/',
        example: "Let me think about it and I'll let you know.",
        exampleTranslation:
          'Để tôi suy nghĩ về việc này và tôi sẽ cho bạn biết.',
      },
      {
        word: "I'll call you later.",
        translation: 'Tôi sẽ gọi bạn sau.',
        pronunciation: '/aɪl kɔːl juː ˈleɪtər/',
        example: "I'll call you later tonight.",
        exampleTranslation: 'Tôi sẽ gọi bạn tối nay.',
      },
      {
        word: 'Can I call you?',
        translation: 'Tôi có thể gọi bạn không?',
        pronunciation: '/kæn aɪ kɔːl juː/',
        example: 'Can I call you tomorrow?',
        exampleTranslation: 'Tôi có thể gọi bạn ngày mai không?',
      },
      {
        word: "What's your phone number?",
        translation: 'Số điện thoại của bạn là gì?',
        pronunciation: '/wʌts jʊr foʊn ˈnʌmbər/',
        example: "What's your phone number? I'll save it.",
        exampleTranslation: 'Số điện thoại của bạn là gì? Tôi sẽ lưu nó.',
      },
      {
        word: "I'll text you.",
        translation: 'Tôi sẽ nhắn tin cho bạn.',
        pronunciation: '/aɪl tekst juː/',
        example: "I'll text you the details later.",
        exampleTranslation: 'Tôi sẽ nhắn tin chi tiết cho bạn sau.',
      },
      {
        word: 'Check your phone.',
        translation: 'Kiểm tra điện thoại của bạn.',
        pronunciation: '/tʃek jʊr foʊn/',
        example: 'Check your phone. I sent you a message.',
        exampleTranslation: 'Kiểm tra điện thoại của bạn. Tôi đã gửi tin nhắn.',
      },
      {
        word: 'I forgot my password.',
        translation: 'Tôi quên mật khẩu.',
        pronunciation: '/aɪ fərˈɡɑːt maɪ ˈpæswɜːrd/',
        example: 'I forgot my password. Can you help me reset it?',
        exampleTranslation:
          'Tôi quên mật khẩu. Bạn có thể giúp tôi đặt lại không?',
      },
      {
        word: 'I need to charge my phone.',
        translation: 'Tôi cần sạc điện thoại.',
        pronunciation: '/aɪ niːd tuː tʃɑːrdʒ maɪ foʊn/',
        example: "I need to charge my phone. It's almost dead.",
        exampleTranslation: 'Tôi cần sạc điện thoại. Nó sắp hết pin rồi.',
      },
      {
        word: 'Have a great day!',
        translation: 'Chúc bạn một ngày tuyệt vời!',
        pronunciation: '/hæv ə ɡreɪt deɪ/',
        example: 'Have a great day! See you tomorrow.',
        exampleTranslation:
          'Chúc bạn một ngày tuyệt vời! Hẹn gặp lại ngày mai.',
      },
    ],
  },
];

async function seedFirestore() {
  try {
    console.log('Starting to seed Firestore...');

    for (const setData of sampleSets) {
      // Convert set data to PublicVocabularySetMeta format
      const setMeta = convertToPublicVocabularySetMeta(setData);

      // Convert words to PublicVocabularySetData format
      const words = setData.words.map(convertToPublicVocabularyWord);

      // Create the complete PublicVocabularySetData structure
      const publicSetData = {
        set: setMeta,
        words: words,
      };

      // Add the complete set with words to Firestore
      const setDocRef = await addDoc(
        collection(db, 'publicVocabularySets'),
        publicSetData
      );
      console.log(`Added set "${setMeta.name}" with ID: ${setDocRef.id}`);
      console.log(`Added ${words.length} words to the set`);
    }

    console.log('Firestore seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();
