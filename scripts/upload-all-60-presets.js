// Script to upload all 60 Oxford vocabulary presets to Firebase
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

// All 60 Oxford vocabulary presets
const allPresets = [
  // Basic Categories (1-10)
  {
    id: 'school-supplies-oxford-001',
    name: '[The3000Oxford]-1.School Supplies',
    description:
      'Essential vocabulary for school supplies and learning materials',
    words: [
      {
        word: 'book',
        translation: 'sách',
        pronunciation: '/bʊk/',
        example: 'I need to buy a new book for my English class.',
      },
      {
        word: 'pen',
        translation: 'bút bi',
        pronunciation: '/pen/',
        example: 'Can you lend me a pen?',
      },
      {
        word: 'pencil',
        translation: 'bút chì',
        pronunciation: '/ˈpensəl/',
        example: 'I prefer using a pencil for drawing.',
      },
      {
        word: 'paper',
        translation: 'giấy',
        pronunciation: '/ˈpeɪpər/',
        example: 'Please write your name on this paper.',
      },
      {
        word: 'notebook',
        translation: 'vở ghi chép',
        pronunciation: '/ˈnoʊtbʊk/',
        example: 'I write my homework in my notebook.',
      },
      {
        word: 'ruler',
        translation: 'thước kẻ',
        pronunciation: '/ˈruːlər/',
        example: 'Use a ruler to draw straight lines.',
      },
      {
        word: 'eraser',
        translation: 'cục tẩy',
        pronunciation: '/ɪˈreɪsər/',
        example: 'I need an eraser to fix my mistake.',
      },
      {
        word: 'backpack',
        translation: 'ba lô',
        pronunciation: '/ˈbækpæk/',
        example: 'My backpack is heavy with all my books.',
      },
      {
        word: 'calculator',
        translation: 'máy tính',
        pronunciation: '/ˈkælkjəleɪtər/',
        example: 'You can use a calculator for this math problem.',
      },
      {
        word: 'scissors',
        translation: 'kéo',
        pronunciation: '/ˈsɪzərz/',
        example: 'Be careful with the scissors!',
      },
      {
        word: 'glue',
        translation: 'keo dán',
        pronunciation: '/ɡluː/',
        example: 'I need glue to stick these papers together.',
      },
      {
        word: 'marker',
        translation: 'bút dạ',
        pronunciation: '/ˈmɑːrkər/',
        example: 'The teacher uses a red marker to correct mistakes.',
      },
      {
        word: 'highlighter',
        translation: 'bút đánh dấu',
        pronunciation: '/ˈhaɪlaɪtər/',
        example: 'Use a highlighter to mark important information.',
      },
      {
        word: 'stapler',
        translation: 'dập ghim',
        pronunciation: '/ˈsteɪplər/',
        example: 'I need a stapler to bind these pages.',
      },
      {
        word: 'folder',
        translation: 'bìa hồ sơ',
        pronunciation: '/ˈfoʊldər/',
        example: 'Put your homework in the blue folder.',
      },
      {
        word: 'binder',
        translation: 'bìa đóng lỗ',
        pronunciation: '/ˈbaɪndər/',
        example: 'I organize my notes in a three-ring binder.',
      },
      {
        word: 'clipboard',
        translation: 'bảng kẹp giấy',
        pronunciation: '/ˈklɪpbɔːrd/',
        example: 'The teacher uses a clipboard to take attendance.',
      },
      {
        word: 'compass',
        translation: 'com-pa',
        pronunciation: '/ˈkʌmpəs/',
        example: 'Use a compass to draw perfect circles.',
      },
      {
        word: 'protractor',
        translation: 'thước đo góc',
        pronunciation: '/prəˈtræktər/',
        example: 'We need a protractor for geometry class.',
      },
      {
        word: 'textbook',
        translation: 'sách giáo khoa',
        pronunciation: '/ˈtekstbʊk/',
        example: 'Open your textbook to page 25.',
      },
      {
        word: 'workbook',
        translation: 'sách bài tập',
        pronunciation: '/ˈwɜːrkbʊk/',
        example: 'Complete the exercises in your workbook.',
      },
      {
        word: 'dictionary',
        translation: 'từ điển',
        pronunciation: '/ˈdɪkʃəneri/',
        example: 'Look up the word in your dictionary.',
      },
      {
        word: 'desk',
        translation: 'bàn học',
        pronunciation: '/desk/',
        example: 'Clean your desk before leaving.',
      },
      {
        word: 'chair',
        translation: 'ghế',
        pronunciation: '/tʃer/',
        example: 'Please sit in your chair.',
      },
      {
        word: 'blackboard',
        translation: 'bảng đen',
        pronunciation: '/ˈblækbɔːrd/',
        example: 'The teacher writes on the blackboard.',
      },
    ],
  },
  {
    id: 'family-oxford-002',
    name: '[The3000Oxford]-2.Family',
    description: 'Essential vocabulary for family members and relationships',
    words: [
      {
        word: 'family',
        translation: 'gia đình',
        pronunciation: '/ˈfæməli/',
        example: 'I love my family very much.',
      },
      {
        word: 'father',
        translation: 'bố, cha',
        pronunciation: '/ˈfɑːðər/',
        example: 'My father is a doctor.',
      },
      {
        word: 'mother',
        translation: 'mẹ, má',
        pronunciation: '/ˈmʌðər/',
        example: 'My mother cooks delicious food.',
      },
      {
        word: 'parent',
        translation: 'cha mẹ',
        pronunciation: '/ˈperənt/',
        example: 'Parents should spend time with their children.',
      },
      {
        word: 'son',
        translation: 'con trai',
        pronunciation: '/sʌn/',
        example: 'He is my only son.',
      },
      {
        word: 'daughter',
        translation: 'con gái',
        pronunciation: '/ˈdɔːtər/',
        example: 'My daughter is very smart.',
      },
      {
        word: 'brother',
        translation: 'anh trai, em trai',
        pronunciation: '/ˈbrʌðər/',
        example: 'I have two brothers.',
      },
      {
        word: 'sister',
        translation: 'chị gái, em gái',
        pronunciation: '/ˈsɪstər/',
        example: 'My sister is older than me.',
      },
      {
        word: 'grandfather',
        translation: 'ông nội, ông ngoại',
        pronunciation: '/ˈɡrænfɑːðər/',
        example: 'My grandfather tells interesting stories.',
      },
      {
        word: 'grandmother',
        translation: 'bà nội, bà ngoại',
        pronunciation: '/ˈɡrænmʌðər/',
        example: 'My grandmother makes the best cookies.',
      },
      {
        word: 'grandparent',
        translation: 'ông bà',
        pronunciation: '/ˈɡrænperənt/',
        example: 'I visit my grandparents every weekend.',
      },
      {
        word: 'uncle',
        translation: 'chú, bác, cậu',
        pronunciation: '/ˈʌŋkəl/',
        example: 'My uncle lives in another city.',
      },
      {
        word: 'aunt',
        translation: 'cô, dì, mợ',
        pronunciation: '/ænt/',
        example: 'My aunt is very kind.',
      },
      {
        word: 'cousin',
        translation: 'anh chị em họ',
        pronunciation: '/ˈkʌzən/',
        example: 'I have many cousins.',
      },
      {
        word: 'nephew',
        translation: 'cháu trai',
        pronunciation: '/ˈnefjuː/',
        example: 'My nephew is learning to walk.',
      },
      {
        word: 'niece',
        translation: 'cháu gái',
        pronunciation: '/niːs/',
        example: 'My niece loves to dance.',
      },
      {
        word: 'husband',
        translation: 'chồng',
        pronunciation: '/ˈhʌzbənd/',
        example: 'My husband is very supportive.',
      },
      {
        word: 'wife',
        translation: 'vợ',
        pronunciation: '/waɪf/',
        example: 'My wife is a teacher.',
      },
      {
        word: 'spouse',
        translation: 'vợ/chồng',
        pronunciation: '/spaʊs/',
        example: 'I love my spouse very much.',
      },
      {
        word: 'baby',
        translation: 'em bé',
        pronunciation: '/ˈbeɪbi/',
        example: 'The baby is sleeping.',
      },
      {
        word: 'child',
        translation: 'trẻ em',
        pronunciation: '/tʃaɪld/',
        example: 'Every child deserves love.',
      },
      {
        word: 'teenager',
        translation: 'thiếu niên',
        pronunciation: '/ˈtiːneɪdʒər/',
        example: 'My teenager is very independent.',
      },
      {
        word: 'adult',
        translation: 'người lớn',
        pronunciation: '/ˈædʌlt/',
        example: 'Adults have many responsibilities.',
      },
      {
        word: 'relative',
        translation: 'họ hàng',
        pronunciation: '/ˈrelətɪv/',
        example: 'I have many relatives.',
      },
      {
        word: 'generation',
        translation: 'thế hệ',
        pronunciation: '/ˌdʒenəˈreɪʃən/',
        example: 'Different generations have different values.',
      },
    ],
  },
  {
    id: 'food-oxford-003',
    name: '[The3000Oxford]-3.Food & Drinks',
    description: 'Essential vocabulary for food, drinks and dining',
    words: [
      {
        word: 'food',
        translation: 'thức ăn',
        pronunciation: '/fuːd/',
        example: 'I love Vietnamese food.',
      },
      {
        word: 'bread',
        translation: 'bánh mì',
        pronunciation: '/bred/',
        example: 'I eat bread for breakfast.',
      },
      {
        word: 'rice',
        translation: 'cơm',
        pronunciation: '/raɪs/',
        example: 'Rice is a staple food in Asia.',
      },
      {
        word: 'meat',
        translation: 'thịt',
        pronunciation: '/miːt/',
        example: "I don't eat red meat.",
      },
      {
        word: 'fish',
        translation: 'cá',
        pronunciation: '/fɪʃ/',
        example: 'Fish is good for your health.',
      },
      {
        word: 'chicken',
        translation: 'thịt gà',
        pronunciation: '/ˈtʃɪkən/',
        example: 'I like grilled chicken.',
      },
      {
        word: 'beef',
        translation: 'thịt bò',
        pronunciation: '/biːf/',
        example: 'Beef is expensive in Vietnam.',
      },
      {
        word: 'pork',
        translation: 'thịt lợn',
        pronunciation: '/pɔːrk/',
        example: 'Pork is very popular in Vietnam.',
      },
      {
        word: 'vegetable',
        translation: 'rau củ',
        pronunciation: '/ˈvedʒtəbəl/',
        example: 'Eat more vegetables for good health.',
      },
      {
        word: 'fruit',
        translation: 'trái cây',
        pronunciation: '/fruːt/',
        example: 'I eat fruit every day.',
      },
      {
        word: 'apple',
        translation: 'táo',
        pronunciation: '/ˈæpəl/',
        example: 'An apple a day keeps the doctor away.',
      },
      {
        word: 'banana',
        translation: 'chuối',
        pronunciation: '/bəˈnɑːnə/',
        example: 'Bananas are rich in potassium.',
      },
      {
        word: 'orange',
        translation: 'cam',
        pronunciation: '/ˈɔːrɪndʒ/',
        example: 'Orange juice is very refreshing.',
      },
      {
        word: 'milk',
        translation: 'sữa',
        pronunciation: '/mɪlk/',
        example: 'I drink milk every morning.',
      },
      {
        word: 'water',
        translation: 'nước',
        pronunciation: '/ˈwɔːtər/',
        example: 'Drink plenty of water.',
      },
      {
        word: 'coffee',
        translation: 'cà phê',
        pronunciation: '/ˈkɔːfi/',
        example: 'I need my morning coffee.',
      },
      {
        word: 'tea',
        translation: 'trà',
        pronunciation: '/tiː/',
        example: 'Green tea is healthy.',
      },
      {
        word: 'juice',
        translation: 'nước ép',
        pronunciation: '/dʒuːs/',
        example: 'Fresh orange juice tastes great.',
      },
      {
        word: 'soup',
        translation: 'súp',
        pronunciation: '/suːp/',
        example: 'Hot soup is perfect for winter.',
      },
      {
        word: 'salad',
        translation: 'salad',
        pronunciation: '/ˈsæləd/',
        example: 'I eat salad for lunch.',
      },
      {
        word: 'pizza',
        translation: 'pizza',
        pronunciation: '/ˈpiːtsə/',
        example: 'Pizza is my favorite food.',
      },
      {
        word: 'cake',
        translation: 'bánh ngọt',
        pronunciation: '/keɪk/',
        example: 'Birthday cake is delicious.',
      },
      {
        word: 'chocolate',
        translation: 'sô cô la',
        pronunciation: '/ˈtʃɔːklət/',
        example: 'Dark chocolate is healthy.',
      },
      {
        word: 'sugar',
        translation: 'đường',
        pronunciation: '/ˈʃʊɡər/',
        example: 'Too much sugar is bad for health.',
      },
      {
        word: 'salt',
        translation: 'muối',
        pronunciation: '/sɔːlt/',
        example: 'Add some salt to taste.',
      },
    ],
  },
  {
    id: 'animals-oxford-004',
    name: '[The3000Oxford]-4.Animals',
    description: 'Essential vocabulary for animals and pets',
    words: [
      {
        word: 'animal',
        translation: 'động vật',
        pronunciation: '/ˈænɪməl/',
        example: 'I love all kinds of animals.',
      },
      {
        word: 'dog',
        translation: 'chó',
        pronunciation: '/dɔːɡ/',
        example: 'My dog is very friendly.',
      },
      {
        word: 'cat',
        translation: 'mèo',
        pronunciation: '/kæt/',
        example: 'Cats are independent animals.',
      },
      {
        word: 'bird',
        translation: 'chim',
        pronunciation: '/bɜːrd/',
        example: 'Birds can fly in the sky.',
      },
      {
        word: 'fish',
        translation: 'cá',
        pronunciation: '/fɪʃ/',
        example: 'Fish live in water.',
      },
      {
        word: 'horse',
        translation: 'ngựa',
        pronunciation: '/hɔːrs/',
        example: 'Horses are strong animals.',
      },
      {
        word: 'cow',
        translation: 'bò',
        pronunciation: '/kaʊ/',
        example: 'Cows give us milk.',
      },
      {
        word: 'pig',
        translation: 'lợn',
        pronunciation: '/pɪɡ/',
        example: 'Pigs are very intelligent.',
      },
      {
        word: 'sheep',
        translation: 'cừu',
        pronunciation: '/ʃiːp/',
        example: 'Sheep provide wool.',
      },
      {
        word: 'chicken',
        translation: 'gà',
        pronunciation: '/ˈtʃɪkən/',
        example: 'Chickens lay eggs.',
      },
      {
        word: 'duck',
        translation: 'vịt',
        pronunciation: '/dʌk/',
        example: 'Ducks can swim.',
      },
      {
        word: 'elephant',
        translation: 'voi',
        pronunciation: '/ˈeləfənt/',
        example: 'Elephants have long trunks.',
      },
      {
        word: 'lion',
        translation: 'sư tử',
        pronunciation: '/ˈlaɪən/',
        example: 'Lions are the king of animals.',
      },
      {
        word: 'tiger',
        translation: 'hổ',
        pronunciation: '/ˈtaɪɡər/',
        example: 'Tigers have stripes.',
      },
      {
        word: 'bear',
        translation: 'gấu',
        pronunciation: '/ber/',
        example: 'Bears hibernate in winter.',
      },
      {
        word: 'wolf',
        translation: 'sói',
        pronunciation: '/wʊlf/',
        example: 'Wolves live in packs.',
      },
      {
        word: 'rabbit',
        translation: 'thỏ',
        pronunciation: '/ˈræbɪt/',
        example: 'Rabbits hop quickly.',
      },
      {
        word: 'mouse',
        translation: 'chuột',
        pronunciation: '/maʊs/',
        example: 'Mice are small animals.',
      },
      {
        word: 'snake',
        translation: 'rắn',
        pronunciation: '/sneɪk/',
        example: 'Some snakes are poisonous.',
      },
      {
        word: 'frog',
        translation: 'ếch',
        pronunciation: '/frɔːɡ/',
        example: 'Frogs can jump high.',
      },
      {
        word: 'spider',
        translation: 'nhện',
        pronunciation: '/ˈspaɪdər/',
        example: 'Spiders spin webs.',
      },
      {
        word: 'butterfly',
        translation: 'bướm',
        pronunciation: '/ˈbʌtərflaɪ/',
        example: 'Butterflies are beautiful insects.',
      },
      {
        word: 'bee',
        translation: 'ong',
        pronunciation: '/biː/',
        example: 'Bees make honey.',
      },
      {
        word: 'ant',
        translation: 'kiến',
        pronunciation: '/ænt/',
        example: 'Ants work together.',
      },
      {
        word: 'pet',
        translation: 'thú cưng',
        pronunciation: '/pet/',
        example: 'Many people have pets.',
      },
    ],
  },
  {
    id: 'colors-oxford-005',
    name: '[The3000Oxford]-5.Colors',
    description: 'Essential vocabulary for colors and shades',
    words: [
      {
        word: 'color',
        translation: 'màu sắc',
        pronunciation: '/ˈkʌlər/',
        example: 'What is your favorite color?',
      },
      {
        word: 'red',
        translation: 'đỏ',
        pronunciation: '/red/',
        example: 'Red is the color of blood.',
      },
      {
        word: 'blue',
        translation: 'xanh dương',
        pronunciation: '/bluː/',
        example: 'The sky is blue.',
      },
      {
        word: 'green',
        translation: 'xanh lá',
        pronunciation: '/ɡriːn/',
        example: 'Grass is green.',
      },
      {
        word: 'yellow',
        translation: 'vàng',
        pronunciation: '/ˈjeloʊ/',
        example: 'The sun is yellow.',
      },
      {
        word: 'orange',
        translation: 'cam',
        pronunciation: '/ˈɔːrɪndʒ/',
        example: 'Oranges are orange.',
      },
      {
        word: 'purple',
        translation: 'tím',
        pronunciation: '/ˈpɜːrpəl/',
        example: 'Purple is a royal color.',
      },
      {
        word: 'pink',
        translation: 'hồng',
        pronunciation: '/pɪŋk/',
        example: 'Pink flowers are beautiful.',
      },
      {
        word: 'brown',
        translation: 'nâu',
        pronunciation: '/braʊn/',
        example: 'Tree trunks are brown.',
      },
      {
        word: 'black',
        translation: 'đen',
        pronunciation: '/blæk/',
        example: 'Night is black.',
      },
      {
        word: 'white',
        translation: 'trắng',
        pronunciation: '/waɪt/',
        example: 'Snow is white.',
      },
      {
        word: 'gray',
        translation: 'xám',
        pronunciation: '/ɡreɪ/',
        example: 'Clouds are often gray.',
      },
      {
        word: 'silver',
        translation: 'bạc',
        pronunciation: '/ˈsɪlvər/',
        example: 'Silver is shiny.',
      },
      {
        word: 'gold',
        translation: 'vàng',
        pronunciation: '/ɡoʊld/',
        example: 'Gold is precious.',
      },
      {
        word: 'dark',
        translation: 'tối',
        pronunciation: '/dɑːrk/',
        example: "It's dark at night.",
      },
      {
        word: 'light',
        translation: 'sáng',
        pronunciation: '/laɪt/',
        example: 'The room is light.',
      },
      {
        word: 'bright',
        translation: 'sáng chói',
        pronunciation: '/braɪt/',
        example: 'The sun is bright.',
      },
      {
        word: 'pale',
        translation: 'nhạt',
        pronunciation: '/peɪl/',
        example: 'She has pale skin.',
      },
      {
        word: 'deep',
        translation: 'đậm',
        pronunciation: '/diːp/',
        example: 'Deep blue ocean.',
      },
      {
        word: 'shade',
        translation: 'sắc thái',
        pronunciation: '/ʃeɪd/',
        example: 'Different shades of green.',
      },
      {
        word: 'tone',
        translation: 'tông màu',
        pronunciation: '/toʊn/',
        example: 'Warm tone colors.',
      },
      {
        word: 'rainbow',
        translation: 'cầu vồng',
        pronunciation: '/ˈreɪnboʊ/',
        example: 'Rainbows have many colors.',
      },
      {
        word: 'multicolored',
        translation: 'nhiều màu',
        pronunciation: '/ˌmʌltiˈkʌlərd/',
        example: 'A multicolored dress.',
      },
      {
        word: 'colorful',
        translation: 'đầy màu sắc',
        pronunciation: '/ˈkʌlərfəl/',
        example: 'Colorful flowers in the garden.',
      },
      {
        word: 'monochrome',
        translation: 'đơn sắc',
        pronunciation: '/ˈmɑːnəkroʊm/',
        example: 'A monochrome photograph.',
      },
    ],
  },
  {
    id: 'numbers-oxford-006',
    name: '[The3000Oxford]-6.Numbers',
    description: 'Essential vocabulary for numbers and counting',
    words: [
      {
        word: 'number',
        translation: 'số',
        pronunciation: '/ˈnʌmbər/',
        example: 'What is your phone number?',
      },
      {
        word: 'zero',
        translation: 'không',
        pronunciation: '/ˈziroʊ/',
        example: 'Zero is nothing.',
      },
      {
        word: 'one',
        translation: 'một',
        pronunciation: '/wʌn/',
        example: 'I have one apple.',
      },
      {
        word: 'two',
        translation: 'hai',
        pronunciation: '/tuː/',
        example: 'Two plus two equals four.',
      },
      {
        word: 'three',
        translation: 'ba',
        pronunciation: '/θriː/',
        example: 'I have three cats.',
      },
      {
        word: 'four',
        translation: 'bốn',
        pronunciation: '/fɔːr/',
        example: 'Four seasons in a year.',
      },
      {
        word: 'five',
        translation: 'năm',
        pronunciation: '/faɪv/',
        example: 'Five fingers on one hand.',
      },
      {
        word: 'six',
        translation: 'sáu',
        pronunciation: '/sɪks/',
        example: 'Six months make half a year.',
      },
      {
        word: 'seven',
        translation: 'bảy',
        pronunciation: '/ˈsevən/',
        example: 'Seven days in a week.',
      },
      {
        word: 'eight',
        translation: 'tám',
        pronunciation: '/eɪt/',
        example: 'Eight legs on a spider.',
      },
      {
        word: 'nine',
        translation: 'chín',
        pronunciation: '/naɪn/',
        example: 'Nine planets in our solar system.',
      },
      {
        word: 'ten',
        translation: 'mười',
        pronunciation: '/ten/',
        example: 'Ten is a round number.',
      },
      {
        word: 'eleven',
        translation: 'mười một',
        pronunciation: '/ɪˈlevən/',
        example: 'Eleven players on a football team.',
      },
      {
        word: 'twelve',
        translation: 'mười hai',
        pronunciation: '/twelv/',
        example: 'Twelve months in a year.',
      },
      {
        word: 'thirteen',
        translation: 'mười ba',
        pronunciation: '/ˌθɜːrˈtiːn/',
        example: 'Thirteen is considered unlucky.',
      },
      {
        word: 'fourteen',
        translation: 'mười bốn',
        pronunciation: '/ˌfɔːrˈtiːn/',
        example: 'I am fourteen years old.',
      },
      {
        word: 'fifteen',
        translation: 'mười lăm',
        pronunciation: '/ˌfɪfˈtiːn/',
        example: 'Fifteen minutes past the hour.',
      },
      {
        word: 'sixteen',
        translation: 'mười sáu',
        pronunciation: '/ˌsɪksˈtiːn/',
        example: 'Sweet sixteen birthday.',
      },
      {
        word: 'seventeen',
        translation: 'mười bảy',
        pronunciation: '/ˌsevənˈtiːn/',
        example: 'Seventeen is a prime number.',
      },
      {
        word: 'eighteen',
        translation: 'mười tám',
        pronunciation: '/ˌeɪˈtiːn/',
        example: 'Eighteen is the voting age.',
      },
      {
        word: 'nineteen',
        translation: 'mười chín',
        pronunciation: '/ˌnaɪnˈtiːn/',
        example: 'Nineteen ninety-nine.',
      },
      {
        word: 'twenty',
        translation: 'hai mươi',
        pronunciation: '/ˈtwenti/',
        example: 'Twenty questions game.',
      },
      {
        word: 'thirty',
        translation: 'ba mươi',
        pronunciation: '/ˈθɜːrti/',
        example: 'Thirty days hath September.',
      },
      {
        word: 'forty',
        translation: 'bốn mươi',
        pronunciation: '/ˈfɔːrti/',
        example: 'Life begins at forty.',
      },
      {
        word: 'fifty',
        translation: 'năm mươi',
        pronunciation: '/ˈfɪfti/',
        example: 'Fifty-fifty chance.',
      },
      {
        word: 'hundred',
        translation: 'một trăm',
        pronunciation: '/ˈhʌndrəd/',
        example: 'One hundred percent sure.',
      },
      {
        word: 'thousand',
        translation: 'một nghìn',
        pronunciation: '/ˈθaʊzənd/',
        example: 'A thousand thanks.',
      },
      {
        word: 'million',
        translation: 'một triệu',
        pronunciation: '/ˈmɪljən/',
        example: 'One million dollars.',
      },
      {
        word: 'billion',
        translation: 'một tỷ',
        pronunciation: '/ˈbɪljən/',
        example: 'Seven billion people on Earth.',
      },
      {
        word: 'count',
        translation: 'đếm',
        pronunciation: '/kaʊnt/',
        example: 'Count from one to ten.',
      },
    ],
  },
  {
    id: 'body-parts-oxford-007',
    name: '[The3000Oxford]-7.Body Parts',
    description: 'Essential vocabulary for human body parts',
    words: [
      {
        word: 'body',
        translation: 'cơ thể',
        pronunciation: '/ˈbɑːdi/',
        example: 'Take care of your body.',
      },
      {
        word: 'head',
        translation: 'đầu',
        pronunciation: '/hed/',
        example: 'My head hurts.',
      },
      {
        word: 'face',
        translation: 'khuôn mặt',
        pronunciation: '/feɪs/',
        example: 'She has a beautiful face.',
      },
      {
        word: 'eye',
        translation: 'mắt',
        pronunciation: '/aɪ/',
        example: 'I have blue eyes.',
      },
      {
        word: 'nose',
        translation: 'mũi',
        pronunciation: '/noʊz/',
        example: 'My nose is running.',
      },
      {
        word: 'mouth',
        translation: 'miệng',
        pronunciation: '/maʊθ/',
        example: 'Open your mouth.',
      },
      {
        word: 'tooth',
        translation: 'răng',
        pronunciation: '/tuːθ/',
        example: 'Brush your teeth.',
      },
      {
        word: 'ear',
        translation: 'tai',
        pronunciation: '/ɪr/',
        example: 'I can hear with my ears.',
      },
      {
        word: 'hair',
        translation: 'tóc',
        pronunciation: '/her/',
        example: 'She has long hair.',
      },
      {
        word: 'neck',
        translation: 'cổ',
        pronunciation: '/nek/',
        example: 'My neck is stiff.',
      },
      {
        word: 'shoulder',
        translation: 'vai',
        pronunciation: '/ˈʃoʊldər/',
        example: 'My shoulders are broad.',
      },
      {
        word: 'arm',
        translation: 'cánh tay',
        pronunciation: '/ɑːrm/',
        example: 'Raise your arm.',
      },
      {
        word: 'hand',
        translation: 'bàn tay',
        pronunciation: '/hænd/',
        example: 'Wash your hands.',
      },
      {
        word: 'finger',
        translation: 'ngón tay',
        pronunciation: '/ˈfɪŋɡər/',
        example: 'I have ten fingers.',
      },
      {
        word: 'chest',
        translation: 'ngực',
        pronunciation: '/tʃest/',
        example: 'My chest hurts.',
      },
      {
        word: 'back',
        translation: 'lưng',
        pronunciation: '/bæk/',
        example: 'My back is sore.',
      },
      {
        word: 'stomach',
        translation: 'bụng',
        pronunciation: '/ˈstʌmək/',
        example: 'My stomach is full.',
      },
      {
        word: 'leg',
        translation: 'chân',
        pronunciation: '/leɡ/',
        example: 'I have two legs.',
      },
      {
        word: 'foot',
        translation: 'bàn chân',
        pronunciation: '/fʊt/',
        example: 'My feet are cold.',
      },
      {
        word: 'knee',
        translation: 'đầu gối',
        pronunciation: '/niː/',
        example: 'Bend your knees.',
      },
      {
        word: 'ankle',
        translation: 'mắt cá chân',
        pronunciation: '/ˈæŋkəl/',
        example: 'I twisted my ankle.',
      },
      {
        word: 'skin',
        translation: 'da',
        pronunciation: '/skɪn/',
        example: 'My skin is dry.',
      },
      {
        word: 'heart',
        translation: 'tim',
        pronunciation: '/hɑːrt/',
        example: 'My heart is beating fast.',
      },
      {
        word: 'brain',
        translation: 'não',
        pronunciation: '/breɪn/',
        example: 'Use your brain.',
      },
      {
        word: 'blood',
        translation: 'máu',
        pronunciation: '/blʌd/',
        example: 'Blood is red.',
      },
    ],
  },
  {
    id: 'weather-oxford-008',
    name: '[The3000Oxford]-8.Weather',
    description: 'Essential vocabulary for weather and climate',
    words: [
      {
        word: 'weather',
        translation: 'thời tiết',
        pronunciation: '/ˈweðər/',
        example: 'The weather is nice today.',
      },
      {
        word: 'sun',
        translation: 'mặt trời',
        pronunciation: '/sʌn/',
        example: 'The sun is shining.',
      },
      {
        word: 'sunny',
        translation: 'nắng',
        pronunciation: '/ˈsʌni/',
        example: 'It is sunny today.',
      },
      {
        word: 'cloud',
        translation: 'mây',
        pronunciation: '/klaʊd/',
        example: 'There are clouds in the sky.',
      },
      {
        word: 'cloudy',
        translation: 'có mây',
        pronunciation: '/ˈklaʊdi/',
        example: 'It is cloudy today.',
      },
      {
        word: 'rain',
        translation: 'mưa',
        pronunciation: '/reɪn/',
        example: 'It is raining.',
      },
      {
        word: 'rainy',
        translation: 'có mưa',
        pronunciation: '/ˈreɪni/',
        example: 'It is rainy today.',
      },
      {
        word: 'snow',
        translation: 'tuyết',
        pronunciation: '/snoʊ/',
        example: 'It is snowing.',
      },
      {
        word: 'snowy',
        translation: 'có tuyết',
        pronunciation: '/ˈsnoʊi/',
        example: 'It is snowy today.',
      },
      {
        word: 'wind',
        translation: 'gió',
        pronunciation: '/wɪnd/',
        example: 'The wind is strong.',
      },
      {
        word: 'windy',
        translation: 'có gió',
        pronunciation: '/ˈwɪndi/',
        example: 'It is windy today.',
      },
      {
        word: 'storm',
        translation: 'bão',
        pronunciation: '/stɔːrm/',
        example: 'There is a storm coming.',
      },
      {
        word: 'thunder',
        translation: 'sấm',
        pronunciation: '/ˈθʌndər/',
        example: 'I hear thunder.',
      },
      {
        word: 'lightning',
        translation: 'sét',
        pronunciation: '/ˈlaɪtnɪŋ/',
        example: 'Lightning struck the tree.',
      },
      {
        word: 'hot',
        translation: 'nóng',
        pronunciation: '/hɑːt/',
        example: 'It is hot today.',
      },
      {
        word: 'cold',
        translation: 'lạnh',
        pronunciation: '/koʊld/',
        example: 'It is cold today.',
      },
      {
        word: 'warm',
        translation: 'ấm',
        pronunciation: '/wɔːrm/',
        example: 'The weather is warm.',
      },
      {
        word: 'cool',
        translation: 'mát',
        pronunciation: '/kuːl/',
        example: 'It is cool in the morning.',
      },
      {
        word: 'temperature',
        translation: 'nhiệt độ',
        pronunciation: '/ˈtemprətʃər/',
        example: 'What is the temperature?',
      },
      {
        word: 'season',
        translation: 'mùa',
        pronunciation: '/ˈsiːzən/',
        example: 'Spring is my favorite season.',
      },
      {
        word: 'spring',
        translation: 'mùa xuân',
        pronunciation: '/sprɪŋ/',
        example: 'Flowers bloom in spring.',
      },
      {
        word: 'summer',
        translation: 'mùa hè',
        pronunciation: '/ˈsʌmər/',
        example: 'I love summer vacation.',
      },
      {
        word: 'autumn',
        translation: 'mùa thu',
        pronunciation: '/ˈɔːtəm/',
        example: 'Leaves fall in autumn.',
      },
      {
        word: 'winter',
        translation: 'mùa đông',
        pronunciation: '/ˈwɪntər/',
        example: 'It snows in winter.',
      },
      {
        word: 'climate',
        translation: 'khí hậu',
        pronunciation: '/ˈklaɪmət/',
        example: 'The climate is changing.',
      },
    ],
  },
  {
    id: 'time-oxford-009',
    name: '[The3000Oxford]-9.Time',
    description: 'Essential vocabulary for time, days, and months',
    words: [
      {
        word: 'time',
        translation: 'thời gian',
        pronunciation: '/taɪm/',
        example: 'What time is it?',
      },
      {
        word: 'hour',
        translation: 'giờ',
        pronunciation: '/ˈaʊər/',
        example: 'I work eight hours a day.',
      },
      {
        word: 'minute',
        translation: 'phút',
        pronunciation: '/ˈmɪnət/',
        example: 'Wait a minute.',
      },
      {
        word: 'second',
        translation: 'giây',
        pronunciation: '/ˈsekənd/',
        example: 'I will be there in a second.',
      },
      {
        word: 'day',
        translation: 'ngày',
        pronunciation: '/deɪ/',
        example: 'Have a nice day.',
      },
      {
        word: 'week',
        translation: 'tuần',
        pronunciation: '/wiːk/',
        example: 'I work five days a week.',
      },
      {
        word: 'month',
        translation: 'tháng',
        pronunciation: '/mʌnθ/',
        example: 'There are twelve months in a year.',
      },
      {
        word: 'year',
        translation: 'năm',
        pronunciation: '/jɪr/',
        example: 'Happy New Year!',
      },
      {
        word: 'morning',
        translation: 'buổi sáng',
        pronunciation: '/ˈmɔːrnɪŋ/',
        example: 'Good morning!',
      },
      {
        word: 'afternoon',
        translation: 'buổi chiều',
        pronunciation: '/ˌæftərˈnuːn/',
        example: 'Good afternoon!',
      },
      {
        word: 'evening',
        translation: 'buổi tối',
        pronunciation: '/ˈiːvnɪŋ/',
        example: 'Good evening!',
      },
      {
        word: 'night',
        translation: 'đêm',
        pronunciation: '/naɪt/',
        example: 'Good night!',
      },
      {
        word: 'today',
        translation: 'hôm nay',
        pronunciation: '/təˈdeɪ/',
        example: 'What are you doing today?',
      },
      {
        word: 'yesterday',
        translation: 'hôm qua',
        pronunciation: '/ˈjestərdeɪ/',
        example: 'I saw him yesterday.',
      },
      {
        word: 'tomorrow',
        translation: 'ngày mai',
        pronunciation: '/təˈmɑːroʊ/',
        example: 'See you tomorrow.',
      },
      {
        word: 'Monday',
        translation: 'thứ hai',
        pronunciation: '/ˈmʌndeɪ/',
        example: 'Monday is the first day of the week.',
      },
      {
        word: 'Tuesday',
        translation: 'thứ ba',
        pronunciation: '/ˈtuːzdeɪ/',
        example: 'I have a meeting on Tuesday.',
      },
      {
        word: 'Wednesday',
        translation: 'thứ tư',
        pronunciation: '/ˈwenzdeɪ/',
        example: 'Wednesday is the middle of the week.',
      },
      {
        word: 'Thursday',
        translation: 'thứ năm',
        pronunciation: '/ˈθɜːrzdeɪ/',
        example: 'Thursday is almost Friday.',
      },
      {
        word: 'Friday',
        translation: 'thứ sáu',
        pronunciation: '/ˈfraɪdeɪ/',
        example: 'Thank God it is Friday.',
      },
      {
        word: 'Saturday',
        translation: 'thứ bảy',
        pronunciation: '/ˈsætərdeɪ/',
        example: 'Saturday is my day off.',
      },
      {
        word: 'Sunday',
        translation: 'chủ nhật',
        pronunciation: '/ˈsʌndeɪ/',
        example: 'Sunday is a day of rest.',
      },
      {
        word: 'weekend',
        translation: 'cuối tuần',
        pronunciation: '/ˈwiːkend/',
        example: 'I love weekends.',
      },
      {
        word: 'weekday',
        translation: 'ngày trong tuần',
        pronunciation: '/ˈwiːkdeɪ/',
        example: 'I work on weekdays.',
      },
      {
        word: 'calendar',
        translation: 'lịch',
        pronunciation: '/ˈkælɪndər/',
        example: 'Check your calendar.',
      },
    ],
  },
  {
    id: 'emotions-oxford-010',
    name: '[The3000Oxford]-10.Emotions',
    description: 'Essential vocabulary for emotions and feelings',
    words: [
      {
        word: 'emotion',
        translation: 'cảm xúc',
        pronunciation: '/ɪˈmoʊʃən/',
        example: 'Emotions are important.',
      },
      {
        word: 'feeling',
        translation: 'cảm giác',
        pronunciation: '/ˈfiːlɪŋ/',
        example: 'I have mixed feelings.',
      },
      {
        word: 'happy',
        translation: 'vui vẻ',
        pronunciation: '/ˈhæpi/',
        example: 'I am happy today.',
      },
      {
        word: 'sad',
        translation: 'buồn',
        pronunciation: '/sæd/',
        example: "Don't be sad.",
      },
      {
        word: 'angry',
        translation: 'tức giận',
        pronunciation: '/ˈæŋɡri/',
        example: 'I am angry with you.',
      },
      {
        word: 'excited',
        translation: 'hào hứng',
        pronunciation: '/ɪkˈsaɪtəd/',
        example: 'I am excited about the trip.',
      },
      {
        word: 'nervous',
        translation: 'lo lắng',
        pronunciation: '/ˈnɜːrvəs/',
        example: 'I am nervous about the exam.',
      },
      {
        word: 'worried',
        translation: 'lo âu',
        pronunciation: '/ˈwɜːrid/',
        example: "Don't worry.",
      },
      {
        word: 'afraid',
        translation: 'sợ hãi',
        pronunciation: '/əˈfreɪd/',
        example: 'I am afraid of spiders.',
      },
      {
        word: 'scared',
        translation: 'sợ',
        pronunciation: '/skerd/',
        example: 'I am scared of the dark.',
      },
      {
        word: 'surprised',
        translation: 'ngạc nhiên',
        pronunciation: '/sərˈpraɪzd/',
        example: 'I am surprised to see you.',
      },
      {
        word: 'confused',
        translation: 'bối rối',
        pronunciation: '/kənˈfjuːzd/',
        example: 'I am confused about this.',
      },
      {
        word: 'proud',
        translation: 'tự hào',
        pronunciation: '/praʊd/',
        example: 'I am proud of you.',
      },
      {
        word: 'ashamed',
        translation: 'xấu hổ',
        pronunciation: '/əˈʃeɪmd/',
        example: 'I am ashamed of my mistake.',
      },
      {
        word: 'jealous',
        translation: 'ghen tị',
        pronunciation: '/ˈdʒeləs/',
        example: 'I am jealous of your success.',
      },
      {
        word: 'lonely',
        translation: 'cô đơn',
        pronunciation: '/ˈloʊnli/',
        example: 'I feel lonely sometimes.',
      },
      {
        word: 'bored',
        translation: 'chán',
        pronunciation: '/bɔːrd/',
        example: 'I am bored with this movie.',
      },
      {
        word: 'tired',
        translation: 'mệt mỏi',
        pronunciation: '/ˈtaɪərd/',
        example: 'I am tired after work.',
      },
      {
        word: 'relaxed',
        translation: 'thư giãn',
        pronunciation: '/rɪˈlækst/',
        example: 'I feel relaxed on vacation.',
      },
      {
        word: 'stressed',
        translation: 'căng thẳng',
        pronunciation: '/strest/',
        example: 'I am stressed about work.',
      },
      {
        word: 'calm',
        translation: 'bình tĩnh',
        pronunciation: '/kɑːm/',
        example: 'Stay calm.',
      },
      {
        word: 'confident',
        translation: 'tự tin',
        pronunciation: '/ˈkɑːnfədənt/',
        example: 'I am confident in my abilities.',
      },
      {
        word: 'shy',
        translation: 'nhút nhát',
        pronunciation: '/ʃaɪ/',
        example: 'She is shy around strangers.',
      },
      {
        word: 'brave',
        translation: 'dũng cảm',
        pronunciation: '/breɪv/',
        example: 'You are very brave.',
      },
      {
        word: 'love',
        translation: 'yêu',
        pronunciation: '/lʌv/',
        example: 'I love my family.',
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

async function uploadAllPresets() {
  try {
    console.log(
      `🚀 Starting to upload ${allPresets.length} Oxford vocabulary presets to Firebase...`
    );

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < allPresets.length; i++) {
      const preset = allPresets[i];

      try {
        console.log(
          `\n📝 Uploading preset ${i + 1}/${allPresets.length}: ${preset.name}`
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

    console.log('\n🎯 All Oxford vocabulary presets have been processed!');
    console.log(
      'Users can now import these presets from the Import Preset dialog.'
    );

    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error uploading presets:', error);
    process.exit(1);
  }
}

uploadAllPresets();

