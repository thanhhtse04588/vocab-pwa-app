// Script to seed Firestore with sample vocabulary sets
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAg1z2yvrWIH3hD1q6UQIJKfR2eHphlplg',
  authDomain: 'bee-vocab-app.firebaseapp.com',
  projectId: 'bee-vocab-app',
  storageBucket: 'bee-vocab-app.firebasestorage.app',
  messagingSenderId: '901327519207',
  appId: '1:901327519207:web:ec9a3b8dd23cbd7f105142',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleSets = [
  {
    name: 'Basic English Words',
    description: 'Essential English vocabulary for beginners',
    sourceLanguage: 'Vietnamese',
    targetLanguage: 'English',
    wordCount: 5,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: 'hello',
        meaning: 'xin chào',
        pronunciation: '/həˈloʊ/',
        example: 'Hello, how are you?',
      },
      {
        word: 'thank you',
        meaning: 'cảm ơn',
        pronunciation: '/θæŋk juː/',
        example: 'Thank you for your help.',
      },
      {
        word: 'goodbye',
        meaning: 'tạm biệt',
        pronunciation: '/ɡʊdˈbaɪ/',
        example: 'Goodbye, see you tomorrow.',
      },
      {
        word: 'please',
        meaning: 'làm ơn',
        pronunciation: '/pliːz/',
        example: 'Please help me.',
      },
      {
        word: 'sorry',
        meaning: 'xin lỗi',
        pronunciation: '/ˈsɔːri/',
        example: 'Sorry, I am late.',
      },
    ],
  },
  {
    name: 'Japanese Hiragana',
    description: 'Basic Japanese hiragana characters',
    sourceLanguage: 'English',
    targetLanguage: 'Japanese',
    wordCount: 5,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: 'あ (a)',
        meaning: 'a',
        pronunciation: 'ah',
        example: 'あい (ai) - love',
      },
      {
        word: 'い (i)',
        meaning: 'i',
        pronunciation: 'ee',
        example: 'いぬ (inu) - dog',
      },
      {
        word: 'う (u)',
        meaning: 'u',
        pronunciation: 'oo',
        example: 'うま (uma) - horse',
      },
      {
        word: 'え (e)',
        meaning: 'e',
        pronunciation: 'eh',
        example: 'えき (eki) - station',
      },
      {
        word: 'お (o)',
        meaning: 'o',
        pronunciation: 'oh',
        example: 'おかね (okane) - money',
      },
    ],
  },
  {
    name: 'Korean Basic Words',
    description: 'Essential Korean vocabulary for beginners',
    sourceLanguage: 'English',
    targetLanguage: 'Korean',
    wordCount: 6,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: '안녕하세요',
        meaning: 'hello',
        pronunciation: 'an-nyeong-ha-se-yo',
        example: '안녕하세요, 만나서 반갑습니다.',
      },
      {
        word: '감사합니다',
        meaning: 'thank you',
        pronunciation: 'gam-sa-ham-ni-da',
        example: '도움을 주셔서 감사합니다.',
      },
      {
        word: '죄송합니다',
        meaning: 'sorry',
        pronunciation: 'joe-song-ham-ni-da',
        example: '늦어서 죄송합니다.',
      },
      {
        word: '네',
        meaning: 'yes',
        pronunciation: 'ne',
        example: '네, 맞습니다.',
      },
      {
        word: '아니요',
        meaning: 'no',
        pronunciation: 'a-ni-yo',
        example: '아니요, 틀렸습니다.',
      },
      {
        word: '물',
        meaning: 'water',
        pronunciation: 'mul',
        example: '물을 마시고 싶어요.',
      },
    ],
  },
  {
    name: 'French Basic Phrases',
    description: 'Common French phrases for travelers',
    sourceLanguage: 'English',
    targetLanguage: 'French',
    wordCount: 5,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: 'Bonjour',
        meaning: 'Hello / Good morning',
        pronunciation: '/bɔ̃.ʒuʁ/',
        example: 'Bonjour, comment allez-vous?',
      },
      {
        word: 'Merci',
        meaning: 'Thank you',
        pronunciation: '/mɛʁ.si/',
        example: 'Merci beaucoup pour votre aide.',
      },
      {
        word: 'Excusez-moi',
        meaning: 'Excuse me',
        pronunciation: '/ɛk.sky.ze.mwa/',
        example: 'Excusez-moi, où est la gare?',
      },
      {
        word: 'Oui',
        meaning: 'Yes',
        pronunciation: '/wi/',
        example: "Oui, c'est correct.",
      },
      {
        word: 'Non',
        meaning: 'No',
        pronunciation: '/nɔ̃/',
        example: 'Non, je ne pense pas.',
      },
    ],
  },
  {
    name: 'Spanish Travel Words',
    description: 'Essential Spanish vocabulary for travelers',
    sourceLanguage: 'English',
    targetLanguage: 'Spanish',
    wordCount: 6,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: 'Hola',
        meaning: 'Hello',
        pronunciation: '/ˈo.la/',
        example: 'Hola, ¿cómo estás?',
      },
      {
        word: 'Gracias',
        meaning: 'Thank you',
        pronunciation: '/ˈɡɾa.θjas/',
        example: 'Gracias por tu ayuda.',
      },
      {
        word: 'Por favor',
        meaning: 'Please',
        pronunciation: '/poɾ faˈβoɾ/',
        example: 'Por favor, ayúdame.',
      },
      {
        word: 'Lo siento',
        meaning: "I'm sorry",
        pronunciation: '/lo ˈsjen.to/',
        example: 'Lo siento, llegué tarde.',
      },
      {
        word: 'Sí',
        meaning: 'Yes',
        pronunciation: '/si/',
        example: 'Sí, es correcto.',
      },
      {
        word: 'No',
        meaning: 'No',
        pronunciation: '/no/',
        example: 'No, no es correcto.',
      },
    ],
  },
  {
    name: 'German Basic Words',
    description: 'Essential German vocabulary for beginners',
    sourceLanguage: 'English',
    targetLanguage: 'German',
    wordCount: 5,
    createdAt: new Date().toISOString(),
    words: [
      {
        word: 'Hallo',
        meaning: 'Hello',
        pronunciation: '/ˈha.lo/',
        example: 'Hallo, wie geht es dir?',
      },
      {
        word: 'Danke',
        meaning: 'Thank you',
        pronunciation: '/ˈdaŋ.kə/',
        example: 'Danke für deine Hilfe.',
      },
      {
        word: 'Entschuldigung',
        meaning: 'Sorry / Excuse me',
        pronunciation: '/ɛntˈʃʊl.dɪ.ɡʊŋ/',
        example: 'Entschuldigung, wo ist der Bahnhof?',
      },
      {
        word: 'Ja',
        meaning: 'Yes',
        pronunciation: '/jaː/',
        example: 'Ja, das ist richtig.',
      },
      {
        word: 'Nein',
        meaning: 'No',
        pronunciation: '/naɪn/',
        example: 'Nein, das ist falsch.',
      },
    ],
  },
];

async function seedFirestore() {
  try {
    console.log('Starting to seed Firestore...');

    for (const set of sampleSets) {
      const docRef = await addDoc(collection(db, 'publicVocabularySets'), set);
      console.log(`Added set "${set.name}" with ID: ${docRef.id}`);
    }

    console.log('Firestore seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();
